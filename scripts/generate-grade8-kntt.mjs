import { readFile, writeFile } from "node:fs/promises";

/**
 * SGK KHTN 8 – Kết nối tri thức (toàn bộ mạch Sinh học)
 * Chương VII (30–40), Chương VIII (41–47)
 */
export const lessons = [
  ["g8_b30", "Bài 30. Khái quát về cơ thể người", "Sinh học cơ thể người", 7, 30, "Cơ thể người gồm các hệ cơ quan phối hợp; tế bào – mô – cơ quan – hệ cơ quan.", "cell"],
  ["g8_b31", "Bài 31. Hệ vận động ở người", "Sinh học cơ thể người", 7, 31, "Xương, khớp, cơ tạo thành hệ vận động; cơ co duỗi làm xương di chuyển.", "animal"],
  ["g8_b32", "Bài 32. Dinh dưỡng và tiêu hóa ở người", "Sinh học cơ thể người", 7, 32, "Hệ tiêu hóa biến thức ăn thành chất hấp thu; chế độ ăn cân bằng.", "digestion"],
  ["g8_b33", "Bài 33. Máu và hệ tuần hoàn của cơ thể người", "Sinh học cơ thể người", 7, 33, "Máu gồm huyết tương và tế bào máu; tim bơm máu qua mạch máu.", "circulation"],
  ["g8_b34", "Bài 34. Hệ hô hấp ở người", "Sinh học cơ thể người", 7, 34, "Khí quản, phế nang trao đổi O₂ và CO₂; hô hấp khí và hô hấp tế bào.", "respiration"],
  ["g8_b35", "Bài 35. Hệ bài tiết ở người", "Sinh học cơ thể người", 7, 35, "Thận lọc máu, tạo nước tiểu; loại chất thải và cân bằng nước.", "digestion"],
  ["g8_b36", "Bài 36. Điều hòa môi trường trong của cơ thể người", "Sinh học cơ thể người", 7, 36, "Cơ thể duy trì nhiệt độ, pH, nồng độ glucose ổn định.", "circulation"],
  ["g8_b37", "Bài 37. Hệ thần kinh và các giác quan ở người", "Sinh học cơ thể người", 7, 37, "Não, tủy sống, dây thần kinh; giác quan tiếp nhận kích thích.", "nervous"],
  ["g8_b38", "Bài 38. Hệ nội tiết ở người", "Sinh học cơ thể người", 7, 38, "Tuyến nội tiết tiết hormone điều hòa trao đổi chất, sinh trưởng.", "nervous"],
  ["g8_b39", "Bài 39. Da và điều hòa thân nhiệt ở người", "Sinh học cơ thể người", 7, 39, "Da bảo vệ, cảm giác; mồ hôi và mạch máu giúp điều hòa nhiệt.", "respiration"],
  ["g8_b40", "Bài 40. Sinh sản ở người", "Sinh học cơ thể người", 7, 40, "Cơ quan sinh sản; thụ tinh, thai kỳ và chăm sóc sức khỏe sinh sản.", "reproduction"],
  ["g8_b41", "Bài 41. Môi trường và các nhân tố sinh thái", "Sinh vật và môi trường", 8, 41, "Môi trường sống; nhân tố vô sinh và hữu sinh ảnh hưởng sinh vật.", "ecosystem"],
  ["g8_b42", "Bài 42. Quần thể sinh vật", "Sinh vật và môi trường", 8, 42, "Quần thể: cá thể cùng loài trong không gian; mật độ, cơ cấu tuổi.", "ecosystem"],
  ["g8_b43", "Bài 43. Quần xã sinh vật", "Sinh vật và môi trường", 8, 43, "Quần xã: nhiều quần thể cùng sống trong một không gian.", "ecosystem"],
  ["g8_b44", "Bài 44. Hệ sinh thái", "Sinh vật và môi trường", 8, 44, "Thành phần vô sinh, sinh vật và luồng năng lượng, vật chất.", "ecosystem"],
  ["g8_b45", "Bài 45. Sinh quyển", "Sinh vật và môi trường", 8, 45, "Sinh quyển gồm sinh vật và môi trường sống trên Trái Đất.", "environment"],
  ["g8_b46", "Bài 46. Cân bằng tự nhiên", "Sinh vật và môi trường", 8, 46, "Hệ sinh thái tự điều chỉnh; mối quan hệ cạnh tranh, hộ sinh, ký sinh.", "environment"],
  ["g8_b47", "Bài 47. Bảo vệ môi trường", "Sinh vật và môi trường", 8, 47, "Ô nhiễm, biến đổi khí hậu; hành động bảo vệ thiên nhiên bền vững.", "environment"]
];

