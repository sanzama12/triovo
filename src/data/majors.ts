import type { Career, CurriculumBlock, Major, RiasecType } from "../domain/types";

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
};

const seeds: Seed[] = [
  {
    slug: "cong-nghe-thong-tin", code: "7480201", name: "Công nghệ thông tin", groupId: "cntt", riasec: ["I", "R", "C"],
    summary: "Thiết kế, xây dựng và vận hành hệ thống phần mềm, mạng và dữ liệu cho doanh nghiệp.",
    description: "Ngành Công nghệ thông tin trang bị nền tảng lập trình, cơ sở dữ liệu, mạng máy tính và kỹ năng phát triển sản phẩm số. Sinh viên được thực hành qua dự án thật từ năm 2–3.",
    curriculum: [
      ["Cơ sở ngành", [["Cấu trúc dữ liệu & giải thuật", "Tư duy giải quyết bài toán và tối ưu chương trình."], ["Cơ sở dữ liệu", "Thiết kế, truy vấn và quản trị dữ liệu quan hệ."]]],
      ["Chuyên ngành", [["Phát triển ứng dụng web & di động", "Front-end, back-end và triển khai trên đám mây."], ["An toàn thông tin", "Bảo mật hệ thống, mạng và ứng dụng."]]],
    ],
    careers: [["Thực thi & chuyên môn", "Lập trình viên phần mềm", "15 - 30 triệu/tháng", "Xây dựng và bảo trì sản phẩm phần mềm."], ["Thực thi & chuyên môn", "Kỹ sư DevOps / Cloud", "20 - 40 triệu/tháng", "Tự động hoá triển khai, vận hành hạ tầng đám mây."], ["Quản lý & chiến lược", "Quản lý dự án CNTT", "30 - 50 triệu/tháng", "Điều phối đội ngũ, tiến độ và chất lượng dự án."]],
    demand: "Rất cao", growth: 15,
  },
  {
    slug: "khoa-hoc-may-tinh", code: "7480101", name: "Khoa học máy tính", groupId: "cntt", riasec: ["I", "R", "C"],
    summary: "Nền tảng toán – thuật toán cho phần mềm, trí tuệ nhân tạo và hệ thống thông minh.",
    description: "Tập trung vào lý thuyết tính toán, thuật toán, học máy và hệ thống. Phù hợp với bạn thích toán và muốn làm nghiên cứu hoặc sản phẩm công nghệ lõi.",
    curriculum: [
      ["Cơ sở ngành", [["Toán rời rạc", "Logic, đồ thị, tổ hợp cho khoa học máy tính."], ["Kiến trúc máy tính", "Cách phần cứng thực thi chương trình."]]],
      ["Chuyên ngành", [["Học máy", "Mô hình dự đoán và phân loại từ dữ liệu."], ["Hệ điều hành & hệ phân tán", "Thiết kế hệ thống quy mô lớn."]]],
    ],
    careers: [["Thực thi & chuyên môn", "Kỹ sư phần mềm", "18 - 35 triệu/tháng", "Phát triển hệ thống và sản phẩm công nghệ."], ["Thực thi & chuyên môn", "Kỹ sư học máy", "25 - 45 triệu/tháng", "Xây dựng mô hình AI cho sản phẩm."], ["Quản lý & chiến lược", "Kiến trúc sư phần mềm", "40 - 70 triệu/tháng", "Thiết kế kiến trúc tổng thể hệ thống."]],
    demand: "Rất cao", growth: 17,
  },
  {
    slug: "ky-thuat-phan-mem", code: "7480103", name: "Kỹ thuật phần mềm", groupId: "cntt", riasec: ["I", "C", "R"],
    summary: "Quy trình chuyên nghiệp để phát triển, kiểm thử và vận hành phần mềm quy mô lớn.",
    description: "Chú trọng quy trình phát triển phần mềm (Agile, DevOps), kiểm thử và quản lý chất lượng. Nhiều trường có học kỳ thực tập tại doanh nghiệp.",
    curriculum: [
      ["Cơ sở ngành", [["Lập trình hướng đối tượng", "Thiết kế mã nguồn dễ mở rộng, bảo trì."], ["Phân tích & thiết kế hệ thống", "Mô hình hoá yêu cầu và kiến trúc."]]],
      ["Chuyên ngành", [["Kiểm thử phần mềm", "Tự động hoá kiểm thử, đảm bảo chất lượng."], ["Quản lý dự án phần mềm", "Scrum, ước lượng và quản lý rủi ro."]]],
    ],
    careers: [["Thực thi & chuyên môn", "Kỹ sư phần mềm", "15 - 30 triệu/tháng", "Phát triển tính năng cho sản phẩm."], ["Thực thi & chuyên môn", "Kỹ sư kiểm thử (QA/QC)", "12 - 25 triệu/tháng", "Đảm bảo chất lượng phần mềm."], ["Quản lý & chiến lược", "Product Owner", "30 - 50 triệu/tháng", "Định hướng sản phẩm theo nhu cầu người dùng."]],
    demand: "Rất cao", growth: 14,
  },
  {
    slug: "tri-tue-nhan-tao", code: "7480107", name: "Trí tuệ nhân tạo", groupId: "cntt", riasec: ["I", "R", "A"],
    summary: "Xây dựng hệ thống học từ dữ liệu: thị giác máy tính, xử lý ngôn ngữ, AI tạo sinh.",
    description: "Ngành mới, đào tạo chuyên sâu về học máy, học sâu và ứng dụng AI. Yêu cầu nền tảng toán tốt (xác suất, đại số tuyến tính).",
    curriculum: [
      ["Cơ sở ngành", [["Xác suất thống kê", "Nền tảng cho mô hình học máy."], ["Đại số tuyến tính", "Vector, ma trận trong học sâu."]]],
      ["Chuyên ngành", [["Học sâu", "Mạng nơ-ron cho ảnh, âm thanh, văn bản."], ["Xử lý ngôn ngữ tự nhiên", "Mô hình ngôn ngữ và ứng dụng tiếng Việt."]]],
    ],
    careers: [["Thực thi & chuyên môn", "Kỹ sư AI", "25 - 50 triệu/tháng", "Huấn luyện và triển khai mô hình AI."], ["Thực thi & chuyên môn", "Nhà khoa học dữ liệu", "20 - 40 triệu/tháng", "Phân tích dữ liệu, xây dựng mô hình dự báo."], ["Quản lý & chiến lược", "Trưởng nhóm nghiên cứu AI", "50 - 90 triệu/tháng", "Dẫn dắt nghiên cứu và sản phẩm AI."]],
    demand: "Rất cao", growth: 22,
  },
  {
    slug: "marketing", code: "7340115", name: "Marketing", groupId: "kinh-te", riasec: ["E", "A", "S"],
    summary: "Nghiên cứu thị trường, xây dựng thương hiệu và thúc đẩy doanh số trên nền tảng số.",
    description: "Ngành học về chiến lược tiếp thị, nghiên cứu thị trường, xây dựng thương hiệu, tối ưu hoá trải nghiệm khách hàng và thúc đẩy doanh số trên đa nền tảng truyền thông hiện đại.",
    curriculum: [
      ["Cơ sở ngành", [["Nghiên cứu thị trường & Hành vi người tiêu dùng", "Phương pháp thu thập, phân tích thông tin thị trường và tâm lý khách hàng."], ["Quản trị thương hiệu & Truyền thông tích hợp", "Xây dựng bản sắc, định vị và kế hoạch truyền thông."]]],
      ["Chuyên ngành", [["Marketing số & Thương mại điện tử", "SEO/SEM, quảng cáo mạng xã hội, phân tích dữ liệu số."], ["Dự án tiếp thị & Thực hành thương trường", "Áp dụng mô hình kinh doanh, phân tích dữ liệu và trình bày giải pháp."]]],
    ],
    careers: [["Quản lý & chiến lược", "Brand Manager", "20 - 35 triệu/tháng", "Quản lý giá trị cốt lõi, chiến lược định vị thương hiệu."], ["Quản lý & chiến lược", "Chuyên viên nghiên cứu thị trường", "15 - 22 triệu/tháng", "Thu thập dữ liệu, phân tích tâm lý khách hàng."], ["Thực thi & chuyên môn", "Chuyên viên Digital Marketing", "12 - 20 triệu/tháng", "Tối ưu quảng cáo Google, Facebook, quản lý kênh."]],
    demand: "Cao", growth: 18,
  },
  {
    slug: "quan-tri-kinh-doanh", code: "7340101", name: "Quản trị kinh doanh", groupId: "kinh-te", riasec: ["E", "S", "C"],
    summary: "Điều hành doanh nghiệp: chiến lược, nhân sự, vận hành và tài chính.",
    description: "Trang bị kiến thức quản trị tổng hợp để điều hành doanh nghiệp, khởi nghiệp hoặc làm quản lý ở các phòng ban.",
    curriculum: [
      ["Cơ sở ngành", [["Kinh tế vi mô & vĩ mô", "Hiểu vận hành thị trường và nền kinh tế."], ["Nguyên lý quản trị", "Hoạch định, tổ chức, lãnh đạo, kiểm soát."]]],
      ["Chuyên ngành", [["Quản trị chiến lược", "Phân tích cạnh tranh và định hướng dài hạn."], ["Quản trị nhân lực", "Tuyển dụng, đào tạo, phát triển con người."]]],
    ],
    careers: [["Thực thi & chuyên môn", "Chuyên viên kinh doanh", "10 - 20 triệu/tháng", "Phát triển khách hàng và doanh thu."], ["Thực thi & chuyên môn", "Chuyên viên nhân sự", "10 - 18 triệu/tháng", "Tuyển dụng và phát triển đội ngũ."], ["Quản lý & chiến lược", "Quản lý vận hành", "25 - 45 triệu/tháng", "Điều phối hoạt động doanh nghiệp."]],
    demand: "Cao", growth: 10,
  },
  {
    slug: "kinh-doanh-quoc-te", code: "7340120", name: "Kinh doanh quốc tế", groupId: "kinh-te", riasec: ["E", "S", "C"],
    summary: "Xuất nhập khẩu, logistics và đàm phán thương mại với đối tác nước ngoài.",
    description: "Đào tạo nghiệp vụ thương mại quốc tế, logistics, thanh toán quốc tế và đàm phán. Yêu cầu tiếng Anh tốt.",
    curriculum: [
      ["Cơ sở ngành", [["Thương mại quốc tế", "Lý thuyết và chính sách thương mại."], ["Thanh toán quốc tế", "Tín dụng chứng từ, hối đoái."]]],
      ["Chuyên ngành", [["Logistics & chuỗi cung ứng", "Vận tải, kho bãi, tối ưu chuỗi cung ứng."], ["Đàm phán kinh doanh quốc tế", "Kỹ năng đàm phán đa văn hoá."]]],
    ],
    careers: [["Thực thi & chuyên môn", "Chuyên viên xuất nhập khẩu", "12 - 22 triệu/tháng", "Thủ tục, chứng từ và giao nhận quốc tế."], ["Thực thi & chuyên môn", "Chuyên viên logistics", "12 - 25 triệu/tháng", "Điều phối vận tải, tồn kho."], ["Quản lý & chiến lược", "Quản lý phát triển thị trường quốc tế", "30 - 55 triệu/tháng", "Mở rộng thị trường ra nước ngoài."]],
    demand: "Cao", growth: 12,
  },
  {
    slug: "tai-chinh-ngan-hang", code: "7340201", name: "Tài chính – Ngân hàng", groupId: "kinh-te", riasec: ["C", "E", "I"],
    summary: "Quản lý dòng tiền, đầu tư, tín dụng và nghiệp vụ ngân hàng.",
    description: "Học về thị trường tài chính, ngân hàng thương mại, đầu tư và quản trị rủi ro; nhiều cơ hội tại ngân hàng, công ty chứng khoán.",
    curriculum: [
      ["Cơ sở ngành", [["Tài chính doanh nghiệp", "Cấu trúc vốn, định giá, dòng tiền."], ["Thị trường tài chính", "Cổ phiếu, trái phiếu, công cụ phái sinh."]]],
      ["Chuyên ngành", [["Nghiệp vụ ngân hàng thương mại", "Tín dụng, huy động vốn, thanh toán."], ["Phân tích đầu tư", "Định giá và quản lý danh mục."]]],
    ],
    careers: [["Thực thi & chuyên môn", "Chuyên viên tín dụng", "12 - 25 triệu/tháng", "Thẩm định và quản lý khoản vay."], ["Thực thi & chuyên môn", "Chuyên viên phân tích tài chính", "15 - 30 triệu/tháng", "Phân tích báo cáo, định giá doanh nghiệp."], ["Quản lý & chiến lược", "Giám đốc chi nhánh", "40 - 70 triệu/tháng", "Quản lý hoạt động chi nhánh ngân hàng."]],
    demand: "Cao", growth: 8,
  },
  {
    slug: "ke-toan", code: "7340301", name: "Kế toán", groupId: "kinh-te", riasec: ["C", "E", "I"],
    summary: "Ghi nhận, phân tích số liệu tài chính và lập báo cáo cho doanh nghiệp.",
    description: "Đào tạo kế toán tài chính, kế toán quản trị, kiểm toán và thuế; có thể hướng tới chứng chỉ ACCA/CPA.",
    curriculum: [
      ["Cơ sở ngành", [["Nguyên lý kế toán", "Ghi sổ, hệ thống tài khoản, báo cáo."], ["Luật & thuế", "Quy định thuế doanh nghiệp, cá nhân."]]],
      ["Chuyên ngành", [["Kế toán quản trị", "Chi phí, ngân sách, ra quyết định."], ["Kiểm toán", "Kiểm tra độ tin cậy báo cáo tài chính."]]],
    ],
    careers: [["Thực thi & chuyên môn", "Kế toán viên", "10 - 18 triệu/tháng", "Hạch toán và lập báo cáo."], ["Thực thi & chuyên môn", "Kiểm toán viên", "12 - 25 triệu/tháng", "Kiểm toán độc lập hoặc nội bộ."], ["Quản lý & chiến lược", "Kế toán trưởng", "30 - 50 triệu/tháng", "Chịu trách nhiệm tài chính – kế toán doanh nghiệp."]],
    demand: "Cao", growth: 6,
  },
  {
    slug: "quan-tri-du-lich", code: "7810103", name: "Quản trị dịch vụ du lịch và lữ hành", groupId: "kinh-te", riasec: ["E", "S", "A"],
    summary: "Thiết kế tour, vận hành dịch vụ du lịch và trải nghiệm khách hàng.",
    description: "Đào tạo quản trị dịch vụ du lịch, lữ hành, khách sạn và sự kiện; chú trọng ngoại ngữ và kỹ năng giao tiếp.",
    curriculum: [
      ["Cơ sở ngành", [["Tổng quan du lịch", "Hệ thống sản phẩm và thị trường du lịch."], ["Tâm lý khách du lịch", "Hành vi và nhu cầu du khách."]]],
      ["Chuyên ngành", [["Thiết kế & điều hành tour", "Xây dựng chương trình và vận hành tour."], ["Quản trị sự kiện", "Tổ chức hội nghị, lễ hội, sự kiện."]]],
    ],
    careers: [["Thực thi & chuyên môn", "Điều hành tour", "10 - 18 triệu/tháng", "Thiết kế và vận hành chương trình du lịch."], ["Thực thi & chuyên môn", "Chuyên viên sự kiện", "10 - 20 triệu/tháng", "Lên kế hoạch và tổ chức sự kiện."], ["Quản lý & chiến lược", "Quản lý khu nghỉ dưỡng", "30 - 60 triệu/tháng", "Điều hành resort, khách sạn."]],
    demand: "Trung bình", growth: 9,
  },
  {
    slug: "y-khoa", code: "7720101", name: "Y khoa", groupId: "y-duoc", riasec: ["I", "S", "R"],
    summary: "Đào tạo bác sĩ đa khoa: chẩn đoán, điều trị và chăm sóc sức khỏe cộng đồng.",
    description: "Chương trình 6 năm, học lý thuyết y sinh và thực hành lâm sàng tại bệnh viện. Cần sự kiên trì và tinh thần phục vụ.",
    curriculum: [
      ["Y học cơ sở", [["Giải phẫu học", "Cấu trúc cơ thể người."], ["Sinh lý học", "Chức năng các cơ quan, hệ thống."]]],
      ["Lâm sàng", [["Nội khoa", "Chẩn đoán và điều trị bệnh nội khoa."], ["Ngoại khoa", "Nguyên lý và kỹ thuật phẫu thuật."]]],
    ],
    careers: [["Thực thi & chuyên môn", "Bác sĩ đa khoa", "15 - 35 triệu/tháng", "Khám, chẩn đoán và điều trị."], ["Thực thi & chuyên môn", "Bác sĩ nội trú", "12 - 20 triệu/tháng", "Đào tạo chuyên sâu tại bệnh viện."], ["Quản lý & chiến lược", "Trưởng khoa", "40 - 80 triệu/tháng", "Quản lý chuyên môn một khoa lâm sàng."]],
    demand: "Rất cao", growth: 7,
  },
  {
    slug: "duoc-hoc", code: "7720201", name: "Dược học", groupId: "y-duoc", riasec: ["I", "C", "R"],
    summary: "Nghiên cứu, sản xuất, kiểm nghiệm và tư vấn sử dụng thuốc an toàn.",
    description: "Đào tạo dược sĩ đại học 5 năm với kiến thức hoá dược, bào chế, dược lý và quản lý dược.",
    curriculum: [
      ["Cơ sở ngành", [["Hóa hữu cơ & hóa dược", "Cấu trúc và tổng hợp hoạt chất."], ["Dược lý", "Tác dụng và cơ chế của thuốc."]]],
      ["Chuyên ngành", [["Bào chế", "Công nghệ sản xuất dạng thuốc."], ["Dược lâm sàng", "Tư vấn sử dụng thuốc hợp lý."]]],
    ],
    careers: [["Thực thi & chuyên môn", "Dược sĩ lâm sàng", "12 - 22 triệu/tháng", "Tư vấn điều trị tại bệnh viện."], ["Thực thi & chuyên môn", "Chuyên viên kiểm nghiệm", "10 - 18 triệu/tháng", "Kiểm tra chất lượng thuốc."], ["Quản lý & chiến lược", "Quản lý nhà máy dược", "35 - 60 triệu/tháng", "Điều hành sản xuất đạt chuẩn GMP."]],
    demand: "Cao", growth: 8,
  },
  {
    slug: "ky-thuat-dien", code: "7520201", name: "Kỹ thuật điện", groupId: "ky-thuat", riasec: ["R", "I", "C"],
    summary: "Hệ thống điện, năng lượng tái tạo và tự động hoá công nghiệp.",
    description: "Đào tạo thiết kế, vận hành hệ thống điện, lưới điện thông minh và năng lượng tái tạo.",
    curriculum: [
      ["Cơ sở ngành", [["Mạch điện", "Phân tích mạch một chiều, xoay chiều."], ["Máy điện", "Động cơ, máy phát, máy biến áp."]]],
      ["Chuyên ngành", [["Hệ thống điện", "Truyền tải, phân phối và bảo vệ."], ["Năng lượng tái tạo", "Điện mặt trời, điện gió."]]],
    ],
    careers: [["Thực thi & chuyên môn", "Kỹ sư điện", "12 - 25 triệu/tháng", "Thiết kế, giám sát hệ thống điện."], ["Thực thi & chuyên môn", "Kỹ sư tự động hoá", "15 - 28 triệu/tháng", "Lập trình PLC, SCADA."], ["Quản lý & chiến lược", "Quản lý dự án năng lượng", "30 - 55 triệu/tháng", "Triển khai dự án điện mặt trời, điện gió."]],
    demand: "Cao", growth: 10,
  },
  {
    slug: "ky-thuat-co-khi", code: "7520103", name: "Kỹ thuật cơ khí", groupId: "ky-thuat", riasec: ["R", "I", "C"],
    summary: "Thiết kế, chế tạo máy móc và hệ thống sản xuất.",
    description: "Đào tạo thiết kế cơ khí, CAD/CAM, gia công CNC và chế tạo máy cho công nghiệp.",
    curriculum: [
      ["Cơ sở ngành", [["Cơ học kỹ thuật", "Tĩnh học, động học, sức bền vật liệu."], ["Vẽ kỹ thuật & CAD", "Bản vẽ và mô hình 3D."]]],
      ["Chuyên ngành", [["Công nghệ chế tạo máy", "Gia công, lắp ráp, dung sai."], ["CNC & robot công nghiệp", "Lập trình máy công cụ, robot."]]],
    ],
    careers: [["Thực thi & chuyên môn", "Kỹ sư thiết kế cơ khí", "12 - 22 triệu/tháng", "Thiết kế chi tiết và cụm máy."], ["Thực thi & chuyên môn", "Kỹ sư sản xuất", "12 - 22 triệu/tháng", "Tối ưu dây chuyền sản xuất."], ["Quản lý & chiến lược", "Quản đốc nhà máy", "30 - 50 triệu/tháng", "Quản lý vận hành nhà máy."]],
    demand: "Trung bình", growth: 6,
  },
  {
    slug: "kien-truc", code: "7580101", name: "Kiến trúc", groupId: "nghe-thuat", riasec: ["A", "R", "I"],
    summary: "Thiết kế công trình, không gian sống và quy hoạch đô thị.",
    description: "Kết hợp nghệ thuật và kỹ thuật để thiết kế công trình. Xét tuyển khối V (có môn vẽ).",
    curriculum: [
      ["Cơ sở ngành", [["Hình họa & vẽ mỹ thuật", "Diễn họa ý tưởng kiến trúc."], ["Cấu tạo kiến trúc", "Vật liệu và cấu tạo công trình."]]],
      ["Chuyên ngành", [["Đồ án thiết kế", "Thiết kế nhà ở, công trình công cộng."], ["Quy hoạch đô thị", "Tổ chức không gian đô thị bền vững."]]],
    ],
    careers: [["Thực thi & chuyên môn", "Kiến trúc sư thiết kế", "12 - 25 triệu/tháng", "Thiết kế phương án công trình."], ["Thực thi & chuyên môn", "Chuyên viên diễn họa 3D", "10 - 20 triệu/tháng", "Dựng hình, phối cảnh."], ["Quản lý & chiến lược", "Chủ trì thiết kế", "30 - 60 triệu/tháng", "Dẫn dắt dự án kiến trúc."]],
    demand: "Trung bình", growth: 5,
  },
  {
    slug: "thiet-ke-do-hoa", code: "7210403", name: "Thiết kế đồ họa", groupId: "nghe-thuat", riasec: ["A", "E", "R"],
    summary: "Sáng tạo hình ảnh, nhận diện thương hiệu và sản phẩm truyền thông số.",
    description: "Đào tạo thiết kế nhận diện, ấn phẩm, giao diện số và chuyển động; kết hợp tư duy thẩm mỹ với công cụ số.",
    curriculum: [
      ["Cơ sở ngành", [["Nguyên lý thị giác", "Bố cục, màu sắc, chữ."], ["Typography", "Thiết kế và sử dụng kiểu chữ."]]],
      ["Chuyên ngành", [["Thiết kế nhận diện thương hiệu", "Logo, hệ thống nhận diện."], ["Thiết kế giao diện (UI)", "Giao diện web và ứng dụng."]]],
    ],
    careers: [["Thực thi & chuyên môn", "Graphic Designer", "10 - 20 triệu/tháng", "Thiết kế ấn phẩm, hình ảnh truyền thông."], ["Thực thi & chuyên môn", "UI/UX Designer", "15 - 30 triệu/tháng", "Thiết kế trải nghiệm sản phẩm số."], ["Quản lý & chiến lược", "Art Director", "30 - 55 triệu/tháng", "Định hướng sáng tạo cho chiến dịch."]],
    demand: "Cao", growth: 12,
  },
  {
    slug: "tam-ly-hoc", code: "7310401", name: "Tâm lý học", groupId: "xa-hoi", riasec: ["S", "I", "A"],
    summary: "Hiểu hành vi, cảm xúc con người để tư vấn, trị liệu và phát triển tổ chức.",
    description: "Đào tạo tâm lý học lâm sàng, tâm lý học đường và tâm lý tổ chức; nhu cầu tăng mạnh ở trường học và doanh nghiệp.",
    curriculum: [
      ["Cơ sở ngành", [["Tâm lý học đại cương", "Các quá trình nhận thức, cảm xúc."], ["Phương pháp nghiên cứu", "Thiết kế khảo sát, thực nghiệm."]]],
      ["Chuyên ngành", [["Tham vấn tâm lý", "Kỹ năng lắng nghe và hỗ trợ."], ["Tâm lý học tổ chức", "Động lực, văn hoá doanh nghiệp."]]],
    ],
    careers: [["Thực thi & chuyên môn", "Chuyên viên tham vấn học đường", "10 - 18 triệu/tháng", "Hỗ trợ tâm lý học sinh."], ["Thực thi & chuyên môn", "Chuyên viên nhân sự – phát triển tổ chức", "12 - 22 triệu/tháng", "Đánh giá, phát triển năng lực nhân viên."], ["Quản lý & chiến lược", "Nhà trị liệu tâm lý", "20 - 40 triệu/tháng", "Trị liệu cá nhân và nhóm."]],
    demand: "Cao", growth: 11,
  },
  {
    slug: "luat", code: "7380101", name: "Luật", groupId: "xa-hoi", riasec: ["E", "S", "C"],
    summary: "Nghiên cứu hệ thống pháp luật, tư vấn và bảo vệ quyền lợi hợp pháp.",
    description: "Đào tạo luật dân sự, hình sự, kinh tế và quốc tế; có thể hành nghề luật sư, tư vấn pháp lý doanh nghiệp.",
    curriculum: [
      ["Cơ sở ngành", [["Lý luận nhà nước và pháp luật", "Nền tảng khoa học pháp lý."], ["Luật dân sự", "Quyền sở hữu, hợp đồng, thừa kế."]]],
      ["Chuyên ngành", [["Luật thương mại", "Pháp luật về doanh nghiệp, thương mại."], ["Kỹ năng tranh tụng", "Thực hành tại phiên toà giả định."]]],
    ],
    careers: [["Thực thi & chuyên môn", "Chuyên viên pháp chế", "12 - 25 triệu/tháng", "Tư vấn pháp lý cho doanh nghiệp."], ["Thực thi & chuyên môn", "Luật sư tập sự", "8 - 15 triệu/tháng", "Hỗ trợ vụ việc tại văn phòng luật."], ["Quản lý & chiến lược", "Luật sư điều hành", "40 - 80 triệu/tháng", "Quản lý văn phòng, dẫn dắt vụ việc."]],
    demand: "Cao", growth: 7,
  },
  {
    slug: "quan-he-cong-chung", code: "7320108", name: "Quan hệ công chúng", groupId: "xa-hoi", riasec: ["E", "A", "S"],
    summary: "Xây dựng hình ảnh tổ chức, truyền thông sự kiện và xử lý khủng hoảng.",
    description: "Đào tạo truyền thông chiến lược, quan hệ báo chí, tổ chức sự kiện và truyền thông số.",
    curriculum: [
      ["Cơ sở ngành", [["Lý thuyết truyền thông", "Mô hình và hiệu ứng truyền thông."], ["Viết cho truyền thông", "Thông cáo, nội dung đa nền tảng."]]],
      ["Chuyên ngành", [["Quản trị khủng hoảng", "Ứng phó và phục hồi hình ảnh."], ["Tổ chức sự kiện", "Lên kế hoạch và vận hành sự kiện."]]],
    ],
    careers: [["Thực thi & chuyên môn", "Chuyên viên PR", "10 - 20 triệu/tháng", "Quan hệ báo chí, đối tác."], ["Thực thi & chuyên môn", "Content Strategist", "12 - 22 triệu/tháng", "Xây dựng chiến lược nội dung."], ["Quản lý & chiến lược", "Giám đốc truyền thông", "35 - 70 triệu/tháng", "Định hướng truyền thông tổ chức."]],
    demand: "Cao", growth: 13,
  },
  {
    slug: "su-pham-toan", code: "7140209", name: "Sư phạm Toán học", groupId: "giao-duc", riasec: ["S", "I", "C"],
    summary: "Đào tạo giáo viên Toán THCS, THPT với phương pháp dạy học hiện đại.",
    description: "Kết hợp kiến thức toán chuyên sâu và nghiệp vụ sư phạm; sinh viên được hỗ trợ học phí, sinh hoạt phí theo quy định.",
    curriculum: [
      ["Cơ sở ngành", [["Giải tích & đại số", "Nền tảng toán học cao cấp."], ["Tâm lý học giáo dục", "Đặc điểm tâm lý học sinh."]]],
      ["Chuyên ngành", [["Phương pháp dạy học Toán", "Thiết kế bài dạy, đánh giá."], ["Thực tập sư phạm", "Giảng dạy tại trường phổ thông."]]],
    ],
    careers: [["Thực thi & chuyên môn", "Giáo viên Toán THPT", "8 - 15 triệu/tháng", "Giảng dạy tại trường phổ thông."], ["Thực thi & chuyên môn", "Chuyên viên phát triển học liệu", "12 - 20 triệu/tháng", "Biên soạn nội dung giáo dục số."], ["Quản lý & chiến lược", "Tổ trưởng chuyên môn", "15 - 25 triệu/tháng", "Điều phối chuyên môn tổ Toán."]],
    demand: "Trung bình", growth: 4,
  },
  {
    slug: "cong-nghe-thuc-pham", code: "7540101", name: "Công nghệ thực phẩm", groupId: "nong-lam", riasec: ["R", "I", "C"],
    summary: "Chế biến, bảo quản và kiểm soát chất lượng thực phẩm an toàn.",
    description: "Đào tạo công nghệ chế biến, vi sinh thực phẩm, quản lý chất lượng (HACCP, ISO 22000).",
    curriculum: [
      ["Cơ sở ngành", [["Hóa sinh thực phẩm", "Thành phần và biến đổi trong thực phẩm."], ["Vi sinh vật học", "Vi sinh trong chế biến và bảo quản."]]],
      ["Chuyên ngành", [["Công nghệ chế biến", "Sữa, đồ uống, thịt, thủy sản."], ["Quản lý chất lượng", "HACCP, ISO 22000."]]],
    ],
    careers: [["Thực thi & chuyên môn", "Kỹ sư QA/QC thực phẩm", "10 - 18 triệu/tháng", "Kiểm soát chất lượng sản phẩm."], ["Thực thi & chuyên môn", "Chuyên viên R&D", "12 - 22 triệu/tháng", "Phát triển sản phẩm mới."], ["Quản lý & chiến lược", "Quản lý nhà máy", "30 - 50 triệu/tháng", "Điều hành sản xuất thực phẩm."]],
    demand: "Trung bình", growth: 7,
  },
  {
    slug: "khoa-hoc-moi-truong", code: "7440301", name: "Khoa học môi trường", groupId: "nong-lam", riasec: ["I", "R", "S"],
    summary: "Đánh giá, xử lý ô nhiễm và phát triển bền vững.",
    description: "Đào tạo quan trắc, đánh giá tác động môi trường, xử lý chất thải và biến đổi khí hậu.",
    curriculum: [
      ["Cơ sở ngành", [["Hóa môi trường", "Chất ô nhiễm và quá trình chuyển hoá."], ["Sinh thái học", "Hệ sinh thái và đa dạng sinh học."]]],
      ["Chuyên ngành", [["Đánh giá tác động môi trường", "Lập báo cáo ĐTM cho dự án."], ["Công nghệ xử lý chất thải", "Nước thải, khí thải, chất thải rắn."]]],
    ],
    careers: [["Thực thi & chuyên môn", "Chuyên viên quan trắc", "9 - 16 triệu/tháng", "Lấy mẫu, phân tích chất lượng môi trường."], ["Thực thi & chuyên môn", "Chuyên viên ESG", "15 - 30 triệu/tháng", "Báo cáo phát triển bền vững doanh nghiệp."], ["Quản lý & chiến lược", "Quản lý dự án môi trường", "25 - 45 triệu/tháng", "Điều phối dự án xử lý, cải tạo."]],
    demand: "Trung bình", growth: 9,
  },

  // ── CNTT – NGÀNH HẸP ──────────────────────────────────────────────────────
  {
    slug: "an-toan-thong-tin", code: "7480202", name: "An toàn thông tin", groupId: "cntt", riasec: ["I", "R", "C"],
    summary: "Bảo vệ hệ thống mạng, dữ liệu và ứng dụng trước các mối đe dọa an ninh mạng.",
    description: "Ngành đào tạo chuyên sâu về kiểm thử xâm nhập, mã hóa, pháp chứng số và quản lý rủi ro bảo mật. Nhu cầu tuyển dụng tăng mạnh khi doanh nghiệp số hóa.",
    curriculum: [
      ["Cơ sở ngành", [["Mật mã học", "Thuật toán mã hóa và giao thức bảo mật."], ["An ninh mạng", "Tường lửa, IDS/IPS và giám sát hệ thống."]]],
      ["Chuyên ngành", [["Kiểm thử xâm nhập", "Đánh giá lỗ hổng và tấn công có kiểm soát."], ["Pháp chứng kỹ thuật số", "Thu thập, phân tích bằng chứng số."]]],
    ],
    careers: [["Thực thi & chuyên môn", "Chuyên viên an ninh mạng", "18 - 35 triệu/tháng", "Giám sát và phòng thủ hệ thống."], ["Thực thi & chuyên môn", "Chuyên gia kiểm thử xâm nhập", "25 - 50 triệu/tháng", "Tìm kiếm và khai thác lỗ hổng bảo mật."], ["Quản lý & chiến lược", "Quản lý bảo mật thông tin (CISO)", "50 - 90 triệu/tháng", "Xây dựng chiến lược bảo mật toàn diện."]],
    demand: "Rất cao", growth: 20,
  },
  {
    slug: "he-thong-thong-tin", code: "7480104", name: "Hệ thống thông tin", groupId: "cntt", riasec: ["I", "C", "E"],
    summary: "Phân tích, thiết kế và triển khai hệ thống thông tin quản lý cho tổ chức.",
    description: "Kết hợp kiến thức CNTT và quản trị để xây dựng hệ thống ERP, CRM, phân tích dữ liệu kinh doanh và tư vấn chuyển đổi số.",
    curriculum: [
      ["Cơ sở ngành", [["Phân tích yêu cầu hệ thống", "Mô hình hóa nghiệp vụ và đặc tả yêu cầu."], ["Cơ sở dữ liệu nâng cao", "Thiết kế data warehouse, OLAP."]]],
      ["Chuyên ngành", [["Hệ thống ERP", "Triển khai và tùy chỉnh phần mềm quản trị."], ["Phân tích dữ liệu kinh doanh", "BI, dashboard và ra quyết định dựa dữ liệu."]]],
    ],
    careers: [["Thực thi & chuyên môn", "Chuyên viên phân tích nghiệp vụ (BA)", "15 - 30 triệu/tháng", "Cầu nối giữa kỹ thuật và kinh doanh."], ["Thực thi & chuyên môn", "Kỹ sư dữ liệu", "20 - 40 triệu/tháng", "Xây dựng pipeline và kho dữ liệu."], ["Quản lý & chiến lược", "Quản lý chuyển đổi số", "40 - 70 triệu/tháng", "Dẫn dắt chiến lược số hóa doanh nghiệp."]],
    demand: "Rất cao", growth: 16,
  },
  {
    slug: "mang-may-tinh", code: "7480102", name: "Mạng máy tính và Truyền thông dữ liệu", groupId: "cntt", riasec: ["R", "I", "C"],
    summary: "Thiết kế, vận hành hạ tầng mạng và hệ thống truyền thông.",
    description: "Đào tạo về kiến trúc mạng, giao thức TCP/IP, hệ thống viễn thông, mạng không dây và điện toán đám mây hạ tầng.",
    curriculum: [
      ["Cơ sở ngành", [["Giao thức mạng", "TCP/IP, routing, switching."], ["Truyền số liệu", "Mã hóa tín hiệu, điều chế và đường truyền."]]],
      ["Chuyên ngành", [["Mạng doanh nghiệp", "VLAN, VPN, SD-WAN."], ["Điện toán đám mây", "AWS, Azure, hạ tầng ảo hóa."]]],
    ],
    careers: [["Thực thi & chuyên môn", "Kỹ sư mạng", "15 - 28 triệu/tháng", "Cấu hình, vận hành hạ tầng mạng."], ["Thực thi & chuyên môn", "Kỹ sư Cloud Infrastructure", "20 - 40 triệu/tháng", "Triển khai và quản lý tài nguyên đám mây."], ["Quản lý & chiến lược", "Kiến trúc sư hạ tầng", "40 - 65 triệu/tháng", "Thiết kế hạ tầng mạng quy mô lớn."]],
    demand: "Cao", growth: 12,
  },
  {
    slug: "cong-nghe-da-phuong-tien", code: "7480209", name: "Công nghệ đa phương tiện", groupId: "cntt", riasec: ["A", "I", "R"],
    summary: "Sản xuất nội dung số: video, đồ họa 3D, animation và thực tế ảo.",
    description: "Kết hợp kỹ năng lập trình đồ họa với tư duy sáng tạo để sản xuất game, phim hoạt hình, AR/VR và sản phẩm truyền thông tương tác.",
    curriculum: [
      ["Cơ sở ngành", [["Đồ họa máy tính", "Rendering, shading, pipeline 3D."], ["Thiết kế âm thanh", "Xử lý và dàn dựng âm thanh số."]]],
      ["Chuyên ngành", [["Hoạt hình 3D", "Rigging, motion capture, VFX."], ["Thực tế ảo và tăng cường", "Unity/Unreal, AR/VR app."]]],
    ],
    careers: [["Thực thi & chuyên môn", "Nghệ sĩ 3D / Animator", "12 - 25 triệu/tháng", "Tạo mô hình và hoạt hình 3D."], ["Thực thi & chuyên môn", "Nhà phát triển AR/VR", "20 - 40 triệu/tháng", "Xây dựng ứng dụng thực tế ảo."], ["Quản lý & chiến lược", "Giám đốc sản xuất nội dung số", "35 - 60 triệu/tháng", "Quản lý dự án sản xuất đa phương tiện."]],
    demand: "Cao", growth: 14,
  },
  {
    slug: "cong-nghe-game", code: "7480212", name: "Công nghệ Game", groupId: "cntt", riasec: ["A", "I", "R"],
    summary: "Thiết kế và lập trình trò chơi điện tử trên đa nền tảng.",
    description: "Đào tạo lập trình game (Unity, Unreal), thiết kế game, đồ họa game và phát hành sản phẩm game di động, PC và console.",
    curriculum: [
      ["Cơ sở ngành", [["Lập trình hướng đối tượng", "C++/C# cho game engine."], ["Toán học cho game", "Ma trận biến đổi, vật lý mô phỏng."]]],
      ["Chuyên ngành", [["Game engine Unity/Unreal", "Xây dựng gameplay, UI, AI game."], ["Thiết kế cấp độ", "Kiến trúc không gian và luồng trò chơi."]]],
    ],
    careers: [["Thực thi & chuyên môn", "Lập trình viên game", "15 - 30 triệu/tháng", "Phát triển tính năng gameplay."], ["Thực thi & chuyên môn", "Game Designer", "12 - 25 triệu/tháng", "Thiết kế cơ chế và trải nghiệm game."], ["Quản lý & chiến lược", "Game Producer", "30 - 55 triệu/tháng", "Quản lý vòng đời phát hành game."]],
    demand: "Cao", growth: 13,
  },
  {
    slug: "khoa-hoc-du-lieu", code: "7460156", name: "Khoa học dữ liệu", groupId: "cntt", riasec: ["I", "R", "C"],
    summary: "Khai thác và phân tích dữ liệu lớn để hỗ trợ ra quyết định kinh doanh.",
    description: "Kết hợp thống kê, học máy và kỹ thuật dữ liệu để xây dựng mô hình phân tích và dự báo từ dữ liệu quy mô lớn.",
    curriculum: [
      ["Cơ sở ngành", [["Thống kê ứng dụng", "Kiểm định giả thuyết, hồi quy, xác suất."], ["Lập trình Python/R", "Xử lý và phân tích dữ liệu với pandas, numpy."]]],
      ["Chuyên ngành", [["Học máy ứng dụng", "Mô hình phân loại, hồi quy, clustering."], ["Dữ liệu lớn (Big Data)", "Spark, Hadoop, pipeline ETL."]]],
    ],
    careers: [["Thực thi & chuyên môn", "Nhà phân tích dữ liệu", "15 - 28 triệu/tháng", "Xây dựng báo cáo và dashboard."], ["Thực thi & chuyên môn", "Kỹ sư dữ liệu", "20 - 40 triệu/tháng", "Thiết kế pipeline và kho dữ liệu."], ["Quản lý & chiến lược", "Nhà khoa học dữ liệu", "30 - 60 triệu/tháng", "Xây dựng mô hình ML cho sản phẩm."]],
    demand: "Rất cao", growth: 19,
  },

  // ── KINH TẾ – NGÀNH HẸP ───────────────────────────────────────────────────
  {
    slug: "kinh-te-hoc", code: "7310101", name: "Kinh tế học", groupId: "kinh-te", riasec: ["I", "C", "E"],
    summary: "Phân tích quy luật thị trường, chính sách kinh tế và hành vi ra quyết định.",
    description: "Đào tạo nền tảng kinh tế vi mô, vĩ mô, kinh tế lượng; phù hợp để làm phân tích chính sách, nghiên cứu và tư vấn kinh tế.",
    curriculum: [
      ["Cơ sở ngành", [["Kinh tế vi mô", "Hành vi người tiêu dùng, doanh nghiệp và thị trường."], ["Kinh tế vĩ mô", "GDP, lạm phát, chính sách tiền tệ – tài khóa."]]],
      ["Chuyên ngành", [["Kinh tế lượng", "Mô hình hồi quy và phân tích chuỗi thời gian."], ["Kinh tế phát triển", "Tăng trưởng, đói nghèo và chính sách công."]]],
    ],
    careers: [["Thực thi & chuyên môn", "Chuyên viên phân tích kinh tế", "15 - 28 triệu/tháng", "Nghiên cứu thị trường và dự báo kinh tế."], ["Thực thi & chuyên môn", "Chuyên viên chính sách", "14 - 25 triệu/tháng", "Tham mưu chính sách tại cơ quan nhà nước."], ["Quản lý & chiến lược", "Kinh tế trưởng", "40 - 70 triệu/tháng", "Định hướng chiến lược tài chính doanh nghiệp."]],
    demand: "Cao", growth: 8,
  },
  {
    slug: "kinh-doanh-thuong-mai", code: "7340107", name: "Kinh doanh thương mại", groupId: "kinh-te", riasec: ["E", "C", "S"],
    summary: "Phát triển hoạt động mua bán, phân phối và thúc đẩy doanh số.",
    description: "Đào tạo nghiệp vụ mua bán, phân phối hàng hóa, quản lý kênh bán hàng và phát triển thị trường trong nước và quốc tế.",
    curriculum: [
      ["Cơ sở ngành", [["Quản trị bán hàng", "Kỹ năng đàm phán, thuyết phục và chốt hợp đồng."], ["Nghiệp vụ thương mại", "Hợp đồng mua bán, chứng từ thương mại."]]],
      ["Chuyên ngành", [["Quản lý kênh phân phối", "Tổ chức mạng lưới đại lý, nhà bán lẻ."], ["Thương mại điện tử ứng dụng", "Bán hàng trên sàn TMĐT, marketing số."]]],
    ],
    careers: [["Thực thi & chuyên môn", "Chuyên viên kinh doanh", "10 - 22 triệu/tháng", "Phát triển khách hàng và doanh thu."], ["Thực thi & chuyên môn", "Quản lý bán hàng khu vực", "18 - 35 triệu/tháng", "Điều phối đội ngũ sales và đạt KPI."], ["Quản lý & chiến lược", "Giám đốc kinh doanh", "40 - 80 triệu/tháng", "Xây dựng chiến lược và mục tiêu kinh doanh."]],
    demand: "Cao", growth: 10,
  },
  {
    slug: "logistics", code: "7340122", name: "Logistics và Quản lý chuỗi cung ứng", groupId: "kinh-te", riasec: ["C", "E", "R"],
    summary: "Tối ưu vận chuyển, kho bãi và dòng chảy hàng hóa từ sản xuất đến tiêu dùng.",
    description: "Đào tạo quản lý vận tải đa phương thức, kho hàng, mua hàng và tối ưu hóa chuỗi cung ứng toàn cầu.",
    curriculum: [
      ["Cơ sở ngành", [["Vận tải và giao nhận hàng hóa", "Đường bộ, biển, hàng không và đa phương thức."], ["Quản lý kho hàng", "Bố trí kho, xuất nhập tồn, WMS."]]],
      ["Chuyên ngành", [["Tối ưu chuỗi cung ứng", "Lập kế hoạch sản xuất và nhu cầu (S&OP)."], ["Thương mại quốc tế", "Incoterms, thủ tục hải quan, L/C."]]],
    ],
    careers: [["Thực thi & chuyên môn", "Chuyên viên logistics", "12 - 25 triệu/tháng", "Điều phối vận chuyển và kho bãi."], ["Thực thi & chuyên môn", "Chuyên viên xuất nhập khẩu", "12 - 22 triệu/tháng", "Xử lý chứng từ và thủ tục hải quan."], ["Quản lý & chiến lược", "Quản lý chuỗi cung ứng", "30 - 60 triệu/tháng", "Tối ưu toàn bộ chuỗi từ nguồn đến khách hàng."]],
    demand: "Rất cao", growth: 15,
  },
  {
    slug: "thuong-mai-dien-tu", code: "7340122b", name: "Thương mại điện tử", groupId: "kinh-te", riasec: ["E", "I", "C"],
    summary: "Kinh doanh trực tuyến, tối ưu sàn TMĐT và chiến lược digital commerce.",
    description: "Đào tạo vận hành shop online, quản lý sàn TMĐT (Shopee, Lazada, TikTok Shop), marketing số và logistics cho e-commerce.",
    curriculum: [
      ["Cơ sở ngành", [["Hành vi người dùng số", "UX research, phễu chuyển đổi, A/B test."], ["Thanh toán và bảo mật TMĐT", "Cổng thanh toán, bảo vệ giao dịch."]]],
      ["Chuyên ngành", [["Quản lý sàn TMĐT", "Tối ưu listing, quảng cáo PPC trên sàn."], ["Chiến lược digital commerce", "Omnichannel, D2C, subscription."]]],
    ],
    careers: [["Thực thi & chuyên môn", "Chuyên viên TMĐT", "10 - 22 triệu/tháng", "Vận hành gian hàng và chiến dịch quảng cáo."], ["Thực thi & chuyên môn", "Digital Marketing Specialist", "12 - 25 triệu/tháng", "SEO, SEM, quảng cáo mạng xã hội."], ["Quản lý & chiến lược", "E-commerce Manager", "25 - 50 triệu/tháng", "Quản lý kênh bán hàng trực tuyến."]],
    demand: "Rất cao", growth: 18,
  },
  {
    slug: "quan-tri-nhan-luc", code: "7340404", name: "Quản trị nhân lực", groupId: "kinh-te", riasec: ["S", "E", "C"],
    summary: "Tuyển dụng, đào tạo và phát triển con người trong tổ chức.",
    description: "Đào tạo nghiệp vụ HR: tuyển dụng, đào tạo, đánh giá hiệu quả, xây dựng văn hóa doanh nghiệp và quản trị tổ chức.",
    curriculum: [
      ["Cơ sở ngành", [["Tâm lý tổ chức", "Động lực, sự gắn kết và hành vi nhân viên."], ["Luật lao động", "Hợp đồng, BHXH, giải quyết tranh chấp."]]],
      ["Chuyên ngành", [["Quản lý hiệu quả làm việc", "KPI, OKR, đánh giá 360 độ."], ["Đào tạo và phát triển nhân viên", "Thiết kế chương trình học nội bộ."]]],
    ],
    careers: [["Thực thi & chuyên môn", "Chuyên viên tuyển dụng", "10 - 18 triệu/tháng", "Tìm kiếm và đánh giá ứng viên."], ["Thực thi & chuyên môn", "Chuyên viên đào tạo & phát triển", "12 - 22 triệu/tháng", "Xây dựng lộ trình đào tạo nhân viên."], ["Quản lý & chiến lược", "Giám đốc nhân sự (HRD)", "40 - 70 triệu/tháng", "Xây dựng chiến lược nhân sự tổng thể."]],
    demand: "Cao", growth: 9,
  },
  {
    slug: "bao-hiem", code: "7340206", name: "Bảo hiểm", groupId: "kinh-te", riasec: ["C", "E", "I"],
    summary: "Quản lý rủi ro, định phí và nghiệp vụ bảo hiểm nhân thọ và phi nhân thọ.",
    description: "Đào tạo nghiệp vụ bảo hiểm, tính toán phí bảo hiểm (actuarial), quản lý bồi thường và phân tích rủi ro.",
    curriculum: [
      ["Cơ sở ngành", [["Nguyên lý bảo hiểm", "Khái niệm rủi ro, phân loại và nguyên tắc bảo hiểm."], ["Xác suất thống kê ứng dụng", "Tính phí bảo hiểm và dự phòng kỹ thuật."]]],
      ["Chuyên ngành", [["Bảo hiểm nhân thọ", "Sản phẩm, định phí và quản lý hợp đồng."], ["Bảo hiểm phi nhân thọ", "Xe cộ, tài sản, trách nhiệm dân sự."]]],
    ],
    careers: [["Thực thi & chuyên môn", "Chuyên viên bảo hiểm", "12 - 25 triệu/tháng", "Tư vấn và bán sản phẩm bảo hiểm."], ["Thực thi & chuyên môn", "Chuyên viên bồi thường", "12 - 22 triệu/tháng", "Thẩm định và giải quyết bồi thường."], ["Quản lý & chiến lược", "Chuyên gia định phí (Actuary)", "35 - 70 triệu/tháng", "Tính toán phí và dự phòng rủi ro."]],
    demand: "Cao", growth: 9,
  },
  {
    slug: "kiem-toan", code: "7340302", name: "Kiểm toán", groupId: "kinh-te", riasec: ["C", "I", "E"],
    summary: "Xác nhận tính trung thực của báo cáo tài chính và kiểm soát nội bộ.",
    description: "Đào tạo kiểm toán độc lập (Big4, công ty kiểm toán), kiểm toán nội bộ, kiểm toán nhà nước và tư vấn tài chính.",
    curriculum: [
      ["Cơ sở ngành", [["Chuẩn mực kế toán", "VAS, IFRS và nguyên tắc ghi nhận."], ["Chuẩn mực kiểm toán", "ISA, VSA và quy trình kiểm toán."]]],
      ["Chuyên ngành", [["Kiểm toán báo cáo tài chính", "Lập kế hoạch, thực hiện và phát hành báo cáo."], ["Kiểm toán nội bộ", "Đánh giá kiểm soát nội bộ và rủi ro."]]],
    ],
    careers: [["Thực thi & chuyên môn", "Kiểm toán viên (Big4)", "15 - 28 triệu/tháng", "Kiểm toán tại khách hàng doanh nghiệp lớn."], ["Thực thi & chuyên môn", "Kiểm toán viên nội bộ", "14 - 25 triệu/tháng", "Đánh giá rủi ro và kiểm soát nội bộ."], ["Quản lý & chiến lược", "Giám đốc kiểm toán (Audit Partner)", "60 - 120 triệu/tháng", "Quản lý danh mục khách hàng kiểm toán."]],
    demand: "Cao", growth: 7,
  },

  // ── KỸ THUẬT – NGÀNH HẸP ──────────────────────────────────────────────────
  {
    slug: "ky-thuat-xay-dung", code: "7580201", name: "Kỹ thuật xây dựng", groupId: "ky-thuat", riasec: ["R", "I", "C"],
    summary: "Thiết kế kết cấu, thi công và giám sát công trình dân dụng, công nghiệp.",
    description: "Đào tạo kỹ sư xây dựng kết cấu, nền móng, kỹ thuật hạ tầng; làm việc tại ban quản lý dự án, nhà thầu và tư vấn giám sát.",
    curriculum: [
      ["Cơ sở ngành", [["Sức bền vật liệu", "Phân tích nội lực, biến dạng kết cấu."], ["Địa kỹ thuật", "Cơ học đất, thiết kế nền móng."]]],
      ["Chuyên ngành", [["Kết cấu bê tông cốt thép", "Thiết kế dầm, cột, sàn theo TCVN."], ["Quản lý dự án xây dựng", "Lập tiến độ, kiểm soát chi phí, an toàn."]]],
    ],
    careers: [["Thực thi & chuyên môn", "Kỹ sư kết cấu", "14 - 25 triệu/tháng", "Thiết kế và kiểm tra kết cấu công trình."], ["Thực thi & chuyên môn", "Giám sát công trình", "14 - 28 triệu/tháng", "Kiểm tra chất lượng thi công tại công trường."], ["Quản lý & chiến lược", "Chỉ huy trưởng công trình", "35 - 60 triệu/tháng", "Điều hành tổng thể thi công dự án."]],
    demand: "Cao", growth: 8,
  },
  {
    slug: "kien-truc-noi-that", code: "7580203", name: "Thiết kế nội thất", groupId: "ky-thuat", riasec: ["A", "R", "I"],
    summary: "Sáng tạo không gian sống và làm việc tiện nghi, thẩm mỹ.",
    description: "Đào tạo thiết kế nội thất nhà ở, thương mại và văn phòng; kết hợp kỹ năng vẽ kỹ thuật với tư duy thẩm mỹ và vật liệu.",
    curriculum: [
      ["Cơ sở ngành", [["Nguyên lý thiết kế nội thất", "Bố cục, ánh sáng, màu sắc và phong cách."], ["Vật liệu và kết cấu nội thất", "Gỗ, kim loại, vải và ứng dụng."]]],
      ["Chuyên ngành", [["Thiết kế căn hộ và biệt thự", "Đồ án thiết kế không gian sống."], ["Phần mềm 3D nội thất", "SketchUp, 3ds Max, Lumion."]]],
    ],
    careers: [["Thực thi & chuyên môn", "Kiến trúc sư nội thất", "12 - 25 triệu/tháng", "Thiết kế và dự toán nội thất."], ["Thực thi & chuyên môn", "Chuyên viên diễn họa nội thất", "10 - 20 triệu/tháng", "Dựng phối cảnh 3D nội thất."], ["Quản lý & chiến lược", "Giám đốc thiết kế", "30 - 55 triệu/tháng", "Định hướng sáng tạo dự án lớn."]],
    demand: "Cao", growth: 11,
  },
  {
    slug: "quy-hoach-do-thi", code: "7580105", name: "Quy hoạch vùng và đô thị", groupId: "ky-thuat", riasec: ["R", "I", "A"],
    summary: "Lập quy hoạch phát triển đô thị, vùng và hạ tầng bền vững.",
    description: "Đào tạo lập quy hoạch tổng thể, quy hoạch chi tiết đô thị, quản lý đô thị và phát triển hạ tầng bền vững.",
    curriculum: [
      ["Cơ sở ngành", [["Quy hoạch đô thị", "Nguyên lý và các loại quy hoạch."], ["Địa lý kinh tế", "Phân bổ không gian và phát triển vùng."]]],
      ["Chuyên ngành", [["Lập đồ án quy hoạch", "Quy hoạch chung, phân khu và chi tiết."], ["GIS trong quy hoạch", "Ứng dụng bản đồ số, phân tích không gian."]]],
    ],
    careers: [["Thực thi & chuyên môn", "Chuyên viên quy hoạch đô thị", "12 - 22 triệu/tháng", "Lập và thẩm định hồ sơ quy hoạch."], ["Thực thi & chuyên môn", "Kỹ sư GIS", "14 - 25 triệu/tháng", "Quản lý và phân tích dữ liệu không gian."], ["Quản lý & chiến lược", "Trưởng phòng quy hoạch", "30 - 50 triệu/tháng", "Điều phối lập và triển khai quy hoạch địa phương."]],
    demand: "Trung bình", growth: 6,
  },
  {
    slug: "ky-thuat-hoa-hoc", code: "7520301", name: "Kỹ thuật hóa học", groupId: "ky-thuat", riasec: ["R", "I", "C"],
    summary: "Thiết kế quy trình sản xuất hóa chất, vật liệu và năng lượng.",
    description: "Đào tạo kỹ sư hóa học công nghiệp: thiết kế thiết bị phản ứng, tối ưu quy trình lọc dầu, sản xuất hóa chất và vật liệu mới.",
    curriculum: [
      ["Cơ sở ngành", [["Hóa lý", "Nhiệt động học, cân bằng pha và động học phản ứng."], ["Truyền nhiệt và truyền khối", "Trao đổi nhiệt trong thiết bị hóa học."]]],
      ["Chuyên ngành", [["Thiết kế thiết bị hóa học", "Reactor, tháp chưng luyện, thiết bị trao đổi nhiệt."], ["Kỹ thuật lọc dầu", "Chưng cất dầu thô, cracking và reforming."]]],
    ],
    careers: [["Thực thi & chuyên môn", "Kỹ sư quá trình", "14 - 26 triệu/tháng", "Vận hành và tối ưu dây chuyền hóa chất."], ["Thực thi & chuyên môn", "Kỹ sư kiểm định chất lượng", "12 - 22 triệu/tháng", "Kiểm tra chất lượng sản phẩm hóa học."], ["Quản lý & chiến lược", "Quản lý nhà máy hóa chất", "35 - 60 triệu/tháng", "Điều hành sản xuất đạt chuẩn an toàn."]]  ,
    demand: "Trung bình", growth: 7,
  },
  {
    slug: "cong-nghe-sinh-hoc", code: "7420201", name: "Công nghệ sinh học", groupId: "ky-thuat", riasec: ["I", "R", "C"],
    summary: "Ứng dụng sinh học phân tử vào y tế, nông nghiệp và công nghiệp thực phẩm.",
    description: "Đào tạo kỹ thuật di truyền, công nghệ enzyme, sản xuất sinh phẩm và kiểm nghiệm y tế; liên kết với ngành dược và thực phẩm.",
    curriculum: [
      ["Cơ sở ngành", [["Sinh học phân tử", "DNA, RNA, protein và cơ chế di truyền."], ["Vi sinh vật học ứng dụng", "Lên men, kháng sinh, probiotic."]]],
      ["Chuyên ngành", [["Công nghệ gene", "CRISPR, PCR, sản xuất protein tái tổ hợp."], ["Công nghệ sinh học môi trường", "Xử lý ô nhiễm bằng vi sinh vật."]]],
    ],
    careers: [["Thực thi & chuyên môn", "Kỹ thuật viên phòng thí nghiệm", "10 - 18 triệu/tháng", "Thực hiện xét nghiệm sinh học phân tử."], ["Thực thi & chuyên môn", "Chuyên viên R&D sinh học", "15 - 28 triệu/tháng", "Nghiên cứu và phát triển sản phẩm sinh học."], ["Quản lý & chiến lược", "Quản lý nghiên cứu phát triển", "30 - 55 triệu/tháng", "Điều phối dự án R&D dược phẩm, thực phẩm."]],
    demand: "Cao", growth: 10,
  },
  {
    slug: "ky-thuat-moi-truong", code: "7520320", name: "Kỹ thuật môi trường", groupId: "ky-thuat", riasec: ["R", "I", "S"],
    summary: "Thiết kế hệ thống xử lý nước, khí thải và chất thải rắn.",
    description: "Đào tạo kỹ sư thiết kế hệ thống xử lý nước thải, khí thải và chất thải rắn cho đô thị, khu công nghiệp và nông nghiệp.",
    curriculum: [
      ["Cơ sở ngành", [["Xử lý nước cấp và nước thải", "Công nghệ vật lý, hóa học, sinh học."], ["Kiểm soát ô nhiễm không khí", "Phát tán bụi, khí thải công nghiệp."]]],
      ["Chuyên ngành", [["Thiết kế trạm xử lý nước thải", "Tính toán và chọn thiết bị."], ["Quản lý chất thải rắn và CTR nguy hại", "Thu gom, phân loại, xử lý."]]],
    ],
    careers: [["Thực thi & chuyên môn", "Kỹ sư xử lý nước thải", "12 - 22 triệu/tháng", "Vận hành trạm xử lý nước thải."], ["Thực thi & chuyên môn", "Chuyên viên lập báo cáo môi trường", "12 - 20 triệu/tháng", "Lập ĐTM, giấy phép môi trường."], ["Quản lý & chiến lược", "Quản lý môi trường khu công nghiệp", "25 - 45 triệu/tháng", "Giám sát tuân thủ môi trường toàn KCN."]],
    demand: "Cao", growth: 10,
  },
  {
    slug: "ky-thuat-co-dien-tu", code: "7520114", name: "Kỹ thuật cơ điện tử", groupId: "ky-thuat", riasec: ["R", "I", "C"],
    summary: "Tích hợp cơ khí, điện tử và lập trình trong hệ thống tự động hóa hiện đại.",
    description: "Đào tạo thiết kế robot công nghiệp, hệ thống tự động hóa, máy CNC và IoT công nghiệp cho nhà máy sản xuất.",
    curriculum: [
      ["Cơ sở ngành", [["Điều khiển tự động", "PID, điều khiển phản hồi và hệ kín."], ["Điện tử công suất", "Biến tần, servo và hệ truyền động."]]],
      ["Chuyên ngành", [["Robot công nghiệp", "Lập trình robot ABB, FANUC, Kuka."], ["Hệ thống IoT công nghiệp", "Cảm biến, PLC và giao tiếp Modbus/OPC UA."]]],
    ],
    careers: [["Thực thi & chuyên môn", "Kỹ sư tự động hóa", "14 - 28 triệu/tháng", "Lập trình và vận hành dây chuyền tự động."], ["Thực thi & chuyên môn", "Kỹ sư robot", "18 - 35 triệu/tháng", "Tích hợp và lập trình robot công nghiệp."], ["Quản lý & chiến lược", "Quản lý kỹ thuật nhà máy", "35 - 60 triệu/tháng", "Điều phối bảo trì và cải tiến sản xuất."]],
    demand: "Rất cao", growth: 16,
  },
  {
    slug: "ky-thuat-oto", code: "7520130", name: "Kỹ thuật ô tô", groupId: "ky-thuat", riasec: ["R", "I", "C"],
    summary: "Thiết kế, chẩn đoán và bảo dưỡng xe ô tô động cơ đốt trong và xe điện.",
    description: "Đào tạo kỹ sư ô tô: thiết kế chassis, động cơ, điều khiển điện tử và công nghệ xe điện/hybrid.",
    curriculum: [
      ["Cơ sở ngành", [["Động cơ đốt trong", "Nguyên lý, cấu tạo và đặc tính động cơ."], ["Sức bền kết cấu xe", "Vỏ xe, khung gầm và an toàn thụ động."]]],
      ["Chuyên ngành", [["Điện – điện tử ô tô", "ECU, CAN bus, cảm biến và hệ thống ADAS."], ["Công nghệ xe điện (EV)", "Pin lithium, motor điện và sạc."]]],
    ],
    careers: [["Thực thi & chuyên môn", "Kỹ sư chẩn đoán ô tô", "14 - 25 triệu/tháng", "Kiểm tra và sửa chữa hệ thống điện tử xe."], ["Thực thi & chuyên môn", "Kỹ sư R&D ô tô", "20 - 40 triệu/tháng", "Nghiên cứu cải tiến kỹ thuật xe."], ["Quản lý & chiến lược", "Quản lý kỹ thuật nhà máy lắp ráp", "35 - 65 triệu/tháng", "Điều hành dây chuyền sản xuất ô tô."]],
    demand: "Cao", growth: 11,
  },
  {
    slug: "ky-thuat-dien-tu-vt", code: "7520207", name: "Kỹ thuật Điện tử – Viễn thông", groupId: "ky-thuat", riasec: ["R", "I", "C"],
    summary: "Thiết kế mạch điện tử, hệ thống viễn thông và thiết bị nhúng.",
    description: "Đào tạo kỹ sư thiết kế vi mạch, hệ thống nhúng, giao tiếp không dây (4G/5G, WiFi, Bluetooth) và thiết bị IoT.",
    curriculum: [
      ["Cơ sở ngành", [["Điện tử tương tự và số", "Thiết kế mạch khuếch đại, lọc, ADC/DAC."], ["Xử lý tín hiệu số", "DSP, FFT, lọc FIR/IIR."]]],
      ["Chuyên ngành", [["Hệ thống nhúng", "ARM, FPGA, lập trình firmware."], ["Thông tin di động", "Kiến trúc mạng 4G/5G, giao thức."]]],
    ],
    careers: [["Thực thi & chuyên môn", "Kỹ sư thiết kế vi mạch", "18 - 35 triệu/tháng", "Thiết kế PCB, ASIC và hệ thống nhúng."], ["Thực thi & chuyên môn", "Kỹ sư viễn thông", "15 - 30 triệu/tháng", "Triển khai và tối ưu hệ thống mạng 4G/5G."], ["Quản lý & chiến lược", "Kiến trúc sư hệ thống nhúng", "40 - 70 triệu/tháng", "Thiết kế kiến trúc phần cứng sản phẩm."]]  ,
    demand: "Cao", growth: 12,
  },

  // ── Y DƯỢC – NGÀNH HẸP ────────────────────────────────────────────────────
  {
    slug: "y-hoc-co-truyen", code: "7720102", name: "Y học cổ truyền", groupId: "y-duoc", riasec: ["I", "S", "R"],
    summary: "Khám và điều trị bằng y học cổ truyền: châm cứu, dược liệu và thuốc nam.",
    description: "Chương trình 6 năm đào tạo bác sĩ y học cổ truyền; kết hợp y học dân tộc và hiện đại, thực hành tại cơ sở y tế.",
    curriculum: [
      ["Y học cổ truyền cơ sở", [["Lý thuyết âm dương ngũ hành", "Nền tảng triết học và chẩn đoán YHCT."], ["Dược liệu học", "Nhận dạng, bào chế và sử dụng dược liệu."]]],
      ["Lâm sàng YHCT", [["Châm cứu học", "Kỹ thuật châm, cứu và bấm huyệt."], ["Nội khoa YHCT", "Điều trị bệnh mạn tính bằng y học cổ truyền."]]],
    ],
    careers: [["Thực thi & chuyên môn", "Bác sĩ YHCT", "15 - 30 triệu/tháng", "Khám và điều trị bằng phương pháp cổ truyền."], ["Thực thi & chuyên môn", "Lương y / Chuyên gia dược liệu", "12 - 22 triệu/tháng", "Tư vấn và cung cấp dược liệu."], ["Quản lý & chiến lược", "Trưởng khoa YHCT", "35 - 65 triệu/tháng", "Quản lý khoa YHCT tại bệnh viện."]],
    demand: "Cao", growth: 8,
  },
  {
    slug: "y-te-cong-cong", code: "7720104", name: "Y tế công cộng", groupId: "y-duoc", riasec: ["I", "S", "C"],
    summary: "Phòng ngừa dịch bệnh và nâng cao sức khỏe cộng đồng.",
    description: "Đào tạo dịch tễ học, phòng chống dịch bệnh, quản lý y tế và truyền thông sức khỏe cho cộng đồng.",
    curriculum: [
      ["Cơ sở ngành", [["Dịch tễ học", "Điều tra và kiểm soát dịch bệnh."], ["Thống kê y tế", "Phân tích số liệu sức khỏe cộng đồng."]]],
      ["Chuyên ngành", [["Quản lý y tế", "Tổ chức và điều hành cơ sở y tế."], ["Truyền thông sức khỏe", "Thiết kế chiến dịch nâng cao nhận thức."]]],
    ],
    careers: [["Thực thi & chuyên môn", "Cán bộ y tế dự phòng", "10 - 18 triệu/tháng", "Giám sát và phòng chống dịch bệnh."], ["Thực thi & chuyên môn", "Chuyên viên truyền thông sức khỏe", "12 - 22 triệu/tháng", "Triển khai chương trình sức khỏe cộng đồng."], ["Quản lý & chiến lược", "Giám đốc trung tâm y tế", "25 - 45 triệu/tháng", "Điều hành trung tâm y tế dự phòng."]],
    demand: "Cao", growth: 7,
  },
  {
    slug: "dieu-duong", code: "7720301", name: "Điều dưỡng", groupId: "y-duoc", riasec: ["S", "I", "R"],
    summary: "Chăm sóc và hỗ trợ điều trị người bệnh tại các cơ sở y tế.",
    description: "Đào tạo điều dưỡng viên có kỹ năng thực hành lâm sàng, chăm sóc toàn diện và giáo dục sức khỏe cho bệnh nhân.",
    curriculum: [
      ["Cơ sở ngành", [["Giải phẫu – sinh lý", "Cơ thể người và chức năng cơ quan."], ["Dược lý điều dưỡng", "Tác dụng thuốc và kỹ thuật dùng thuốc."]]],
      ["Lâm sàng", [["Điều dưỡng nội khoa", "Chăm sóc bệnh nhân nội trú."], ["Điều dưỡng cấp cứu", "Xử trí ban đầu và hồi sức tích cực."]]],
    ],
    careers: [["Thực thi & chuyên môn", "Điều dưỡng viên", "10 - 18 triệu/tháng", "Chăm sóc người bệnh tại bệnh viện."], ["Thực thi & chuyên môn", "Điều dưỡng chuyên khoa", "14 - 25 triệu/tháng", "Chuyên sâu ICU, phòng mổ, nhi khoa."], ["Quản lý & chiến lược", "Điều dưỡng trưởng khoa", "22 - 40 triệu/tháng", "Quản lý đội ngũ điều dưỡng một khoa."]],
    demand: "Rất cao", growth: 9,
  },
  {
    slug: "rang-ham-mat", code: "7720501", name: "Răng Hàm Mặt", groupId: "y-duoc", riasec: ["R", "I", "S"],
    summary: "Chẩn đoán và điều trị bệnh lý răng, miệng và hàm mặt.",
    description: "Chương trình 6 năm đào tạo bác sĩ nha khoa: nhổ răng, phục hình, chỉnh nha, nha khoa thẩm mỹ và phẫu thuật hàm mặt.",
    curriculum: [
      ["Y học cơ sở", [["Giải phẫu đầu – mặt – cổ", "Cấu trúc vùng hàm mặt."], ["Tổ chức học răng", "Cấu tạo vi thể men, ngà, tủy."]]],
      ["Lâm sàng nha khoa", [["Nhổ răng và tiểu phẫu thuật", "Kỹ thuật gây tê và tiểu phẫu."], ["Phục hình răng", "Răng giả cố định, tháo lắp và implant."]]],
    ],
    careers: [["Thực thi & chuyên môn", "Bác sĩ răng hàm mặt", "18 - 40 triệu/tháng", "Khám và điều trị tại phòng khám, bệnh viện."], ["Thực thi & chuyên môn", "Chuyên khoa chỉnh nha", "25 - 50 triệu/tháng", "Điều trị chỉnh hình răng niềng."], ["Quản lý & chiến lược", "Chủ phòng khám nha khoa", "40 - 100 triệu/tháng", "Quản lý chuỗi phòng khám nha khoa."]],
    demand: "Rất cao", growth: 11,
  },
  {
    slug: "xet-nghiem-y-hoc", code: "7720401", name: "Kỹ thuật xét nghiệm y học", groupId: "y-duoc", riasec: ["R", "I", "C"],
    summary: "Thực hiện và phân tích các xét nghiệm chẩn đoán bệnh.",
    description: "Đào tạo kỹ thuật viên xét nghiệm huyết học, sinh hóa, vi sinh và giải phẫu bệnh; làm việc tại bệnh viện và trung tâm xét nghiệm.",
    curriculum: [
      ["Cơ sở ngành", [["Hóa sinh lâm sàng", "Xét nghiệm đường huyết, lipid, men gan."], ["Vi sinh lâm sàng", "Cấy vi khuẩn, kháng sinh đồ."]]],
      ["Chuyên ngành", [["Huyết học", "Phân tích tế bào máu và đông cầm máu."], ["Sinh học phân tử chẩn đoán", "PCR, giải trình tự gene."]]],
    ],
    careers: [["Thực thi & chuyên môn", "Kỹ thuật viên xét nghiệm", "10 - 18 triệu/tháng", "Thực hiện xét nghiệm lâm sàng hàng ngày."], ["Thực thi & chuyên môn", "Chuyên viên kiểm soát chất lượng xét nghiệm", "14 - 25 triệu/tháng", "Đảm bảo độ chính xác kết quả xét nghiệm."], ["Quản lý & chiến lược", "Trưởng khoa xét nghiệm", "25 - 45 triệu/tháng", "Quản lý phòng xét nghiệm bệnh viện."]],
    demand: "Cao", growth: 8,
  },
  {
    slug: "vat-ly-tri-lieu", code: "7720602", name: "Vật lý trị liệu", groupId: "y-duoc", riasec: ["S", "R", "I"],
    summary: "Phục hồi chức năng vận động và giảm đau bằng các phương pháp vật lý.",
    description: "Đào tạo kỹ thuật viên phục hồi chức năng: điện trị liệu, thủy trị liệu, tập vận động và massage trị liệu.",
    curriculum: [
      ["Cơ sở ngành", [["Giải phẫu vận động", "Cơ, xương, khớp và cơ học cơ thể."], ["Sinh lý vận động", "Phản xạ, sức mạnh và bền bỉ cơ."]]],
      ["Chuyên ngành", [["Vật lý trị liệu chỉnh hình", "Phục hồi sau chấn thương, phẫu thuật."], ["Phục hồi chức năng thần kinh", "Đột quỵ, chấn thương tủy sống."]]],
    ],
    careers: [["Thực thi & chuyên môn", "Kỹ thuật viên vật lý trị liệu", "12 - 22 triệu/tháng", "Điều trị phục hồi chức năng."], ["Thực thi & chuyên môn", "Huấn luyện viên thể thao y tế", "15 - 28 triệu/tháng", "Phòng ngừa và phục hồi chấn thương thể thao."], ["Quản lý & chiến lược", "Trưởng khoa PHCN", "25 - 45 triệu/tháng", "Quản lý bộ phận phục hồi chức năng."]],
    demand: "Cao", growth: 10,
  },

  // ── XÃ HỘI – NGÀNH HẸP ────────────────────────────────────────────────────
  {
    slug: "bao-chi", code: "7320101", name: "Báo chí", groupId: "xa-hoi", riasec: ["A", "E", "S"],
    summary: "Khai thác, sản xuất và phát hành nội dung báo chí đa nền tảng.",
    description: "Đào tạo nhà báo, phóng viên, biên tập viên; thực hành sản xuất nội dung báo in, online, phát thanh và truyền hình.",
    curriculum: [
      ["Cơ sở ngành", [["Lý luận báo chí", "Chức năng, nguyên tắc và đạo đức nghề báo."], ["Kỹ năng viết báo", "Tin tức, phóng sự, bình luận và phỏng vấn."]]],
      ["Chuyên ngành", [["Báo chí điện tử và mạng xã hội", "Sản xuất nội dung số, SEO báo chí."], ["Truyền hình và phát thanh", "Kỹ thuật quay phim, dựng phim phóng sự."]]],
    ],
    careers: [["Thực thi & chuyên môn", "Phóng viên – Biên tập viên", "10 - 20 triệu/tháng", "Thu thập và xử lý thông tin báo chí."], ["Thực thi & chuyên môn", "Content Creator / Nhà sáng tạo nội dung", "12 - 25 triệu/tháng", "Sản xuất nội dung cho kênh truyền thông số."], ["Quản lý & chiến lược", "Tổng biên tập", "35 - 70 triệu/tháng", "Định hướng nội dung và quản lý toà soạn."]],
    demand: "Trung bình", growth: 6,
  },
  {
    slug: "truyen-thong-da-phuong-tien", code: "7320108b", name: "Truyền thông đa phương tiện", groupId: "xa-hoi", riasec: ["A", "E", "I"],
    summary: "Sản xuất nội dung đa nền tảng: video, podcast, social media và branded content.",
    description: "Đào tạo sản xuất nội dung sáng tạo cho báo chí và thương hiệu; kết hợp viết, quay, dựng phim và quản lý kênh truyền thông.",
    curriculum: [
      ["Cơ sở ngành", [["Kể chuyện truyền thông", "Cấu trúc câu chuyện cho video và bài viết."], ["Nhiếp ảnh và quay phim", "Kỹ thuật ánh sáng, góc quay, bố cục."]]],
      ["Chuyên ngành", [["Sản xuất podcast và video online", "Dựng phim, âm thanh và đăng tải đa nền tảng."], ["Chiến lược nội dung thương hiệu", "Brand storytelling, influencer và viral content."]]],
    ],
    careers: [["Thực thi & chuyên môn", "Chuyên viên sản xuất nội dung", "10 - 22 triệu/tháng", "Tạo video, bài viết, đồ họa thông tin."], ["Thực thi & chuyên môn", "Đạo diễn video / Content Director", "18 - 35 triệu/tháng", "Dẫn dắt sản xuất nội dung video."], ["Quản lý & chiến lược", "Giám đốc nội dung (CCO)", "40 - 75 triệu/tháng", "Xây dựng chiến lược nội dung thương hiệu."]],
    demand: "Cao", growth: 14,
  },
  {
    slug: "xa-hoi-hoc", code: "7310303", name: "Xã hội học", groupId: "xa-hoi", riasec: ["S", "I", "A"],
    summary: "Nghiên cứu hành vi xã hội, cấu trúc cộng đồng và biến đổi xã hội.",
    description: "Đào tạo phương pháp nghiên cứu xã hội học, phúc lợi xã hội, phát triển cộng đồng và phân tích dữ liệu xã hội.",
    curriculum: [
      ["Cơ sở ngành", [["Lý thuyết xã hội học", "Marxism, Functionalism, Interactionism."], ["Phương pháp nghiên cứu xã hội", "Phỏng vấn, khảo sát và phân tích dữ liệu định tính."]]],
      ["Chuyên ngành", [["Xã hội học lao động", "Quan hệ lao động, nghề nghiệp và phúc lợi."], ["Phát triển cộng đồng", "Công tác cộng đồng và các chương trình xã hội."]]],
    ],
    careers: [["Thực thi & chuyên môn", "Chuyên viên nghiên cứu xã hội", "12 - 20 triệu/tháng", "Thực hiện khảo sát và phân tích dữ liệu xã hội."], ["Thực thi & chuyên môn", "Chuyên viên phát triển cộng đồng", "10 - 18 triệu/tháng", "Triển khai chương trình xã hội tại địa phương."], ["Quản lý & chiến lược", "Nghiên cứu viên cao cấp", "22 - 40 triệu/tháng", "Dẫn dắt nghiên cứu và tư vấn chính sách xã hội."]],
    demand: "Trung bình", growth: 5,
  },
  {
    slug: "cong-tac-xa-hoi", code: "7760101", name: "Công tác xã hội", groupId: "xa-hoi", riasec: ["S", "A", "I"],
    summary: "Hỗ trợ và can thiệp cho các nhóm dễ bị tổn thương trong xã hội.",
    description: "Đào tạo nhân viên công tác xã hội làm việc với người nghèo, trẻ em, người cao tuổi, người khuyết tật và phụ nữ bị bạo lực.",
    curriculum: [
      ["Cơ sở ngành", [["Lý thuyết công tác xã hội", "Can thiệp trường hợp, nhóm và cộng đồng."], ["Tâm lý học ứng dụng", "Lắng nghe tích cực và tư vấn hỗ trợ."]]],
      ["Chuyên ngành", [["Bảo vệ trẻ em", "Phát hiện, can thiệp và hỗ trợ trẻ có hoàn cảnh khó khăn."], ["Trợ giúp xã hội", "Chính sách bảo trợ, dịch vụ hỗ trợ cộng đồng."]]],
    ],
    careers: [["Thực thi & chuyên môn", "Nhân viên công tác xã hội", "8 - 15 triệu/tháng", "Hỗ trợ ca và nhóm đối tượng yếu thế."], ["Thực thi & chuyên môn", "Chuyên viên bảo vệ trẻ em", "10 - 18 triệu/tháng", "Điều tra và can thiệp trường hợp trẻ bị xâm hại."], ["Quản lý & chiến lược", "Quản lý trung tâm bảo trợ xã hội", "18 - 35 triệu/tháng", "Điều hành cơ sở bảo trợ và phúc lợi xã hội."]],
    demand: "Trung bình", growth: 5,
  },
  {
    slug: "ngoai-ngu-anh", code: "7220201", name: "Ngôn ngữ Anh", groupId: "xa-hoi", riasec: ["A", "S", "E"],
    summary: "Sử dụng tiếng Anh thành thạo trong giao tiếp, dịch thuật và giảng dạy.",
    description: "Đào tạo kỹ năng tiếng Anh chuyên sâu: dịch thuật, phiên dịch, giảng dạy và truyền thông đa ngôn ngữ.",
    curriculum: [
      ["Cơ sở ngành", [["Ngôn ngữ học tiếng Anh", "Ngữ pháp, ngữ âm, từ vựng học."], ["Kỹ năng nghe – nói nâng cao", "Phát âm chuẩn, thuyết trình chuyên nghiệp."]]],
      ["Chuyên ngành", [["Biên dịch – phiên dịch", "Dịch tài liệu chuyên ngành và phiên dịch hội nghị."], ["Tiếng Anh thương mại", "Viết email, hợp đồng và trình bày kinh doanh."]]],
    ],
    careers: [["Thực thi & chuyên môn", "Biên – Phiên dịch viên", "14 - 28 triệu/tháng", "Dịch thuật và phiên dịch cho doanh nghiệp FDI."], ["Thực thi & chuyên môn", "Giáo viên tiếng Anh", "12 - 22 triệu/tháng", "Giảng dạy tại trường phổ thông hoặc trung tâm."], ["Quản lý & chiến lược", "Quản lý quan hệ quốc tế", "25 - 45 triệu/tháng", "Điều phối hợp tác quốc tế cho tổ chức."]]  ,
    demand: "Cao", growth: 8,
  },
  {
    slug: "ngoai-ngu-nhat", code: "7220210", name: "Ngôn ngữ Nhật", groupId: "xa-hoi", riasec: ["A", "S", "C"],
    summary: "Sử dụng tiếng Nhật chuyên nghiệp trong doanh nghiệp Nhật Bản.",
    description: "Đào tạo tiếng Nhật kinh doanh, dịch thuật và kỹ thuật; nhu cầu tuyển dụng cao từ doanh nghiệp FDI Nhật Bản tại Việt Nam.",
    curriculum: [
      ["Cơ sở ngành", [["Ngữ pháp tiếng Nhật", "N5 đến N2 theo chuẩn JLPT."], ["Hán tự và từ vựng chuyên ngành", "Kanji kinh doanh và kỹ thuật."]]],
      ["Chuyên ngành", [["Tiếng Nhật kinh doanh (Bijinesu Nihongo)", "Ứng xử, email và thuyết trình tiếng Nhật."], ["Biên dịch kỹ thuật Nhật – Việt", "Dịch tài liệu kỹ thuật và hợp đồng."]]],
    ],
    careers: [["Thực thi & chuyên môn", "Thông dịch viên tiếng Nhật", "15 - 30 triệu/tháng", "Phiên dịch cho chuyên gia Nhật tại nhà máy."], ["Thực thi & chuyên môn", "Nhân viên cầu nối (Bridge SE)", "18 - 35 triệu/tháng", "Điều phối dự án IT Nhật – Việt."], ["Quản lý & chiến lược", "Quản lý quan hệ đối tác Nhật Bản", "30 - 55 triệu/tháng", "Phát triển và duy trì quan hệ đối tác Nhật."]],
    demand: "Rất cao", growth: 12,
  },
  {
    slug: "ngoai-ngu-han", code: "7220212", name: "Ngôn ngữ Hàn", groupId: "xa-hoi", riasec: ["A", "S", "C"],
    summary: "Giao tiếp và làm việc trong môi trường doanh nghiệp Hàn Quốc.",
    description: "Đào tạo tiếng Hàn kinh doanh, dịch thuật và kỹ thuật; nhu cầu tuyển dụng cao từ Samsung, LG, Hyundai và hàng nghìn doanh nghiệp Hàn tại Việt Nam.",
    curriculum: [
      ["Cơ sở ngành", [["Tiếng Hàn tổng hợp", "Ngữ pháp và kỹ năng giao tiếp TOPIK II."], ["Văn hóa Hàn Quốc", "Xã hội, kinh doanh và phong tục Hàn."]]],
      ["Chuyên ngành", [["Tiếng Hàn kinh doanh", "Đàm phán, viết email và thuyết trình."], ["Biên dịch Hàn – Việt", "Dịch tài liệu kỹ thuật và pháp lý."]]],
    ],
    careers: [["Thực thi & chuyên môn", "Thông dịch viên tiếng Hàn", "15 - 28 triệu/tháng", "Phiên dịch tại nhà máy và văn phòng Hàn Quốc."], ["Thực thi & chuyên môn", "Chuyên viên quan hệ đối tác Hàn Quốc", "15 - 30 triệu/tháng", "Điều phối hợp tác với đối tác Hàn."], ["Quản lý & chiến lược", "Quản lý dự án FDI Hàn Quốc", "30 - 55 triệu/tháng", "Điều hành các dự án đầu tư Hàn Quốc."]]  ,
    demand: "Rất cao", growth: 13,
  },
  {
    slug: "ngoai-ngu-trung", code: "7220204", name: "Ngôn ngữ Trung", groupId: "xa-hoi", riasec: ["A", "S", "C"],
    summary: "Giao tiếp và kinh doanh với đối tác Trung Quốc, Đài Loan.",
    description: "Đào tạo tiếng Trung phổ thông và thương mại; nhu cầu cao trong xuất nhập khẩu, thương mại điện tử xuyên biên giới.",
    curriculum: [
      ["Cơ sở ngành", [["Tiếng Trung tổng hợp", "Ngữ pháp, từ vựng và kỹ năng giao tiếp HSK 4-5."], ["Hán văn cổ đại và hiện đại", "Đọc hiểu văn bản thương mại và hành chính."]]],
      ["Chuyên ngành", [["Tiếng Trung thương mại", "Đàm phán xuất nhập khẩu, hội chợ thương mại."], ["Biên dịch Trung – Việt", "Dịch hợp đồng, tài liệu kỹ thuật."]]],
    ],
    careers: [["Thực thi & chuyên môn", "Thông dịch viên tiếng Trung", "14 - 26 triệu/tháng", "Phiên dịch đàm phán và ký kết hợp đồng."], ["Thực thi & chuyên môn", "Chuyên viên xuất nhập khẩu với Trung Quốc", "12 - 22 triệu/tháng", "Xử lý đơn hàng và thủ tục hải quan."], ["Quản lý & chiến lược", "Giám đốc kinh doanh khu vực Đông Á", "30 - 55 triệu/tháng", "Phát triển thị trường Trung Quốc, Đài Loan."]]  ,
    demand: "Cao", growth: 10,
  },
  {
    slug: "quan-he-quoc-te", code: "7310601", name: "Quan hệ quốc tế", groupId: "xa-hoi", riasec: ["E", "S", "I"],
    summary: "Phân tích chính trị quốc tế, ngoại giao và hội nhập kinh tế.",
    description: "Đào tạo chuyên gia ngoại giao, phân tích chính sách đối ngoại, hội nhập quốc tế và luật pháp quốc tế.",
    curriculum: [
      ["Cơ sở ngành", [["Lý luận quan hệ quốc tế", "Chủ nghĩa hiện thực, tự do và kiến tạo."], ["Lịch sử ngoại giao", "Quan hệ quốc tế từ thế kỷ 20 đến nay."]]],
      ["Chuyên ngành", [["Ngoại giao kinh tế", "Hội nhập thương mại và đầu tư quốc tế."], ["Phân tích chính sách đối ngoại", "Phân tích xung đột và đàm phán quốc tế."]]],
    ],
    careers: [["Thực thi & chuyên môn", "Chuyên viên quan hệ quốc tế", "14 - 26 triệu/tháng", "Phân tích và điều phối hợp tác quốc tế."], ["Thực thi & chuyên môn", "Nhân viên ngoại giao", "15 - 28 triệu/tháng", "Công tác tại đại sứ quán, lãnh sự quán."], ["Quản lý & chiến lược", "Tham tán thương mại", "35 - 65 triệu/tháng", "Xúc tiến đầu tư và thương mại quốc tế."]]  ,
    demand: "Trung bình", growth: 6,
  },

  // ── NGHỆ THUẬT – NGÀNH HẸP ────────────────────────────────────────────────
  {
    slug: "thiet-ke-thoi-trang", code: "7210404", name: "Thiết kế thời trang", groupId: "nghe-thuat", riasec: ["A", "E", "R"],
    summary: "Sáng tạo bộ sưu tập thời trang và sản phẩm dệt may theo xu hướng.",
    description: "Đào tạo thiết kế thời trang, may mẫu, dệt vải và quản lý thương hiệu thời trang; kết hợp nghệ thuật và kỹ thuật may mặc.",
    curriculum: [
      ["Cơ sở ngành", [["Vẽ mẫu thời trang", "Phác thảo, diễn họa trang phục."], ["Vật liệu dệt may", "Vải, sợi và đặc tính chất liệu."]]],
      ["Chuyên ngành", [["Thiết kế bộ sưu tập", "Lên ý tưởng, nghiên cứu xu hướng, hoàn thiện sản phẩm."], ["Quản lý thương hiệu thời trang", "Định vị thương hiệu, kênh phân phối."]]],
    ],
    careers: [["Thực thi & chuyên môn", "Nhà thiết kế thời trang", "10 - 22 triệu/tháng", "Thiết kế trang phục và phụ kiện."], ["Thực thi & chuyên môn", "Stylist", "12 - 25 triệu/tháng", "Phối đồ và tạo hình ảnh cho người mẫu, nghệ sĩ."], ["Quản lý & chiến lược", "Giám đốc sáng tạo thời trang", "30 - 60 triệu/tháng", "Định hướng thẩm mỹ thương hiệu."]]  ,
    demand: "Trung bình", growth: 7,
  },
  {
    slug: "dien-anh-truyen-hinh", code: "7210402", name: "Điện ảnh – Truyền hình", groupId: "nghe-thuat", riasec: ["A", "E", "S"],
    summary: "Sản xuất phim điện ảnh, phim truyền hình và nội dung video sáng tạo.",
    description: "Đào tạo đạo diễn, biên kịch, quay phim, dựng phim và sản xuất phim; thực hành sản xuất tác phẩm thật từ năm đầu.",
    curriculum: [
      ["Cơ sở ngành", [["Ngôn ngữ điện ảnh", "Góc máy, ánh sáng và dựng phim."], ["Biên kịch", "Cấu trúc kịch bản, đối thoại và nhân vật."]]],
      ["Chuyên ngành", [["Đạo diễn phim", "Chỉ đạo diễn xuất và quá trình sản xuất."], ["Kỹ thuật hậu kỳ", "Dựng phim, chỉnh màu, VFX."]]],
    ],
    careers: [["Thực thi & chuyên môn", "Quay phim / Biên tập", "12 - 25 triệu/tháng", "Quay và dựng nội dung video."], ["Thực thi & chuyên môn", "Biên kịch", "12 - 28 triệu/tháng", "Viết kịch bản phim và chương trình truyền hình."], ["Quản lý & chiến lược", "Đạo diễn phim", "30 - 80 triệu/tháng", "Dẫn dắt sản xuất tác phẩm điện ảnh."]]  ,
    demand: "Trung bình", growth: 8,
  },
  {
    slug: "am-nhac", code: "7210301", name: "Âm nhạc", groupId: "nghe-thuat", riasec: ["A", "S", "E"],
    summary: "Biểu diễn, sáng tác và sản xuất âm nhạc chuyên nghiệp.",
    description: "Đào tạo nhạc cụ, thanh nhạc, lý thuyết âm nhạc và sản xuất âm nhạc; hướng tới nghề nhạc sĩ, ca sĩ hoặc giáo viên âm nhạc.",
    curriculum: [
      ["Cơ sở ngành", [["Lý thuyết âm nhạc", "Ký xướng âm, hòa âm, phức điệu."], ["Lịch sử âm nhạc", "Âm nhạc phương Tây và Việt Nam."]]],
      ["Chuyên ngành", [["Biểu diễn nhạc cụ / thanh nhạc", "Kỹ thuật thực hành và biểu diễn sân khấu."], ["Sản xuất âm nhạc (Music Production)", "DAW, mix, master và phát hành nhạc số."]]],
    ],
    careers: [["Thực thi & chuyên môn", "Nhạc sĩ / Ca sĩ", "Biến động theo sự nghiệp", "Sáng tác và biểu diễn nghệ thuật."], ["Thực thi & chuyên môn", "Giáo viên âm nhạc", "10 - 20 triệu/tháng", "Giảng dạy tại trường phổ thông và trung tâm."], ["Quản lý & chiến lược", "Producer / A&R Manager", "25 - 55 triệu/tháng", "Phát triển nghệ sĩ và sản phẩm âm nhạc."]],
    demand: "Trung bình", growth: 5,
  },
  {
    slug: "my-thuat", code: "7210101", name: "Mỹ thuật", groupId: "nghe-thuat", riasec: ["A", "R", "I"],
    summary: "Sáng tác tác phẩm mỹ thuật và ứng dụng nghệ thuật thị giác.",
    description: "Đào tạo hội họa, điêu khắc, đồ họa và mỹ thuật ứng dụng; sinh viên phát triển ngôn ngữ nghệ thuật riêng và kỹ năng vẽ chuyên nghiệp.",
    curriculum: [
      ["Cơ sở ngành", [["Hình họa và ký họa", "Vẽ nhân vật, tĩnh vật và phong cảnh."], ["Lý luận và lịch sử mỹ thuật", "Các trường phái và phong cách nghệ thuật."]]],
      ["Chuyên ngành", [["Chuyên ngành hội họa / điêu khắc", "Tạo tác phẩm theo định hướng nghệ thuật."], ["Mỹ thuật ứng dụng", "Thiết kế, minh họa và nghệ thuật thương mại."]]],
    ],
    careers: [["Thực thi & chuyên môn", "Họa sĩ / Nghệ sĩ thị giác", "Biến động", "Sáng tác và triển lãm tác phẩm mỹ thuật."], ["Thực thi & chuyên môn", "Minh họa / Illustrator", "12 - 25 triệu/tháng", "Minh họa sách, truyện tranh và truyền thông."], ["Quản lý & chiến lược", "Giám tuyển nghệ thuật", "20 - 40 triệu/tháng", "Tổ chức triển lãm và quản lý gallery."]],
    demand: "Trung bình", growth: 4,
  },

  // ── GIÁO DỤC – NGÀNH HẸP ──────────────────────────────────────────────────
  {
    slug: "giao-duc-mam-non", code: "7140201", name: "Giáo dục Mầm non", groupId: "giao-duc", riasec: ["S", "A", "C"],
    summary: "Nuôi dưỡng và giáo dục trẻ 0–6 tuổi theo phương pháp khoa học.",
    description: "Đào tạo giáo viên mầm non với kiến thức tâm lý trẻ em, dinh dưỡng và phương pháp dạy học sáng tạo; nhu cầu tuyển dụng ổn định.",
    curriculum: [
      ["Cơ sở ngành", [["Tâm lý học trẻ em", "Phát triển nhận thức, ngôn ngữ và xã hội."], ["Giáo dục học mầm non", "Nguyên lý và các phương pháp dạy trẻ."]]],
      ["Chuyên ngành", [["Tổ chức hoạt động giáo dục", "Thiết kế góc chơi và bài học trải nghiệm."], ["Thực tập tại trường mầm non", "Thực hành chăm sóc và dạy trẻ."]]],
    ],
    careers: [["Thực thi & chuyên môn", "Giáo viên mầm non", "7 - 14 triệu/tháng", "Chăm sóc và dạy trẻ tại trường."], ["Thực thi & chuyên môn", "Giáo viên mầm non quốc tế", "15 - 28 triệu/tháng", "Giảng dạy tại trường mầm non quốc tế."], ["Quản lý & chiến lược", "Hiệu trưởng mầm non", "18 - 35 triệu/tháng", "Quản lý toàn diện cơ sở giáo dục mầm non."]],
    demand: "Cao", growth: 6,
  },
  {
    slug: "giao-duc-tieu-hoc", code: "7140202", name: "Giáo dục Tiểu học", groupId: "giao-duc", riasec: ["S", "C", "A"],
    summary: "Giảng dạy toàn diện các môn học cho học sinh tiểu học.",
    description: "Đào tạo giáo viên tiểu học dạy tất cả các môn; chú trọng phương pháp tích hợp và đổi mới sáng tạo trong giáo dục cơ sở.",
    curriculum: [
      ["Cơ sở ngành", [["Tâm lý học tiểu học", "Đặc điểm tâm lý lứa tuổi 6–11."], ["Nội dung dạy học Toán và Tiếng Việt", "Kiến thức và phương pháp chuyên môn."]]],
      ["Chuyên ngành", [["Thiết kế hoạt động dạy học", "Kế hoạch bài dạy và đánh giá học sinh."], ["Thực tập tiểu học", "Thực hành dạy học tại trường."]]],
    ],
    careers: [["Thực thi & chuyên môn", "Giáo viên tiểu học", "7 - 14 triệu/tháng", "Dạy học và chủ nhiệm lớp tiểu học."], ["Thực thi & chuyên môn", "Gia sư tiểu học chuyên nghiệp", "10 - 20 triệu/tháng", "Dạy kèm và hỗ trợ học sinh yếu kém."], ["Quản lý & chiến lược", "Phó hiệu trưởng tiểu học", "15 - 28 triệu/tháng", "Quản lý chuyên môn và hành chính trường."]],
    demand: "Trung bình", growth: 4,
  },
  {
    slug: "su-pham-ngu-van", code: "7140217", name: "Sư phạm Ngữ văn", groupId: "giao-duc", riasec: ["A", "S", "C"],
    summary: "Giảng dạy Ngữ văn và phát triển năng lực đọc – viết cho học sinh.",
    description: "Đào tạo giáo viên Ngữ văn THCS và THPT; kết hợp kiến thức văn học, ngôn ngữ học và nghiệp vụ sư phạm.",
    curriculum: [
      ["Cơ sở ngành", [["Văn học Việt Nam và thế giới", "Thơ, truyện ngắn, tiểu thuyết các thời kỳ."], ["Ngôn ngữ học tiếng Việt", "Ngữ âm, từ vựng, ngữ pháp tiếng Việt."]]],
      ["Chuyên ngành", [["Phương pháp dạy học Ngữ văn", "Thiết kế bài dạy đọc hiểu và viết."], ["Thực tập sư phạm", "Giảng dạy tại trường THCS/THPT."]]],
    ],
    careers: [["Thực thi & chuyên môn", "Giáo viên Ngữ văn THPT", "8 - 15 triệu/tháng", "Dạy Ngữ văn và chủ nhiệm lớp."], ["Thực thi & chuyên môn", "Biên soạn sách giáo khoa", "15 - 25 triệu/tháng", "Viết và biên tập nội dung giáo dục."], ["Quản lý & chiến lược", "Tổ trưởng Ngữ văn", "15 - 25 triệu/tháng", "Điều phối chuyên môn tổ Ngữ văn."]],
    demand: "Trung bình", growth: 3,
  },
  {
    slug: "su-pham-tieng-anh", code: "7140231", name: "Sư phạm Tiếng Anh", groupId: "giao-duc", riasec: ["S", "A", "E"],
    summary: "Giảng dạy tiếng Anh hiệu quả theo chuẩn quốc tế.",
    description: "Đào tạo giáo viên tiếng Anh đạt B2+ theo CEFR; phương pháp dạy học giao tiếp và tích hợp kỹ thuật số.",
    curriculum: [
      ["Cơ sở ngành", [["Kỹ năng tiếng Anh tổng hợp", "Listening, speaking, reading, writing cấp độ IELTS 6.5."], ["Dẫn luận ngôn ngữ học", "Ngữ âm học, từ vựng học, cú pháp."]]],
      ["Chuyên ngành", [["Phương pháp giảng dạy tiếng Anh (TESOL)", "CLT, TBL, flipped classroom."], ["Thực tập giảng dạy", "Dạy tiếng Anh tại trường phổ thông."]]],
    ],
    careers: [["Thực thi & chuyên môn", "Giáo viên tiếng Anh THPT", "10 - 20 triệu/tháng", "Giảng dạy và luyện thi tiếng Anh."], ["Thực thi & chuyên môn", "Giảng viên tiếng Anh trung tâm", "14 - 28 triệu/tháng", "Dạy IELTS, TOEIC và giao tiếp."], ["Quản lý & chiến lược", "Quản lý học thuật trung tâm ngoại ngữ", "25 - 45 triệu/tháng", "Giám sát chất lượng giảng dạy toàn trung tâm."]],
    demand: "Rất cao", growth: 10,
  },
  {
    slug: "su-pham-lich-su", code: "7140218", name: "Sư phạm Lịch sử", groupId: "giao-duc", riasec: ["S", "A", "I"],
    summary: "Giảng dạy Lịch sử và giáo dục công dân cho học sinh phổ thông.",
    description: "Đào tạo giáo viên Lịch sử với kiến thức sử học và phương pháp dạy học theo hướng tiếp cận nguồn sử liệu.",
    curriculum: [
      ["Cơ sở ngành", [["Lịch sử Việt Nam", "Từ tiền sử đến hiện đại."], ["Lịch sử thế giới", "Lịch sử cổ đại, trung đại, cận và hiện đại."]]],
      ["Chuyên ngành", [["Phương pháp dạy học Lịch sử", "Sử dụng nguồn sử liệu và thực địa."], ["Thực tập sư phạm", "Dạy Lịch sử tại trường THCS/THPT."]]],
    ],
    careers: [["Thực thi & chuyên môn", "Giáo viên Lịch sử THPT", "8 - 14 triệu/tháng", "Giảng dạy môn Lịch sử và Giáo dục công dân."], ["Thực thi & chuyên môn", "Nghiên cứu viên lịch sử", "12 - 20 triệu/tháng", "Nghiên cứu và biên soạn tài liệu lịch sử."], ["Quản lý & chiến lược", "Tổ trưởng khoa học xã hội", "15 - 24 triệu/tháng", "Điều phối chuyên môn tổ KHXH."]],
    demand: "Trung bình", growth: 2,
  },
  {
    slug: "su-pham-vat-ly", code: "7140211", name: "Sư phạm Vật lý", groupId: "giao-duc", riasec: ["I", "S", "R"],
    summary: "Giảng dạy Vật lý theo hướng thực nghiệm và STEM.",
    description: "Đào tạo giáo viên Vật lý với nền tảng khoa học vững và phương pháp dạy học thực nghiệm, tích hợp STEM.",
    curriculum: [
      ["Cơ sở ngành", [["Vật lý đại cương", "Cơ học, nhiệt học, điện từ, quang học."], ["Phương pháp thực nghiệm vật lý", "Thiết kế thí nghiệm và xử lý số liệu."]]],
      ["Chuyên ngành", [["Phương pháp dạy học Vật lý", "Thiết kế bài dạy thực hành và STEM."], ["Thực tập sư phạm", "Dạy Vật lý tại trường THCS/THPT."]]],
    ],
    careers: [["Thực thi & chuyên môn", "Giáo viên Vật lý THPT", "8 - 15 triệu/tháng", "Giảng dạy và hướng dẫn thực hành."], ["Thực thi & chuyên môn", "Gia sư Vật lý – Toán lý thi đại học", "12 - 25 triệu/tháng", "Luyện thi chuyên sâu cho học sinh."], ["Quản lý & chiến lược", "Chuyên viên phát triển chương trình STEM", "18 - 30 triệu/tháng", "Thiết kế chương trình STEM cho trường học."]],
    demand: "Trung bình", growth: 4,
  },
  {
    slug: "giao-duc-the-chat", code: "7140206", name: "Giáo dục Thể chất", groupId: "giao-duc", riasec: ["R", "S", "E"],
    summary: "Phát triển thể lực và giáo dục sức khỏe cho học sinh.",
    description: "Đào tạo giáo viên Giáo dục thể chất, huấn luyện viên thể thao và chuyên viên quản lý thể dục thể thao.",
    curriculum: [
      ["Cơ sở ngành", [["Giải phẫu và sinh lý thể dục thể thao", "Cơ thể học và phản ứng sinh lý khi luyện tập."], ["Nguyên lý huấn luyện thể thao", "Lý thuyết tập luyện và phát triển thể lực."]]],
      ["Chuyên ngành", [["Phương pháp dạy học GDTC", "Thiết kế bài học thể dục và đánh giá."], ["Kỹ năng chuyên sâu môn thể thao", "Bóng đá, bóng rổ, bơi lội, điền kinh."]]],
    ],
    careers: [["Thực thi & chuyên môn", "Giáo viên Giáo dục thể chất", "8 - 14 triệu/tháng", "Dạy thể dục tại trường phổ thông."], ["Thực thi & chuyên môn", "Huấn luyện viên thể thao", "12 - 25 triệu/tháng", "Huấn luyện vận động viên hoặc câu lạc bộ."], ["Quản lý & chiến lược", "Quản lý trung tâm thể dục thể thao", "20 - 40 triệu/tháng", "Điều hành gym, sân thể thao, trung tâm VĐV."]],
    demand: "Trung bình", growth: 5,
  },

  // ── NÔNG LÂM – NGÀNH HẸP ──────────────────────────────────────────────────
  {
    slug: "nong-nghiep", code: "7620101", name: "Nông nghiệp", groupId: "nong-lam", riasec: ["R", "I", "S"],
    summary: "Sản xuất nông nghiệp bền vững, ứng dụng công nghệ cao.",
    description: "Đào tạo kỹ sư nông nghiệp về trồng trọt, cây ăn quả, rau màu và nông nghiệp công nghệ cao (nhà kính, thủy canh, IoT nông nghiệp).",
    curriculum: [
      ["Cơ sở ngành", [["Khoa học đất và phân bón", "Đặc tính đất, dinh dưỡng cây trồng."], ["Sinh lý thực vật", "Quang hợp, hô hấp, sinh trưởng."]]],
      ["Chuyên ngành", [["Kỹ thuật trồng trọt", "Canh tác rau, lúa, cây ăn quả."], ["Nông nghiệp công nghệ cao", "Nhà kính, IoT, tưới nhỏ giọt tự động."]]],
    ],
    careers: [["Thực thi & chuyên môn", "Kỹ sư nông nghiệp", "10 - 20 triệu/tháng", "Quản lý sản xuất nông nghiệp."], ["Thực thi & chuyên môn", "Chuyên viên khuyến nông", "9 - 15 triệu/tháng", "Hỗ trợ kỹ thuật cho nông dân."], ["Quản lý & chiến lược", "Quản lý trang trại nông nghiệp CNC", "20 - 40 triệu/tháng", "Điều hành sản xuất nông sản công nghệ cao."]],
    demand: "Trung bình", growth: 7,
  },
  {
    slug: "lam-nghiep", code: "7620201", name: "Lâm nghiệp", groupId: "nong-lam", riasec: ["R", "I", "S"],
    summary: "Quản lý tài nguyên rừng và trồng rừng bền vững.",
    description: "Đào tạo kỹ sư lâm nghiệp về quy hoạch rừng, trồng rừng, bảo vệ rừng và chế biến lâm sản.",
    curriculum: [
      ["Cơ sở ngành", [["Sinh thái rừng", "Hệ sinh thái rừng và đa dạng sinh học."], ["Điều tra lâm nghiệp", "Đo đếm trữ lượng gỗ, lập bản đồ."]]],
      ["Chuyên ngành", [["Trồng và chăm sóc rừng", "Kỹ thuật trồng rừng phòng hộ, kinh tế."], ["Lâm sản ngoài gỗ", "Khai thác và chế biến song, mây, tre."]]],
    ],
    careers: [["Thực thi & chuyên môn", "Kiểm lâm viên", "9 - 15 triệu/tháng", "Bảo vệ và quản lý tài nguyên rừng."], ["Thực thi & chuyên môn", "Kỹ sư quy hoạch rừng", "12 - 22 triệu/tháng", "Lập quy hoạch bảo vệ và phát triển rừng."], ["Quản lý & chiến lược", "Quản lý ban quản lý rừng", "20 - 35 triệu/tháng", "Điều hành quản lý bảo vệ rừng đặc dụng."]]  ,
    demand: "Trung bình", growth: 5,
  },
  {
    slug: "thu-y", code: "7640101", name: "Thú y", groupId: "nong-lam", riasec: ["R", "I", "S"],
    summary: "Chẩn đoán và điều trị bệnh cho động vật nuôi và thú cưng.",
    description: "Đào tạo bác sĩ thú y cho chăn nuôi, kiểm dịch động vật, thú y thú cưng và nghiên cứu bệnh động vật.",
    curriculum: [
      ["Cơ sở ngành", [["Giải phẫu và sinh lý thú y", "Cơ thể học và chức năng các loài gia súc, gia cầm."], ["Vi sinh vật và bệnh truyền nhiễm", "Tác nhân gây bệnh và phòng chống dịch."]]],
      ["Lâm sàng thú y", [["Chẩn đoán và điều trị bệnh gia súc", "Khám, chẩn đoán bệnh nội ngoại khoa."], ["Thú y thú cưng", "Phòng và điều trị bệnh chó, mèo."]]],
    ],
    careers: [["Thực thi & chuyên môn", "Bác sĩ thú y", "12 - 22 triệu/tháng", "Khám, điều trị và tư vấn phòng bệnh."], ["Thực thi & chuyên môn", "Kiểm dịch viên động vật", "10 - 18 triệu/tháng", "Kiểm soát dịch bệnh và xuất nhập khẩu động vật."], ["Quản lý & chiến lược", "Quản lý trại chăn nuôi", "20 - 40 triệu/tháng", "Điều hành sản xuất và phòng dịch trại."]],
    demand: "Cao", growth: 8,
  },
  {
    slug: "nuoi-trong-thuy-san", code: "7620301", name: "Nuôi trồng thủy sản", groupId: "nong-lam", riasec: ["R", "I", "S"],
    summary: "Kỹ thuật nuôi cá, tôm và các loài thủy sản kinh tế.",
    description: "Đào tạo kỹ sư nuôi trồng thủy sản: kỹ thuật ao hồ, lồng bè, công nghệ tuần hoàn nước và quản lý chất lượng nước.",
    curriculum: [
      ["Cơ sở ngành", [["Sinh học và dinh dưỡng thủy sản", "Đặc điểm sinh học cá, tôm, nhuyễn thể."], ["Chất lượng nước trong nuôi trồng", "pH, oxy hòa tan, ammonia, vi sinh."]]],
      ["Chuyên ngành", [["Kỹ thuật nuôi tôm và cá nước lợ", "Ao nuôi, cho ăn, phòng dịch bệnh."], ["Công nghệ nuôi tuần hoàn (RAS)", "Hệ thống nuôi mật độ cao, tái sử dụng nước."]]],
    ],
    careers: [["Thực thi & chuyên môn", "Kỹ sư nuôi trồng thủy sản", "10 - 20 triệu/tháng", "Quản lý ao nuôi và kỹ thuật sản xuất."], ["Thực thi & chuyên môn", "Chuyên viên kiểm soát chất lượng thủy sản", "12 - 22 triệu/tháng", "Kiểm tra dư lượng thuốc và an toàn thực phẩm."], ["Quản lý & chiến lược", "Quản lý vùng nuôi", "20 - 40 triệu/tháng", "Điều hành vùng nuôi trồng quy mô lớn."]],
    demand: "Cao", growth: 9,
  },
  {
    slug: "cong-nghe-che-bien-thuy-san", code: "7540105", name: "Công nghệ chế biến thủy sản", groupId: "nong-lam", riasec: ["R", "I", "C"],
    summary: "Chế biến, bảo quản và kiểm soát chất lượng sản phẩm thủy sản.",
    description: "Đào tạo kỹ sư chế biến thủy sản: công nghệ đông lạnh, sấy, đồ hộp, surimi và kiểm soát chất lượng xuất khẩu.",
    curriculum: [
      ["Cơ sở ngành", [["Hóa sinh và vi sinh thủy sản", "Thành phần dinh dưỡng và nguyên nhân hư hỏng."], ["Công nghệ lạnh và đông lạnh", "Bảo quản đông và chuỗi lạnh."]]],
      ["Chuyên ngành", [["Công nghệ chế biến cá và tôm", "Dây chuyền fillet, chiên, đóng gói."], ["Hệ thống quản lý chất lượng (HACCP)", "Kiểm soát an toàn thực phẩm xuất khẩu."]]],
    ],
    careers: [["Thực thi & chuyên môn", "Kỹ sư QA/QC thủy sản", "11 - 20 triệu/tháng", "Kiểm tra chất lượng và an toàn thực phẩm."], ["Thực thi & chuyên môn", "Chuyên viên R&D sản phẩm thủy sản", "13 - 24 triệu/tháng", "Phát triển sản phẩm mới và cải tiến công thức."], ["Quản lý & chiến lược", "Quản lý nhà máy chế biến thủy sản", "30 - 55 triệu/tháng", "Điều hành sản xuất và xuất khẩu."]]  ,
    demand: "Cao", growth: 8,
  },
  {
    slug: "quan-ly-dat-dai", code: "7850103", name: "Quản lý đất đai", groupId: "nong-lam", riasec: ["C", "R", "I"],
    summary: "Đăng ký, quy hoạch và quản lý nhà nước về đất đai.",
    description: "Đào tạo cán bộ địa chính, đo đạc bản đồ, quy hoạch sử dụng đất và quản lý thị trường bất động sản.",
    curriculum: [
      ["Cơ sở ngành", [["Luật đất đai", "Khung pháp lý về quyền sử dụng đất."], ["Đo đạc địa chính", "Kỹ thuật đo vẽ, lập bản đồ địa chính."]]],
      ["Chuyên ngành", [["Quy hoạch sử dụng đất", "Lập kế hoạch và phân bổ đất đai."], ["Thị trường bất động sản", "Định giá đất, giao dịch quyền sử dụng đất."]]],
    ],
    careers: [["Thực thi & chuyên môn", "Cán bộ địa chính", "9 - 16 triệu/tháng", "Quản lý hồ sơ đất và cấp sổ đỏ."], ["Thực thi & chuyên môn", "Chuyên viên định giá bất động sản", "14 - 25 triệu/tháng", "Thẩm định giá trị đất và tài sản gắn liền."], ["Quản lý & chiến lược", "Trưởng phòng quản lý đất đai", "22 - 40 triệu/tháng", "Điều hành quản lý nhà nước về đất đai địa phương."]],
    demand: "Trung bình", growth: 6,
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
}));
