import { programs } from "../src/data/programs";
import { schools } from "../src/data/schools";
import { majors } from "../src/data/majors";

const schoolIds = new Set(schools.map(s => s.id));
const majorIds = new Set(majors.map(m => m.id));

console.log(`Total programs: ${programs.length}`);
console.log(`Total schools: ${schools.length}`);
console.log(`Total majors: ${majors.length}`);

let missingSchool = 0;
let missingMajor = 0;

for (let i = 0; i < programs.length; i++) {
  const p = programs[i];
  if (!schoolIds.has(p.schoolId)) {
    console.log(`Program #${i} (${p.id}): Unknown schoolId '${p.schoolId}'`);
    missingSchool++;
  }
  if (!majorIds.has(p.majorId)) {
    console.log(`Program #${i} (${p.id}): Unknown majorId '${p.majorId}'`);
    missingMajor++;
  }
}

console.log(`Missing schoolId: ${missingSchool}, Missing majorId: ${missingMajor}`);