export const SOURCE = "Bám mạch SGK Khoa học tự nhiên 8 – Kết nối tri thức với cuộc sống (mạch Sinh học), nội dung tự biên soạn.";

export const core = {
  g8_b30: ["Cơ thể người", "Các hệ cơ quan phối hợp: tiêu hóa, tuần hoàn, thần kinh...", "Tế bào → mô → cơ quan → hệ cơ quan → cơ thể.", "Cơ thể là thể thống nhất sống."],
  g8_b31: ["Hệ vận động", "Bộ xương đỡ cơ thể; khớp nối xương; cơ bám xương co duỗi.", "Gập cánh tay: cơ nhị đầu co, cơ tam đầu duỗi.", "Vận động cần xương, khớp, cơ phối hợp."],
  g8_b32: ["Tiêu hóa", "Miệng nghiền; dạ dày tiêu protein; ruột hấp thu.", "Enzyme nước bọt, dạ dày, tụy tham gia tiêu hóa.", "Ăn đủ nhóm thực phẩm, nhai kỹ."],
  g8_b33: ["Tuần hoàn máu", "Tim bơm máu; động mạch đi nuôi cơ quan, tĩnh mạch về tim.", "Hồng cầu vận chuyển O₂; bạch cầu miễn dịch.", "Vận động đều giúp tim khỏe."],
  g8_b34: ["Hô hấp", "Không khí qua phế quản đến phế nang; khí diffuses vào máu.", "Chạy nhanh → thở gấp vì cần nhiều O₂.", "Không hút thuốc — bảo vệ phổi."],
  g8_b35: ["Hệ bài tiết", "Thận lọc máu tạo nước tiểu; loại ure, acid uric.", "Uống đủ nước giúp thận hoạt động tốt.", "Giữ vệ sinh, tránh giữ nước tiểu lâu."],
  g8_b36: ["Nội môi trường", "Cơ thể duy trì nhiệt độ ~37°C, glucose, pH ổn định.", "Đói → hạ đường huyết; ăn điều hòa lại.", "Thận, gan, hormone phối hợp điều hòa."],
  g8_b37: ["Thần kinh", "Não điều khiển; tủy truyền xung; dây thần kinh dẫn tín hiệu.", "Phản xạ gập tay khi chạm nóng.", "Giác quan: mắt, tai, mũi, lưỡi, da."],
  g8_b38: ["Nội tiết", "Hormone đi theo máu tác dụng cơ quan đích.", "Insulin hạ glucose; tuyến giáp điều hòa trao đổi.", "Mất cân bằng hormone gây bệnh."],
  g8_b39: ["Da và nhiệt", "Da bảo vệ, cảm giác; mồ hôi bay hơi làm mát.", "Trời nóng → đỏ da, đổ mồ hôi.", "Mặc phù hợp, uống nước khi nóng."],
  g8_b40: ["Sinh sản", "Cơ quan sinh dục nam/nữ; thụ tinh tạo hợp tử.", "Thai nhi phát triển trong tử cung.", "Vệ sinh, tư vấn sức khỏe sinh sản THCS."],
  g8_b41: ["Nhân tố sinh thái", "Vô sinh: ánh sáng, nước, nhiệt; hữu sinh: kẻ săn mồi, cạnh tranh.", "Cây thiếu nước → héo; thiếu sáng → vàng lá.", "Môi trường quyết định sinh trưởng."],
  g8_b42: ["Quần thể", "Mật độ = số cá thể / diện tích; cơ cấu tuổi, giới.", "Quần thể ếch trong ao giảm do ô nhiễm.", "Theo dõi quần thể phục vụ bảo tồn."],
  g8_b43: ["Quần xã", "Nhiều loài cùng sống: cây, động vật, vi sinh.", "Rừng nhiệt đới: quần xã phong phú.", "Quan hệ cạnh tranh, hộ sinh trong quần xã."],
  g8_b44: ["Hệ sinh thái", "Sinh vật + môi trường vô sinh; chuỗi và lưới thức ăn.", "Cỏ → châu chấu → ếch → rắn.", "Năng lượng giảm qua các bậc."],
  g8_b45: ["Sinh quyển", "Lớp sống trên Trái Đất: đất liền, nước, không khí.", "Đại dương chiếm phần lớn sinh quyển.", "Con người ảnh hưởng mạnh sinh quyển."],
  g8_b46: ["Cân bằng tự nhiên", "Số lượng sinh vật dao động quanh mức ổn định.", "Sói ăn thỏ → kiểm soát quần thể thỏ.", "Phá vỡ cân bằng → hậu quả xấu."],
  g8_b47: ["Bảo vệ môi trường", "Giảm rác nhựa, tiết kiệm năng lượng, trồng cây.", "Tái chế giảm rác thải.", "Phát triển bền vững gắn trách nhiệm cá nhân."]
};

