import type { Career, CurriculumBlock, Major, RiasecType, Specialization } from "../domain/types";

type Seed = {
  slug: string;
  code: string;
  name: string;
  groupId: string;
  riasec: [RiasecType, RiasecType, RiasecType];
  summary: string;
  description: string;
  curriculum: [string, [string, string][]][];
  careers: [Career["level"], string, string, string][];
  demand: Major["demand"];
  growth: number;
  aliases?: string[];
  specializations?: Specialization[];
  degree?: string;
};

const seeds: Seed[] = [
  // ==================== 1. CÔNG NGHỆ THÔNG TIN & MÁY TÍNH (cntt) ====================
  {
    slug: "cong-nghe-thong-tin", code: "7480201", name: "Công nghệ thông tin", groupId: "cntt", riasec: ["I", "R", "C"],
    summary: "Thiết kế, xây dựng và vận hành hệ thống phần mềm, mạng và dữ liệu cho doanh nghiệp.",
    description: "Ngành Công nghệ thông tin trang bị nền tảng lập trình, cơ sở dữ liệu, mạng máy tính và kỹ năng phát triển sản phẩm số. Sinh viên được thực hành qua dự án thật từ năm 2–3.",
    curriculum: [
      ["Cơ sở ngành", [["Cấu trúc dữ liệu & giải thuật", "Tư duy giải quyết bài toán và tối ưu chương trình."], ["Cơ sở dữ liệu", "Thiết kế, truy vấn và quản trị dữ liệu quan hệ."]]],
      ["Chuyên ngành", [["Phát triển ứng dụng web & di động", "Front-end, back-end và triển khai trên đám mây."], ["An toàn thông tin", "Bảo mật hệ thống, mạng và ứng dụng."]]],
    ],
    careers: [
      ["Thực thi & chuyên môn", "Lập trình viên Full-stack", "15 - 32 triệu/tháng", "Xây dựng và bảo trì sản phẩm phần mềm web/mobile."],
      ["Thực thi & chuyên môn", "Kỹ sư DevOps / Cloud", "20 - 40 triệu/tháng", "Tự động hoá triển khai, vận hành hạ tầng đám mây AWS/GCP."],
      ["Quản lý & chiến lược", "Quản lý dự án CNTT (IT Project Manager)", "30 - 55 triệu/tháng", "Điều phối đội ngũ, tiến độ và chất lượng dự án công nghệ."],
    ],
    demand: "Rất cao", growth: 16,
    aliases: ["cntt", "it", "cong nghe thong tin", "information technology", "lap trinh", "developer", "cntt-it"],
    degree: "Kỹ sư / Cử nhân",
    specializations: [
      { name: "Phát triển ứng dụng Web & Mobile", code: "7480201-01", desc: "Xây dựng hệ thống web hiện đại (React/Next, Node/Go) và ứng dụng di động iOS/Android.", aliases: ["web", "mobile", "app", "lap trinh web"] },
      { name: "Quản trị hệ thống & Điện toán đám mây", code: "7480201-02", desc: "Vận hành hệ thống máy chủ, container (Docker, Kubernetes) và hạ tầng đám mây AWS, GCP, Azure.", aliases: ["sysadmin", "cloud", "devops"] },
      { name: "Lập trình hệ thống doanh nghiệp (ERP)", code: "7480201-03", desc: "Triển khai và tùy biến các giải pháp phần mềm quản trị doanh nghiệp SAP, Salesforce, Odoo.", aliases: ["erp", "doanh nghiep"] },
    ],
  },
  {
    slug: "khoa-hoc-may-tinh", code: "7480101", name: "Khoa học máy tính", groupId: "cntt", riasec: ["I", "R", "C"],
    summary: "Nền tảng toán – thuật toán cho phần mềm, trí tuệ nhân tạo và hệ thống thông minh.",
    description: "Tập trung vào lý thuyết tính toán, thuật toán, học máy và hệ thống. Phù hợp với bạn thích toán và muốn làm nghiên cứu hoặc sản phẩm công nghệ lõi.",
    curriculum: [
      ["Cơ sở ngành", [["Toán rời rạc & Đại số tuyến tính", "Logic, đồ thị, tổ hợp cho khoa học máy tính và AI."], ["Kiến trúc máy tính & Hệ điều hành", "Cách phần cứng thực thi chương trình và quản lý bộ nhớ."]]],
      ["Chuyên ngành", [["Học máy (Machine Learning)", "Mô hình dự đoán, phân loại và nhận diện từ dữ liệu."], ["Hệ thống tính toán hiệu năng cao", "Tính toán song song trên GPU và cụm máy chủ phân tán."]]],
    ],
    careers: [
      ["Thực thi & chuyên môn", "Kỹ sư nghiên cứu thuật toán (Algorithm Engineer)", "25 - 45 triệu/tháng", "Phát triển thuật toán tối ưu hóa cho hệ thống lớn."],
      ["Thực thi & chuyên môn", "Kỹ sư học máy (ML Engineer)", "25 - 50 triệu/tháng", "Xây dựng và triển khai mô hình học máy vào thực tế."],
      ["Quản lý & chiến lược", "Kiến trúc sư giải pháp (Solutions Architect)", "45 - 80 triệu/tháng", "Thiết kế kiến trúc hệ thống công nghệ thông tin quy mô lớn."],
    ],
    demand: "Rất cao", growth: 18,
    aliases: ["khmt", "cs", "khoa hoc may tinh", "computer science", "thuat toan"],
    degree: "Cử nhân / Kỹ sư",
    specializations: [
      { name: "Học máy & Xử lý ngôn ngữ tự nhiên (NLP)", code: "7480101-01", desc: "Nghiên cứu các mô hình ngôn ngữ lớn (LLMs), dịch máy và chatbot thông minh.", aliases: ["nlp", "llm", "ngon ngu tu nhien"] },
      { name: "Thị giác máy tính (Computer Vision)", code: "7480101-02", desc: "Xử lý ảnh số, nhận diện khuôn mặt, phát hiện vật thể và thị giác trong xe tự hành.", aliases: ["cv", "thi giac may tinh", "nhan dien anh"] },
      { name: "Hệ thống phân tán & Tính toán đám mây", code: "7480101-03", desc: "Thiết kế các kiến trúc microservices phân tán chịu tải hàng triệu người dùng cùng lúc.", aliases: ["distributed systems", "he phan tan"] },
    ],
  },
  {
    slug: "ky-thuat-phan-mem", code: "7480103", name: "Kỹ thuật phần mềm", groupId: "cntt", riasec: ["I", "C", "R"],
    summary: "Quy trình chuyên nghiệp để phát triển, kiểm thử và vận hành phần mềm quy mô lớn.",
    description: "Chú trọng quy trình phát triển phần mềm chuẩn quốc tế (Agile/Scrum, CI/CD, DevOps), kiến trúc phần mềm, kiểm thử và quản lý chất lượng dự án.",
    curriculum: [
      ["Cơ sở ngành", [["Lập trình hướng đối tượng (OOP)", "Thiết kế mẫu (Design Patterns), viết mã sạch và dễ bảo trì."], ["Phân tích & thiết kế hệ thống", "Mô hình hoá yêu cầu bằng UML và thiết kế cơ sở dữ liệu."]]],
      ["Chuyên ngành", [["Kiểm thử tự động (Automation Testing)", "Xây dựng framework kiểm thử tự động, Selenium/Playwright."], ["Quy trình Agile & Quản lý dự án phần mềm", "Scrum, Jira, ước lượng và quản trị rủi ro phần mềm."]]],
    ],
    careers: [
      ["Thực thi & chuyên môn", "Kỹ sư phần mềm (Software Engineer)", "18 - 35 triệu/tháng", "Phát triển tính năng cho các sản phẩm công nghệ."],
      ["Thực thi & chuyên môn", "Kỹ sư kiểm thử tự động (QA/QC Automation)", "15 - 30 triệu/tháng", "Viết script tự động hóa kiểm thử và đảm bảo chất lượng phần mềm."],
      ["Quản lý & chiến lược", "Giám đốc kỹ thuật (Tech Lead / CTO)", "40 - 75 triệu/tháng", "Định hướng công nghệ và dẫn dắt đội ngũ kỹ sư."],
    ],
    demand: "Rất cao", growth: 15,
    aliases: ["ktpm", "se", "ky thuat phan mem", "software engineering", "phan mem", "lap trinh vien"],
    degree: "Kỹ sư",
    specializations: [
      { name: "Công nghệ phần mềm di động (Mobile App Dev)", code: "7480103-01", desc: "Lập trình ứng dụng native và cross-platform (Flutter, React Native, Swift, Kotlin).", aliases: ["flutter", "react native", "ios", "android"] },
      { name: "Kiểm thử phần mềm & Đảm bảo chất lượng (QA/QC)", code: "7480103-02", desc: "Quy trình kiểm thử thủ công, kiểm thử tự động hóa và bảo mật phần mềm.", aliases: ["qa", "qc", "kiem thu phan mem", "tester"] },
      { name: "Kỹ thuật phát triển Game (Game Development)", code: "7480103-03", desc: "Lập trình game 2D/3D trên Unity/Unreal Engine, vật lý game và đồ họa máy tính.", aliases: ["game", "unity", "unreal", "game dev"] },
    ],
  },
  {
    slug: "tri-tue-nhan-tao", code: "7480107", name: "Trí tuệ nhân tạo", groupId: "cntt", riasec: ["I", "R", "A"],
    summary: "Xây dựng hệ thống tự học từ dữ liệu: học sâu, thị giác máy tính, AI tạo sinh và robot.",
    description: "Ngành học mũi nhọn thời đại số đào tạo chuyên sâu về Machine Learning, Deep Learning, Generative AI và Robot thông minh ứng dụng trong đa lĩnh vực.",
    curriculum: [
      ["Cơ sở ngành", [["Xác suất thống kê & Đại số tuyến tính cho AI", "Nền tảng toán học cho các thuật toán học máy và mạng nơ-ron."], ["Khoa học dữ liệu và trực quan hóa", "Thu thập, làm sạch và xử lý tập dữ liệu lớn."]]],
      ["Chuyên ngành", [["Học sâu & Mạng nơ-ron (Deep Learning)", "Mô hình CNN, RNN, Transformer cho hình ảnh, văn bản và giọng nói."], ["AI tạo sinh (Generative AI) & Ứng dụng", "Phát triển và tinh chỉnh mô hình sinh văn bản, hình ảnh, mã nguồn."]]],
    ],
    careers: [
      ["Thực thi & chuyên môn", "Kỹ sư Trí tuệ nhân tạo (AI Engineer)", "28 - 55 triệu/tháng", "Huấn luyện, tối ưu và triển khai các mô hình AI vào sản phẩm."],
      ["Thực thi & chuyên môn", "Kỹ sư dữ liệu lớn (Data Engineer)", "22 - 45 triệu/tháng", "Xây dựng đường ống dẫn dữ liệu (Data Pipeline) cho AI."],
      ["Quản lý & chiến lược", "Trưởng bộ phận AI (Head of AI / AI Director)", "50 - 95 triệu/tháng", "Hoạch định chiến lược ứng dụng AI cho doanh nghiệp và tập đoàn."],
    ],
    demand: "Rất cao", growth: 24,
    aliases: ["ttnt", "ai", "tri tue nhan tao", "artificial intelligence", "genai", "deep learning"],
    degree: "Cử nhân / Kỹ sư",
    specializations: [
      { name: "AI Tạo sinh & Mô hình ngôn ngữ lớn (GenAI & LLM)", code: "7480107-01", desc: "Xây dựng ứng dụng AI thế hệ mới dựa trên LLM, RAG và Fine-tuning.", aliases: ["genai", "llm", "rag"] },
      { name: "Robot thông minh & Hệ thống tự hành", code: "7480107-02", desc: "Ứng dụng AI điều khiển robot công nghiệp, máy bay không người lái (drone) và xe tự lái.", aliases: ["robot", "xe tu lai", "drone"] },
      { name: "Xử lý giọng nói & Âm thanh thông minh", code: "7480107-03", desc: "Nhận dạng giọng nói (Speech-to-Text), tổng hợp âm thanh (Text-to-Speech) và trợ lý ảo.", aliases: ["voice ai", "speech"] },
    ],
  },
  {
    slug: "khoa-hoc-du-lieu", code: "7480108", name: "Khoa học dữ liệu", groupId: "cntt", riasec: ["I", "C", "R"],
    summary: "Khai phá dữ liệu lớn, phân tích thống kê và dự báo xu hướng kinh doanh bằng thuật toán.",
    description: "Đào tạo các chuyên gia thu thập, xử lý và mô hình hóa dữ liệu (Big Data) để tìm ra thông tin giá trị giúp doanh nghiệp ra quyết định chiến lược.",
    curriculum: [
      ["Cơ sở ngành", [["Xác suất thống kê ứng dụng", "Suy diễn thống kê, kiểm định giả thuyết và mô hình hồi quy."], ["Lập trình Python & R cho Data Science", "Sử dụng Pandas, NumPy, Scikit-learn, Seaborn phân tích dữ liệu."]]],
      ["Chuyên ngành", [["Khai phá dữ liệu & Big Data (Spark, Hadoop)", "Xử lý dữ liệu lớn theo thời gian thực trên cụm máy chủ."], ["Học máy ứng dụng trong kinh doanh", "Dự báo doanh số, phân nhóm khách hàng, phát hiện gian lận."]]],
    ],
    careers: [
      ["Thực thi & chuyên môn", "Chuyên viên phân tích dữ liệu (Data Analyst)", "16 - 30 triệu/tháng", "Xây dựng báo cáo Dashboard BI, phân tích số liệu kinh doanh."],
      ["Thực thi & chuyên môn", "Nhà khoa học dữ liệu (Data Scientist)", "25 - 50 triệu/tháng", "Xây dựng mô hình toán học và dự báo kinh doanh."],
      ["Quản lý & chiến lược", "Giám đốc dữ liệu (Chief Data Officer - CDO)", "50 - 90 triệu/tháng", "Xây dựng chiến lược dữ liệu toàn diện cho tập đoàn."],
    ],
    demand: "Rất cao", growth: 20,
    aliases: ["khdl", "ds", "data science", "khoa hoc du lieu", "big data", "du lieu lon"],
    degree: "Cử nhân / Kỹ sư",
    specializations: [
      { name: "Phân tích kinh doanh thông minh (Business Intelligence)", code: "7480108-01", desc: "Thiết kế Data Warehouse, mô hình hóa dữ liệu BI với PowerBI, Tableau, Looker.", aliases: ["bi", "powerbi", "tableau", "phan tich kinh doanh"] },
      { name: "Kỹ thuật dữ liệu lớn (Data Engineering)", code: "7480108-02", desc: "Xây dựng ETL/ELT pipelines quy mô lớn trên Hadoop, Spark, Kafka, Snowflake.", aliases: ["data engineer", "etl", "spark", "kafka"] },
    ],
  },
  {
    slug: "an-toan-thong-tin", code: "7480202", name: "An toàn thông tin", groupId: "cntt", riasec: ["I", "C", "R"],
    summary: "Bảo vệ hệ thống mạng, dữ liệu và hạ tầng công nghệ số khỏi các cuộc tấn công mạng.",
    description: "Đào tạo các chuyên gia an ninh mạng có khả năng phòng thủ, phát hiện xâm nhập, điều tra số (Digital Forensics) và kiểm thử xâm nhập (Penetration Testing).",
    curriculum: [
      ["Cơ sở ngành", [["Mạng máy tính & Giao thức bảo mật", "Kiến trúc TCP/IP, VPN, Firewall, mã hóa RSA/AES."], ["Hệ điều hành an toàn (Linux/Windows Kernel)", "Bảo mật nhân hệ điều hành, phân quyền và kiểm toán log."]]],
      ["Chuyên ngành", [["Kiểm thử xâm nhập (Penetration Testing)", "Ethical Hacking, dò quét lỗ hổng ứng dụng web và mạng."], ["Điều tra số học & Ứng cứu sự cố (DFIR)", "Phân tích mã độc, khôi phục bằng chứng số khi bị tấn công."]]],
    ],
    careers: [
      ["Thực thi & chuyên môn", "Chuyên viên kiểm thử thâm nhập (Penetration Tester / SOC)", "18 - 38 triệu/tháng", "Đánh giá an ninh hệ thống và ứng cứu sự cố bảo mật."],
      ["Thực thi & chuyên môn", "Kỹ sư phân tích mã độc (Malware Analyst)", "22 - 45 triệu/tháng", "Dịch ngược mã độc và đưa ra phương án phòng chống."],
      ["Quản lý & chiến lược", "Giám đốc an toàn thông tin (CISO)", "50 - 100 triệu/tháng", "Xây dựng chính sách và hệ thống phòng thủ số toàn diện."],
    ],
    demand: "Rất cao", growth: 19,
    aliases: ["attt", "cyber security", "an toan thong tin", "bao mat", "security", "an ninh mang"],
    degree: "Kỹ sư",
    specializations: [
      { name: "Kiểm thử bảo mật ứng dụng & Hệ thống (PenTest)", code: "7480202-01", desc: "Phát hiện lỗ hổng phần mềm, ứng dụng web, mobile và API (OWASP Top 10).", aliases: ["pentest", "ethical hacker", "red team"] },
      { name: "Giám sát & Ứng cứu sự cố an ninh mạng (SOC)", code: "7480202-02", desc: "Vận hành hệ thống SIEM, phân tích cảnh báo bảo mật và ngăn chặn tấn công thời gian thực.", aliases: ["soc", "blue team", "siem"] },
    ],
  },
  {
    slug: "he-thong-thong-tin", code: "7480104", name: "Hệ thống thông tin quản lý", groupId: "cntt", riasec: ["C", "I", "E"],
    summary: "Cầu nối giữa công nghệ và nghiệp vụ kinh doanh, thiết kế giải pháp số cho doanh nghiệp.",
    description: "Đào tạo các chuyên viên phân tích nghiệp vụ (BA), phân tích hệ thống và triển khai các hệ thống số hóa quy trình quản trị doanh nghiệp.",
    curriculum: [
      ["Cơ sở ngành", [["Cơ sở dữ liệu & Truy vấn SQL nâng cao", "Mô hình ERD, chuẩn hóa dữ liệu, tối ưu câu truy vấn."], ["Kinh tế học & Quản trị học cơ bản", "Hiểu các quy trình kế toán, kho bãi, bán hàng, nhân sự."]]],
      ["Chuyên ngành", [["Phân tích nghiệp vụ (Business Analysis - BA)", "Thu thập yêu cầu, viết User Stories, vẽ sơ đồ BPMN."], ["Hệ thống hoạch định tài nguyên (ERP & CRM)", "Triển khai hệ thống SAP, Salesforce, Microsoft Dynamics."]]],
    ],
    careers: [
      ["Thực thi & chuyên môn", "Chuyên viên phân tích nghiệp vụ (Business Analyst - BA)", "16 - 32 triệu/tháng", "Khảo sát và chuyển hóa nhu cầu kinh doanh thành thiết kế phần mềm."],
      ["Thực thi & chuyên môn", "Chuyên viên tư vấn triển khai ERP/CRM", "18 - 35 triệu/tháng", "Cấu hình và hướng dẫn vận hành hệ thống số cho doanh nghiệp."],
      ["Quản lý & chiến lược", "Giám đốc chuyển đổi số (Chief Digital Officer)", "45 - 85 triệu/tháng", "Dẫn dắt lộ trình số hóa và tự động hóa hoạt động doanh nghiệp."],
    ],
    demand: "Cao", growth: 14,
    aliases: ["httt", "mis", "he thong thong tin", "he thong thong tin quan ly", "ba", "business analyst"],
    degree: "Cử nhân / Kỹ sư",
    specializations: [
      { name: "Phân tích nghiệp vụ phần mềm (Business Analysis)", code: "7480104-01", desc: "Thu thập yêu cầu khách hàng, viết tài liệu BRD/SRS, kết nối giữa Dev và khách hàng.", aliases: ["ba", "business analysis"] },
      { name: "Chuyển đổi số & Quản trị dữ liệu doanh nghiệp", code: "7480104-02", desc: "Tối ưu hóa quy trình nghiệp vụ số và chuẩn hóa luồng dữ liệu liên phòng ban.", aliases: ["chuyen doi so", "data governance"] },
    ],
  },

  // ==================== 2. KINH TẾ – QUẢN TRỊ – TÀI CHÍNH (kinh-te) ====================
  {
    slug: "quan-tri-kinh-doanh", code: "7340101", name: "Quản trị kinh doanh", groupId: "kinh-te", riasec: ["E", "S", "C"],
    summary: "Bao quát cách vận hành một tổ chức: từ chiến lược, nhân sự, tiếp thị đến tài chính.",
    description: "Trang bị tư duy lãnh đạo, kỹ năng giải quyết vấn đề và năng lực điều hành doanh nghiệp trong môi trường cạnh tranh toàn cầu.",
    curriculum: [
      ["Cơ sở ngành", [["Kinh tế vi mô & vĩ mô", "Hiểu cung – cầu thị trường và các chỉ số kinh tế vĩ mô."], ["Nguyên lý quản trị", "Bốn chức năng cốt lõi: Hoạch định, Tổ chức, Lãnh đạo, Kiểm tra."]]],
      ["Chuyên ngành", [["Quản trị chiến lược", "Phân tích ma trận SWOT, định vị cạnh tranh và chiến lược tăng trưởng."], ["Quản trị nguồn nhân lực", "Tuyển dụng, đánh giá hiệu suất KPI, đãi ngộ và văn hóa công ty."]]],
    ],
    careers: [
      ["Thực thi & chuyên môn", "Chuyên viên phát triển kinh doanh (Business Development)", "12 - 25 triệu/tháng", "Tìm kiếm khách hàng B2B, đàm phán hợp đồng thương mại."],
      ["Quản lý & chiến lược", "Quản lý vận hành (Operations Manager)", "25 - 50 triệu/tháng", "Điều hành quy trình sản xuất kinh doanh hàng ngày."],
      ["Quản lý & chiến lược", "Giám đốc điều hành (CEO / General Manager)", "40 - 100+ triệu/tháng", "Chịu trách nhiệm về toàn bộ kết quả kinh doanh và chiến lược dài hạn."],
    ],
    demand: "Cao", growth: 12,
    aliases: ["qtkd", "ba", "business administration", "quan tri kinh doanh", "quan tri"],
    degree: "Cử nhân",
    specializations: [
      { name: "Quản trị Khởi nghiệp & Đổi mới sáng tạo", code: "7340101-01", desc: "Xây dựng mô hình kinh doanh Canvas, gọi vốn đầu tư và ươm tạo doanh nghiệp khởi nghiệp.", aliases: ["khoi nghiep", "startup", "innovation"] },
      { name: "Quản trị Vận hành & Chuỗi giá trị", code: "7340101-02", desc: "Tối ưu hóa chi phí sản xuất, năng suất lao động và tinh gọn quy trình Lean Six Sigma.", aliases: ["operations", "lean", "van hanh"] },
    ],
  },
  {
    slug: "marketing", code: "7340115", name: "Marketing", groupId: "kinh-te", riasec: ["E", "A", "S"],
    summary: "Nghiên cứu thị trường, thấu hiểu khách hàng và xây dựng chiến dịch truyền thông quảng bá.",
    description: "Đào tạo các nhà tiếp thị hiện đại kết hợp giữa thấu hiểu tâm lý người tiêu dùng, sáng tạo nội dung và đo lường hiệu quả bằng dữ liệu.",
    curriculum: [
      ["Cơ sở ngành", [["Hành vi người tiêu dùng", "Tâm lý học quyết định mua sắm, hành trình khách hàng."], ["Nghiên cứu thị trường", "Khảo sát định tính, định lượng, phân tích đối thủ cạnh tranh."]]],
      ["Chuyên ngành", [["Digital Marketing & Performance", "Chạy quảng cáo Facebook/Google/TikTok Ads, SEO, Content Marketing."], ["Quản trị thương hiệu (Brand Management)", "Định vị thương hiệu, câu chuyện thương hiệu và kiến trúc sản phẩm."]]],
    ],
    careers: [
      ["Thực thi & chuyên môn", "Chuyên viên Digital Marketing / Performance", "12 - 25 triệu/tháng", "Lên kế hoạch và tối ưu chiến dịch quảng cáo đa kênh."],
      ["Thực thi & chuyên môn", "Quản lý nhãn hàng (Brand Executive / Manager)", "20 - 45 triệu/tháng", "Phụ trách hình ảnh và tăng trưởng doanh thu của dòng sản phẩm."],
      ["Quản lý & chiến lược", "Giám đốc Tiếp thị (Chief Marketing Officer - CMO)", "40 - 80+ triệu/tháng", "Xây dựng chiến lược thương hiệu và tăng trưởng thị phần."],
    ],
    demand: "Rất cao", growth: 17,
    aliases: ["mkt", "marketing", "tiep thi", "digital marketing", "truyen thong marketing"],
    degree: "Cử nhân",
    specializations: [
      { name: "Digital Marketing & Tăng trưởng số (Growth)", code: "7340115-01", desc: "SEO, SEM, Tiếp thị tự động hóa (Marketing Automation) và tối ưu tỷ lệ chuyển đổi (CRO).", aliases: ["digital", "growth", "seo", "ads"] },
      { name: "Quản trị Thương hiệu & Truyền thông tích hợp (IMC)", code: "7340115-02", desc: "Hoạch định chiến dịch truyền thông đa phương tiện 360 độ và quản trị trải nghiệm nhãn hàng.", aliases: ["brand", "imc", "thuong hieu"] },
    ],
  },
  {
    slug: "kinh-doanh-quoc-te", code: "7340120", name: "Kinh doanh quốc tế", groupId: "kinh-te", riasec: ["E", "S", "C"],
    summary: "Thương mại xuyên biên giới, xuất nhập khẩu, thanh toán quốc tế và chuỗi cung ứng toàn cầu.",
    description: "Trang bị kiến thức về luật thương mại quốc tế, đàm phán hợp đồng ngoại thương, thủ tục hải quan và chiến lược thâm nhập thị trường nước ngoài.",
    curriculum: [
      ["Cơ sở ngành", [["Kinh tế quốc tế & Đầu tư FDI", "Luật chơi thương mại tự do WTO, EVFTA, CPTPP và luồng vốn đầu tư."], ["Giao tiếp & Đàm phán liên văn hóa", "Kỹ năng làm việc với đối tác đa quốc gia Mỹ, Châu Âu, Nhật Bản."]]],
      ["Chuyên ngành", [["Nghiệp vụ Xuất nhập khẩu (Incoterms)", "Soạn thảo hợp đồng ngoại thương, vận đơn Bill of Lading, L/C."], ["Thanh toán quốc tế & Quản trị rủi ro tỷ giá", "Phương thức thanh toán qua ngân hàng quốc tế, bảo hiểm hàng hải."]]],
    ],
    careers: [
      ["Thực thi & chuyên môn", "Chuyên viên Xuất Nhập Khẩu (Import-Export Specialist)", "14 - 28 triệu/tháng", "Xử lý thủ tục hải quan, chứng từ vận tải quốc tế."],
      ["Thực thi & chuyên môn", "Chuyên viên mua hàng toàn cầu (Global Sourcing / Buyer)", "18 - 35 triệu/tháng", "Tìm kiếm nhà cung ứng nước ngoài và đàm phán giá cả."],
      ["Quản lý & chiến lược", "Giám đốc phát triển kinh doanh quốc tế", "40 - 90 triệu/tháng", "Mở rộng thị trường xuất khẩu và thiết lập văn phòng đại diện."],
    ],
    demand: "Cao", growth: 15,
    aliases: ["kdqt", "ib", "international business", "kinh doanh quoc te"],
    degree: "Cử nhân",
    specializations: [
      { name: "Ngoại thương & Thương mại quốc tế", code: "7340120-01", desc: "Nghiệp vụ hải quan điện tử, chứng chỉ xuất xứ (C/O), đàm phán thương mại toàn cầu.", aliases: ["ngoai thuong", "xuat nhap khau", "hai quan"] },
      { name: "Đầu tư quốc tế & Chuỗi giá trị toàn cầu (GVC)", code: "7340120-02", desc: "Chiến lược M&A xuyên quốc gia, quản trị rủi ro chính trị và chuỗi giá trị đa quốc gia.", aliases: ["fdi", "gvc", "dau tu"] },
    ],
  },
  {
    slug: "thuong-mai-dien-tu", code: "7340122", name: "Thương mại điện tử", groupId: "kinh-te", riasec: ["E", "C", "I"],
    summary: "Xây dựng và vận hành sàn thương mại điện tử, bán lẻ đa kênh Omni-channel và thanh toán số.",
    description: "Kết hợp giữa tư duy kinh doanh và công nghệ internet để bán lẻ trực tuyến trên Shopee, TikTok Shop, Amazon và các nền tảng riêng.",
    curriculum: [
      ["Cơ sở ngành", [["Tổng quan thương mại điện tử", "Các mô hình B2B, B2C, D2C, C2C và hệ sinh thái số."], ["Hạ tầng công nghệ web & thanh toán", "Cổng thanh toán điện tử, ví điện tử, bảo mật giao dịch trực tuyến."]]],
      ["Chuyên ngành", [["Vận hành gian hàng E-commerce (Shopee, TikTok)", "Livestream bán hàng, tối ưu thuật toán tìm kiếm sàn, quản lý tồn kho."], ["Phân tích dữ liệu người mua & CRM số", "Đo lường chỉ số CAC, LTV, ROAS, tỷ lệ rời bỏ giỏ hàng."]]],
    ],
    careers: [
      ["Thực thi & chuyên môn", "Chuyên viên vận hành sàn TMĐT (E-commerce Executive)", "12 - 25 triệu/tháng", "Quản lý gian hàng Shopee, TikTok Shop, tối ưu traffic và đơn hàng."],
      ["Thực thi & chuyên môn", "Chuyên viên phân tích dữ liệu E-commerce", "16 - 32 triệu/tháng", "Phân tích xu hướng tiêu dùng trực tuyến và hành vi giỏ hàng."],
      ["Quản lý & chiến lược", "Giám đốc sàn / Giám đốc E-commerce", "35 - 75 triệu/tháng", "Phụ trách toàn bộ kênh doanh thu trực tuyến của doanh nghiệp."],
    ],
    demand: "Rất cao", growth: 22,
    aliases: ["tmdt", "ecommerce", "thuong mai dien tu", "e-commerce", "shopee", "tiktok shop"],
    degree: "Cử nhân",
    specializations: [
      { name: "Vận hành Sàn TMĐT & Bán lẻ đa kênh (Omni-channel)", code: "7340122-01", desc: "Quản trị gian hàng Shopee Mall, LazMall, TikTok Shop và tích hợp chuỗi cửa hàng vật lý.", aliases: ["san", "omnichannel", "shopee", "tiktok"] },
      { name: "Thương mại điện tử xuyên biên giới (Cross-border E-com)", code: "7340122-02", desc: "Bán hàng ra thế giới qua Amazon FBA, Shopify, eBay và thanh toán quốc tế.", aliases: ["amazon", "shopify", "xuyen bien gioi"] },
    ],
  },
  {
    slug: "logistics-quan-ly-chuoi-cung-ung", code: "7510605", name: "Logistics và Quản lý chuỗi cung ứng", groupId: "kinh-te", riasec: ["C", "R", "E"],
    summary: "Tổ chức dòng lưu chuyển hàng hóa, kho bãi thông minh, vận tải đa phương thức và tối ưu chi phí.",
    description: "Đào tạo các nhà quản lý chuỗi cung ứng đảm bảo hàng hóa được vận chuyển từ nơi sản xuất đến tay người tiêu dùng nhanh nhất với chi phí thấp nhất.",
    curriculum: [
      ["Cơ sở ngành", [["Hệ thống vận tải và giao nhận hàng hóa", "Vận tải đường biển, đường hàng không, đường bộ và đường sắt."], ["Quản trị kho bãi & Hàng tồn kho", "Thiết kế kho thông minh (Automated Warehouse), phương pháp FIFO/LIFO."]]],
      ["Chuyên ngành", [["Hoạch định chuỗi cung ứng (Supply Chain Planning)", "Dự báo nhu cầu, cân đối năng lực sản xuất và lượng đặt hàng kinh tế (EOQ)."], ["Logistics xanh & Tối ưu chi phí bằng dữ liệu", "Giảm phát thải Carbon trong vận tải, ứng dụng GPS và AI điều phối xe."]]],
    ],
    careers: [
      ["Thực thi & chuyên môn", "Chuyên viên điều phối Logistics / Giao nhận (Forwarder)", "12 - 25 triệu/tháng", "Sắp xếp lịch trình tàu biển, máy bay và giải phóng hàng hóa tại cảng."],
      ["Thực thi & chuyên môn", "Chuyên viên quản lý kho thông minh (Warehouse Supervisor)", "15 - 28 triệu/tháng", "Vận hành hệ thống WMS và quản lý đội ngũ kho vận."],
      ["Quản lý & chiến lược", "Giám đốc Chuỗi cung ứng (Supply Chain Director)", "45 - 90+ triệu/tháng", "Hoạch định mạng lưới cung ứng toàn cầu cho tập đoàn."],
    ],
    demand: "Rất cao", growth: 18,
    aliases: ["logistics", "scm", "chuoi cung ung", "kho van", "xuat nhap khau", "van tai"],
    degree: "Cử nhân / Kỹ sư",
    specializations: [
      { name: "Quản trị Vận tải biển & Cảng biển quốc tế", code: "7510605-01", desc: "Khai thác cảng container, đại lý tàu biển, thuê tàu chuyến và tàu định tuyến.", aliases: ["cang bien", "van tai bien", "hang hai"] },
      { name: "Kho bãi thông minh & Tự động hóa Logistics", code: "7510605-02", desc: "Ứng dụng robot AGV, hệ thống quản lý kho WMS/TMS và phân loại hàng tự động.", aliases: ["kho thong minh", "agv", "wms", "tms"] },
    ],
  },
  {
    slug: "tai-chinh-ngan-hang", code: "7340201", name: "Tài chính – Ngân hàng", groupId: "kinh-te", riasec: ["C", "E", "I"],
    summary: "Quản trị dòng tiền, định giá tài sản, phân tích đầu tư chứng khoán và vận hành ngân hàng thương mại.",
    description: "Đào tạo các chuyên gia tài chính ngân hàng có khả năng phân tích báo cáo tài chính, quản trị rủi ro tín dụng và ứng dụng công nghệ tài chính (Fintech).",
    curriculum: [
      ["Cơ sở ngành", [["Tài chính tiền tệ & Thị trường tài chính", "Cơ chế lãi suất, chính sách tiền tệ của Ngân hàng Nhà nước, thị trường cổ phiếu, trái phiếu."], ["Thị trường chứng khoán & Định giá doanh nghiệp", "Phân tích cơ bản (DCF, P/E), phân tích kỹ thuật đồ thị nến."]]],
      ["Chuyên ngành", [["Nghiệp vụ Ngân hàng thương mại", "Thẩm định hồ sơ vay vốn, bảo lãnh ngân hàng, quản trị rủi ro thanh khoản."], ["Công nghệ tài chính (Fintech) & Ngân hàng số", "Thanh toán không tiền mặt, ví điện tử, Open Banking API, AI chấm điểm tín dụng."]]],
    ],
    careers: [
      ["Thực thi & chuyên môn", "Chuyên viên quan hệ khách hàng cá nhân/doanh nghiệp (RM)", "14 - 30 triệu/tháng", "Tư vấn gói vay vốn, mở thẻ tín dụng và dịch vụ tài khoản."],
      ["Thực thi & chuyên môn", "Chuyên viên phân tích đầu tư chứng khoán (Equity Analyst)", "18 - 40 triệu/tháng", "Viết báo cáo định giá cổ phiếu, khuyến nghị đầu tư cho quỹ."],
      ["Quản lý & chiến lược", "Giám đốc khối nguồn vốn / Chi nhánh Ngân hàng", "40 - 85 triệu/tháng", "Điều hành hoạt động tín dụng và quản trị rủi ro thanh khoản."],
    ],
    demand: "Cao", growth: 13,
    aliases: ["tcnh", "tai chinh ngan hang", "finance", "banking", "tai chinh", "ngan hang", "chung khoan"],
    degree: "Cử nhân",
    specializations: [
      { name: "Công nghệ tài chính (Fintech) & Ngân hàng số", code: "7340201-01", desc: "Ứng dụng blockchain, ví điện tử, AI thẩm định tín dụng tự động và ngân hàng số.", aliases: ["fintech", "ngan hang so", "digital banking"] },
      { name: "Đầu tư tài chính & Quản lý danh mục (Wealth Management)", code: "7340201-02", desc: "Tư vấn quản lý gia sản, đầu tư quỹ mở, trái phiếu doanh nghiệp và thị trường phái sinh.", aliases: ["dau tu", "chungkhoan", "wealth"] },
    ],
  },
  {
    slug: "ke-toan", code: "7340301", name: "Kế toán", groupId: "kinh-te", riasec: ["C", "I", "E"],
    summary: "Ghi chép, xử lý, lập báo cáo tài chính và quyết toán thuế theo chuẩn mực kế toán Việt Nam & quốc tế.",
    description: "Ngành học nền tảng cho mọi tổ chức doanh nghiệp. Đào tạo kế toán viên thành thạo phần mềm kế toán MISA, FAST, SAP và chứng chỉ quốc tế ACCA, CPA.",
    curriculum: [
      ["Cơ sở ngành", [["Nguyên lý kế toán & Kế toán tài chính 1-2", "Hạch toán các nghiệp vụ kinh tế phát sinh, lập bảng cân đối kế toán, báo cáo lưu chuyển tiền tệ."], ["Kế toán quản trị & Phân tích chi phí", "Tính giá thành sản phẩm, lập dự toán ngân sách hoạt động."]]],
      ["Chuyên ngành", [["Thuế & Báo cáo quyết toán thuế", "Thuế GTGT, TNDN, TNCN, hóa đơn điện tử và thanh tra thuế."], ["Kế toán trên phần mềm ERP & Chuẩn mực IFRS", "Sử dụng phần mềm kế toán hiện đại và áp dụng chuẩn IFRS quốc tế."]]],
    ],
    careers: [
      ["Thực thi & chuyên môn", "Kế toán tổng hợp / Kế toán thuế", "12 - 25 triệu/tháng", "Kiểm tra chứng từ, kê khai thuế và lập báo cáo tài chính định kỳ."],
      ["Thực thi & chuyên môn", "Kế toán trưởng (Chief Accountant)", "25 - 45 triệu/tháng", "Chịu trách nhiệm về tính chính xác của sổ sách và quyết toán với cơ quan thuế."],
      ["Quản lý & chiến lược", "Giám đốc tài chính (CFO)", "40 - 85+ triệu/tháng", "Hoạch định chiến lược vốn, tối ưu dòng tiền và cấu trúc tài chính."],
    ],
    demand: "Cao", growth: 10,
    aliases: ["kt", "ke toan", "kế toán", "ke toan kiem toan", "kiem toan", "accounting", "ketoan"],
    degree: "Cử nhân",
    specializations: [
      { name: "Kế toán doanh nghiệp & Chuẩn mực IFRS", code: "7340301-01", desc: "Chuyển đổi báo cáo tài chính từ VAS sang IFRS, phục vụ công ty niêm yết và FDI.", aliases: ["ifrs", "vas", "doanh nghiep"] },
      { name: "Tư vấn & Hoạch định thuế doanh nghiệp", code: "7340301-02", desc: "Chiến lược tối ưu chi phí thuế hợp pháp, chuyển giá và giải trình kiểm toán thuế.", aliases: ["thue", "tax", "tu van thue"] },
    ],
  },
  {
    slug: "kiem-toan", code: "7340302", name: "Kiểm toán", groupId: "kinh-te", riasec: ["C", "I", "E"],
    summary: "Xác minh tính trung thực và hợp lý của báo cáo tài chính, kiểm soát nội bộ và chống gian lận.",
    description: "Đào tạo các kiểm toán viên làm việc tại các hãng kiểm toán lớn Big 4 (PwC, Deloitte, EY, KPMG) và kiểm toán nội bộ doanh nghiệp.",
    curriculum: [
      ["Cơ sở ngành", [["Kiểm toán căn bản & Chuẩn mực kiểm toán VSA", "Quy trình kiểm toán, bằng chứng kiểm toán, rủi ro kiểm toán và tính trọng yếu."], ["Kế toán tài chính nâng cao", "Xử lý các giao dịch phức tạp, hợp nhất báo cáo tài chính tập đoàn."]]],
      ["Chuyên ngành", [["Kiểm toán báo cáo tài chính", "Thực hiện các thử nghiệm kiểm soát và thử nghiệm cơ bản cho từng khoản mục."], ["Kiểm toán nội bộ & Soát xét gian lận", "Đánh giá hệ thống kiểm soát nội bộ COSO, phát hiện rủi ro biển thủ."]]],
    ],
    careers: [
      ["Thực thi & chuyên môn", "Trợ lý kiểm toán viên (Audit Associate)", "12 - 22 triệu/tháng", "Thu thập bằng chứng kiểm toán và kiểm tra sổ sách tại hiện trường."],
      ["Thực thi & chuyên môn", "Trưởng nhóm kiểm toán (Senior Auditor / Audit Manager)", "25 - 50 triệu/tháng", "Điều hành cuộc kiểm toán và phát hành báo cáo kiểm toán độc lập."],
      ["Quản lý & chiến lược", "Giám đốc kiểm toán nội bộ (Head of Internal Audit)", "40 - 80 triệu/tháng", "Bảo vệ tài sản và giám sát tuân thủ cho hội đồng quản trị."],
    ],
    demand: "Cao", growth: 12,
    aliases: ["kt", "kiem toan", "audit", "auditing", "big4", "kiem toan vien"],
    degree: "Cử nhân",
    specializations: [
      { name: "Kiểm toán độc lập (Big 4 & External Audit)", code: "7340302-01", desc: "Quy trình kiểm toán báo cáo tài chính quốc tế theo chuẩn ISA, chứng chỉ ACCA/CPA.", aliases: ["big4", "external audit", "doc lap"] },
      { name: "Kiểm toán nội bộ & Quản trị rủi ro doanh nghiệp", code: "7340302-02", desc: "Đánh giá tuân thủ quy trình, kiểm soát gian lận và tư vấn rủi ro vận hành.", aliases: ["internal audit", "noi bo", "rui ro"] },
    ],
  },
  {
    slug: "kinh-doanh-thuong-mai", code: "7340121", name: "Kinh doanh thương mại", groupId: "kinh-te", riasec: ["E", "C", "S"],
    summary: "Tổ chức mạng lưới phân phối bán buôn, bán lẻ, xúc tiến thương mại và quản trị ngành hàng.",
    description: "Đào tạo các chuyên gia quản lý kênh phân phối (GT/MT), chuỗi siêu thị, đàm phán hợp đồng mua bán hàng hóa và phát triển thị trường tiêu dùng nhanh (FMCG).",
    curriculum: [
      ["Cơ sở ngành", [["Nghiệp vụ kinh doanh thương mại", "Nghiệp vụ mua bán hàng hóa, hợp đồng thương mại, quản trị ngành hàng."], ["Kinh tế thương mại", "Cung cầu thị trường bán lẻ, chuỗi cung ứng hàng tiêu dùng nhanh FMCG."]]],
      ["Chuyên ngành", [["Quản trị kênh phân phối (Trade Marketing)", "Chiến lược trưng bày sản phẩm, khuyến mãi tại điểm bán POSM."], ["Quản trị chuỗi cửa hàng bán lẻ", "Mở rộng điểm bán, quản lý doanh số cửa hàng và dịch vụ khách hàng."]]],
    ],
    careers: [
      ["Thực thi & chuyên môn", "Chuyên viên Trade Marketing", "12 - 25 triệu/tháng", "Tổ chức sự kiện khuyến mãi tại điểm bán siêu thị và đại lý."],
      ["Thực thi & chuyên môn", "Quản lý ngành hàng (Category Executive)", "15 - 30 triệu/tháng", "Lựa chọn danh mục sản phẩm và thương lượng chiết khấu với nhà cung ứng."],
      ["Quản lý & chiến lược", "Giám đốc kinh doanh vùng (Regional Sales Manager)", "30 - 65 triệu/tháng", "Phụ trách doanh số toàn bộ hệ thống đại lý một khu vực."],
    ],
    demand: "Trung bình", growth: 10,
    aliases: ["kdtm", "thuong mai", "kinh doanh", "trade marketing", "fmcg"],
    degree: "Cử nhân",
    specializations: [
      { name: "Quản trị Bán lẻ & Chuỗi cửa hàng", code: "7340121-01", desc: "Vận hành chuỗi cửa hàng tiện lợi, siêu thị mini và tối ưu doanh thu trên mét vuông sàn.", aliases: ["ban le", "retail", "sieu thi"] },
      { name: "Trade Marketing & Quản trị ngành hàng", code: "7340121-02", desc: "Thiết kế chính sách giá cho nhà phân phối, chiến dịch kích hoạt thương hiệu tại điểm bán.", aliases: ["trade", "nganh hang", "category"] },
    ],
  },
  {
    slug: "bao-hiem", code: "7340203", name: "Bảo hiểm", groupId: "kinh-te", riasec: ["C", "E", "S"],
    summary: "Định phí bảo hiểm, thẩm định rủi ro, bồi thường thiệt hại và tư vấn giải pháp an toàn tài chính.",
    description: "Đào tạo các chuyên gia định phí bảo hiểm (Actuary), thẩm định viên bồi thường và quản lý kinh doanh bảo hiểm nhân thọ, phi nhân thọ.",
    curriculum: [
      ["Cơ sở ngành", [["Lý thuyết xác suất & Thống kê bảo hiểm", "Bảng tỷ lệ tử vong, xác suất rủi ro tai nạn, cháy nổ, bệnh tật."], ["Kinh tế bảo hiểm & Luật kinh doanh bảo hiểm", "Hợp đồng bảo hiểm, quyền lợi và nghĩa vụ các bên tham gia."]]],
      ["Chuyên ngành", [["Định phí bảo hiểm (Actuarial Science)", "Tính toán phí bảo hiểm thuần, phí phụ và trích lập quỹ dự phòng nghiệp vụ."], ["Thẩm định & Bồi thường bảo hiểm", "Quy trình giám định tổn thất hiện trường và giải quyết quyền lợi bồi thường."]]],
    ],
    careers: [
      ["Thực thi & chuyên môn", "Chuyên viên thẩm định bồi thường (Claims Specialist)", "12 - 24 triệu/tháng", "Giám định tổn thất xe cơ giới, sức khỏe, tài sản và phê duyệt chi trả."],
      ["Thực thi & chuyên môn", "Chuyên viên định phí bảo hiểm (Actuary)", "25 - 60 triệu/tháng", "Thiết kế sản phẩm bảo hiểm mới và tính toán mức phí tối ưu."],
      ["Quản lý & chiến lược", "Giám đốc kinh doanh bảo hiểm khu vực", "35 - 80 triệu/tháng", "Phát triển đội ngũ đại lý và kênh phân phối qua ngân hàng (Bancassurance)."],
    ],
    demand: "Trung bình", growth: 11,
    aliases: ["bh", "bao hiem", "insurance", "actuary", "dinh phi"],
    degree: "Cử nhân",
    specializations: [
      { name: "Định phí bảo hiểm & Khoa học tính toán (Actuarial Science)", code: "7340203-01", desc: "Mô hình hóa rủi ro toán học, thi lấy chứng chỉ Actuary quốc tế (SOA/IFoA).", aliases: ["actuary", "dinh phi", "soa"] },
      { name: "Bảo hiểm phi nhân thọ & Tái bảo hiểm hàng hải", code: "7340203-02", desc: "Bảo hiểm tài sản công trình xây dựng, tàu biển, hàng hóa xuất nhập khẩu và hàng không.", aliases: ["phi nhan tho", "hang hai", "tai bao hiem"] },
    ],
  },
  {
    slug: "quan-tri-du-lich", code: "7810103", name: "Quản trị dịch vụ du lịch và lữ hành", groupId: "kinh-te", riasec: ["E", "S", "A"],
    summary: "Thiết kế tour, điều hành hướng dẫn viên, quản lý chuỗi khách sạn – resort và sự kiện hội nghị (MICE).",
    description: "Đào tạo các nhà quản lý dịch vụ hiếu khách (Hospitality), điều hành tour du lịch trong nước & quốc tế với kỹ năng giao tiếp và ngoại ngữ lưu loát.",
    curriculum: [
      ["Cơ sở ngành", [["Địa lý du lịch & Tuyến điểm Việt Nam", "Đặc trưng văn hóa, ẩm thực, danh lam thắng cảnh các vùng miền."], ["Tâm lý khách du lịch & Giao tiếp quốc tế", "Nghệ thuật ứng xử với khách Âu, Á và giải quyết phàn nàn."]]],
      ["Chuyên ngành", [["Thiết kế & Điều hành tour du lịch lữ hành", "Xây dựng lịch trình tour, tính giá vốn, liên hệ nhà xe, khách sạn, nhà hàng."], ["Quản trị Khách sạn – Resort & Sự kiện MICE", "Quy trình tiền sảnh (Front Office), buồng phòng, ẩm thực F&B và tổ chức tiệc cưới, hội nghị."]]],
    ],
    careers: [
      ["Thực thi & chuyên môn", "Hướng dẫn viên du lịch quốc tế / Nội địa", "15 - 35 triệu/tháng", "Dẫn đoàn tham quan, thuyết minh văn hóa lịch sử và chăm sóc khách."],
      ["Thực thi & chuyên môn", "Chuyên viên điều hành tour (Tour Operator)", "12 - 25 triệu/tháng", "Lên kế hoạch và điều phối phương tiện, dịch vụ cho các đoàn khách."],
      ["Quản lý & chiến lược", "Giám đốc Khách sạn / Điều hành công ty lữ hành", "30 - 70 triệu/tháng", "Quản lý toàn diện chất lượng dịch vụ và doanh thu chuỗi lưu trú."],
    ],
    demand: "Cao", growth: 16,
    aliases: ["qtdl", "du lich", "quan tri du lich", "tourism", "khach san", "nha hang", "hospitality", "huong dan vien"],
    degree: "Cử nhân",
    specializations: [
      { name: "Quản trị Khách sạn & Nghỉ dưỡng cao cấp", code: "7810103-01", desc: "Tiêu chuẩn dịch vụ 5 sao quốc tế, quản lý tiền sảnh, ẩm thực F&B và buồng phòng.", aliases: ["khach san", "resort", "hotel"] },
      { name: "Thiết kế Tour & Du lịch hội nghị sự kiện (MICE)", code: "7810103-02", desc: "Tổ chức các sự kiện hội nghị kết hợp nghỉ dưỡng, team building quy mô hàng nghìn khách.", aliases: ["tour", "mice", "teambuilding"] },
    ],
  },

  // ==================== 3. KỸ THUẬT – CÔNG NGHỆ – XÂY DỰNG (ky-thuat) ====================
  {
    slug: "ky-thuat-dien", code: "7520201", name: "Kỹ thuật Điện – Điện tử", groupId: "ky-thuat", riasec: ["R", "I", "C"],
    summary: "Hệ thống truyền tải điện năng, trạm biến áp, máy điện và mạch điện tử công suất lớn.",
    description: "Đào tạo các kỹ sư thiết kế mạng lưới điện quốc gia, năng lượng tái tạo (điện gió, điện mặt trời) và các hệ thống điều khiển điện tử công nghiệp.",
    curriculum: [
      ["Cơ sở ngành", [["Mạch điện & Kỹ thuật điện tử tương tự/số", "Định luật Ohm, Kirchhoff, mạch khuếch đại transistor, vi điều khiển."], ["Trường điện từ & Khí cụ điện", "Nguyên lý máy biến áp, động cơ điện 3 pha và thiết bị đóng cắt bảo vệ."]]],
      ["Chuyên ngành", [["Hệ thống điện & Năng lượng tái tạo", "Mô phỏng trạm biến áp, điện áp cao thế, điện mặt trời áp mái, pin tích năng."], ["Điện tử công suất & Truyền động điện", "Biến tần, mạch chỉnh lưu công suất và điều khiển tốc độ động cơ."]]],
    ],
    careers: [
      ["Thực thi & chuyên môn", "Kỹ sư thiết kế hệ thống điện tòa nhà / Nhà máy (M&E)", "14 - 28 triệu/tháng", "Vẽ bản vẽ điện AutoCAD/Revit, tính toán phụ tải và chọn cáp điện."],
      ["Thực thi & chuyên môn", "Kỹ sư vận hành trạm biến áp / Nhà máy điện", "16 - 32 triệu/tháng", "Giám sát lưới điện SCADA và xử lý sự cố truyền tải điện."],
      ["Quản lý & chiến lược", "Chỉ huy trưởng cơ điện (M&E Project Manager)", "35 - 70 triệu/tháng", "Chịu trách nhiệm thi công hệ thống cơ điện cho dự án cao ốc, khu đô thị."],
    ],
    demand: "Cao", growth: 14,
    aliases: ["ktd", "dien dien tu", "ky thuat dien", "electrical engineering", "dien", "me"],
    degree: "Kỹ sư",
    specializations: [
      { name: "Hệ thống điện & Lưới điện thông minh (Smart Grid)", code: "7520201-01", desc: "Vận hành điều độ lưới điện quốc gia, tự động hóa trạm biến áp không người trực.", aliases: ["smart grid", "luoi dien", "he thong dien"] },
      { name: "Năng lượng tái tạo & Xe điện (EV Powertrain)", code: "7520201-02", desc: "Hệ thống lưu trữ pin Lithium-ion, trạm sạc xe điện nhanh và năng lượng gió/mặt trời.", aliases: ["pin", "xe dien", "nang luong tai tao"] },
    ],
  },
  {
    slug: "ky-thuat-co-khi", code: "7520103", name: "Kỹ thuật Cơ khí", groupId: "ky-thuat", riasec: ["R", "I", "C"],
    summary: "Thiết kế máy móc, gia công cơ khí chính xác CNC, chế tạo thiết bị công nghiệp và khuôn mẫu.",
    description: "Đào tạo các kỹ sư cơ khí thành thạo phần mềm thiết kế 3D SolidWorks, NX, Mastercam và vận hành máy công cụ CNC hiện đại.",
    curriculum: [
      ["Cơ sở ngành", [["Vẽ kỹ thuật & Mô hình hóa 3D (CAD)", "Đọc hiểu bản vẽ cơ khí, mô hình hóa chi tiết máy trên SolidWorks/Inventor."], ["Sức bền vật liệu & Nguyên lý máy", "Tính toán chịu tải, ứng suất, độ võng của dầm, trục, bánh răng."]]],
      ["Chuyên ngành", [["Công nghệ gia công cắt gọt CNC (CAM)", "Lập trình mã G-code cho máy tiện, phay CNC 3-5 trục."], ["Thiết kế khuôn mẫu & Chế tạo máy", "Khuôn ép nhựa, khuôn dập kim loại và dây chuyền lắp ráp tự động."]]],
    ],
    careers: [
      ["Thực thi & chuyên môn", "Kỹ sư thiết kế cơ khí (Mechanical CAD Designer)", "14 - 28 triệu/tháng", "Thiết kế kết cấu máy móc, đồ gá (Jig) và tối ưu độ bền sản phẩm."],
      ["Thực thi & chuyên môn", "Kỹ sư lập trình & Vận hành máy CNC", "15 - 30 triệu/tháng", "Lập trình gia công chi tiết cơ khí chính xác cho ngành hàng không, điện tử."],
      ["Quản lý & chiến lược", "Giám đốc nhà máy cơ khí chế tạo", "35 - 75 triệu/tháng", "Quản trị phân xưởng sản xuất, năng suất và tiêu chuẩn ISO chất lượng."],
    ],
    demand: "Cao", growth: 12,
    aliases: ["ktck", "co khi", "ky thuat co khi", "mechanical engineering", "che tao may", "cnc", "cad cam"],
    degree: "Kỹ sư",
    specializations: [
      { name: "Gia công chính xác CNC & Khuôn mẫu cao cấp", code: "7520103-01", desc: "Lập trình máy phay 5 trục, khuôn ép nhựa siêu chính xác cho linh kiện smartphone, ô tô.", aliases: ["cnc", "khuon mau", "cam"] },
      { name: "Thiết kế & Chế tạo thiết bị công nghiệp thông minh", code: "7520103-02", desc: "Thiết kế máy tự động hóa, băng tải công nghiệp, máy đóng gói tốc độ cao.", aliases: ["che tao may", "thiet ke may"] },
    ],
  },
  {
    slug: "ky-thuat-co-dien-tu", code: "7520114", name: "Kỹ thuật Cơ điện tử", groupId: "ky-thuat", riasec: ["R", "I", "C"],
    summary: "Sự kết hợp liên ngành giữa Cơ khí chính xác, Điện tử điều khiển và Lập trình nhúng thông minh.",
    description: "Đào tạo các kỹ sư thiết kế robot công nghiệp, máy bay không người lái (drone), hệ thống tay gắp thông minh và dây chuyền tự động hóa thế hệ mới.",
    curriculum: [
      ["Cơ sở ngành", [["Kỹ thuật cảm biến & Vi điều khiển nhúng", "Lập trình ARM Cortex, Arduino, đọc tín hiệu cảm biến quang, siêu âm, encoder."], ["Cơ điện tử ứng dụng", "Động cơ bước, động cơ servo và mạch truyền động điều khiển vị trí góc quay."]]],
      ["Chuyên ngành", [["Robot học & Cánh tay robot công nghiệp", "Động học robot, lập trình quỹ đạo di chuyển cho robot hàn, gắp sản phẩm."], ["Hệ thống thị giác máy trong công nghiệp (Machine Vision)", "Camera kiểm tra lỗi ngoại quan sản phẩm tự động trên băng chuyền."]]],
    ],
    careers: [
      ["Thực thi & chuyên môn", "Kỹ sư Cơ điện tử / Lập trình Robot", "16 - 32 triệu/tháng", "Tích hợp robot vào dây chuyền sản xuất của các nhà máy VinFast, Samsung, Foxconn."],
      ["Thực thi & chuyên môn", "Kỹ sư phát triển sản phẩm thông minh (IoT/Embedded)", "18 - 36 triệu/tháng", "Thiết kế bo mạch và viết firmware cho thiết bị thông minh."],
      ["Quản lý & chiến lược", "Trưởng phòng R&D Cơ điện tử", "35 - 75 triệu/tháng", "Dẫn dắt các dự án phát triển thế hệ robot và thiết bị tự hành mới."],
    ],
    demand: "Rất cao", growth: 18,
    aliases: ["ktcdt", "mechatronics", "co dien tu", "robotics", "robot", "canh tay robot"],
    degree: "Kỹ sư",
    specializations: [
      { name: "Robot công nghiệp & Hệ thống tự hành (AGV/AMR)", code: "7520114-01", desc: "Thiết kế và lập trình robot tự hành vận chuyển trong kho thông minh.", aliases: ["agv", "amr", "robot cong nghiep"] },
      { name: "Hệ thống nhúng & Thiết bị thông minh (Smart Devices)", code: "7520114-02", desc: "Thiết kế vi mạch nhúng điều khiển drone, thiết bị gia dụng IoT cao cấp.", aliases: ["nhung", "iot", "drone"] },
    ],
  },
  {
    slug: "ky-thuat-dieu-khien-va-tu-dong-hoa", code: "7520216", name: "Kỹ thuật Điều khiển và Tự động hóa", groupId: "ky-thuat", riasec: ["R", "I", "C"],
    summary: "Lập trình PLC, hệ thống giám sát SCADA/DCS và tối ưu hóa dây chuyền sản xuất tự động 24/7.",
    description: "Đào tạo các kỹ sư điều khiển lập trình các bộ điều khiển công nghiệp PLC Siemens, Mitsubishi, Rockwell để vận hành các nhà máy tự động hóa hoàn toàn.",
    curriculum: [
      ["Cơ sở ngành", [["Lý thuyết điều khiển tự động", "Hàm truyền, ổn định hệ thống, bộ điều khiển PID kinh điển và mờ/neural."], ["Kỹ thuật lập trình PLC cơ bản & nâng cao", "Ngôn ngữ hình thang Ladder, Function Block trên PLC Siemens S7-1200/1500."]]],
      ["Chuyên ngành", [["Hệ thống SCADA & Mạng truyền thông công nghiệp", "Thiết kế giao diện HMI/SCADA trên WinCC, kết nối Modbus, Profinet."], ["Hệ thống điều khiển phân tán (DCS)", "Tự động hóa nhà máy lọc dầu, nhiệt điện, xi măng quy mô lớn."]]],
    ],
    careers: [
      ["Thực thi & chuyên môn", "Kỹ sư lập trình PLC & SCADA", "15 - 32 triệu/tháng", "Viết chương trình điều khiển và chạy thử nghiệm tại nhà máy."],
      ["Thực thi & chuyên môn", "Kỹ sư bảo trì tự động hóa nhà máy", "16 - 30 triệu/tháng", "Xử lý lỗi hệ thống cảm biến, biến tần và đảm bảo dây chuyền chạy liên tục."],
      ["Quản lý & chiến lược", "Giám đốc kỹ thuật nhà máy thông minh", "40 - 80 triệu/tháng", "Quy hoạch kiến trúc tự động hóa toàn bộ nhà máy theo chuẩn Công nghiệp 4.0."],
    ],
    demand: "Rất cao", growth: 16,
    aliases: ["tdh", "tu dong hoa", "dieu khien tu dong", "automation", "plc", "scada"],
    degree: "Kỹ sư",
    specializations: [
      { name: "Tự động hóa nhà máy & Công nghiệp 4.0", code: "7520216-01", desc: "Tích hợp hệ thống SCADA/MES với phần mềm quản trị doanh nghiệp ERP.", aliases: ["mes", "industry 4.0", "smart factory"] },
      { name: "Hệ thống điều khiển quá trình liên tục (DCS)", code: "7520216-02", desc: "Tự động hóa an toàn cao trong nhà máy hóa chất, lọc hóa dầu, thực phẩm, dược phẩm.", aliases: ["dcs", "loc dau", "hoa chat"] },
    ],
  },
  {
    slug: "ky-thuat-o-to", code: "7520130", name: "Kỹ thuật Ô tô", groupId: "ky-thuat", riasec: ["R", "I", "C"],
    summary: "Nghiên cứu động cơ đốt trong, xe điện (EV), hệ thống truyền lực, chẩn đoán lỗi và an toàn ô tô.",
    description: "Đào tạo các kỹ sư có khả năng thiết kế khung gầm ô tô, nghiên cứu hệ thống pin và điều khiển xe điện thông minh của các hãng lớn.",
    curriculum: [
      ["Cơ sở ngành", [["Nguyên lý động cơ đốt trong & Động cơ điện", "Cấu tạo xi-lanh, piston, hệ thống phun xăng điện tử EFI, động cơ đồng bộ nam châm vĩnh cửu."], ["Khung gầm & Hệ thống treo, phanh, lái (ABS/ESP)", "Động lực học chuyển động của ô tô, kiểm soát độ ổn định khi ôm cua."]]],
      ["Chuyên ngành", [["Công nghệ xe điện & Xe Hybrid (EV/HEV)", "Bộ biến đổi công suất, quản lý pin BMS, hệ thống phanh tái sinh năng lượng."], ["Chẩn đoán kỹ thuật ô tô bằng máy quét", "Đọc mã lỗi OBD-II, hiệu chỉnh ECU và sửa chữa hệ thống điện tử thân xe."]]],
    ],
    careers: [
      ["Thực thi & chuyên môn", "Kỹ sư thiết kế / Nghiên cứu phát triển ô tô (R&D)", "18 - 38 triệu/tháng", "Phát triển linh kiện và kiểm thử độ bền xe ô tô mới."],
      ["Thực thi & chuyên môn", "Cố vấn dịch vụ / Quản đốc xưởng ô tô", "15 - 32 triệu/tháng", "Chẩn đoán ban bệnh và giám sát quy trình bảo dưỡng xe của hãng."],
      ["Quản lý & chiến lược", "Giám đốc đại lý ô tô 3S / Xưởng dịch vụ", "35 - 75 triệu/tháng", "Quản trị kinh doanh xe và dịch vụ sau bán hàng của hãng xe."],
    ],
    demand: "Rất cao", growth: 19,
    aliases: ["kto", "o to", "ky thuat o to", "automotive", "oto", "ky thuat oto", "xe dien"],
    degree: "Kỹ sư",
    specializations: [
      { name: "Công nghệ Xe điện & Pin thông minh (EV & BMS)", code: "7520130-01", desc: "Nghiên cứu hệ thống pin cao áp, sạc nhanh và điều khiển mô-tơ kéo xe điện.", aliases: ["ev", "bms", "xe dien", "pin xe dien"] },
      { name: "Điện tử ô tô & Hệ thống hỗ trợ lái nâng cao (ADAS)", code: "7520130-02", desc: "Cảm biến Radar/LiDAR cảnh báo điểm mù, giữ làn đường và tự động phanh khẩn cấp.", aliases: ["adas", "radar", "lidar", "dien tu o to"] },
    ],
  },
  {
    slug: "ky-thuat-xay-dung", code: "7580201", name: "Kỹ thuật Xây dựng", groupId: "ky-thuat", riasec: ["R", "C", "I"],
    summary: "Tính toán kết cấu bê tông cốt thép, nền móng, thi công cầu đường và quản lý dự án công trình.",
    description: "Đào tạo các kỹ sư xây dựng thành thạo phần mềm tính kết cấu Etabs, SAP2000, mô hình thông tin công trình BIM (Revit) và chỉ huy thi công hiện trường.",
    curriculum: [
      ["Cơ sở ngành", [["Cơ học đất & Nền móng công trình", "Tính sức chịu tải của cọc, độ lún công trình và xử lý nền đất yếu."], ["Kết cấu bê tông cốt thép & Kết cấu thép", "Tính toán cốt thép dầm, cột, sàn chịu lực uốn, nén, cắt và động đất."]]],
      ["Chuyên ngành", [["Tổ chức thi công & Dự toán xây dựng", "Lập tiến độ thi công MS Project, bóc tách khối lượng và lập dự toán ngân sách."], ["Mô hình thông tin công trình (BIM / Revit)", "Phối hợp 3D kiến trúc, kết cấu, MEP để phát hiện xung đột trước khi xây dựng."]]],
    ],
    careers: [
      ["Thực thi & chuyên môn", "Kỹ sư thiết kế kết cấu (Structural Engineer)", "14 - 28 triệu/tháng", "Tính toán cốt thép và xuất bản vẽ thi công công trình cao tầng."],
      ["Thực thi & chuyên môn", "Kỹ sư giám sát thi công / Kỹ sư hiện trường", "15 - 30 triệu/tháng", "Kiểm tra chất lượng cốt thép, bê tông và an toàn lao động tại công trường."],
      ["Quản lý & chiến lược", "Chỉ huy trưởng công trường / Giám đốc dự án", "35 - 80 triệu/tháng", "Quản lý tiến độ, chi phí và chất lượng tổng thể của toàn bộ dự án xây dựng."],
    ],
    demand: "Cao", growth: 11,
    aliases: ["ktxd", "xay dung", "ky thuat xay dung", "civil engineering", "cong trinh", "bim"],
    degree: "Kỹ sư",
    specializations: [
      { name: "Mô hình thông tin công trình (BIM) & Quản lý số", code: "7580201-01", desc: "Quản lý dữ liệu vòng đời công trình số từ khâu thiết kế đến vận hành tòa nhà.", aliases: ["bim", "revit", "quan ly so"] },
      { name: "Kết cấu nhà cao tầng & Công trình ngầm đô thị", code: "7580201-02", desc: "Thiết kế hầm Metro, móng sâu chịu tải trọng gió bão và động đất cấp cao.", aliases: ["nha cao tang", "cong trinh ngam", "metro"] },
    ],
  },
  {
    slug: "kien-truc", code: "7580101", name: "Kiến trúc", groupId: "nghe-thuat", riasec: ["A", "R", "I"],
    summary: "Sáng tạo không gian sống, thiết kế hình khối công trình thẩm mỹ và hòa hợp công năng sử dụng.",
    description: "Ngành học kết hợp giữa nghệ thuật và kỹ thuật. Đào tạo các kiến trúc sư có tư duy không gian xuất sắc, làm chủ các công cụ AutoCAD, SketchUp, 3ds Max, Enscape.",
    curriculum: [
      ["Cơ sở ngành", [["Hình họa – Vẽ mỹ thuật & Cơ sở kiến trúc", "Quy luật bố cục, ánh sáng, tỷ lệ vàng và nguyên lý thị giác."], ["Nguyên lý thiết kế nhà ở & Công trình công cộng", "Phân chia dây chuyền công năng, thông gió và chiếu sáng tự nhiên."]]],
      ["Chuyên ngành", [["Đồ án kiến trúc công trình phức hợp", "Thiết kế bảo tàng, trung tâm thương mại, resort nghỉ dưỡng sinh thái."], ["Kiến trúc bền vững & Công trình xanh (Green Building)", "Áp dụng tiêu chuẩn xanh LOTUS, LEED để tiết kiệm năng lượng công trình."]]],
    ],
    careers: [
      ["Thực thi & chuyên môn", "Kiến trúc sư thiết kế công trình", "15 - 32 triệu/tháng", "Lên ý tưởng concept mặt bằng và phối cảnh 3D không gian kiến trúc."],
      ["Thực thi & chuyên môn", "Chuyên viên tư vấn Kiến trúc xanh / LEED", "18 - 35 triệu/tháng", "Tính toán mô phỏng năng lượng và đánh giá chứng chỉ công trình xanh."],
      ["Quản lý & chiến lược", "Chủ trì kiến trúc / Giám đốc công ty tư vấn kiến trúc", "35 - 80+ triệu/tháng", "Dẫn dắt các đồ án quy hoạch kiến trúc lớn của thành phố và tập đoàn."],
    ],
    demand: "Cao", growth: 13,
    aliases: ["kt", "kien truc", "architecture", "kien truc su", "thiet ke nha", "kien truc xanh"],
    degree: "Kiến trúc sư (5 năm)",
    specializations: [
      { name: "Kiến trúc công trình dân dụng & Công cộng", code: "7580101-01", desc: "Thiết kế nhà phố, biệt thự, chung cư cao tầng, bệnh viện và trường học hiện đại.", aliases: ["dan dung", "cong cong", "nha o"] },
      { name: "Kiến trúc Bền vững & Công trình xanh (LEED / LOTUS)", code: "7580101-02", desc: "Tối ưu hóa năng lượng mặt trời, vật liệu tái chế và cảnh quan xanh giảm nhiệt.", aliases: ["kien truc xanh", "leed", "lotus"] },
    ],
  },
  {
    slug: "quy-hoach-do-thi", code: "7580105", name: "Quy hoạch vùng và đô thị", groupId: "ky-thuat", riasec: ["A", "R", "I"],
    summary: "Quy hoạch phân khu chức năng thành phố, hạ tầng giao thông đô thị và phát triển thành phố thông minh.",
    description: "Đào tạo các kỹ sư quy hoạch không gian đô thị sử dụng phần mềm GIS, bản đồ số để thiết kế các khu đô thị mới hiện đại và sinh thái.",
    curriculum: [
      ["Cơ sở ngành", [["Nguyên lý quy hoạch đô thị & Hệ thống GIS", "Sử dụng ArcGIS phân tích mật độ dân cư, địa hình và sử dụng đất."], ["Giao thông đô thị & Hạ tầng kỹ thuật", "Quy hoạch mạng lưới đường sá, thoát nước mưa, xử lý rác thải đô thị."]]],
      ["Chuyên ngành", [["Đồ án quy hoạch chung & Quy hoạch chi tiết 1/500", "Lập bản đồ quy hoạch sử dụng đất, tầng cao xây dựng khu đô thị mới."], ["Đô thị thông minh (Smart City) & Đô thị sinh thái", "Ứng dụng IoT giám sát môi trường và hạ tầng số của thành phố."]]],
    ],
    careers: [
      ["Thực thi & chuyên môn", "Chuyên viên quy hoạch đô thị / Kỹ sư GIS", "14 - 28 triệu/tháng", "Xây dựng bản đồ phân khu và thẩm định hồ sơ quy hoạch đất đai."],
      ["Quản lý & chiến lược", "Trưởng ban quy hoạch dự án bất động sản", "30 - 65 triệu/tháng", "Lập quy hoạch dự án khu đô thị cho các tập đoàn bất động sản lớn."],
    ],
    demand: "Trung bình", growth: 11,
    aliases: ["qhdt", "quy hoach do thi", "urban planning", "smart city", "gis"],
    degree: "Kỹ sư",
    specializations: [
      { name: "Quy hoạch Thành phố thông minh (Smart City Planning)", code: "7580105-01", desc: "Tích hợp bản đồ số GIS với dữ liệu giao thông thông minh và mạng lưới năng lượng sạch.", aliases: ["smart city", "gis"] },
    ],
  },
  {
    slug: "thiet-ke-vi-mach-ban-dan", code: "7520202", name: "Thiết kế Vi mạch & Bán dẫn", groupId: "ky-thuat", riasec: ["I", "R", "C"],
    summary: "Thiết kế chip bán dẫn, vi mạch số/tương tự (IC), kiểm thử wafer và đóng gói linh kiện bán dẫn.",
    description: "Ngành công nghệ chiến lược quốc gia đào tạo kỹ sư thiết kế chip trên công cụ Synopsys, Cadence đáp ứng nhu cầu khổng lồ từ Nvidia, Qualcomm, Intel, Synopsys.",
    curriculum: [
      ["Cơ sở ngành", [["Vật lý bán dẫn & Linh kiện điện tử", "Cơ chế hoạt động của diode, transistor MOSFET ở quy mô nanomet."], ["Thiết kế mạch logic số & Ngôn ngữ Verilog/VHDL", "Mô tả mạch phần cứng bằng mã lệnh và mô phỏng trên ModelSim."]]],
      ["Chuyên ngành", [["Thiết kế vi mạch số (Digital IC Design & RTL)", "Tổng hợp logic, định tuyến vị trí (Place & Route) trên chuẩn công nghệ 7nm-28nm."], ["Thiết kế vi mạch tương tự (Analog/RF IC Design)", "Mạch khuếch đại thuật toán Op-Amp, mạch thu phát sóng không dây RF."]]],
    ],
    careers: [
      ["Thực thi & chuyên môn", "Kỹ sư thiết kế vi mạch (IC Design Engineer - RTL/Physical)", "25 - 55 triệu/tháng", "Viết mã RTL và tối ưu hóa diện tích, công suất tiêu thụ của chip."],
      ["Thực thi & chuyên môn", "Kỹ sư kiểm thử vi mạch (Design Verification Engineer)", "22 - 48 triệu/tháng", "Viết testbench UVM kiểm tra tính chính xác của chip trước khi sản xuất."],
      ["Quản lý & chiến lược", "Giám đốc kỹ thuật trung tâm thiết kế chip", "60 - 120+ triệu/tháng", "Dẫn dắt các dự án đóng gói chip SoC phức tạp cho đối tác quốc tế."],
    ],
    demand: "Rất cao", growth: 25,
    aliases: ["ban dan", "vi mach", "semiconductor", "ic design", "microchips", "chip", "synopsys"],
    degree: "Kỹ sư",
    specializations: [
      { name: "Thiết kế Vi mạch số & SoC (Digital IC / RTL)", code: "7520202-01", desc: "Thiết kế chip vi xử lý, AI Accelerator bằng ngôn ngữ SystemVerilog/UVM.", aliases: ["rtl", "soc", "digital ic", "systemverilog"] },
      { name: "Thiết kế Vi mạch tương tự & Tần số vô tuyến (Analog / RF IC)", code: "7520202-02", desc: "Thiết kế chip quản lý nguồn PMIC, bộ chuyển đổi ADC/DAC và chip 5G/6G.", aliases: ["analog", "rf", "pmic", "5g"] },
    ],
  },
  {
    slug: "ky-thuat-hoa-hoc", code: "7520301", name: "Kỹ thuật Hóa học", groupId: "ky-thuat", riasec: ["I", "R", "C"],
    summary: "Công nghệ lọc hóa dầu, sản xuất polymer, vật liệu nano, dược phẩm và mỹ phẩm công nghiệp.",
    description: "Đào tạo các kỹ sư hóa học vận hành các tháp chưng cất, phản ứng hóa học công nghiệp và kiểm nghiệm chất lượng sản phẩm trong phòng thí nghiệm hiện đại.",
    curriculum: [
      ["Cơ sở ngành", [["Hóa hữu cơ, vô cơ & Hóa lý", "Cơ chế phản ứng, nhiệt động lực học và động học xúc tác."], ["Quá trình & Thiết bị công nghệ hóa học", "Truyền nhiệt, truyền khối, sấy, hấp thụ và chưng cất liên tục."]]],
      ["Chuyên ngành", [["Công nghệ lọc hóa dầu & Khí đốt", "Chế biến dầu mỏ, sản xuất hạt nhựa nguyên sinh và khí hóa lỏng LPG."], ["Hóa mỹ phẩm & Hợp chất thiên nhiên", "Công thức sản xuất kem dưỡng, son môi, nước hoa và xà phòng sinh học."]]],
    ],
    careers: [
      ["Thực thi & chuyên môn", "Kỹ sư R&D Hóa mỹ phẩm / Hóa chất", "14 - 28 triệu/tháng", "Nghiên cứu công thức và kiểm nghiệm độ an toàn của sản phẩm hóa mỹ phẩm."],
      ["Thực thi & chuyên môn", "Kỹ sư vận hành nhà máy lọc hóa dầu / Nhựa", "16 - 32 triệu/tháng", "Giám sát hệ thống phản ứng và tháp tách chiết phân đoạn."],
    ],
    demand: "Trung bình", growth: 11,
    aliases: ["kthh", "hoa hoc", "ky thuat hoa hoc", "chemical engineering", "hoa my pham", "loc dau"],
    degree: "Kỹ sư",
    specializations: [
      { name: "Công nghệ Hóa mỹ phẩm & Chế phẩm tẩy rửa sinh học", code: "7520301-01", desc: "Nghiên cứu công thức mỹ phẩm organic, nhũ tương hóa và chiết xuất thảo dược.", aliases: ["my pham", "organic", "thao duoc"] },
    ],
  },
  {
    slug: "ky-thuat-moi-truong", code: "7520320", name: "Kỹ thuật Môi trường", groupId: "ky-thuat", riasec: ["R", "I", "C"],
    summary: "Xử lý nước thải công nghiệp, khí thải, rác thải nguy hại và đánh giá tác động môi trường (ĐTM).",
    description: "Đào tạo các kỹ sư thiết kế các trạm xử lý nước cấp, nước thải sinh hoạt/công nghiệp và lập báo cáo quan trắc môi trường cho doanh nghiệp.",
    curriculum: [
      ["Cơ sở ngành", [["Hóa học môi trường & Vi sinh vật môi trường", "Chỉ số BOD, COD, kim loại nặng và vi sinh vật phân hủy chất hữu cơ."], ["Thủy lực & Công trình thu nước", "Tính toán lưu lượng dòng chảy và đường ống dẫn nước thải."]]],
      ["Chuyên ngành", [["Công nghệ xử lý nước cấp & Nước thải", "Bể lắng, lọc sinh học hiếu khí/kỵ khí (MBBR, MBR) và khử trùng."], ["Đánh giá tác động môi trường (ĐTM) & Quản lý rác thải", "Lập báo cáo ĐTM phê duyệt bởi Bộ Tài nguyên & Môi trường."]]],
    ],
    careers: [
      ["Thực thi & chuyên môn", "Kỹ sư thiết kế hệ thống xử lý nước thải", "13 - 26 triệu/tháng", "Thiết kế trạm xử lý nước thải cho khu công nghiệp và nhà máy."],
      ["Thực thi & chuyên môn", "Chuyên viên quản lý an toàn & môi trường (HSE)", "15 - 30 triệu/tháng", "Đảm bảo nhà máy tuân thủ quy chuẩn xả thải và an toàn lao động."],
    ],
    demand: "Trung bình", growth: 12,
    aliases: ["ktmt", "moi truong", "ky thuat moi truong", "xu ly nuoc", "hse", "dtm"],
    degree: "Kỹ sư",
    specializations: [
      { name: "Xử lý Nước thải & Tái sử dụng tuần hoàn nước", code: "7520320-01", desc: "Công nghệ màng lọc MBR, khử mặn nước ngầm và tuần hoàn nước công nghiệp.", aliases: ["nuoc thai", "mbr", "tuan hoan"] },
    ],
  },
  {
    slug: "cong-nghe-thuc-pham", code: "7540101", name: "Công nghệ thực phẩm", groupId: "ky-thuat", riasec: ["R", "I", "C"],
    summary: "Bảo quản, chế biến đồ hộp, bánh kẹo, đồ uống và kiểm định vệ sinh an toàn thực phẩm.",
    description: "Đào tạo các kỹ sư phát triển công thức đồ uống, thực phẩm chức năng và kiểm soát chất lượng theo tiêu chuẩn HACCP, ISO 22000.",
    curriculum: [
      ["Cơ sở ngành", [["Hóa sinh thực phẩm & Dinh dưỡng người", "Thành phần protein, lipid, đường, vitamin và sự biến đổi trong quá trình nấu."], ["Vi sinh vật thực phẩm & An toàn vệ sinh", "Kiểm soát nấm men, nấm mốc, vi khuẩn gây ngộ độc Salmonella, E.coli."]]],
      ["Chuyên ngành", [["Công nghệ chế biến thịt, thủy sản, đồ hộp", "Quy trình thanh trùng, tiệt trùng UHT, đóng gói chân không."], ["Phát triển sản phẩm mới (Food R&D) & Đánh giá cảm quan", "Thiết kế mùi vị, màu sắc và khảo sát thử nghiệm người tiêu dùng."]]],
    ],
    careers: [
      ["Thực thi & chuyên môn", "Chuyên viên R&D Thực phẩm & Đồ uống", "13 - 28 triệu/tháng", "Nghiên cứu tạo ra các dòng sữa, nước giải khát, snack mới."],
      ["Thực thi & chuyên môn", "Chuyên viên kiểm soát chất lượng (QA/QC Food)", "12 - 25 triệu/tháng", "Kiểm tra mẫu nguyên liệu đầu vào và thành phẩm tại dây chuyền sản xuất."],
      ["Quản lý & chiến lược", "Giám đốc chất lượng nhà máy chế biến thực phẩm", "30 - 65 triệu/tháng", "Chịu trách nhiệm về chứng nhận HACCP, Halal, FDA xuất khẩu sang Mỹ, EU."],
    ],
    demand: "Cao", growth: 14,
    aliases: ["cntp", "thuc pham", "cong nghe thuc pham", "food technology", "food tech", "haccp", "qa food"],
    degree: "Kỹ sư",
    specializations: [
      { name: "Phát triển Sản phẩm Thực phẩm Mới (Food R&D)", code: "7540101-01", desc: "Nghiên cứu công thức thực phẩm chức năng, nước giải khát thảo mộc ít đường.", aliases: ["food rd", "cong thuc", "thuc pham chuc nang"] },
      { name: "Đảm bảo Chất lượng & Tiêu chuẩn xuất khẩu (HACCP/ISO)", code: "7540101-02", desc: "Xây dựng hệ thống kiểm tra an toàn thực phẩm xuất khẩu sang thị trường khó tính.", aliases: ["qa", "haccp", "iso 22000"] },
    ],
  },
  {
    slug: "khoa-hoc-moi-truong", code: "7440301", name: "Khoa học Môi trường", groupId: "ky-thuat", riasec: ["I", "R", "C"],
    summary: "Quan trắc sinh thái, phân tích ô nhiễm đất – nước – không khí và giải pháp biến đổi khí hậu.",
    description: "Đào tạo các nhà khoa học môi trường có khả năng lấy mẫu, đo đạc chất lượng môi trường trong phòng thí nghiệm và xây dựng chính sách giảm thiểu phát thải.",
    curriculum: [
      ["Cơ sở ngành", [["Sinh thái học cảnh quan & Đa dạng sinh học", "Hệ sinh thái rừng, biển, đầm lầy và bảo tồn động thực vật quý hiếm."], ["Độc học môi trường & Phân tích hóa lý", "Xác định hàm lượng chì, thủy ngân, thuốc trừ sâu trong đất và nước ngầm."]]],
      ["Chuyên ngành", [["Quan trắc môi trường tự động (Monitoring)", "Vận hành trạm quan trắc không khí AQI và nguồn nước tự động liên tục."], ["Thích ứng biến đổi khí hậu & Tín chỉ Carbon", "Tính toán dấu chân Carbon (Carbon Footprint) và thị trường tín chỉ carbon."]]],
    ],
    careers: [
      ["Thực thi & chuyên môn", "Chuyên viên quan trắc & Phân tích môi trường", "12 - 24 triệu/tháng", "Thực hiện lấy mẫu hiện trường và phân tích chỉ tiêu ô nhiễm."],
      ["Thực thi & chuyên môn", "Chuyên viên tư vấn tín chỉ Carbon & ESG", "18 - 38 triệu/tháng", "Tư vấn doanh nghiệp kiểm kê khí nhà kính và lập báo cáo phát triển bền vững ESG."],
    ],
    demand: "Trung bình", growth: 15,
    aliases: ["khmt", "moi truong", "khoa hoc moi truong", "environmental science", "esg", "tin chi carbon"],
    degree: "Cử nhân",
    specializations: [
      { name: "Kiểm kê Khí nhà kính & Báo cáo Bền vững ESG", code: "7440301-01", desc: "Đo lường phát thải ròng Net Zero và lập báo cáo ESG thu hút vốn đầu tư.", aliases: ["esg", "net zero", "carbon"] },
    ],
  },

  // ==================== 4. Y DƯỢC – CHĂM SÓC SỨC KHỎE (y-duoc) ====================
  {
    slug: "y-khoa", code: "7720101", name: "Y khoa (Bác sĩ Đa khoa)", groupId: "y-duoc", riasec: ["I", "S", "R"],
    summary: "Chẩn đoán, điều trị, phẫu thuật và chăm sóc sức khỏe toàn diện cho người bệnh.",
    description: "Chương trình đào tạo 6 năm khắt khe. Sinh viên học lý thuyết y học cơ sở kết hợp đi thực tập lâm sàng tại các bệnh viện tuyến trung ương từ năm 3.",
    curriculum: [
      ["Cơ sở ngành", [["Giải phẫu học, Sinh lý học & Mô phôi", "Cấu tạo chi tiết các cơ quan nội tạng, cơ xương khớp và chức năng sinh học."], ["Bệnh học cơ sở & Dược lý học", "Cơ chế sinh bệnh, triệu chứng điển hình và tác dụng phụ của thuốc."]]],
      ["Chuyên ngành", [["Nội khoa, Ngoại khoa, Sản khoa, Nhi khoa", "Bốn trụ cột lâm sàng: chẩn đoán bệnh án, chỉ định xét nghiệm và phẫu thuật."], ["Chẩn đoán hình ảnh & Hồi sức cấp cứu", "Đọc phim X-quang, CT-Scan, MRI và xử trí sốc phản vệ, ngừng tuần hoàn."]]],
    ],
    careers: [
      ["Thực thi & chuyên môn", "Bác sĩ điều trị tại bệnh viện công / tư", "18 - 45 triệu/tháng", "Khám, chữa bệnh tại các khoa Nội, Ngoại, Sản, Nhi, Cấp cứu."],
      ["Thực thi & chuyên môn", "Bác sĩ chuyên khoa II / Tiến sĩ Y học", "35 - 70 triệu/tháng", "Thực hiện các ca phẫu thuật phức tạp và hội chẩn bệnh nhân nặng."],
      ["Quản lý & chiến lược", "Giám đốc chuyên môn bệnh viện", "50 - 100+ triệu/tháng", "Chịu trách nhiệm toàn bộ về phác đồ điều trị và chuyên môn bệnh viện."],
    ],
    demand: "Rất cao", growth: 16,
    aliases: ["yk", "y khoa", "bac si", "y da khoa", "medicine", "doctor", "y-khoa-bac-si"],
    degree: "Bác sĩ (6 năm)",
    specializations: [
      { name: "Nội khoa & Can thiệp Tim mạch", code: "7720101-01", desc: "Chẩn đoán và điều trị bệnh mạch vành, tăng huyết áp, đái tháo đường, đột quỵ.", aliases: ["noi khoa", "tim mach", "dot quy"] },
      { name: "Ngoại khoa & Phẫu thuật nội soi", code: "7720101-02", desc: "Thực hiện phẫu thuật tiêu hóa, chấn thương chỉnh hình, ghép tạng.", aliases: ["ngoai khoa", "phau thuat", "chinh hinh"] },
    ],
  },
  {
    slug: "duoc-hoc", code: "7720201", name: "Dược học (Dược sĩ)", groupId: "y-duoc", riasec: ["I", "C", "R"],
    summary: "Bào chế thuốc, nghiên cứu dược lý, kiểm nghiệm chất lượng và dược lâm sàng tại bệnh viện.",
    description: "Đào tạo các Dược sĩ Đại học (5 năm) có quyền cấp chứng chỉ hành nghề, mở nhà thuốc, làm việc tại công ty dược đa quốc gia và bệnh viện.",
    curriculum: [
      ["Cơ sở ngành", [["Hóa dược & Dược liệu học", "Cấu trúc hóa học của dược chất, chiết xuất hoạt chất chữa bệnh từ thảo dược."], ["Dược lý học & Độc chất học", "Cơ chế hấp thu, chuyển hóa của thuốc trong cơ thể người."]]],
      ["Chuyên ngành", [["Bào chế & Công nghệ sinh học dược", "Nghiên cứu dạng viên nén, viên nang, dung dịch tiêm truyền đạt chuẩn GMP."], ["Dược lâm sàng & Quản lý kinh tế dược", "Tư vấn tương tác thuốc cho bác sĩ và quản trị chuỗi nhà thuốc đạt chuẩn GPP."]]],
    ],
    careers: [
      ["Thực thi & chuyên môn", "Dược sĩ lâm sàng tại bệnh viện", "15 - 30 triệu/tháng", "Kiểm tra đơn thuốc, cảnh báo tương tác thuốc nguy hiểm cho bệnh nhân."],
      ["Thực thi & chuyên môn", "Trình dược viên bệnh viện (Medical Representative)", "18 - 40 triệu/tháng", "Giới thiệu thuốc mới của các tập đoàn đa quốc gia đến bác sĩ."],
      ["Quản lý & chiến lược", "Chủ chuỗi nhà thuốc GPP / Giám đốc nhà máy dược GMP", "35 - 90 triệu/tháng", "Quản lý kinh doanh và đảm bảo chất lượng dây chuyền sản xuất thuốc."],
    ],
    demand: "Rất cao", growth: 15,
    aliases: ["dh", "duoc hoc", "duoc si", "pharmacy", "thuoc", "nha thuoc", "trinh duoc vien"],
    degree: "Dược sĩ (5 năm)",
    specializations: [
      { name: "Dược lâm sàng & Thông tin thuốc", code: "7720201-01", desc: "Theo dõi điều trị cá thể hóa bằng thuốc, tối ưu liều dùng trong bệnh viện.", aliases: ["duoc lam sang", "thong tin thuoc"] },
      { name: "Công nghệ Bào chế & Sản xuất Dược phẩm GMP", code: "7720201-02", desc: "Thiết kế dạng thuốc phóng thích kéo dài, vắc-xin và kháng thể đơn dòng.", aliases: ["bao che", "gmp", "vacxin"] },
    ],
  },
  {
    slug: "rang-ham-mat", code: "7720501", name: "Răng – Hàm – Mặt (Bác sĩ Nha khoa)", groupId: "y-duoc", riasec: ["I", "R", "S"],
    summary: "Khám chữa bệnh răng miệng, niềng răng thẩm mỹ, cấy ghép Implant và phẫu thuật hàm mặt.",
    description: "Chương trình 6 năm đào tạo Bác sĩ Răng Hàm Mặt thực hành trên mô hình nha khoa hiện đại và bệnh nhân thật tại viện trường.",
    curriculum: [
      ["Cơ sở ngành", [["Giải phẫu đầu mặt cổ & Mô phôi răng", "Chi tiết các dây thần kinh sọ, mạch máu vùng mặt và quá trình mọc răng."], ["Vật liệu nha khoa & Chẩn đoán hình ảnh răng", "Vật liệu trám composite, sứ nha khoa và phim CT Cone Beam 3D."]]],
      ["Chuyên ngành", [["Nha khoa phục hình & Cấy ghép Implant", "Làm cầu răng sứ, hàm tháo lắp và cấy trụ titan vào xương hàm."], ["Nắn chỉnh răng (Niềng răng) & Phẫu thuật hàm mặt", "Chỉnh nha mắc cài, khay trong suốt Invisalign và phẫu thuật chỉnh hình hàm vẩu/móm."]]],
    ],
    careers: [
      ["Thực thi & chuyên môn", "Bác sĩ Nha khoa điều trị", "25 - 60 triệu/tháng", "Khám chữa tủy, nhổ răng khôn, trám răng thẩm mỹ."],
      ["Thực thi & chuyên môn", "Bác sĩ Chỉnh nha / Cấy ghép Implant chuyên sâu", "40 - 90 triệu/tháng", "Thực hiện các ca niềng răng phức tạp và cấy trụ Implant."],
      ["Quản lý & chiến lược", "Chủ phòng khám Nha khoa tư nhân", "50 - 120+ triệu/tháng", "Sở hữu và điều hành phòng khám nha khoa thẩm mỹ cao cấp."],
    ],
    demand: "Rất cao", growth: 18,
    aliases: ["rhm", "rang ham mat", "nha khoa", "dentistry", "bac si nha khoa", "nieng rang", "implant"],
    degree: "Bác sĩ (6 năm)",
    specializations: [
      { name: "Chỉnh nha & Thẩm mỹ nụ cười (Orthodontics)", code: "7720501-01", desc: "Thiết kế kế hoạch điều trị niềng răng khay trong suốt 3D, dán sứ Veneer.", aliases: ["chinh nha", "invisalign", "veneer"] },
      { name: "Cấy ghép Nha khoa & Phẫu thuật miệng (Implantology)", code: "7720501-02", desc: "Kỹ thuật nâng xoang, ghép xương và cấy ghép tức thì trụ Implant.", aliases: ["implant", "ghep xuong"] },
    ],
  },
  {
    slug: "dieu-duong", code: "7720301", name: "Điều dưỡng", groupId: "y-duoc", riasec: ["S", "R", "C"],
    summary: "Thực hiện y lệnh bác sĩ, theo dõi dấu hiệu sinh tồn, chăm sóc và phục hồi chức năng cho bệnh nhân.",
    description: "Đào tạo các điều dưỡng viên có tay nghề vững vàng, tận tâm, có cơ hội làm việc tại các bệnh viện lớn trong nước và xuất khẩu sang Đức, Nhật Bản.",
    curriculum: [
      ["Cơ sở ngành", [["Điều dưỡng cơ sở & Kỹ thuật tiêm truyền", "Đo huyết áp, nhịp tim, kỹ thuật lấy máu xét nghiệm, đặt ống sonde."], ["Dược lý cho điều dưỡng & Kiểm soát nhiễm khuẩn", "Sử dụng thuốc an toàn và quy trình vô trùng tuyệt đối trong bệnh viện."]]],
      ["Chuyên ngành", [["Chăm sóc bệnh nhân Nội – Ngoại – Sản – Nhi", "Theo dõi bệnh nhân sau mổ, chăm sóc trẻ sơ sinh non tháng."], ["Chăm sóc hồi sức tích cực (ICU) & Cấp cứu", "Vận hành máy thở, monitor theo dõi và hỗ trợ ép tim cấp cứu."]]],
    ],
    careers: [
      ["Thực thi & chuyên môn", "Điều dưỡng viên tại bệnh viện", "10 - 20 triệu/tháng", "Chăm sóc bệnh nhân nội trú theo ca trực."],
      ["Thực thi & chuyên môn", "Điều dưỡng viên làm việc tại Đức / Nhật Bản", "35 - 65 triệu/tháng", "Làm việc tại các viện dưỡng lão, bệnh viện quốc tế."],
      ["Quản lý & chiến lược", "Điều dưỡng trưởng khoa / Bệnh viện", "22 - 40 triệu/tháng", "Phân công ca trực và giám sát quy trình chăm sóc toàn diện."],
    ],
    demand: "Rất cao", growth: 20,
    aliases: ["dd", "dieu duong", "nursing", "y ta", "cham soc benh nhan", "dieu duong duc", "dieu duong nhat"],
    degree: "Cử nhân",
    specializations: [
      { name: "Điều dưỡng Hồi sức Cấp cứu & Gây mê hồi sức", code: "7720301-01", desc: "Chăm sóc chuyên sâu bệnh nhân hôn mê, chạy máy ECMO, máy lọc máu liên tục.", aliases: ["icu", "gay me", "hoi suc"] },
      { name: "Điều dưỡng Quốc tế & Chăm sóc người cao tuổi", code: "7720301-02", desc: "Đào tạo chuẩn ngôn ngữ và kỹ năng sang làm việc tại Đức, Nhật, Úc.", aliases: ["duc", "nhat ban", "nguoi cao tuoi"] },
    ],
  },

  // ==================== 5. XÃ HỘI – LUẬT – NGÔN NGỮ (xa-hoi) ====================
  {
    slug: "luat", code: "7380101", name: "Luật", groupId: "xa-hoi", riasec: ["E", "C", "I"],
    summary: "Hệ thống pháp luật, tranh tụng tại tòa án, tư vấn pháp lý dân sự, hình sự và thương mại.",
    description: "Đào tạo các cử nhân luật có tư duy phản biện sắc bén, hiểu sâu hệ thống văn bản quy phạm pháp luật và kỹ năng soạn thảo hợp đồng, bào chữa.",
    curriculum: [
      ["Cơ sở ngành", [["Lý luận nhà nước và pháp luật", "Nguồn gốc pháp luật, quy phạm pháp luật và kỹ thuật lập pháp."], ["Luật Dân sự & Luật Hình sự", "Quyền tài sản, thừa kế, hợp đồng dân sự và các cấu thành tội phạm."]]],
      ["Chuyên ngành", [["Kỹ năng tranh tụng & Trình bày trước tòa", "Thực hành diễn án phiên tòa giả định, hỏi cung và đối đáp tại tòa."], ["Tư vấn pháp lý doanh nghiệp & Hợp đồng thương mại", "Thẩm định tính pháp lý của dự án đầu tư và giải quyết tranh chấp kinh doanh."]]],
    ],
    careers: [
      ["Thực thi & chuyên môn", "Chuyên viên pháp chế doanh nghiệp (Legal Officer)", "14 - 30 triệu/tháng", "Rà soát hợp đồng và tư vấn tuân thủ pháp luật cho ban giám đốc."],
      ["Thực thi & chuyên môn", "Luật sư tranh tụng / Luật sư tư vấn (Lawyer)", "25 - 60+ triệu/tháng", "Bào chữa cho thân chủ tại tòa án hoặc tư vấn các thương vụ M&A lớn."],
      ["Quản lý & chiến lược", "Thẩm phán / Kiểm sát viên / Trưởng văn phòng luật sư", "30 - 80 triệu/tháng", "Thực thi công lý và điều hành các tổ chức hành nghề luật sư."],
    ],
    demand: "Cao", growth: 12,
    aliases: ["luat", "luat hoc", "nganh luat", "law", "luat su", "phap ly", "phap che", "lkt", "luat kinh te"],
    degree: "Cử nhân",
    specializations: [
      { name: "Luật Kinh tế & Tranh chấp thương mại", code: "7380101-01", desc: "Giải quyết tranh chấp hợp đồng kinh tế tại Trung tâm Trọng tài Quốc tế (VIAC).", aliases: ["luat kinh te", "viac", "trong tai"] },
      { name: "Luật Dân sự, Tố tụng & Quyền sở hữu trí tuệ", code: "7380101-02", desc: "Bảo hộ bản quyền tác giả, nhãn hiệu thương mại và giải quyết kiện cáo dân sự.", aliases: ["so huu tri tue", "dan su", "ban quyen"] },
    ],
  },
  {
    slug: "luat-kinh-te", code: "7380107", name: "Luật Kinh tế", groupId: "xa-hoi", riasec: ["E", "C", "I"],
    summary: "Pháp luật về doanh nghiệp, hợp đồng thương mại, sáp nhập mua bán (M&A) và sở hữu trí tuệ.",
    description: "Chuyên sâu về các quy định pháp lý trong hoạt động đầu tư, chứng khoán, ngân hàng, bảo vệ quyền lợi của doanh nghiệp trước pháp luật.",
    curriculum: [
      ["Cơ sở ngành", [["Luật Doanh nghiệp & Luật Đầu tư", "Thủ tục thành lập công ty, quyền hạn cổ đông, hồ sơ cấp phép dự án."], ["Pháp luật về Cạnh tranh & Đấu thầu", "Chống độc quyền, kiểm soát thâu tóm và quy chế đấu thầu mua sắm công."]]],
      ["Chuyên ngành", [["Pháp lý Tài chính – Ngân hàng & Chứng khoán", "Quy định phát hành cổ phiếu, trái phiếu, thế chấp tài sản vay ngân hàng."], ["Giải quyết tranh chấp thương mại quốc tế", "Áp dụng luật quốc tế, quy tắc trọng tài quốc tế UNCITRAL, ICC."]]],
    ],
    careers: [
      ["Thực thi & chuyên môn", "Chuyên viên pháp chế doanh nghiệp / Ngân hàng", "15 - 32 triệu/tháng", "Bảo vệ an toàn pháp lý cho mọi giao dịch của doanh nghiệp."],
      ["Thực thi & chuyên môn", "Luật sư tư vấn M&A / Đầu tư tài chính", "25 - 65 triệu/tháng", "Thực hiện thẩm định pháp lý (Legal Due Diligence) trong các vụ thâu tóm."],
      ["Quản lý & chiến lược", "Giám đốc Pháp chế tập đoàn (Chief Legal Officer)", "45 - 90 triệu/tháng", "Hoạch định chiến lược tuân thủ pháp lý toàn diện cho tập đoàn."],
    ],
    demand: "Cao", growth: 14,
    aliases: ["lkt", "luat kinh te", "economic law", "luat doanh nghiep", "ma law"],
    degree: "Cử nhân",
    specializations: [
      { name: "Pháp lý Mua bán & Sáp nhập doanh nghiệp (M&A)", code: "7380107-01", desc: "Soạn thảo thỏa thuận cổ đông, cấu trúc thương vụ sáp nhập doanh nghiệp.", aliases: ["ma", "sap nhap", "dau tu"] },
    ],
  },
  {
    slug: "quan-he-quoc-te", code: "7310206", name: "Quan hệ quốc tế", groupId: "xa-hoi", riasec: ["E", "S", "A"],
    summary: "Ngoại giao nhà nước, chính sách đối ngoại, tổ chức phi chính phủ (NGO) và quan hệ đa phương.",
    description: "Đào tạo các nhà ngoại giao tương lai với kiến thức sâu rộng về địa chính trị thế giới, lễ tân ngoại giao và kỹ năng thương thuyết quốc tế.",
    curriculum: [
      ["Cơ sở ngành", [["Lịch sử quan hệ quốc tế & Địa chính trị", "Các trật tự thế giới từ Westphalia đến thời kỳ đa cực, cạnh tranh nước lớn."], ["Luật pháp quốc tế & Công ước Liên Hợp Quốc", "Công ước Luật biển UNCLOS, quyền con người, điều ước quốc tế."]]],
      ["Chuyên ngành", [["Nghiệp vụ Ngoại giao & Lễ tân quốc tế", "Quy tắc khánh tiết, tổ chức hội nghị cấp cao APEC, ASEAN, Liên Hợp Quốc."], ["Ngoại giao kinh tế & Ngoại giao văn hóa", "Xúc tiến thương mại song phương và quảng bá hình ảnh quốc gia."]]],
    ],
    careers: [
      ["Thực thi & chuyên môn", "Chuyên viên đối ngoại / Hợp tác quốc tế", "14 - 30 triệu/tháng", "Quản lý các chương trình hợp tác song phương với đại sứ quán, tổ chức quốc tế."],
      ["Thực thi & chuyên môn", "Cán bộ dự án tại tổ chức phi chính phủ (NGO / UN)", "18 - 40 triệu/tháng", "Điều phối các dự án viện trợ phát triển, xóa đói giảm nghèo."],
      ["Quản lý & chiến lược", "Nhà ngoại giao / Tùy viên đại sứ quán", "30 - 70 triệu/tháng", "Đại diện cho quốc gia trong các sự kiện ngoại giao chính thức."],
    ],
    demand: "Trung bình", growth: 12,
    aliases: ["qhqt", "quan he quoc te", "international relations", "ngoai giao", "ngo", "doi ngoai"],
    degree: "Cử nhân",
    specializations: [
      { name: "Ngoại giao & Giải quyết xung đột quốc tế", code: "7310206-01", desc: "Kỹ năng đàm phán hiệp định đa phương, phân tích chính sách an ninh quốc tế.", aliases: ["ngoai giao", "dam phan", "chinh tri"] },
    ],
  },
  {
    slug: "truyen-thong-da-phuong-tien", code: "7320104", name: "Truyền thông đa phương tiện", groupId: "xa-hoi", riasec: ["A", "E", "S"],
    summary: "Sản xuất video, podcast, đồ họa tương tác, quản trị nội dung mạng xã hội và kỹ xảo kỹ thuật số.",
    description: "Đào tạo các nhà sáng tạo nội dung đa năng (Content Creator), đạo diễn hình ảnh, dựng phim và quản lý các kênh YouTube, TikTok, Facebook.",
    curriculum: [
      ["Cơ sở ngành", [["Nhiếp ảnh & Ngôn ngữ hình ảnh / Ánh sáng", "Quy tắc khung hình, quay phim máy ảnh cơ, bố trí đèn studio."], ["Biên kịch & Kể chuyện bằng hình ảnh (Storytelling)", "Xây dựng kịch bản video viral, kịch bản quảng cáo TVC, phim ngắn."]]],
      ["Chuyên ngành", [["Dựng phim & Kỹ xảo hình ảnh (Premiere / After Effects)", "Chỉnh màu, cắt ghép âm thanh, tạo chuyển động Motion Graphics."], ["Chiến lược nội dung đa kênh & Quản trị Social Media", "Lập kế hoạch phân phối nội dung trên TikTok, YouTube, Podcast Spotify."]]],
    ],
    careers: [
      ["Thực thi & chuyên môn", "Chuyên viên sản xuất video / Dựng phim (Video Editor)", "14 - 28 triệu/tháng", "Sản xuất các sản phẩm video quảng cáo và nội dung giải trí."],
      ["Thực thi & chuyên môn", "Chuyên viên sáng tạo nội dung (Content Creator / Creative)", "15 - 35 triệu/tháng", "Xây dựng ý tưởng và kịch bản triệu view cho nhãn hàng."],
      ["Quản lý & chiến lược", "Giám đốc sáng tạo (Creative Director)", "35 - 80 triệu/tháng", "Định hướng thông điệp nghệ thuật cho toàn bộ chiến dịch truyền thông."],
    ],
    demand: "Rất cao", growth: 21,
    aliases: ["ttdpt", "multimedia", "truyen thong", "media", "video", "content creator", "editor"],
    degree: "Cử nhân",
    specializations: [
      { name: "Sản xuất Video Kỹ thuật số & Kỹ xảo Motion Graphics", code: "7320104-01", desc: "Thực hiện các thước phim TVC quảng cáo, đồ họa chuyển động 2D/3D.", aliases: ["video", "motion graphics", "tvc", "dung phim"] },
      { name: "Truyền thông Xã hội & Sáng tạo nội dung Viral", code: "7320104-02", desc: "Xây dựng kênh TikTok, YouTube doanh nghiệp từ 0 lên triệu người theo dõi.", aliases: ["tiktok", "youtube", "social media", "viral"] },
    ],
  },
  {
    slug: "quan-he-cong-chung", code: "7320103", name: "Quan hệ công chúng (PR)", groupId: "xa-hoi", riasec: ["E", "S", "A"],
    summary: "Xây dựng hình ảnh doanh nghiệp, tổ chức họp báo, quan hệ báo chí và xử lý khủng hoảng truyền thông.",
    description: "Đào tạo các chuyên gia PR kết nối thông tin giữa tổ chức với công chúng, cơ quan báo chí, người nổi tiếng (KOL/KOC) và cổ đông.",
    curriculum: [
      ["Cơ sở ngành", [["Viết cho quan hệ công chúng (PR Writing)", "Soạn thảo thông cáo báo chí, bài diễn văn lãnh đạo, thư ngỏ."], ["Tâm lý học công chúng & Dư luận xã hội", "Đo lường phản ứng dư luận và thấu hiểu tâm lý đám đông."]]],
      ["Chuyên ngành", [["Tổ chức sự kiện & Họp báo (Event Management)", "Lập kế hoạch sự kiện ra mắt sản phẩm mới, lễ ký kết đối tác."], ["Quản trị khủng hoảng truyền thông (Crisis Management)", "Quy trình ứng phó 24h khi có tin tiêu cực trên mạng xã hội."]]],
    ],
    careers: [
      ["Thực thi & chuyên môn", "Chuyên viên Quan hệ công chúng (PR Executive)", "13 - 26 triệu/tháng", "Viết bài PR, duy trì quan hệ với phóng viên các tòa soạn báo."],
      ["Thực thi & chuyên môn", "Chuyên viên quản lý KOL / Booking", "15 - 30 triệu/tháng", "Thương lượng hợp đồng và quản lý bài đăng của người nổi tiếng."],
      ["Quản lý & chiến lược", "Giám đốc Truyền thông đối ngoại (PR Director)", "35 - 75 triệu/tháng", "Bảo vệ danh tiếng thương hiệu và xử lý các sự cố truyền thông lớn."],
    ],
    demand: "Cao", growth: 16,
    aliases: ["pr", "qhcc", "quan he cong chung", "public relations", "hop bao", "khung hoang truyen thong"],
    degree: "Cử nhân",
    specializations: [
      { name: "Quản trị Khủng hoảng & Truyền thông doanh nghiệp", code: "7320103-01", desc: "Chiến lược bảo vệ uy tín thương hiệu và phản hồi dư luận chuyên nghiệp.", aliases: ["khung hoang", "uy tin", "doanh nghiep"] },
      { name: "Tổ chức Sự kiện & Quan hệ Báo chí – KOLs", code: "7320103-02", desc: "Quản lý mạng lưới nhà báo, người có tầm ảnh hưởng và tổ chức đại nhạc hội.", aliases: ["su kien", "kol", "bao chi"] },
    ],
  },
  {
    slug: "bao-chi", code: "7320101", name: "Báo chí", groupId: "xa-hoi", riasec: ["A", "E", "S"],
    summary: "Thu thập tin tức, phỏng vấn, điều tra sự thật, viết phóng sự báo in, báo điện tử và truyền hình.",
    description: "Đào tạo các nhà báo có đạo đức nghề nghiệp, bản lĩnh điều tra, kỹ năng phỏng vấn sắc sảo và sản xuất báo chí dữ liệu hiện đại (Data Journalism).",
    curriculum: [
      ["Cơ sở ngành", [["Lý thuyết tác phẩm báo chí & Đạo đức nghề báo", "Các thể loại tin, phóng sự, ghi chép, bình luận và luật báo chí."], ["Kỹ năng phỏng vấn & Thu thập nguồn tin", "Nghệ thuật đặt câu hỏi, kiểm chứng độ xác thực của thông tin."]]],
      ["Chuyên ngành", [["Sản xuất tin tức báo điện tử & Mega-story", "Viết bài E-magazine, Long-form, tương tác đa phương tiện trên website."], ["Báo chí điều tra & Truyền hình thực tế", "Kỹ năng thâm nhập thực tế, quay phóng sự điều tra tiêu cực xã hội."]]],
    ],
    careers: [
      ["Thực thi & chuyên môn", "Phóng viên / Nhà báo (Reporter / Journalist)", "12 - 25 triệu/tháng", "Tác nghiệp tại hiện trường, đưa tin nóng và viết bài điều tra."],
      ["Thực thi & chuyên môn", "Biên tập viên báo điện tử / Truyền hình (Editor)", "15 - 30 triệu/tháng", "Biên tập nội dung bản tin và kiểm duyệt tin bài trước khi xuất bản."],
      ["Quản lý & chiến lược", "Tổng biên tập / Phó tổng biên tập tòa soạn", "35 - 75 triệu/tháng", "Định hướng chính trị và điều hành toàn bộ hoạt động của cơ quan báo chí."],
    ],
    demand: "Trung bình", growth: 10,
    aliases: ["bc", "bao chi", "journalism", "nha bao", "phong vien", "bien tap vien", "truyen hinh"],
    degree: "Cử nhân",
    specializations: [
      { name: "Báo chí Điện tử & Dữ liệu tương tác (Data Journalism)", code: "7320101-01", desc: "Khai phá dữ liệu lớn để vẽ biểu đồ tương tác và kể chuyện bằng infographic.", aliases: ["bao dien tu", "data journalism", "infographic"] },
      { name: "Phóng sự Truyền hình & Phát thanh Podcast", code: "7320101-02", desc: "Dẫn chương trình bản tin thời sự, sản xuất phóng sự truyền hình trực tiếp.", aliases: ["truyen hinh", "phat thanh", "mc"] },
    ],
  },
  {
    slug: "tam-ly-hoc", code: "7310401", name: "Tâm lý học", groupId: "xa-hoi", riasec: ["I", "S", "A"],
    summary: "Nghiên cứu hành vi con người, tư vấn tham vấn tâm lý học đường, gia đình và trị liệu tâm lý.",
    description: "Đào tạo các chuyên gia tâm lý thấu hiểu cảm xúc, đánh giá rối loạn tâm lý (trầm cảm, lo âu) và trị liệu tâm lý theo phương pháp khoa học.",
    curriculum: [
      ["Cơ sở ngành", [["Tâm lý học đại cương & Tâm lý học phát triển", "Sự hình thành nhận thức, nhân cách từ thời thơ ấu đến tuổi già."], ["Đo lường & Trắc nghiệm tâm lý", "Sử dụng các bộ test chỉ số IQ, EQ, trầm cảm Beck, MBTI, DISC."]]],
      ["Chuyên ngành", [["Tham vấn tâm lý cá nhân & Gia đình", "Kỹ năng lắng nghe thấu cảm, đặt câu hỏi gợi mở và đồng hành tháo gỡ bế tắc."], ["Tâm lý học tổ chức & Nhân sự (I/O Psychology)", "Khảo sát động lực làm việc của nhân viên, giải quyết xung đột văn hóa công ty."]]],
    ],
    careers: [
      ["Thực thi & chuyên môn", "Chuyên viên tham vấn tâm lý học đường / Phòng khám", "14 - 28 triệu/tháng", "Tư vấn gỡ rối tâm lý cho học sinh, thanh thiếu niên và người lớn."],
      ["Thực thi & chuyên môn", "Chuyên viên đào tạo & Phát triển nhân tài (L&D)", "16 - 32 triệu/tháng", "Đánh giá tâm lý ứng viên và xây dựng văn hóa làm việc tích cực."],
      ["Quản lý & chiến lược", "Chuyên gia trị liệu tâm lý độc lập", "30 - 70+ triệu/tháng", "Mở trung tâm trị liệu tâm lý và huấn luyện kỹ năng sống."],
    ],
    demand: "Cao", growth: 19,
    aliases: ["tlh", "tam ly hoc", "psychology", "tam ly", "tu van tam ly", "tham van", "tri lieu"],
    degree: "Cử nhân",
    specializations: [
      { name: "Tham vấn & Trị liệu Tâm lý Lâm sàng", code: "7310401-01", desc: "Ứng dụng liệu pháp nhận thức hành vi (CBT) điều trị lo âu, trầm cảm.", aliases: ["lam sang", "cbt", "tri lieu"] },
      { name: "Tâm lý học Tổ chức & Trải nghiệm Nhân viên (I/O Psychology)", code: "7310401-02", desc: "Xây dựng môi trường làm việc hạnh phúc, giảm stress công sở và burnout.", aliases: ["cong so", "nhan su", "to chuc"] },
    ],
  },
  {
    slug: "ngon-ngu-anh", code: "7220201", name: "Ngôn ngữ Anh", groupId: "xa-hoi", riasec: ["A", "S", "E"],
    summary: "Thành thạo tiếng Anh học thuật C1-C2, biên phiên dịch cabin, giảng dạy và tiếng Anh thương mại.",
    description: "Đào tạo các cử nhân có khả năng dịch thuật văn bản ngoại giao, hợp đồng kinh tế và giảng dạy tiếng Anh chuẩn quốc tế IELTS, TESOL.",
    curriculum: [
      ["Cơ sở ngành", [["Ngữ âm – Âm vị học & Ngữ pháp nâng cao", "Phát âm chuẩn IPA giọng Anh-Anh hoặc Anh-Mỹ, cấu trúc câu học thuật."], ["Văn hóa – Văn học các nước nói tiếng Anh", "Hiểu bối cảnh lịch sử, phong tục tập quán của Anh, Mỹ, Úc, Canada."]]],
      ["Chuyên ngành", [["Biên dịch nâng cao (Dịch thuật tài liệu chuyên ngành)", "Dịch thuật tài liệu y khoa, pháp luật, tài chính có độ chính xác tuyệt đối."], ["Phiên dịch đuổi & Phiên dịch Cabin", "Kỹ năng dịch song song tại các hội nghị thượng đỉnh quốc tế."]]],
    ],
    careers: [
      ["Thực thi & chuyên môn", "Biên dịch viên / Phiên dịch viên Cabin", "16 - 35 triệu/tháng", "Dịch tài liệu hợp đồng và phiên dịch trực tiếp tại hội thảo quốc tế."],
      ["Thực thi & chuyên môn", "Giảng viên tiếng Anh / Giáo viên IELTS", "18 - 45 triệu/tháng", "Giảng dạy tại các trường đại học, trường quốc tế và trung tâm ngoại ngữ."],
      ["Quản lý & chiến lược", "Trưởng phòng đối ngoại doanh nghiệp nước ngoài", "30 - 65 triệu/tháng", "Đại diện công ty làm việc với các đối tác nước ngoài."],
    ],
    demand: "Cao", growth: 13,
    aliases: ["nna", "tieng anh", "ngon ngu anh", "english", "tieng anh thuong mai", "ielts", "bien phien dich", "ngoai ngu anh"],
    degree: "Cử nhân",
    specializations: [
      { name: "Biên phiên dịch Hội nghị Quốc tế (Cabin Interpretation)", code: "7220201-01", desc: "Luyện dịch song song thời gian thực không độ trễ tại các diễn đàn đa quốc gia.", aliases: ["cabin", "phien dich", "dich thuat"] },
      { name: "Tiếng Anh Thương mại & Giao tiếp Doanh nghiệp Quốc tế", code: "7220201-02", desc: "Thư tín thương mại quốc tế, đàm phán hợp đồng ngoại thương bằng tiếng Anh.", aliases: ["thuong mai", "business english"] },
    ],
  },
  {
    slug: "ngoai-ngu-anh", code: "7220201", name: "Ngôn ngữ Anh", groupId: "xa-hoi", riasec: ["A", "S", "E"],
    summary: "Thành thạo tiếng Anh học thuật C1-C2, biên phiên dịch cabin, giảng dạy và tiếng Anh thương mại.",
    description: "Đào tạo các cử nhân có khả năng dịch thuật văn bản ngoại giao, hợp đồng kinh tế và giảng dạy tiếng Anh chuẩn quốc tế IELTS, TESOL.",
    curriculum: [
      ["Cơ sở ngành", [["Ngữ âm – Âm vị học & Ngữ pháp nâng cao", "Phát âm chuẩn IPA, cấu trúc câu học thuật."], ["Văn hóa các nước nói tiếng Anh", "Hiểu bối cảnh lịch sử, phong tục tập quán của Anh, Mỹ."]]],
      ["Chuyên ngành", [["Biên dịch & Phiên dịch Cabin", "Dịch thuật tài liệu y khoa, pháp luật, tài chính."], ["Tiếng Anh Thương mại", "Soạn thảo hợp đồng, đàm phán thương mại quốc tế."]]],
    ],
    careers: [
      ["Thực thi & chuyên môn", "Biên phiên dịch viên tiếng Anh", "16 - 35 triệu/tháng", "Dịch thuật văn bản và phiên dịch hội nghị."],
      ["Thực thi & chuyên môn", "Giáo viên tiếng Anh / Giảng viên IELTS", "18 - 45 triệu/tháng", "Giảng dạy tại các trường và trung tâm ngoại ngữ."],
    ],
    demand: "Cao", growth: 13,
    aliases: ["nna", "tieng anh", "ngoai ngu anh", "english", "bien dich"],
    degree: "Cử nhân",
    specializations: [
      { name: "Biên phiên dịch chuyên nghiệp", code: "7220201-01", desc: "Dịch thuật hội nghị quốc tế và văn bản chuyên ngành.", aliases: ["cabin", "phien dich"] },
    ],
  },
  {
    slug: "ngoai-ngu-nhat", code: "7220209", name: "Ngôn ngữ Nhật", groupId: "xa-hoi", riasec: ["A", "S", "E"],
    summary: "Thành thạo tiếng Nhật chuẩn N2-N1, văn hóa doanh nghiệp Nhật (Omotenashi) và biên phiên dịch IT (Comtor).",
    description: "Đào tạo các cử nhân tiếng Nhật làm việc tại các công ty Nhật Bản (FDI), kỹ sư cầu nối IT (BrSE) và thông dịch viên nhà máy.",
    curriculum: [
      ["Cơ sở ngành", [["Chữ Hán Kanji & Ngữ pháp tiếng Nhật N3-N2", "Ghi nhớ 2000 chữ Hán thường dụng và mẫu câu kính ngữ Keigo."], ["Văn hóa kinh doanh & Ứng xử Nhật Bản", "Quy tắc chào hỏi, cúi đầu, trao đổi danh thiếp và tác phong đúng giờ."]]],
      ["Chuyên ngành", [["Biên phiên dịch IT tiếng Nhật (IT Comtor)", "Dịch thuật tài liệu đặc tả phần mềm SRS và kết nối đội ngũ Dev Việt – Khách Nhật."], ["Tiếng Nhật Thương mại & Đàm phán ngoại thương", "Thư tín thương mại kiểu Nhật, đàm phán hợp đồng cung ứng phụ tùng."]]],
    ],
    careers: [
      ["Thực thi & chuyên môn", "Thông dịch viên tiếng Nhật nhà máy / Doanh nghiệp", "16 - 32 triệu/tháng", "Dịch thuật chỉ đạo của chuyên gia Nhật Bản cho công nhân."],
      ["Thực thi & chuyên môn", "Biên dịch viên CNTT (IT Comtor) / Kỹ sư cầu nối (BrSE)", "20 - 45 triệu/tháng", "Cầu nối giao tiếp giữa công ty phần mềm Việt Nam với khách hàng Nhật."],
      ["Quản lý & chiến lược", "Trợ lý giám đốc người Nhật", "25 - 55 triệu/tháng", "Sắp xếp lịch trình, đàm phán và dịch thuật cho lãnh đạo cấp cao."],
    ],
    demand: "Rất cao", growth: 17,
    aliases: ["nnn", "tieng nhat", "ngon ngu nhat", "japanese", "comtor", "brse", "kanji", "n1", "n2"],
    degree: "Cử nhân",
    specializations: [
      { name: "Biên phiên dịch Công nghệ thông tin (IT Comtor)", code: "7220209-01", desc: "Dịch thuật tài liệu kỹ thuật phần mềm, quản lý dự án outsourcing với Nhật.", aliases: ["comtor", "brse", "it comtor"] },
    ],
  },
  {
    slug: "ngoai-ngu-trung", code: "7220204", name: "Ngôn ngữ Trung Quốc", groupId: "xa-hoi", riasec: ["A", "S", "E"],
    summary: "Thành thạo tiếng Trung chuẩn HSK 5-6, thương mại xuyên biên giới Trung – Việt và dịch thuật du lịch.",
    description: "Đào tạo các cử nhân tiếng Trung am hiểu thị trường tỷ dân Trung Quốc, phục vụ nhu cầu thông dịch khổng lồ của các nhà máy FDI và sàn TMĐT Taobao, 1688.",
    curriculum: [
      ["Cơ sở ngành", [["Ngữ âm Hán ngữ & Chữ Hán giản thể/phồn thể", "Phát âm chuẩn Pinyin, bộ thủ chữ Hán và ngữ pháp nâng cao."], ["Tổng quan đất nước học Trung Quốc", "Hiểu địa lý kinh tế các tỉnh Quảng Đông, Thượng Hải, Thâm Quyến."]]],
      ["Chuyên ngành", [["Tiếng Trung Thương mại & Đàm phán nguồn hàng", "Kỹ năng tìm nguồn hàng giá xưởng, khiếu nại chất lượng và đàm phán chiết khấu."], ["Biên phiên dịch hội nghị & Du lịch lữ hành", "Dịch thuật đoàn khách Trung Quốc, hội thảo giao thương quốc tế."]]],
    ],
    careers: [
      ["Thực thi & chuyên môn", "Chuyên viên tìm nguồn hàng & Nhập hàng Trung Quốc", "15 - 32 triệu/tháng", "Đàm phán với các nhà máy Trung Quốc trên sàn 1688, Taobao."],
      ["Thực thi & chuyên môn", "Phiên dịch viên tiếng Trung tại nhà máy FDI", "16 - 30 triệu/tháng", "Thông dịch giữa chuyên gia Trung Quốc, Đài Loan với nhân sự Việt Nam."],
      ["Quản lý & chiến lược", "Trưởng đại diện thương mại tại Trung Quốc", "30 - 70 triệu/tháng", "Phát triển thị trường xuất khẩu nông sản, hàng hóa sang Trung Quốc."],
    ],
    demand: "Rất cao", growth: 19,
    aliases: ["nnt", "tieng trung", "ngon ngu trung", "chinese", "hsk", "pinyin", "trung quoc", "tieng hoa"],
    degree: "Cử nhân",
    specializations: [
      { name: "Tiếng Trung Thương mại & Chuỗi cung ứng Trung – Việt", code: "7220204-01", desc: "Nghiệp vụ đàm phán hợp đồng mua bán với đối tác Trung Quốc, Đài Loan.", aliases: ["thuong mai", "nguon hang", "1688"] },
    ],
  },

  // ==================== 6. NGHỆ THUẬT – THIẾT KẾ (nghe-thuat) ====================
  {
    slug: "thiet-ke-do-hoa", code: "7210403", name: "Thiết kế đồ họa", groupId: "nghe-thuat", riasec: ["A", "R", "I"],
    summary: "Bộ nhận diện thương hiệu, thiết kế bao bì, giao diện UI/UX và minh họa kỹ thuật số (Digital Art).",
    description: "Đào tạo các nhà thiết kế đồ họa có tư duy thẩm mỹ cao, làm chủ bộ công cụ Adobe Creative Cloud (Photoshop, Illustrator, InDesign, Figma) và 3D Blender.",
    curriculum: [
      ["Cơ sở ngành", [["Màu sắc học & Nghệ thuật chữ (Typography)", "Vòng tròn màu sắc, phối màu tương phản, bố cục chữ trong thiết kế."], ["Vẽ tay phác thảo & Nguyên lý bố cục thị giác", "Phác thảo ý tưởng thumbnail, tỷ lệ thị giác và điểm nhấn ấn tượng."]]],
      ["Chuyên ngành", [["Thiết kế Bộ nhận diện thương hiệu (Branding Identity)", "Sáng tạo Logo, Brand Guidelines, bao bì sản phẩm và ấn phẩm quảng cáo."], ["Thiết kế giao diện & Trải nghiệm người dùng (UI/UX)", "Thiết kế giao diện ứng dụng di động, website trên Figma, tạo Prototype tương tác."]]],
    ],
    careers: [
      ["Thực thi & chuyên môn", "Chuyên viên thiết kế đồ họa (Graphic Designer)", "12 - 25 triệu/tháng", "Thiết kế banner, poster, bao bì và ấn phẩm mạng xã hội."],
      ["Thực thi & chuyên môn", "Nhà thiết kế UI/UX cho ứng dụng công nghệ", "18 - 38 triệu/tháng", "Thiết kế giao diện app ngân hàng, e-commerce, phần mềm SaaS."],
      ["Quản lý & chiến lược", "Giám đốc nghệ thuật (Art Director)", "35 - 75 triệu/tháng", "Quyết định toàn bộ phong cách hình ảnh và thị giác cho thương hiệu."],
    ],
    demand: "Rất cao", growth: 17,
    aliases: ["tkdh", "graphic design", "thiet ke do hoa", "do hoa", "designer", "ui ux", "figma", "photoshop"],
    degree: "Cử nhân",
    specializations: [
      { name: "Thiết kế Trải nghiệm Người dùng & Giao diện số (UI/UX)", code: "7210403-01", desc: "Thiết kế Design System, nghiên cứu người dùng (User Research) trên Figma.", aliases: ["ui ux", "figma", "web design", "app design"] },
      { name: "Thiết kế Nhận diện Thương hiệu & Bao bì cao cấp", code: "7210403-02", desc: "Sáng tạo logo, hệ thống guideline thương hiệu và cấu trúc bao bì độc quyền.", aliases: ["branding", "logo", "bao bi"] },
    ],
  },
  {
    slug: "thiet-ke-noi-that", code: "7580108", name: "Thiết kế nội thất", groupId: "nghe-thuat", riasec: ["A", "R", "E"],
    summary: "Bố trí không gian nội thất căn hộ, biệt thự, showroom, vật liệu gỗ và ánh sáng trang trí.",
    description: "Đào tạo các nhà thiết kế không gian nội thất biết cách biến những căn phòng thô thành không gian sống tiện nghi, sang trọng qua 3ds Max, Corona Render.",
    curriculum: [
      ["Cơ sở ngành", [["Công thái học & Nhân trắc học nội thất", "Kích thước tiêu chuẩn bàn ghế, giường tủ phù hợp với cơ thể người."], ["Vật liệu hoàn thiện nội thất & Ánh sáng", "Gỗ công nghiệp MDF, đá nhân tạo, kính cường lực và phân tầng ánh sáng."]]],
      ["Chuyên ngành", [["Mô phỏng không gian 3D (3ds Max / V-Ray / Corona)", "Render ảnh chất lượng cao phối cảnh phòng khách, phòng ngủ, bếp."], ["Hồ sơ kỹ thuật thi công & Bóc tách đồ gỗ", "Bản vẽ chi tiết đóng tủ, kệ, hệ thống điện nước âm tường cho thợ mộc."]]],
    ],
    careers: [
      ["Thực thi & chuyên môn", "Nhà thiết kế nội thất 3D (Interior Designer)", "14 - 30 triệu/tháng", "Lên bản vẽ concept 3D và tư vấn vật liệu cho chủ nhà."],
      ["Thực thi & chuyên môn", "Kỹ sư giám sát thi công nội thất hiện trường", "15 - 28 triệu/tháng", "Kiểm tra tiến độ lắp đặt đồ gỗ, sơn bả và hoàn thiện công trình."],
      ["Quản lý & chiến lược", "Chủ xưởng sản xuất / Công ty nội thất", "35 - 85 triệu/tháng", "Nhận thầu thiết kế thi công trọn gói biệt thự, khách sạn."],
    ],
    demand: "Cao", growth: 14,
    aliases: ["tknt", "interior design", "thiet ke noi that", "noi that", "3ds max", "decor"],
    degree: "Cử nhân",
    specializations: [
      { name: "Thiết kế Nội thất Nhà ở cao cấp & Biệt thự (Residential)", code: "7580108-01", desc: "Phong cách Indochine, Hiện đại, Tân cổ điển, Tối giản Japandi.", aliases: ["nha o", "biet thu", "can ho"] },
      { name: "Thiết kế Không gian Thương mại & Khách sạn (Commercial)", code: "7580108-02", desc: "Thiết kế quán cafe, nhà hàng, showroom thời trang và sảnh khách sạn 5 sao.", aliases: ["thuong mai", "showroom", "cafe", "nha hang"] },
    ],
  },

  // ==================== 7. SƯ PHẠM – GIÁO DỤC (giao-duc) ====================
  {
    slug: "su-pham-toan", code: "7140209", name: "Sư phạm Toán học", groupId: "giao-duc", riasec: ["I", "S", "C"],
    summary: "Phương pháp giảng dạy Toán cấp THCS – THPT, bồi dưỡng học sinh giỏi và toán ứng dụng.",
    description: "Đào tạo các giáo viên dạy Toán có kiến thức chuyên sâu, phương pháp sư phạm hiện đại, ứng dụng GeoGebra và công nghệ số vào bài giảng.",
    curriculum: [
      ["Cơ sở ngành", [["Giải tích nâng cao, Đại số trừu tượng & Hình học giải tích", "Nền tảng toán học hàn lâm giúp hiểu sâu bản chất toán học phổ thông."], ["Tâm lý học sư phạm & Giáo dục học", "Phương pháp quản lý lớp học, tâm lý lứa tuổi học sinh tuổi dậy thì."]]],
      ["Chuyên ngành", [["Phương pháp dạy học môn Toán THPT & Đổi mới SGK", "Thiết kế giáo án theo định hướng phát triển năng lực, ma trận đề thi trắc nghiệm."], ["Ứng dụng công nghệ & Bồi dưỡng học sinh giỏi Toán", "Luyện thi chuyên toán, Olympic Toán và dạy học STEM môn Toán."]]],
    ],
    careers: [
      ["Thực thi & chuyên môn", "Giáo viên Toán tại trường THPT công lập / Tư thục chất lượng cao", "12 - 35 triệu/tháng", "Giảng dạy chính khóa và bồi dưỡng đội tuyển học sinh giỏi."],
      ["Thực thi & chuyên môn", "Chuyên gia phát triển chương trình Toán (EdTech / SGK)", "16 - 32 triệu/tháng", "Xây dựng khóa học trực tuyến, video bài giảng toán số."],
      ["Quản lý & chiến lược", "Hiệu trưởng / Giám đốc học thuật trường quốc tế", "30 - 70 triệu/tháng", "Quản lý chương trình giáo dục toàn diện của nhà trường."],
    ],
    demand: "Cao", growth: 11,
    aliases: ["spt", "su pham toan", "su pham toan hoc", "giao vien toan", "toan hoc", "su pham"],
    degree: "Cử nhân Sư phạm (Miễn học phí theo NĐ 116)",
    specializations: [
      { name: "Phương pháp Giảng dạy Toán THPT & Luyện thi Chuyên", code: "7140209-01", desc: "Bồi dưỡng chuyên đề giải bài toán khó, luyện thi Đại học và Olympic.", aliases: ["chuyen toan", "luyen thi", "thpt"] },
    ],
  },
  {
    slug: "su-pham-toan-hoc", code: "7140209", name: "Sư phạm Toán học", groupId: "giao-duc", riasec: ["I", "S", "C"],
    summary: "Phương pháp giảng dạy Toán cấp THCS – THPT, bồi dưỡng học sinh giỏi và toán ứng dụng.",
    description: "Đào tạo các giáo viên dạy Toán có kiến thức chuyên sâu, phương pháp sư phạm hiện đại.",
    curriculum: [
      ["Cơ sở ngành", [["Giải tích nâng cao & Đại số trừu tượng", "Nền tảng toán học hàn lâm."], ["Tâm lý học sư phạm", "Phương pháp quản lý lớp học."]]],
      ["Chuyên ngành", [["Phương pháp dạy học môn Toán", "Thiết kế giáo án đổi mới."], ["Bồi dưỡng học sinh giỏi Toán", "Luyện thi Olympic Toán học."]]],
    ],
    careers: [
      ["Thực thi & chuyên môn", "Giáo viên Toán THPT", "12 - 35 triệu/tháng", "Giảng dạy tại các trường THPT."],
    ],
    demand: "Cao", growth: 11,
    aliases: ["spt", "su pham toan hoc", "su pham toan", "giao vien toan"],
    degree: "Cử nhân Sư phạm",
  },
  {
    slug: "su-pham-tieng-anh", code: "7140231", name: "Sư phạm Tiếng Anh", groupId: "giao-duc", riasec: ["S", "A", "E"],
    summary: "Phương pháp giảng dạy tiếng Anh chuẩn quốc tế (TESOL/CELTA), thiết kế giáo trình và khảo thí ngôn ngữ.",
    description: "Đào tạo các giáo viên tiếng Anh tài năng cho các trường THCS, THPT chuyên và các hệ thống trường song ngữ quốc tế.",
    curriculum: [
      ["Cơ sở ngành", [["Ngữ pháp thực hành & Ngữ âm học ứng dụng", "Nắm vững lý thuyết thụ đắc ngôn ngữ thứ hai (SLA)."], ["Phương pháp giảng dạy 4 kỹ năng Nghe – Nói – Đọc – Viết", "Các kỹ thuật dạy từ vựng qua trò chơi (Gamification), phát âm tương tác."]]],
      ["Chuyên ngành", [["Thiết kế giáo án TESOL & Ứng dụng công nghệ EdTech", "Sử dụng bảng tương tác, ứng dụng AI hỗ trợ chấm bài nói/viết."], ["Khảo thí & Đánh giá năng lực ngoại ngữ (Assessment)", "Biên soạn đề thi chuẩn theo Khung 6 bậc Việt Nam và chuẩn Cambridge."]]],
    ],
    careers: [
      ["Thực thi & chuyên môn", "Giáo viên tiếng Anh trường Chuyên / Trường Song ngữ", "15 - 40 triệu/tháng", "Giảng dạy chương trình Cambridge, tiếng Anh tăng cường."],
      ["Thực thi & chuyên môn", "Chuyên gia luyện thi chứng chỉ quốc tế (IELTS / SAT)", "20 - 50 triệu/tháng", "Tập trung rèn luyện kỹ năng Speaking & Writing điểm cao."],
      ["Quản lý & chiến lược", "Giám đốc Đào tạo trung tâm Anh ngữ lớn", "35 - 75 triệu/tháng", "Quản lý đội ngũ giáo viên bản xứ và giáo viên Việt Nam."],
    ],
    demand: "Rất cao", growth: 16,
    aliases: ["spta", "su pham tieng anh", "giao vien tieng anh", "tesol", "celta", "tieng anh", "ielts teacher"],
    degree: "Cử nhân Sư phạm (Miễn học phí theo NĐ 116)",
    specializations: [
      { name: "Phương pháp Giảng dạy Quốc tế TESOL / Cambridge", code: "7140231-01", desc: "Giảng dạy chương trình tiếng Anh tích hợp liên môn CLIL cho trường quốc tế.", aliases: ["tesol", "cambridge", "clil"] },
    ],
  },

  // ==================== 8. NÔNG – LÂM – THÚ Y (nong-lam) ====================
  {
    slug: "thu-y", code: "7640101", name: "Thú y (Bác sĩ Thú y)", groupId: "nong-lam", riasec: ["R", "I", "S"],
    summary: "Chẩn đoán, phẫu thuật, tiêm phòng cho thú cưng (chó, mèo) và kiểm soát dịch bệnh đàn gia súc, gia cầm.",
    description: "Đào tạo các Bác sĩ Thú y (5 năm) có khả năng khám chữa bệnh tại các bệnh viện thú cưng hiện đại hoặc quản lý sức khỏe đàn vật nuôi quy mô trang trại lớn.",
    curriculum: [
      ["Cơ sở ngành", [["Giải phẫu & Sinh lý động vật", "Cơ quan nội tạng của chó, mèo, bò, lợn, gia cầm."], ["Vi sinh vật & Bệnh truyền nhiễm thú y", "Virus cúm gia cầm, dịch tả lợn châu Phi, bệnh dại và cơ chế lây lan sang người."]]],
      ["Chuyên ngành", [["Nội khoa & Ngoại khoa thú cưng (Pet Clinic)", "Phẫu thuật mổ đẻ, triệt sản, chỉnh hình xương và siêu âm cho chó mèo."], ["Dịch tễ học & Vệ sinh an toàn thực phẩm có nguồn gốc động vật", "Kiểm dịch giết mổ và quy trình phòng chống dịch bệnh an toàn sinh học."]]],
    ],
    careers: [
      ["Thực thi & chuyên môn", "Bác sĩ Thú y phòng khám thú cưng (Pet Care)", "15 - 35 triệu/tháng", "Khám, chữa bệnh, tiêm vắc-xin và phẫu thuật thú nhỏ."],
      ["Thực thi & chuyên môn", "Bác sĩ thú y quản lý trại chăn nuôi công nghiệp (CP, Japfa)", "18 - 38 triệu/tháng", "Giám sát an toàn sinh học cho đàn heo, gà hàng vạn con."],
      ["Quản lý & chiến lược", "Chủ hệ thống bệnh viện thú y / Pet Shop", "40 - 100+ triệu/tháng", "Cung cấp trọn gói dịch vụ spa, khách sạn thú cưng và khám chữa bệnh."],
    ],
    demand: "Rất cao", growth: 22,
    aliases: ["ty", "thu y", "bac si thu y", "veterinary", "thu cung", "pet", "thu-y-bac-si"],
    degree: "Bác sĩ Thú y (5 năm)",
    specializations: [
      { name: "Khám chữa bệnh & Phẫu thuật Thú cưng (Small Animal / Pet Care)", code: "7640101-01", desc: "Nội soi, phẫu thuật chỉnh hình xương, điều trị bệnh ngoài da cho chó mèo.", aliases: ["pet care", "thu cung", "cho meo"] },
      { name: "An toàn Sinh học & Dịch tễ học Trang trại Công nghệ cao", code: "7640101-02", desc: "Phòng chống dịch bệnh cho các trang trại chăn nuôi quy mô hàng triệu con.", aliases: ["trang trai", "dich te", "an toan sinh hoc"] },
    ],
  },
  {
    slug: "nong-nghiep-cong-nghe-cao", code: "7620101", name: "Nông nghiệp công nghệ cao", groupId: "nong-lam", riasec: ["R", "I", "C"],
    summary: "Trồng trọt nhà màng thông minh, nông nghiệp chính xác IoT, thủy canh hồi lưu và giống cây biến đổi gen.",
    description: "Đào tạo các kỹ sư làm chủ công nghệ điều khiển khí hậu nhà kính tự động bằng cảm biến, drone phun thuốc và sản xuất rau quả sạch đạt chuẩn xuất khẩu.",
    curriculum: [
      ["Cơ sở ngành", [["Sinh lý thực vật & Dinh dưỡng cây trồng", "Sự hấp thụ khoáng N-P-K, quang hợp và cơ chế kích thích sinh trưởng."], ["Hệ thống tưới tự động & Cảm biến IoT nông nghiệp", "Cảm biến đo độ ẩm đất, EC, pH và tự động hòa trộn dinh dưỡng."]]],
      ["Chuyên ngành", [["Công nghệ nhà kính & Thủy canh/Khí canh", "Quy trình trồng dưa lưới, dâu tây, rau thủy canh trong môi trường vô trùng."], ["Công nghệ sinh học chọn tạo giống cây trồng", "Nuôi cấy mô tế bào thực vật và chọn lọc các giống cây kháng sâu bệnh."]]],
    ],
    careers: [
      ["Thực thi & chuyên môn", "Kỹ sư Nông nghiệp công nghệ cao", "14 - 26 triệu/tháng", "Quản lý vận hành các trang trại dưa lưới, dâu tây, rau sạch nhà màng."],
      ["Thực thi & chuyên môn", "Chuyên viên R&D giống cây trồng / Phân bón sinh học", "15 - 28 triệu/tháng", "Nghiên cứu các giải pháp sinh học an toàn cho nông nghiệp."],
      ["Quản lý & chiến lược", "Giám đốc Nông trường công nghệ cao", "30 - 60 triệu/tháng", "Quản lý toàn bộ quy trình canh tác và chuỗi cung ứng nông sản sạch."],
    ],
    demand: "Cao", growth: 15,
    aliases: ["nncnc", "nong nghiep", "smart farming", "thuy canh", "nong nghiep cong nghe cao", "nha mang"],
    degree: "Kỹ sư",
    specializations: [
      { name: "Canh tác Thông minh & Nhà màng IoT", code: "7620101-01", desc: "Chuyên sâu về công nghệ thủy canh hồi lưu, nhà màng thông minh tự động hóa.", aliases: ["iot", "thuy canh", "nha mang"] },
      { name: "Nông nghiệp hữu cơ & Tiêu chuẩn VietGAP / GlobalGAP", code: "7620101-02", desc: "Quy trình kiểm soát chất lượng nông sản sạch đạt tiêu chuẩn xuất khẩu sang Mỹ, EU, Nhật.", aliases: ["vietgap", "globalgap", "huu co"] },
    ],
  },
];

const toCurriculum = (c: Seed["curriculum"]): CurriculumBlock[] =>
  c.map(([title, items]) => ({ title, items: items.map(([name, desc]) => ({ name, desc })) }));

export const majors: Major[] = seeds.map((s) => ({
  id: s.slug,
  slug: s.slug,
  code: s.code,
  name: s.name,
  groupId: s.groupId,
  riasec: s.riasec,
  summary: s.summary,
  description: s.description,
  curriculum: toCurriculum(s.curriculum),
  careers: s.careers.map(([level, title, salary, desc]) => ({ level, title, salary, desc })),
  demand: s.demand,
  growth: s.growth,
  aliases: s.aliases,
  specializations: s.specializations,
  degree: s.degree,
}));
