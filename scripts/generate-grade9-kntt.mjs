import { readFile, writeFile } from "node:fs/promises";

/**
 * SGK KHTN 9 – Kết nối tri thức (toàn bộ mạch Sinh học)
 * Chương XI (36–41), XII (42–46), XIII (47–48), XIV (49–51)
 */
export const lessons = [
  ["g9_b36", "Bài 36. Khái quát về di truyền học", "Di truyền học Mendel – Cơ sở phân tử", 11, 36, "Tính trạng, gen, kiểu gen, kiểu hình; di truyền là truyền thông tin từ đời này sang đời khác.", "genetics"],
  ["g9_b37", "Bài 37. Các quy luật di truyền của Mendel", "Di truyền học Mendel – Cơ sở phân tử", 11, 37, "Luật phân ly và luật phân ly độc lập; lai một và hai cặp tính trạng (sơ lược).", "genetics"],
  ["g9_b38", "Bài 38. Nucleic acid và gene", "Di truyền học Mendel – Cơ sở phân tử", 11, 38, "ADN, ARN; gene là đoạn ADN mã hóa polypeptide hoặc ARN.", "genetics"],
  ["g9_b39", "Bài 39. Tái bản DNA và phiên mã tạo RNA", "Di truyền học Mendel – Cơ sở phân tử", 11, 39, "Nhân đôi ADN bán bảo tồn; phiên mã tạo mARN từ gene.", "genetics"],
  ["g9_b40", "Bài 40. Dịch mã và mối quan hệ từ gene đến tính trạng", "Di truyền học Mendel – Cơ sở phân tử", 11, 40, "mARN → protein; tính trạng phụ thuộc gen và môi trường.", "genetics"],
  ["g9_b41", "Bài 41. Đột biến gene", "Di truyền học Mendel – Cơ sở phân tử", 11, 41, "Đột biến gen thay đổi trình tự nucleotide; có thể ảnh hưởng protein.", "genetics"],
  ["g9_b42", "Bài 42. Nhiễm sắc thể và bộ nhiễm sắc thể", "Di truyền nhiễm sắc thể", 12, 42, "NST mang gen; bộ NST đặc trưng loài; 2n và n (sơ lược).", "cell"],
  ["g9_b43", "Bài 43. Nguyên phân và giảm phân", "Di truyền nhiễm sắc thể", 12, 43, "Nguyên phân: 2n → 2n; giảm phân: 2n → n cho giao tử.", "reproduction"],
  ["g9_b44", "Bài 44. Nhiễm sắc thể giới tính và xác định giới tính", "Di truyền nhiễm sắc thể", 12, 44, "XX, XY (người); cơ chế xác định giới tính.", "genetics"],
  ["g9_b45", "Bài 45. Di truyền liên kết", "Di truyền nhiễm sắc thể", 12, 45, "Gen trên cùng NST thường di truyền liên kết.", "genetics"],
  ["g9_b46", "Bài 46. Đột biến nhiễm sắc thể", "Di truyền nhiễm sắc thể", 12, 46, "Thừa, thiếu, đảo đoạn NST; hậu quả sơ lược.", "genetics"],
  ["g9_b47", "Bài 47. Di truyền học với con người", "Di truyền học với con người và đời sống", 13, 47, "Bệnh di truyền; tư vấn di truyền và phòng bệnh.", "genetics"],
  ["g9_b48", "Bài 48. Ứng dụng công nghệ di truyền vào đời sống", "Di truyền học với con người và đời sống", 13, 48, "ADN tái tổ hợp, vắc-xin, chọn giống; đạo đức công nghệ gen.", "biotechnology"],
  ["g9_b49", "Bài 49. Khái niệm tiến hóa và các hình thức chọn lọc", "Tiến hóa", 14, 49, "Tiến hóa là thay đổi loài qua thời gian; chọn lọc tự nhiên, nhân tạo.", "evolution"],
  ["g9_b50", "Bài 50. Cơ chế tiến hóa", "Tiến hóa", 14, 50, "Đột biến, giao phối, chọn lọc tạo nên tiến hóa.", "evolution"],
  ["g9_b51", "Bài 51. Sự phát sinh và phát triển của sự sống trên Trái Đất", "Tiến hóa", 14, 51, "Sự sống xuất hiện từ hàng tỷ năm trước; phát triển từ đơn giản đến phức tạp.", "evolution"]
];