export const q = {
  g8_b30: [
    ["multiple_choice", "Cơ thể người gồm:", ["Nhiều hệ cơ quan phối hợp", "Chỉ một tế bào", "Chỉ xương", "Chỉ da"], "Nhiều hệ cơ quan phối hợp", "Thể thống nhất."],
    ["multiple_choice", "Thứ tự tổ chức:", ["Tế bào → mô → cơ quan → hệ cơ quan", "Cơ quan → tế bào", "Chỉ mô", "Chỉ hệ"], "Tế bào → mô → cơ quan → hệ cơ quan", "Cấp tổ chức đa bào."],
    ["multiple_choice", "Hệ cơ quan là:", ["Nhiều cơ quan phối hợp", "Một tế bào", "Chỉ xương", "Chỉ máu"], "Nhiều cơ quan phối hợp", "Ví dụ: hệ tiêu hóa."]
  ],
  g8_b31: [
    ["multiple_choice", "Cơ co duỗi tác dụng lên:", ["Xương", "Tim", "Phổi", "Thận"], "Xương", "Làm xương di chuyển."],
    ["multiple_choice", "Khớp giúp:", ["Nối và cho xương cử động", "Bơm máu", "Hô hấp", "Tiêu hóa"], "Nối và cho xương cử động", "Ví dụ: khớp khuỷu."],
    ["multiple_choice", "Hệ vận động gồm:", ["Xương, khớp, cơ", "Chỉ da", "Chỉ não", "Chỉ phế nang"], "Xương, khớp, cơ", "Ba thành phần chính."]
  ],
  g8_b32: [
    ["multiple_choice", "Ruột non chủ yếu:", ["Hấp thu chất dinh dưỡng", "Nghiền thức ăn", "Tiết mồ hôi", "Lọc máu"], "Hấp thu chất dinh dưỡng", "Sau tiêu hóa."],
    ["multiple_choice", "Dạ dày có:", ["Axit và enzyme tiêu protein", "Chỉ khí O₂", "Chỉ xương", "Chỉ hormone sinh sản"], "Axit và enzyme tiêu protein", "Môi trường axit."],
    ["multiple_choice", "Chế độ ăn cân bằng:", ["Đủ chất, đa dạng thực phẩm", "Chỉ ăn đường", "Bỏ bữa sáng", "Không uống nước"], "Đủ chất, đa dạng thực phẩm", "Dinh dưỡng hợp lý."]
  ],
  g8_b33: [
    ["multiple_choice", "Tim có vai trò:", ["Bơm máu", "Tiêu hóa", "Thở khí", "Lọc nước tiểu"], "Bơm máu", "Trung tâm tuần hoàn."],
    ["multiple_choice", "Hồng cầu vận chuyển:", ["Oxy (chủ yếu)", "Chỉ CO₂ duy nhất", "Chỉ mỡ", "Chỉ enzyme"], "Oxy (chủ yếu)", "Nhờ hemoglobin."],
    ["multiple_choice", "Động mạch (sơ lược THCS):", ["Máu đi từ tim ra cơ quan", "Luôn về tim", "Chỉ ở phổi", "Không có máu"], "Máu đi từ tim ra cơ quan", "Nuôi cơ quan."]
  ],
  g8_b34: [
    ["multiple_choice", "Trao đổi khí ở phổi:", ["O₂ vào máu, CO₂ ra", "Chỉ hít CO₂", "Không có phế nang", "Chỉ ở dạ dày"], "O₂ vào máu, CO₂ ra", "Hô hấp khí."],
    ["multiple_choice", "Chạy nhanh thở gấp vì:", ["Cơ cần nhiều O₂", "Không hô hấp", "Chỉ quang hợp", "Tim ngừng"], "Cơ cần nhiều O₂", "Hô hấp tế bào tăng."],
    ["multiple_choice", "Hút thuốc lá:", ["Gây hại phổi", "Tốt cho hô hấp", "Không ảnh hưởng", "Chỉ ảnh hưởng da"], "Gây hại phổi", "Phòng bệnh hô hấp."]
  ],
  g8_b35: [
    ["multiple_choice", "Thận có chức năng:", ["Lọc máu, tạo nước tiểu", "Bơm máu", "Tiêu hóa", "Nghe âm thanh"], "Lọc máu, tạo nước tiểu", "Hệ bài tiết."],
    ["multiple_choice", "Nước tiểu loại bỏ:", ["Chất thải như ure", "Chỉ O₂", "Chỉ protein hữu ích", "Chỉ glucose bình thường"], "Chất thải như ure", "Sản phẩm chuyển hóa."],
    ["multiple_choice", "Uống đủ nước giúp:", ["Thận hoạt động tốt", "Không cần thận", "Chỉ tăng cân vô hạn", "Ngừng bài tiết"], "Thận hoạt động tốt", "Phòng sỏi thận (sơ lược)."]
  ],
  g8_b36: [
    ["multiple_choice", "Nội môi trường cần ổn định:", ["Nhiệt độ, glucose, pH", "Chỉ màu da", "Chỉ chiều cao", "Chỉ tóc"], "Nhiệt độ, glucose, pH", "Điều hòa nội môi trường."],
    ["multiple_choice", "Đói lâu thường:", ["Hạ đường huyết", "Tăng O₂ vô hạn", "Ngừng tim", "Không ảnh hưởng"], "Hạ đường huyết", "Cần năng lượng từ thức ăn."],
    ["multiple_choice", "Điều hòa nội môi trường nhờ:", ["Thận, gan, hormone", "Chỉ xương", "Chỉ tóc", "Chỉ móng"], "Thận, gan, hormone", "Phối hợp nhiều cơ quan."]
  ],
  g8_b37: [
    ["multiple_choice", "Não có vai trò:", ["Xử lý thông tin, điều khiển", "Chỉ bơm máu", "Chỉ tiêu hóa", "Chỉ lọc nước tiểu"], "Xử lý thông tin, điều khiển", "Trung tâm thần kinh."],
    ["multiple_choice", "Phản xạ là:", ["Phản ứng nhanh qua tủy", "Suy nghĩ lâu", "Chỉ quang hợp", "Chỉ tiêu hóa"], "Phản ứng nhanh qua tủy", "Cung phản xạ."],
    ["multiple_choice", "Giác quan gồm:", ["Mắt, tai, mũi, lưỡi, da", "Chỉ tim", "Chỉ phổi", "Chỉ xương"], "Mắt, tai, mũi, lưỡi, da", "Tiếp nhận kích thích."]
  ],
  g8_b38: [
    ["multiple_choice", "Hormone là:", ["Chất hóa học điều hòa qua máu", "Chỉ protein tiêu hóa", "Chỉ O₂", "Chỉ xương"], "Chất hóa học điều hòa qua máu", "Nội tiết."],
    ["multiple_choice", "Insulin giúp:", ["Hạ glucose máu", "Tăng glucose vô hạn", "Chỉ tiêu hóa xương", "Chỉ thở"], "Hạ glucose máu", "Tuyến tụy tiết insulin."],
    ["multiple_choice", "Hệ nội tiết phối hợp với:", ["Hệ thần kinh", "Chỉ xương", "Chỉ răng", "Không phối hợp"], "Hệ thần kinh", "Điều hòa cơ thể."]
  ],
  g8_b39: [
    ["multiple_choice", "Da giúp:", ["Bảo vệ, cảm giác, điều hòa nhiệt", "Chỉ tiêu hóa", "Chỉ bơm máu", "Chỉ thở"], "Bảo vệ, cảm giác, điều hòa nhiệt", "Cơ quan lớn nhất."],
    ["multiple_choice", "Trời nóng cơ thể:", ["Đổ mồ hôi làm mát", "Ngừng hô hấp", "Giảm nhiệt bằng đóng băng", "Không điều hòa"], "Đổ mồ hôi làm mát", "Bay hơi mồ hôi tỏa nhiệt."],
    ["multiple_choice", "Nhiệt độ cơ thể người bình thường khoảng:", ["37°C", "0°C", "100°C", "50°C"], "37°C", "Ổn định nội môi trường."]
  ],
  g8_b40: [
    ["multiple_choice", "Thụ tinh là:", ["Giao tử đực kết hợp trứng", "Chỉ phân chia tế bào da", "Chỉ hô hấp", "Chỉ tiêu hóa"], "Giao tử đực kết hợp trứng", "Tạo hợp tử."],
    ["multiple_choice", "Thai nhi phát triển ở:", ["Tử cung", "Dạ dày", "Phổi", "Xương đùi"], "Tử cung", "Sinh sản người."],
    ["multiple_choice", "Chăm sóc sức khỏe sinh sản THCS:", ["Vệ sinh, tư vấn người lớn", "Tự ý dùng thuốc lạ", "Không cần học", "Bỏ qua vệ sinh"], "Vệ sinh, tư vấn người lớn", "Giáo dục sức khỏe."]
  ],
  g8_b41: [
    ["multiple_choice", "Nhân tố vô sinh:", ["Ánh sáng, nước, nhiệt độ", "Chỉ thú ăn thịt", "Chỉ cây", "Chỉ vi khuẩn có lợi"], "Ánh sáng, nước, nhiệt độ", "Không phải sinh vật."],
    ["multiple_choice", "Nhân tố hữu sinh:", ["Cạnh tranh, kẻ thù tự nhiên", "Chỉ đá", "Chỉ nước", "Chỉ gió"], "Cạnh tranh, kẻ thù tự nhiên", "Sinh vật ảnh hưởng sinh vật."],
    ["multiple_choice", "Cây thiếu nước:", ["Héo lá", "Quang hợp vô hạn", "Không hô hấp", "Chết ngay không héo"], "Héo lá", "Nước cần cho sinh trưởng."]
  ],
  g8_b42: [
    ["multiple_choice", "Quần thể là:", ["Cá thể cùng loài trong không gian", "Chỉ một cá thể", "Chỉ đất", "Chỉ nước mưa"], "Cá thể cùng loài trong không gian", "Đơn vị sinh thái học."],
    ["multiple_choice", "Mật độ quần thể:", ["Số cá thể / diện tích", "Chỉ chiều cao cây", "Chỉ nhiệt độ", "Chỉ pH"], "Số cá thể / diện tích", "Đo quy mô quần thể."],
    ["multiple_choice", "Quần thể giảm có thể do:", ["Ô nhiễm, săn bắt quá mức", "Chỉ tăng thêm cá thể", "Không có nguyên nhân", "Chỉ mưa"], "Ô nhiễm, săn bắt quá mức", "Yếu tố hạn chế."]
  ],
  g8_b43: [
    ["multiple_choice", "Quần xã là:", ["Nhiều quần thể cùng sống", "Một loài duy nhất", "Chỉ đá", "Chỉ khí quyển"], "Nhiều quần thể cùng sống", "Đa loài trong không gian."],
    ["multiple_choice", "Quan hệ hộ sinh:", ["Hai loài cùng có lợi", "Chỉ có hại", "Không tương tác", "Chỉ cạnh tranh"], "Hai loài cùng có lợi", "Ví dụ: ong và hoa."],
    ["multiple_choice", "Rừng nhiệt đới:", ["Quần xã phong phú", "Không có động vật", "Chỉ một cây", "Không có vi sinh"], "Quần xã phong phú", "Đa dạng sinh học cao."]
  ],
  g8_b44: [
    ["multiple_choice", "Hệ sinh thái gồm:", ["Sinh vật + môi trường vô sinh", "Chỉ động vật", "Chỉ nước", "Chỉ không khí"], "Sinh vật + môi trường vô sinh", "Thống nhất sinh thái."],
    ["multiple_choice", "Chuỗi thức ăn bắt đầu từ:", ["Sinh vật sản xuất (thực vật)", "Động vật ăn thịt", "Đá", "Xác chết"], "Sinh vật sản xuất (thực vật)", "Nguồn năng lượng ban đầu."],
    ["multiple_choice", "Năng lượng qua chuỗi thức ăn:", ["Giảm dần qua bậc", "Tăng vô hạn", "Không đổi", "Biến mất hoàn toàn"], "Giảm dần qua bậc", "Luật 10% sơ lược."]
  ],
  g8_b45: [
    ["multiple_choice", "Sinh quyển là:", ["Lớp sống trên Trái Đất", "Chỉ một con người", "Chỉ một cây", "Chỉ đại dương sâu"], "Lớp sống trên Trái Đất", "Đất liền, nước, không khí."],
    ["multiple_choice", "Con người ảnh hưởng sinh quyển:", ["Mạnh — khai thác, ô nhiễm", "Không ảnh hưởng", "Chỉ tích cực", "Chỉ ở không gian"], "Mạnh — khai thác, ô nhiễm", "Trách nhiệm bảo vệ."],
    ["multiple_choice", "Đại dương trong sinh quyển:", ["Chiếm diện tích lớn", "Không có sinh vật", "Chỉ có cát", "Không thuộc sinh quyển"], "Chiếm diện tích lớn", "Môi trường sống quan trọng."]
  ],
  g8_b46: [
    ["multiple_choice", "Cân bằng tự nhiên:", ["Số lượng sinh vật dao động ổn định", "Không bao giờ thay đổi", "Chỉ tăng vô hạn", "Chỉ giảm về 0"], "Số lượng sinh vật dao động ổn định", "Tự điều chỉnh hệ sinh thái."],
    ["multiple_choice", "Sói ăn thỏ giúp:", ["Kiểm soát quần thể thỏ", "Tăng thỏ vô hạn", "Loại bỏ cây", "Không ảnh hưởng"], "Kiểm soát quần thể thỏ", "Cân bằng sinh thái."],
    ["multiple_choice", "Phá vỡ cân bằng:", ["Gây hậu quả xấu", "Luôn tốt", "Không liên quan con người", "Chỉ ở sao Hỏa"], "Gây hậu quả xấu", "Mất ổn định hệ sinh thái."]
  ],
  g8_b47: [
    ["multiple_choice", "Bảo vệ môi trường:", ["Giảm rác, tiết kiệm năng lượng", "Xả thải bừa bãi", "Phá rừng", "Đốt rác mọi nơi"], "Giảm rác, tiết kiệm năng lượng", "Hành động bền vững."],
    ["multiple_choice", "Ô nhiễm nước:", ["Giết sinh vật thủy sinh", "Làm sạch tự động ngay", "Không ảnh hưởng", "Chỉ tốt cho cá"], "Giết sinh vật thủy sinh", "Bảo vệ nguồn nước."],
    ["multiple_choice", "Tái chế giúp:", ["Giảm rác thải", "Tăng rác", "Không có ích", "Chỉ tăng ô nhiễm"], "Giảm rác thải", "Tiết kiệm tài nguyên."]
  ]
};

