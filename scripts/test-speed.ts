async function testSpeed() {
  const urls = [
    "http://localhost:3000/api/quiz/questions",
    "http://localhost:3000/api/majors",
    "http://localhost:3000/api/programs?q=công+nghệ&combos=A00",
    "http://localhost:3000/api/programs?page=1",
    "http://localhost:3000/api/programs?page=2",
  ];

  console.log("🚀 KIỂM TRA TỐC ĐỘ PHẢN HỒI BACKEND API (BENCHMARK):");
  console.log("==================================================");

  for (const u of urls) {
    const t0 = performance.now();
    const res = await fetch(u);
    const data = await res.json();
    const t1 = performance.now();
    const path = u.replace("http://localhost:3000", "");
    const timeMs = (t1 - t0).toFixed(2);
    console.log(`⚡ API: ${path.padEnd(45)} => ${timeMs.padStart(6)} ms (Status: ${res.status})`);
  }
  console.log("==================================================");
}

testSpeed().catch(console.error);
