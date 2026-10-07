import { config } from 'dotenv';
config({ path: '.env.local' });
import { Pool } from 'pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function normalizeThptInDb() {
  console.log('Normalizing all THPT cutoffs in database to standard 30 scale...');
  const res = await pool.query(`
    UPDATE program_cutoffs
    SET score = ROUND((score * 30.0 / 40.0)::numeric, 2)
    WHERE method_code = 'thpt' AND score > 30.0;
  `);
  console.log('Rows normalized in database:', res.rowCount);

  const { rows: check } = await pool.query(`
    SELECT count(*) as over_30_thpt FROM program_cutoffs WHERE method_code = 'thpt' AND score > 30;
  `);
  console.log('Remaining THPT > 30:', check[0].over_30_thpt);

  const { rows: sample } = await pool.query(`
    SELECT p.name, s.name as school_name, c.year, c.score
    FROM program_cutoffs c
    JOIN programs p ON c.program_id = p.id
    JOIN schools s ON p.school_id = s.id
    WHERE p.id IN ('neu-thong-ke-kinh-te', 'neu-he-thong-thong-tin-quan-ly', 'neu-toan-kinh-te', 'dav-ngon-ngu-anh', 'ulisvnu-su-pham-tieng-anh')
      AND c.method_code = 'thpt'
    ORDER BY p.name, c.year DESC
  `);
  console.log('Sample normalized THPT scores:');
  console.log(sample);

  // Clear cache if any
  await pool.end();
}

normalizeThptInDb().catch(console.error);