export const errors = [
  ["g8_b33", "tinh mach", "circulation_error", "Nhầm động mạch và tĩnh mạch", "Động mạch đi từ tim; tĩnh mạch về tim (sơ lược).", "Vẽ sơ đồ tuần hoàn."],
  ["g8_b34", "chi hoi tho", "process_error", "Nhầm thở và hô hấp tế bào", "Thở là trao đổi khí; hô hấp tế bào tạo ATP.", "Hô hấp ở phế nang và tế bào."],
  ["g8_b35", "than loc mau", "excretion_error", "Nhầm chức năng thận", "Thận lọc máu, không bơm máu như tim.", "Hệ bài tiết loại chất thải."],
  ["g8_b37", "nao khong phan xa", "nervous_error", "Nhầm phản xạ và suy nghĩ", "Phản xạ qua tủy nhanh, không cần suy nghĩ dài.", "Cung phản xạ."],
  ["g8_b38", "insulin tang duong", "endocrine_error", "Nhầm insulin", "Insulin hạ glucose, không tăng vô hạn.", "Đái tháo đường liên quan insulin."],
  ["g8_b42", "quan the la quan xa", "ecology_error", "Nhầm quần thể và quần xã", "Quần thể: một loài; quần xã: nhiều loài.", "Đơn vị sinh thái học."],
  ["g8_b44", "nang luong tang", "ecosystem_error", "Nhầm luồng năng lượng", "Năng lượng giảm qua các bậc, không tăng vô hạn.", "Chỉ ~10% chuyển bậc trên."],
  ["g8_b46", "can bang khong doi", "balance_error", "Hiểu sai cân bằng", "Cân bằng là dao động quanh mức ổn định.", "Không phải số lượng cố định tuyệt đối."],
  ["g8_b47", "o nhiem tot", "environment_error", "Đánh giá sai ô nhiễm", "Ô nhiễm làm hại sinh vật và sức khỏe.", "Giảm rác và tiết kiệm năng lượng."]
];