export const SOURCE = "Bám mạch SGK Khoa học tự nhiên 9 – Kết nối tri thức với cuộc sống (mạch Sinh học), nội dung tự biên soạn.";

export const core = {
  g9_b36: ["Di truyền học", "Tính trạng do gen và môi trường; thông tin di truyền qua thế hệ.", "Màu hạt đậu xanh/tím là tính trạng Mendel nghiên cứu.", "Gen quy định tính trạng (sơ lược)."],
  g9_b37: ["Luật Mendel", "Phân ly: Aa → A, a; phân ly độc lập với hai cặp gen.", "Lai Aa × Aa → tỷ lệ kiểu hình 3:1 (sơ lược).", "Dùng bảng Punnett dự đoán con."],
  g9_b38: ["ADN và gene", "ADN xoắn kép; A–T, G–C; gene là đoạn ADN có ý nghĩa.", "Một gene có thể mã hóa một chuỗi amino acid.", "ARN tham gia biểu hiện gen."],
  g9_b39: ["Tái bản và phiên mã", "ADN → ADN (tái bản); ADN → mARN (phiên mã).", "Trước phân chia tế bào ADN nhân đôi.", "mARN mang thông tin từ nhân ra tế bào chất."],
  g9_b40: ["Dịch mã", "mARN → protein tại ribosome; bộ ba mã hóa amino acid.", "Đột biến gen có thể đổi amino acid → đổi protein.", "Kiểu hình = gen + môi trường."],
  g9_b41: ["Đột biến gen", "Thay đổi nucleotide: thay thế, thêm, mất.", "Có thể vô hại, có lợi hoặc gây bệnh.", "Nguồn đa dạng gen cho tiến hóa."],
  g9_b42: ["Nhiễm sắc thể", "NST cấu trúc gen; người 2n = 46 NST.", "Bộ NST đặc trưng loài.", "Gen nằm trên NST."],
  g9_b43: ["Nguyên phân – giảm phân", "Nguyên phân: sinh trưởng/sửa chữa; giảm phân: tạo giao tử n.", "Giao tử 23 NST → hợp tử 46 NST.", "Giảm phân đảm bảo 2n qua thế hệ."],
  g9_b44: ["Giới tính", "Người XX nữ, XY nam; gen trên NST giới tính.", "Cơ chế xác định giới tính khác nhau giữa loài.", "Di truyền giới tính liên quan NST."],
  g9_b45: ["Liên kết gen", "Gen gần nhau trên NST di truyền cùng nhau.", "Khác luật phân ly độc lập khi gen liên kết.", "Hoán vị gen làm tách li kết (sơ lược)."],
  g9_b46: ["Đột biến NST", "Thừa/thiếu bộ NST hoặc đoạn NST.", "Down: thừa NST 21 (sơ lược).", "Ảnh hưởng lớn đến kiểu hình."],
  g9_b47: ["Di truyền người", "Bệnh di truyền: hemophilia, mù màu (sơ lược).", "Tư vấn di truyền trước sinh.", "Không kỳ thị người khuyết tật."],
  g9_b48: ["Công nghệ gen", "ADN tái tổ hợp, insulin, vắc-xin, chọn giống.", "Chọn lọc phôi IVF (đạo đức).", "Lợi ích và rủi ro cần cân nhắc."],
  g9_b49: ["Tiến hóa", "Quần thể thay đổi allele qua thời gian.", "Chọn lọc tự nhiên: cá thể thích nghi sống sót hơn.", "Chọn lọc nhân tạo: giống cây, vật nuôi."],
  g9_b50: ["Cơ chế tiến hóa", "Đột biến tạo biến dị; chọn lọc giữ allele có lợi.", "Kháng thuốc vi khuẩn là chọn lọc tự nhiên.", "Cách ly sinh sản tạo loài mới (sơ lược)."],
  g9_b51: ["Nguồn gốc sự sống", "Sự sống hình thành từ hàng tỷ năm trước.", "Hóa thạch chứng minh tiến hóa.", "Từ sinh vật đơn giản → phức tạp."]
};

