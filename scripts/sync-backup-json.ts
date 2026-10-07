import { config } from 'dotenv';
config({ path: '.env.local' });
import fs from 'fs';
import path from 'path';
import { Pool } from 'pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function syncBackupJson() {
  console.log('Syncing clean normalized data from Neon to database_truong_nganh_diem_chuan.json...');
  
  const { rows: schools } = await pool.query(`
    SELECT s.id, s.slug, s.code, s.name, s.short_name as "shortName", s.type, s.region_code as region,
           s.city, s.founded, s.students, s.highlight, s.website, s.description, s.scholarships,
           s.hidden, s.is_custom as custom,
           COALESCE((SELECT json_agg(c.name ORDER BY c.position) FROM school_campuses c WHERE c.school_id = s.id), '[]'::json) as campuses
    FROM schools s
    WHERE s.hidden = false
    ORDER BY s.name ASC
  `);

  const { rows: majors } = await pool.query(`
    SELECT m.id, m.slug, m.code, m.name, m.group_id as "groupId", m.summary, m.description,
           m.demand, m.growth, m.hidden, m.is_custom as custom,
           COALESCE((SELECT json_agg(r.riasec_code ORDER BY r.rank) FROM major_riasec r WHERE r.major_id = m.id), '[]'::json) as riasec,
           COALESCE((SELECT json_agg(json_build_object('title', c.title, 'salary', c.salary_text, 'desc', c.description, 'level', c.level) ORDER BY c.position) FROM major_careers c WHERE c.major_id = m.id), '[]'::json) as careers
    FROM majors m
    WHERE m.hidden = false
    ORDER BY m.name ASC
  `);

  const { rows: programs } = await pool.query(`
    SELECT 
      p.id, p.slug, p.school_id as "schoolId", p.major_id as "majorId", p.name, p.admission_code as "admissionCode", p.training_type as "trainingType",
      p.campus, p.tuition_min as "tuitionMin", p.tuition_max as "tuitionMax", p.duration_years as "durationYears", p.quota, p.competition,
      p.overview, p.data_updated as "updatedAt", p.source, p.source_url as "sourceUrl", p.hidden, p.is_custom as custom,
      COALESCE((
        SELECT json_agg(pc.combo_code) 
        FROM program_combos pc 
        WHERE pc.program_id = p.id
      ), '[]'::json) as combos,
      COALESCE((
        SELECT json_agg(json_build_object('year', c.year, 'score', c.score) ORDER BY c.year DESC) 
        FROM program_cutoffs c 
        WHERE c.program_id = p.id AND (c.method_code = 'thpt' OR c.method_code IS NULL)
      ), '[]'::json) as cutoffs,
      COALESCE((
        SELECT json_agg(json_build_object('method', c.method_code, 'year', c.year, 'score', c.score, 'estimated', c.is_estimated) ORDER BY c.year DESC) 
        FROM program_cutoffs c 
        WHERE c.program_id = p.id AND c.method_code != 'thpt'
      ), '[]'::json) as "altCutoffs",
      COALESCE((
        SELECT json_agg(json_build_object('name', m.name, 'desc', m.description, 'requirement', m.requirement, 'tag', m.tag) ORDER BY m.position) 
        FROM program_admission_methods m 
        WHERE m.program_id = p.id
      ), '[]'::json) as methods
    FROM programs p
    WHERE p.hidden = false
    ORDER BY p.name ASC
  `);

  const { rows: groups } = await pool.query('SELECT id, slug, name, icon, tone FROM major_groups ORDER BY position ASC');

  const payload = {
    metadata: {
      generatedAt: new Date().toISOString(),
      version: '3.0.0-neon-sync',
      totalSchools: schools.length,
      totalMajors: majors.length,
      totalPrograms: programs.length
    },
    majorGroups: groups,
    schools,
    majors,
    programs
  };

  const targetPath = path.resolve('src/data/database_truong_nganh_diem_chuan.json');
  fs.writeFileSync(targetPath, JSON.stringify(payload, null, 2), 'utf-8');
  console.log(`Successfully synced ${programs.length} programs, ${schools.length} schools to ${targetPath}!`);
  await pool.end();
}

syncBackupJson().catch(console.error);
