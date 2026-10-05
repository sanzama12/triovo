/** Bỏ dấu tiếng Việt để tìm kiếm không phân biệt dấu. */
export function normalizeVi(input: string): string {
  if (!input) return "";
  return input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .trim();
}

/** Tạo chuỗi viết tắt chữ cái đầu từ các từ (VD: "Đại học Bách khoa Hà Nội" -> "dhbkhn") */
export function getAcronym(text: string): string {
  const norm = normalizeVi(text);
  if (!norm) return "";
  // Tách theo khoảng trắng hoặc ký tự phân cách
  const words = norm.split(/[^a-z0-9]+/i).filter(Boolean);
  return words.map((w) => w.charAt(0)).join("");
}

/** Tạo danh sách các biến thể viết tắt thông dụng */
export function getAcronymVariants(text: string): string[] {
  const norm = normalizeVi(text);
  if (!norm) return [];
  const words = norm.split(/[^a-z0-9]+/i).filter(Boolean);
  if (words.length === 0) return [];

  const results = new Set<string>();
  // 1. Toàn bộ chữ cái đầu
  const full = words.map((w) => w.charAt(0)).join("");
  if (full) results.add(full);

  // 2. Bỏ các từ phụ ("va", "cua", "trong", "tai", "ve", "cac", "cho")
  const stopWords = new Set(["va", "cua", "trong", "tai", "ve", "cac", "cho", "la"]);
  const meaningfulWords = words.filter((w) => !stopWords.has(w));
  if (meaningfulWords.length > 0 && meaningfulWords.length !== words.length) {
    results.add(meaningfulWords.map((w) => w.charAt(0)).join(""));
  }

  // 3. Nếu bắt đầu bằng "dai hoc" hoặc "truong dai hoc" hoặc "cao dang" hoặc "hoc vien"
  if (words[0] === "truong" && words[1] === "dai" && words[2] === "hoc") {
    // Bỏ "truong dai hoc"
    const rest = words.slice(3);
    if (rest.length) {
      results.add("dh" + rest.map((w) => w.charAt(0)).join(""));
      results.add(rest.map((w) => w.charAt(0)).join(""));
    }
  } else if (words[0] === "dai" && words[1] === "hoc") {
    // Bỏ "dai hoc"
    const rest = words.slice(2);
    if (rest.length) {
      results.add("dh" + rest.map((w) => w.charAt(0)).join(""));
      results.add(rest.map((w) => w.charAt(0)).join(""));
    }
  } else if (words[0] === "hoc" && words[1] === "vien") {
    const rest = words.slice(2);
    if (rest.length) {
      results.add("hv" + rest.map((w) => w.charAt(0)).join(""));
      results.add(rest.map((w) => w.charAt(0)).join(""));
    }
  } else if (words[0] === "cao" && words[1] === "dang") {
    const rest = words.slice(2);
    if (rest.length) {
      results.add("cd" + rest.map((w) => w.charAt(0)).join(""));
      results.add(rest.map((w) => w.charAt(0)).join(""));
    }
  }

  // 4. Biến thể ĐH Xã hội Nhân văn: "Đại học Khoa học Xã hội và Nhân văn" -> "dhxhnv", "xhnv"
  if (norm.includes("xa hoi") && norm.includes("nhan van")) {
    results.add("dhxhnv");
    results.add("xhnv");
    results.add("dhkhxhnv");
  }
  if (norm.includes("khoa hoc tu nhien")) {
    results.add("dhkhtn");
    results.add("khtn");
  }
  if (norm.includes("kinh te quoc dan")) {
    results.add("dhktqd");
    results.add("ktqd");
  }
  if (norm.includes("bach khoa")) {
    results.add("dhbk");
    results.add("bk");
  }
  if (norm.includes("ngoai thuong")) {
    results.add("dhnt");
    results.add("nt");
  }
  if (norm.includes("su pham")) {
    results.add("dhsp");
    results.add("sp");
  }
  if (norm.includes("cong nghe thong tin")) {
    results.add("cntt");
    results.add("it");
  }
  if (norm.includes("quan tri kinh doanh")) {
    results.add("qtkd");
    results.add("ba");
  }
  if (norm.includes("khoa hoc may tinh")) {
    results.add("khmt");
    results.add("cs");
  }
  if (norm.includes("ky thuat phan mem")) {
    results.add("ktpm");
    results.add("se");
  }
  if (norm.includes("tri tue nhan tao")) {
    results.add("ttnt");
    results.add("ai");
  }
  if (norm.includes("thuong mai dien tu")) {
    results.add("tmdt");
  }
  if (norm.includes("tai chinh") && norm.includes("ngan hang")) {
    results.add("tcnh");
  }
  if (norm.includes("an toan thong tin")) {
    results.add("attt");
  }
  if (norm.includes("truyen thong da phuong tien")) {
    results.add("ttdpt");
    results.add("dpt");
  }

  return Array.from(results);
}

/** Tìm kiếm thông minh: hỗ trợ tìm theo từ, cụm từ, mã trường/ngành, và viết tắt (acronym). */
export function matchesQuery(query: string, ...fields: (string | string[] | undefined)[]): boolean {
  const rawQ = query?.trim() || "";
  if (!rawQ) return true;
  const q = normalizeVi(rawQ).replace(/[^a-z0-9\s]/g, "");
  if (!q) return true;

  // Thu thập chuỗi văn bản và các viết tắt của trường dữ liệu
  const textPieces: string[] = [];
  const acronyms: string[] = [];

  for (const f of fields) {
    if (!f) continue;
    if (Array.isArray(f)) {
      for (const item of f) {
        if (typeof item === "string" && item) {
          textPieces.push(item);
          const acrList = getAcronymVariants(item);
          acronyms.push(...acrList);
        }
      }
    } else if (typeof f === "string") {
      textPieces.push(f);
      const acrList = getAcronymVariants(f);
      acronyms.push(...acrList);
    }
  }

  const hayText = normalizeVi(textPieces.join(" "));
  const tokens = q.split(/\s+/).filter(Boolean);

  // 1. Kiểm tra nếu tất cả các token khớp trong chuỗi văn bản đầy đủ
  const allTokensInText = tokens.every((token) => hayText.includes(token));
  if (allTokensInText) return true;

  // 2. Kiểm tra nếu query khớp với mã viết tắt (ví dụ gõ "dhxhnv", "cntt", "bk", "qtkd")
  const compactQuery = q.replace(/\s+/g, "");
  if (acronyms.some((acr) => acr === compactQuery || (compactQuery.length >= 2 && acr.startsWith(compactQuery)))) {
    return true;
  }

  // 3. Kiểm tra từng token xem có khớp với viết tắt hoặc chuỗi hay không
  const everyTokenMatches = tokens.every((token) => {
    if (hayText.includes(token)) return true;
    return acronyms.some((acr) => acr === token || (token.length >= 2 && acr.startsWith(token)));
  });

  return everyTokenMatches;
}

/** Chữ cái đầu tiên theo bảng chữ cái tiếng Việt (giữ Đ). */
export function firstLetterVi(input: string): string {
  const ch = input.trim().charAt(0).toUpperCase();
  if (ch === "Đ") return "Đ";
  return ch.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export function initials(name: string): string {
  // Họ + tên (VD: Nguyễn Văn An → NA), theo cách hiển thị trong thiết kế.
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const picked = parts.length >= 2 ? [parts[0], parts[parts.length - 1]] : parts;
  return picked.map((p) => p.charAt(0).toUpperCase()).join("");
}