export const q = {
  g9_b36: [
    ["multiple_choice", "Gen là:", ["Đoạn ADN mã hóa thông tin di truyền", "Chỉ protein", "Chỉ môi trường", "Chỉ NST"], "Đoạn ADN mã hóa thông tin di truyền", "Đơn vị di truyền (sơ lược)."],
    ["multiple_choice", "Kiểu hình phụ thuộc:", ["Gen và môi trường", "Chỉ gen", "Chỉ thời tiết một ngày", "Chỉ vật lí"], "Gen và môi trường", "Biểu hiện tính trạng."],
    ["multiple_choice", "Di truyền là:", ["Truyền thông tin từ thế hệ trước", "Chỉ quang hợp", "Chỉ tiêu hóa", "Chỉ hô hấp"], "Truyền thông tin từ thế hệ trước", "Đặc trưng sinh học."]
  ],
  g9_b37: [
    ["multiple_choice", "Luật phân ly của Mendel:", ["Allele tách vào giao tử", "Gen luôn dính", "Không có giao tử", "Chỉ có kiểu hình"], "Allele tách vào giao tử", "Aa → A và a trong giao tử."],
    ["multiple_choice", "Lai Aa × Aa (một gen, trội hoàn toàn) kiểu hình F1 thường:", ["3 trội : 1 lặn (sơ lược)", "1:1:1:1 luôn", "Chỉ lặn", "Không có quy luật"], "3 trội : 1 lặn (sơ lược)", "Tỷ lệ kinh điển."],
    ["multiple_choice", "Bảng Punnett dùng để:", ["Dự đoán kiểu gen/con", "Đo nhiệt độ", "Quan sát tế bào", "Cân khối lượng"], "Dự đoán kiểu gen/con", "Công cụ di truyền."]
  ],
  g9_b38: [
    ["multiple_choice", "ADN có cấu trúc:", ["Xoắn kép", "Chỉ sợi đơn vĩnh viễn", "Chỉ protein", "Chỉ lipid"], "Xoắn kép", "Hai chuỗi polynucleotide."],
    ["multiple_choice", "Cặp bazơ trong ADN:", ["A–T, G–C", "A–G, T–C", "Chỉ A–A", "Chỉ T–T"], "A–T, G–C", "Quy tắc bổ sung."],
    ["multiple_choice", "Gene nằm trên:", ["ADN (NST)", "Chỉ ribosome", "Chỉ màng", "Chỉ vacuole"], "ADN (NST)", "Thông tin di truyền."]
  ],
  g9_b39: [
    ["multiple_choice", "Tái bản DNA tạo:", ["Hai phân tử ADN con", "Chỉ protein", "Chỉ mARN", "Chỉ lipid"], "Hai phân tử ADN con", "Nhân đôi trước phân chia."],
    ["multiple_choice", "Phiên mã là:", ["ADN → mARN", "mARN → protein", "Protein → ADN", "Chỉ hô hấp"], "ADN → mARN", "Bước biểu hiện gen."],
    ["multiple_choice", "mARN mang thông tin từ:", ["Gene đến ribosome", "Chỉ môi trường", "Chỉ tim", "Chỉ xương"], "Gene đến ribosome", "Trung gian dịch mã."]
  ],
  g9_b40: [
    ["multiple_choice", "Dịch mã là:", ["mARN → protein", "ADN → ADN", "Protein → mARN", "Chỉ quang hợp"], "mARN → protein", "Tại ribosome."],
    ["multiple_choice", "Protein ảnh hưởng:", ["Kiểu hình (một phần)", "Chỉ nhiệt độ Trái Đất", "Chỉ quỹ đạo sao", "Không liên quan gen"], "Kiểu hình (một phần)", "Gen → protein → tính trạng."],
    ["multiple_choice", "Bộ ba trên mARN mã hóa:", ["Một amino acid", "Cả NST", "Cả cơ thể", "Chỉ nước"], "Một amino acid", "Mã di truyền (sơ lược)."]
  ],
  g9_b41: [
    ["multiple_choice", "Đột biến gen là:", ["Thay đổi trình tự nucleotide", "Chỉ đổi màu áo", "Chỉ tăng chiều cao do ăn", "Không ảnh hưởng ADN"], "Thay đổi trình tự nucleotide", "Nguồn biến dị."],
    ["multiple_choice", "Đột biến có thể:", ["Vô hại, có lợi hoặc gây bệnh", "Luôn tốt", "Không tồn tại", "Chỉ ở thực vật"], "Vô hại, có lợi hoặc gây bệnh", "Tùy vị trí và loại."],
    ["multiple_choice", "Đột biến cung cấp:", ["Nguyên liệu cho tiến hóa", "Chỉ giảm đa dạng", "Chỉ làm hỏng gen", "Không liên quan tiến hóa"], "Nguyên liệu cho tiến hóa", "Chọn lọc tự nhiên."]
  ],
  g9_b42: [
    ["multiple_choice", "Người bình thường có bộ NST:", ["2n = 46", "2n = 23", "Chỉ 1 NST", "Không có NST"], "2n = 46", "22 cặp thường + 1 cặp giới (sơ lược)."],
    ["multiple_choice", "Gen nằm trên:", ["Nhiễm sắc thể", "Chỉ ribosome", "Chỉ màng", "Chỉ không khí"], "Nhiễm sắc thể", "Vị trí gen trên NST."],
    ["multiple_choice", "Bộ NST đặc trưng:", ["Theo loài", "Giống hệt mọi loài", "Chỉ theo màu da", "Không quan trọng"], "Theo loài", "Đặc trưng loài."]
  ],
  g9_b43: [
    ["multiple_choice", "Nguyên phân cho:", ["2n → 2n", "2n → n", "n → 2n", "Chỉ tạo giao tử"], "2n → 2n", "Sinh trưởng, thay tế tế bào."],
    ["multiple_choice", "Giảm phân cho:", ["2n → n (giao tử)", "n → 2n", "2n → 2n", "Không đổi NST"], "2n → n (giao tử)", "Chuẩn bị sinh sản hữu tính."],
    ["multiple_choice", "Hợp tử người thường:", ["2n = 46", "n = 23", "Chỉ 1 NST", "Không có NST"], "2n = 46", "Giao tử n kết hợp."]
  ],
  g9_b44: [
    ["multiple_choice", "Người XX thường là:", ["Nữ", "Nam", "Không xác định", "Cả hai"], "Nữ", "NST giới tính (sơ lược)."],
    ["multiple_choice", "Người XY thường là:", ["Nam", "Nữ", "Không liên quan giới", "Chỉ cây"], "Nam", "Quy ước SGK THCS."],
    ["multiple_choice", "Giới tính do:", ["NST giới tính và gen liên quan", "Chỉ thời tiết", "Chỉ ăn uống", "Chỉ vận động"], "NST giới tính và gen liên quan", "Cơ chế sinh học."]
  ],
  g9_b45: [
    ["multiple_choice", "Di truyền liên kết khi gen:", ["Trên cùng NST", "Ở hai NST khác xa", "Không trên NST", "Chỉ ở ribosome"], "Trên cùng NST", "Di truyền cùng nhau."],
    ["multiple_choice", "Khác luật phân ly độc lập khi:", ["Gen liên kết trên NST", "Gen ở NST khác nhau", "Không có gen", "Chỉ có một allele"], "Gen liên kết trên NST", "Mendel giả định độc lập."],
    ["multiple_choice", "Hoán vị gen có thể:", ["Tách li kết gen (sơ lược)", "Không ảnh hưởng", "Chỉ tạo protein", "Chỉ quang hợp"], "Tách li kết gen (sơ lược)", "Tăng đa dạng giao tử."]
  ],
  g9_b46: [
    ["multiple_choice", "Đột biến NST có thể:", ["Thừa/thiếu đoạn hoặc cả NST", "Chỉ đổi màu tóc do nhuộm", "Không ảnh hưởng", "Chỉ ở virus"], "Thừa/thiếu đoạn hoặc cả NST", "Hậu quả lớn."],
    ["multiple_choice", "Hội chứng Down (sơ lược) liên quan:", ["Thừa NST 21", "Thiếu NST X duy nhất", "Chỉ gen lặn", "Chỉ môi trường"], "Thừa NST 21", "Ví dụ đột biến số NST."],
    ["multiple_choice", "Đột biến NST khác đột biến gen ở:", ["Quy mô cấu trúc NST", "Giống hệt nhau", "Không liên quan di truyền", "Chỉ là protein"], "Quy mô cấu trúc NST", "Mức độ khác nhau."]
  ],
  g9_b47: [
    ["multiple_choice", "Bệnh di truyền:", ["Do gen/NST bất thường", "Chỉ do ăn uống", "Chỉ do gió", "Không liên quan gen"], "Do gen/NST bất thường", "Cần tư vấn y khoa."],
    ["multiple_choice", "Tư vấn di truyền giúp:", ["Phòng và hiểu rủi ro", "Thay thế bác sĩ", "Chỉ để phân biệt đối xử", "Không có ích"], "Phòng và hiểu rủi ro", "Đạo đức y học."],
    ["multiple_choice", "Với người khuyết tật di truyền:", ["Tôn trọng, không kỳ thị", "Loại trừ", "Chê bai", "Không quan tâm"], "Tôn trọng, không kỳ thị", "Giáo dục công dân."]
  ],
  g9_b48: [
    ["multiple_choice", "ADN tái tổ hợp ứng dụng:", ["Insulin, chọn giống", "Chỉ đốt than", "Chỉ quang hợp", "Chỉ tiêu hóa"], "Insulin, chọn giống", "Công nghệ gen."],
    ["multiple_choice", "Vắc-xin công nghệ gen:", ["Kích hoạt miễn dịch an toàn hơn một số cách cũ", "Luôn gây bệnh", "Không liên quan di truyền", "Chỉ cho cây"], "Kích hoạt miễn dịch an toàn hơn một số cách cũ", "Y học hiện đại."],
    ["multiple_choice", "Công nghệ gen cần:", ["Cân nhắc đạo đức", "Không cần quy định", "Chỉ lợi ích", "Bỏ qua rủi ro"], "Cân nhắc đạo đức", "Trách nhiệm xã hội."]
  ],
  g9_b49: [
    ["multiple_choice", "Tiến hóa là:", ["Thay đổi quần thể qua thời gian", "Thay đổi cá nhân trong một đời", "Chỉ quang hợp", "Chỉ tiêu hóa"], "Thay đổi quần thể qua thời gian", "Khái niệm cơ bản."],
    ["multiple_choice", "Chọn lọc tự nhiên:", ["Cá thể thích nghi sống sót và sinh sản hơn", "Luôn ngẫu nhiên", "Chỉ do con người", "Không ảnh hưởng allele"], "Cá thể thích nghi sống sót và sinh sản hơn", "Darwin (sơ lược)."],
    ["multiple_choice", "Chọn lọc nhân tạo:", ["Con người chọn giống", "Chỉ ở rừng", "Không liên quan gen", "Chỉ vi khuẩn tự chọn"], "Con người chọn giống", "Nông nghiệp, chăn nuôi."]
  ],
  g9_b50: [
    ["multiple_choice", "Cơ chế tiến hóa gồm:", ["Đột biến, chọn lọc, giao phối", "Chỉ hô hấp", "Chỉ quang hợp", "Chỉ tiêu hóa"], "Đột biến, chọn lọc, giao phối", "Thay đổi tần số allele."],
    ["multiple_choice", "Kháng thuốc kháng sinh:", ["Chọn lọc tự nhiên vi khuẩn", "Không liên quan tiến hóa", "Chỉ do may mắn", "Chỉ ở thực vật"], "Chọn lọc tự nhiên vi khuẩn", "Ví dụ tiến hóa vi mô."],
    ["multiple_choice", "Cách ly sinh sản:", ["Góp phần hình thành loài mới (sơ lược)", "Không ảnh hưởng", "Chỉ ở đá", "Chỉ một ngày"], "Góp phần hình thành loài mới (sơ lược)", "Tiến hóa loài."]
  ],
  g9_b51: [
    ["multiple_choice", "Sự sống trên Trái Đất:", ["Phát sinh từ hàng tỷ năm trước", "Chỉ vài năm", "Chỉ do con người tạo", "Không có bằng chứng"], "Phát sinh từ hàng tỷ năm trước", "Lịch sử địa chất – sinh học."],
    ["multiple_choice", "Hóa thạch giúp:", ["Chứng minh tiến hóa", "Chỉ trang trí", "Không có giá trị", "Chỉ đo nhiệt độ"], "Chứng minh tiến hóa", "Bằng chứng khoa học."],
    ["multiple_choice", "Xu hướng phát triển sự sống:", ["Từ đơn giản đến phức tạp (sơ lược)", "Từ phức tạp về đơn giản tuyệt đối", "Không thay đổi", "Chỉ virus"], "Từ đơn giản đến phức tạp (sơ lược)", "Quan sát đa dạng sinh học."]
  ]
};

