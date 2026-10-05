const fs = require('fs');
const content = fs.readFileSync('src/data/programs.ts', 'utf8');
const slugs = content.match(/slug:\s*"[^"]+"/g) || [];
const counts = {};
slugs.forEach(s => counts[s] = (counts[s] || 0) + 1);
console.log(Object.entries(counts).filter(e => e[1] > 1));
