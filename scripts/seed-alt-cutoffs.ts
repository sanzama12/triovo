import { config } from 'dotenv';
config({ path: '.env.local' });
import { Pool } from 'pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function seedAltCutoffs() {
  console.log('Fetching programs...');
  const { rows: programs } = await pool.query(`
    SELECT p.id, p.school_id, s.region_code as region,
           (SELECT score FROM program_cutoffs WHERE program_id = p.id AND method_code = 'thpt' ORDER BY year DESC LIMIT 1) as thpt_score
    FROM programs p
    JOIN schools s ON p.school_id = s.id
  `);
  
  const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));
  const HOCBA_SCHOOLS = new Set(['tdtu', 'ueh', 'ctu', 'vnua', 'dut', 'hup', 'hutech', 'vlu-sg', 'hsu', 'phenikaa', 'fpt', 'tmu', 'ntu', 'ou-hcm']);
  const DGNL_HN_SCHOOLS = new Set(['uet', 'ussh', 'ftu', 'neu', 'vnua', 'hup', 'hust', 'ptit', 'tmu', 'aof', 'bav', 'hnue', 'husvnu', 'ulis']);
  const DGNL_HCM_SCHOOLS = new Set(['ueh', 'hcmus', 'hcmut', 'uit', 'uel', 'iu', 'tdtu', 'ctu', 'dut', 'iuh', 'hcmute', 'nlu', 'sgu', 'vlu-sg']);
  
  const records: { program_id: string; year: number; score: number; method_code: string; is_estimated: boolean }[] = [];

  for (const p of programs) {
    if (!p.thpt_score) continue;
    let t = parseFloat(p.thpt_score);
    if (t > 30) t = (t * 30) / 40; // Normalize scale 40 to 30 first
    
    const hasDgnlHn = DGNL_HN_SCHOOLS.has(p.school_id) || (p.region === 'mien-bac' && t >= 22);
    const hasDgnlHcm = DGNL_HCM_SCHOOLS.has(p.school_id) || (p.region === 'mien-nam' && t >= 20);
    const hasHocba = HOCBA_SCHOOLS.has(p.school_id) || t <= 27.5;
    
    if (hasDgnlHn) {
      const score = Math.round(clamp(60 + (t - 15) * 4.8, 65, 138));
      records.push({ program_id: p.id, year: 2025, score, method_code: 'dgnl-hn', is_estimated: true });
    }
    
    if (hasDgnlHcm) {
      const score = Math.round(clamp(580 + (t - 15) * 34, 600, 1090));
      records.push({ program_id: p.id, year: 2025, score, method_code: 'dgnl-hcm', is_estimated: true });
    }
    
    if (hasHocba) {
      const score = Math.round(Math.min(29.8, t + 1.2) * 100) / 100;
      records.push({ program_id: p.id, year: 2025, score, method_code: 'hocba', is_estimated: true });
    }
  }
  
  console.log(`Generated ${records.length} alt cutoff records. Inserting in batch...`);
  
  const BATCH_SIZE = 500;
  for (let i = 0; i < records.length; i += BATCH_SIZE) {
    const chunk = records.slice(i, i + BATCH_SIZE);
    const values: any[] = [];
    const valuePlaceholders: string[] = [];
    
    chunk.forEach((r, idx) => {
      const base = idx * 5;
      valuePlaceholders.push(`($${base + 1}, $${base + 2}, $${base + 3}, $${base + 4}, $${base + 5})`);
      values.push(r.program_id, r.year, r.score, r.method_code, r.is_estimated);
    });
    
    const query = `
      INSERT INTO program_cutoffs (program_id, year, score, method_code, is_estimated)
      VALUES ${valuePlaceholders.join(', ')}
      ON CONFLICT (program_id, year, method_code) DO UPDATE 
      SET score = EXCLUDED.score, is_estimated = EXCLUDED.is_estimated;
    `;
    await pool.query(query, values);
    console.log(`Inserted chunk ${i / BATCH_SIZE + 1} (${chunk.length} items)`);
  }
  
  console.log('Seeding finished successfully!');
  await pool.end();
}

seedAltCutoffs().catch(console.error);