export const errors = [
  ["g9_b37", "gen trội luôn nhiều", "genetics_error", "Nhầm Mendel", "Kiểu hình phụ thuộc tỷ lệ gen, gen trội không luôn 100%.", "Dùng bảng Punnett."],
  ["g9_b38", "adn mot chuoi", "genetics_error", "Nhầm cấu trúc ADN", "ADN thường là hai chuỗi xoắn kép.", "Gen là đoạn ADN."],
  ["g9_b39", "phiên mã la dich ma", "genetics_error", "Nhầm phiên mã và dịch mã", "Phiên mã: ADN→mARN; dịch mã: mARN→protein.", "Hai bước biểu hiện gen."],
  ["g9_b43", "giam phan 2n", "cell_error", "Nhầm nguyên phân và giảm phân", "Giảm phân: 2n→n; nguyên phân: 2n→2n.", "Giao tử n NST."],
  ["g9_b44", "xx la nam", "genetics_error", "Nhầm giới tính người", "XX thường nữ; XY thường nam (sơ lược SGK).", "NST giới tính."],
  ["g9_b48", "vaccine gay benh", "biotech_error", "Hiểu sai vaccine", "Vaccine kích hoạt miễn dịch, không cố ý gây bệnh nặng.", "Tiêm chủng đúng lịch."],
  ["g9_b49", "ca the tien hoa", "evolution_error", "Nhầm tiến hóa cá thể", "Tiến hóa là thay đổi quần thể qua thế hệ.", "Không phải một đời sống."],
  ["g9_b50", "chon loc tao gen", "evolution_error", "Nhầm chọn lọc", "Chọn lọc tác trên biến dị có sẵn, không tự tạo gen mới.", "Đột biến + chọn lọc."]
];