export function skillFromLesson(item, index) {
  const [id, title, chapter, chapterIndex, lessonNo, description, visualization] = item;
  return {
    id,
    title,
    grade: 8,
    book: "Kết nối tri thức",
    chapter,
    chapterIndex,
    lessonNo,
    domain: chapterIndex === 7 ? "Cơ thể người" : "Sinh thái & Môi trường",
    level: chapterIndex === 7 ? (lessonNo <= 35 ? 3 : 4) : 4,
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
  return [8, item[0], item[1], item[2], item[3], item[4], item[5], item[6]];
}

const grade8Skills = lessons.map((item, index) => skillFromLesson(item, index));
const grade8Lessons = lessons.map((item) => ({
  id: item[0],
  title: item[1],
  skill: item[0],
  chapter: item[2],
  source: SOURCE,
  xp: 50,
  steps: lessonSteps(item)
}));
const grade8Questions = lessons.flatMap(questionObjects);
const grade8Errors = errors.map(([skill, pattern, errorType, title, message, hint]) => ({
  pattern,
  skill,
  errorType,
  title,
  message,
  hint,
  recommendation: skill
}));

const isMain = process.argv[1]?.endsWith("generate-grade8-kntt.mjs");
if (isMain) {
  const lower = JSON.parse(await readFile("data/skills.json", "utf8")).filter((s) => s.grade < 8);
  const upper = JSON.parse(await readFile("data/skills.json", "utf8")).filter((s) => s.grade > 8);
  const lowerLessons = JSON.parse(await readFile("data/lessons.json", "utf8")).filter((l) => lower.some((s) => s.id === l.skill));
  const upperLessons = JSON.parse(await readFile("data/lessons.json", "utf8")).filter((l) => upper.some((s) => s.id === l.skill));
  const lowerQuestions = JSON.parse(await readFile("data/questions.json", "utf8")).filter((qItem) => lower.some((s) => s.id === qItem.skill));
  const upperQuestions = JSON.parse(await readFile("data/questions.json", "utf8")).filter((qItem) => upper.some((s) => s.id === qItem.skill));
  const otherErrors = JSON.parse(await readFile("data/errors.json", "utf8")).filter((e) => !e.skill?.startsWith("g8_"));

  await writeFile("data/skills.json", `${JSON.stringify([...lower, ...grade8Skills, ...upper], null, 2)}\n`);
  await writeFile("data/lessons.json", `${JSON.stringify([...lowerLessons, ...grade8Lessons, ...upperLessons], null, 2)}\n`);
  await writeFile("data/questions.json", `${JSON.stringify([...lowerQuestions, ...grade8Questions, ...upperQuestions], null, 2)}\n`);
  await writeFile("data/errors.json", `${JSON.stringify([...otherErrors, ...grade8Errors], null, 2)}\n`);

  console.log(`Grade 8 Sinh học KNTT: ${grade8Skills.length} bài, ${grade8Questions.length} câu hỏi, ${grade8Errors.length} mẫu lỗi.`);
  console.log(`Tổng ứng dụng: ${lower.length + grade8Skills.length + upper.length} bài, ${lowerQuestions.length + grade8Questions.length + upperQuestions.length} câu hỏi.`);
}
