import { programs } from './src/data/programs.ts';
const counts: Record<string, number> = {};
programs.forEach(p => counts[p.slug] = (counts[p.slug] || 0) + 1);
const duplicates = Object.entries(counts).filter(([k, v]) => v > 1);
console.log('Programs length:', programs.length);
console.log('Unique slugs count:', new Set(programs.map(p => p.slug)).size);
console.log('Duplicate slugs:', duplicates);
const dupItems = programs.filter(p => duplicates.some(([d]) => d === p.slug));
console.log('Duplicate items:', dupItems.map(p => ({ id: p.id, slug: p.slug, name: p.name, schoolId: p.schoolId, majorId: p.majorId })));