export function skillFromLesson(item, index) {
  const [id, title, chapter, chapterIndex, lessonNo, description, visualization] = item;
  const domainMap = { 11: "Di truyền phân tử", 12: "Di truyền NST", 13: "Di truyền & ứng dụng", 14: "Tiến hóa" };
  return {
    id,
    title,
    grade: 9,
    book: "Kết nối tri thức",
    chapter,
    chapterIndex,
    lessonNo,
    domain: domainMap[chapterIndex] || chapter,
    level: chapterIndex <= 11 ? 4 : chapterIndex <= 13 ? 5 : 5,
    prerequisite: index === 0 ? [] : [lessons[index - 1][0]],
    description,
    visualization
  };
}

export function lessonSteps(item) {
  const [id, , , , , description, visualization] = item;
  const [visualTitle, visualContent, example, summary] = core[id];
  return [
    { type: "intro", title: "Mục tiêu vi kỹ năng", content: description },
    { type: "visualization", title: visualTitle, content: visualContent, visualization },
    { type: "example", title: "Ví dụ từ SGK", content: example },
    { type: "summary", title: "Ghi nhớ nhanh", content: summary }
  ];
}

export function questionObjects([id]) {
  return q[id].map((entry, index) => {
    const [type, question, choicesOrAnswer, answerOrHint, maybeHint] = entry;
    const isChoice = type === "multiple_choice";
    return {
      id: `q_${id}_${index + 1}`,
      skill: id,
      type,
      question,
      ...(isChoice ? { choices: choicesOrAnswer, answer: answerOrHint, hint: maybeHint } : { answer: choicesOrAnswer, hint: answerOrHint })
    };
  });
}

export function toLessonRow(item) {
  return [9, item[0], item[1], item[2], item[3], item[4], item[5], item[6]];
}

const grade9Skills = lessons.map((item, index) => skillFromLesson(item, index));
const grade9Lessons = lessons.map((item) => ({
  id: item[0],
  title: item[1],
  skill: item[0],
  chapter: item[2],
  source: SOURCE,
  xp: 50,
  steps: lessonSteps(item)
}));
const grade9Questions = lessons.flatMap(questionObjects);
const grade9Errors = errors.map(([skill, pattern, errorType, title, message, hint]) => ({
  pattern,
  skill,
  errorType,
  title,
  message,
  hint,
  recommendation: skill
}));

const isMain = process.argv[1]?.endsWith("generate-grade9-kntt.mjs");
if (isMain) {
  const lower = JSON.parse(await readFile("data/skills.json", "utf8")).filter((s) => s.grade < 9);
  const lowerLessons = JSON.parse(await readFile("data/lessons.json", "utf8")).filter((l) => lower.some((s) => s.id === l.skill));
  const lowerQuestions = JSON.parse(await readFile("data/questions.json", "utf8")).filter((qItem) => lower.some((s) => s.id === qItem.skill));
  const otherErrors = JSON.parse(await readFile("data/errors.json", "utf8")).filter((e) => !e.skill?.startsWith("g9_"));

  await writeFile("data/skills.json", `${JSON.stringify([...lower, ...grade9Skills], null, 2)}\n`);
  await writeFile("data/lessons.json", `${JSON.stringify([...lowerLessons, ...grade9Lessons], null, 2)}\n`);
  await writeFile("data/questions.json", `${JSON.stringify([...lowerQuestions, ...grade9Questions], null, 2)}\n`);
  await writeFile("data/errors.json", `${JSON.stringify([...otherErrors, ...grade9Errors], null, 2)}\n`);

  console.log(`Grade 9 Sinh học KNTT: ${grade9Skills.length} bài, ${grade9Questions.length} câu hỏi, ${grade9Errors.length} mẫu lỗi.`);
  console.log(`Tổng ứng dụng: ${lower.length + grade9Skills.length} bài, ${lowerQuestions.length + grade9Questions.length} câu hỏi.`);
}
