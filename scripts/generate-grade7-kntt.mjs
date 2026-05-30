import { readFile, writeFile } from "node:fs/promises";

/**
 * SGK KHTN 7 – Kết nối tri thức (toàn bộ mạch Sinh học)
 * Bài 1; Chương VII (21–32), VIII (33–35), IX (36–38), X (39–42)
 */
export const lessons = [
  ["g7_b01", "Bài 1. Phương pháp và kĩ năng học tập môn KHTN", "Mở đầu KHTN 7", 1, 1, "Quan sát, đặt giả thuyết, thí nghiệm, ghi chép và rút kết luận khi học Sinh học.", "lab"],
  ["g7_b21", "Bài 21. Khái quát về trao đổi chất và chuyển hóa năng lượng", "Trao đổi chất và chuyển hóa năng lượng", 7, 21, "Trao đổi chất và chuyển hóa năng lượng là đặc trưng của sinh vật sống.", "respiration"],
  ["g7_b22", "Bài 22. Quang hợp ở thực vật", "Trao đổi chất và chuyển hóa năng lượng", 7, 22, "Quang hợp tạo chất hữu cơ và O₂; diễn ra ở lục lạp, cần ánh sáng.", "photosynthesis"],
  ["g7_b23", "Bài 23. Một số yếu tố ảnh hưởng đến quang hợp", "Trao đổi chất và chuyển hóa năng lượng", 7, 23, "Ánh sáng, CO₂, nhiệt độ và nước ảnh hưởng hiệu suất quang hợp.", "photosynthesis"],
  ["g7_b24", "Bài 24. Thực hành: Chứng minh quang hợp ở cây xanh", "Trao đổi chất và chuyển hóa năng lượng", 7, 24, "Thí nghiệm chứng minh cây xanh cần ánh sáng để quang hợp.", "lab"],
  ["g7_b25", "Bài 25. Hô hấp tế bào", "Trao đổi chất và chuyển hóa năng lượng", 7, 25, "Hô hấp tế bào giải phóng năng lượng từ chất hữu cơ; hiếu khí và kỵ khí.", "respiration"],
  ["g7_b26", "Bài 26. Một số yếu tố ảnh hưởng hô hấp tế bào", "Trao đổi chất và chuyển hóa năng lượng", 7, 26, "Nhiệt độ, O₂ và enzyme ảnh hưởng tốc độ hô hấp tế bào.", "respiration"],
  ["g7_b27", "Bài 27. Thực hành: Hô hấp ở thực vật", "Trao đổi chất và chuyển hóa năng lượng", 7, 27, "Chứng minh thực vật hô hấp mọi lúc, kể cả ban đêm.", "lab"],
  ["g7_b28", "Bài 28. Trao đổi khí ở sinh vật", "Trao đổi chất và chuyển hóa năng lượng", 7, 28, "Thực vật và động vật trao đổi O₂ và CO₂ với môi trường.", "respiration"],
  ["g7_b29", "Bài 29. Vai trò của nước và chất dinh dưỡng đối với sinh vật", "Trao đổi chất và chuyển hóa năng lượng", 7, 29, "Nước là dung môi; khoáng và hữu cơ cần cho sinh trưởng.", "digestion"],
  ["g7_b30", "Bài 30. Trao đổi nước và chất dinh dưỡng ở thực vật", "Trao đổi chất và chuyển hóa năng lượng", 7, 30, "Rễ hút nước muối; thân vận chuyển; lá thoát hơi nước.", "plant"],
  ["g7_b31", "Bài 31. Trao đổi nước và chất dinh dưỡng ở động vật", "Trao đổi chất và chuyển hóa năng lượng", 7, 31, "Tiêu hóa, hấp thu và vận chuyển chất dinh dưỡng ở động vật.", "digestion"],
  ["g7_b32", "Bài 32. Thực hành: Thân vận chuyển nước và lá thoát hơi nước", "Trao đổi chất và chuyển hóa năng lượng", 7, 32, "Thí nghiệm chứng minh mạch dẫn và thoát hơi nước ở thực vật.", "plant"],
  ["g7_b33", "Bài 33. Cảm ứng ở sinh vật và tập tính ở động vật", "Cảm ứng ở sinh vật", 8, 33, "Sinh vật phản ứng với kích thích; tập tính bẩm sinh và học được.", "nervous"],
  ["g7_b34", "Bài 34. Vận dụng hiện tượng cảm ứng ở sinh vật vào thực tiễn", "Cảm ứng ở sinh vật", 8, 34, "Ứng dụng cảm ứng: trồng cây, chăn nuôi, bảo vệ môi trường sống.", "nervous"],
  ["g7_b35", "Bài 35. Thực hành: Cảm ứng ở sinh vật", "Cảm ứng ở sinh vật", 8, 35, "Quan sát hướng hóa ánh sáng, phản xạ ở thực vật và động vật.", "lab"],
  ["g7_b36", "Bài 36. Khái quát về sinh trưởng và phát triển ở sinh vật", "Sinh trưởng và phát triển", 9, 36, "Sinh trưởng là tăng kích thước; phát triển là hoàn thiện cấu trúc, chức năng.", "plant"],
  ["g7_b37", "Bài 37. Ứng dụng sinh trưởng và phát triển vào thực tiễn", "Sinh trưởng và phát triển", 9, 37, "Ứng dụng trong nông nghiệp: chọn giống, bón phân, chăm sóc.", "plant"],
  ["g7_b38", "Bài 38. Thực hành: Quan sát sinh trưởng và phát triển", "Sinh trưởng và phát triển", 9, 38, "Ghi nhận sự nảy mầm, ra lá, ra hoa qua thời gian.", "lab"],
  ["g7_b39", "Bài 39. Sinh sản vô tính ở sinh vật", "Sinh sản ở sinh vật", 10, 39, "Sinh sản không qua giao tử; con giống hệt bố mẹ.", "reproduction"],
  ["g7_b40", "Bài 40. Sinh sản hữu tính ở sinh vật", "Sinh sản ở sinh vật", 10, 40, "Giao tử đực và cái kết hợp; tạo đa dạng gen thế hệ sau.", "reproduction"],
  ["g7_b41", "Bài 41. Yếu tố ảnh hưởng và điều hòa sinh sản", "Sinh sản ở sinh vật", 10, 41, "Ánh sáng, nhiệt độ, hormone điều hòa sinh sản ở thực vật và động vật.", "reproduction"],
  ["g7_b42", "Bài 42. Cơ thể sinh vật là một thể thống nhất", "Sinh sản ở sinh vật", 10, 42, "Các cơ quan, hệ cơ quan phối hợp trong một cơ thể sống.", "cell"]
];

export const SOURCE = "Bám mạch SGK Khoa học tự nhiên 7 – Kết nối tri thức với cuộc sống (mạch Sinh học), nội dung tự biên soạn.";

export const core = {
  g7_b01: ["Phương pháp KHTN", "Quan sát → giả thuyết → thí nghiệm → kết luận → kiểm tra lại.", "So sánh nảy mầm hạt đậu ở ánh sáng và trong tối.", "Ghi sổ tay lab: số liệu, hình vẽ, nguồn mẫu."],
  g7_b21: ["Trao đổi chất", "Sinh vật sống trao đổi chất và năng lượng với môi trường liên tục.", "Cây hấp thu CO₂, thải O₂ ban ngày; hô hấp mọi lúc.", "Không trao đổi chất → không duy trì sự sống."],
  g7_b22: ["Quang hợp", "6CO₂ + 6H₂O + ánh sáng → C₆H₁₂O₆ + 6O₂ (tổng quát).", "Lá xanh nhờ clorophyll hấp thụ ánh sáng.", "Quang hợp cung cấp O₂ và chất hữu cơ cho hệ sinh thái."],
  g7_b23: ["Yếu tố quang hợp", "Thiếu ánh sáng hoặc CO₂ làm giảm quang hợp.", "Cây trong tối vàng lá, còi cọc.", "Nhiệt độ quá cao/thấp ảnh hưởng enzyme."],
  g7_b24: ["TH quang hợp", "Che một phần lá khỏi ánh sáng, so sánh màu sau vài ngày.", "Lá không được chiếu sáng kém clorophyll hơn.", "Kiểm soát biến số: cùng loại cây, cùng điều kiện nước."],
  g7_b25: ["Hô hấp tế bào", "Phân hủy chất hữu cơ giải phóng ATP; hiếu khí cần O₂.", "Người thở gấp khi chạy vì cơ cần nhiều ATP.", "Hô hấp xảy ra liên tục ở mọi tế bào sống."],
  g7_b26: ["Yếu tố hô hấp", "Nhiệt độ tăng thường làm tăng hô hấp (trong giới hạn).", "Thiếu O₂ làm giảm hô hấp hiếu khí.", "Enzyme hô hấp nhạy cảm với nhiệt độ."],
  g7_b27: ["TH hô hấp thực vật", "Bọc kín nhánh cây, quan sát đọng ẩm — chứng minh hô hấp.", "Thực vật hô hấp cả ngày lẫn đêm.", "Quang hợp chủ yếu ban ngày khi có ánh sáng."],
  g7_b28: ["Trao đổi khí", "Ban ngày cây: quang hợp mạnh, thải O₂ nhiều; vẫn hô hấp.", "Động vật thở O₂, thải CO₂.", "Rừng đóng vai trò điều hòa khí quyển."],
  g7_b29: ["Nước và dinh dưỡng", "Nước tham gia quang hợp, hô hấp, vận chuyển chất.", "N, P, K là khoáng cần cho cây.", "Thiếu dinh dưỡng → cây còi, vàng lá."],
  g7_b30: ["Trao đổi ở thực vật", "Rễ hút nước và ion; mạch dẫn vận chuyển lên lá.", "Lá thoát hơi nước qua khí khổ bốn.", "Cân bằng nước giúp cây đứng vững và hấp thu."],
  g7_b31: ["Trao đổi ở động vật", "Tiêu hóa biến thức ăn thành chất hấp thu được.", "Ruột non hấp thu glucose, amino acid.", "Máu vận chuyển chất dinh dưỡng đến tế bào."],
  g7_b32: ["TH vận chuyển nước", "Ngâm cành cây có lá trong nước nhuộm, quan sát mạch dẫn.", "Lá thoát hơi nước tạo lực kéo dịch lên thân.", "Thí nghiệm chứng minh hướng vận chuyển nước."],
  g7_b33: ["Cảm ứng", "Kích thích → cảm ứng: hướng hóa, nhiễm sắc, phản xạ.", "Cây mọc về phía sáng; mimosa co lá khi chạm.", "Tập tính: di cư, kiếm ăn theo bản năng hoặc học được."],
  g7_b34: ["Ứng dụng cảm ứng", "Trồng cây đủ ánh sáng; chăn nuôi trong môi trường phù hợp.", "Nhà kính điều chỉnh ánh sáng cho rau.", "Giảm stress động vật giúp sinh trưởng tốt."],
  g7_b35: ["TH cảm ứng", "Quan sát hạt mầm cong về ánh sáng.", "Ghi thời gian phản ứng khi chạm lá cây.", "So sánh cây trong tối và có ánh sáng một phía."],
  g7_b36: ["Sinh trưởng phát triển", "Sinh trưởng: tăng số lượng, kích thước tế bào.", "Phát triển: hoàn thiện cấu trúc (ra hoa, chín quả).", "Cần dinh dưỡng, nước, ánh sáng phù hợp."],
  g7_b37: ["Ứng dụng sinh trưởng", "Chọn giống tốt, bón phân cân đối, tưới tiêu hợp lý.", "Cắt tỉa cành giúp cây ăn quả ra hoa nhiều hơn.", "Thu hoạch đúng thời điểm chín."],
  g7_b38: ["TH sinh trưởng", "Gieo hạt, đo chiều cao mỗi tuần, vẽ biểu đồ.", "Ghi nhận số lá, thời điểm nảy mầm.", "So sánh cây đủ nước và thiếu nước."],
  g7_b39: ["Sinh sản vô tính", "Một cơ thể tạo con không qua giao tử.", "Khoai tây mọc mắt; giun đất phân đoạn.", "Con giống hệt bố mẹ về gen."],
  g7_b40: ["Sinh sản hữu tính", "Giao tử đực + cái → hợp tử → phôi.", "Hoa: thụ phấn, thụ tinh tạo hạt.", "Tạo đa dạng gen thế hệ sau."],
  g7_b41: ["Điều hòa sinh sản", "Ngày dài/ngắn ảnh hưởng ra hoa một số cây.", "Hormone điều hòa sinh sản ở động vật.", "Nhiệt độ ảnh hưởng nảy mầm hạt."],
  g7_b42: ["Thể thống nhất", "Tim, phổi, tiêu hóa, thần kinh phối hợp trong cơ thể.", "Cây: rễ, thân, lá, hoa cùng phục vụ sinh trưởng sinh sản.", "Một cơ quan hỏng ảnh hưởng toàn thể."]
};

export const q = {
  g7_b01: [
    ["multiple_choice", "Quy trình nghiên cứu KHTN đúng:", ["Quan sát → giả thuyết → thí nghiệm → kết luận", "Kết luận trước khi thí nghiệm", "Chỉ học thuộc", "Không ghi chép"], "Quan sát → giả thuyết → thí nghiệm → kết luận", "Phương pháp khoa học."],
    ["multiple_choice", "Sổ tay lab cần ghi:", ["Số liệu, hình vẽ, điều kiện thí nghiệm", "Chỉ tên bạn", "Không cần ngày", "Chỉ màu bút"], "Số liệu, hình vẽ, điều kiện thí nghiệm", "Tái lập thí nghiệm."],
    ["multiple_choice", "Giả thuyết là:", ["Dự đoán có thể kiểm chứng", "Kết luận cuối cùng", "Luật vĩnh viễn", "Chỉ ý kiến cá nhân"], "Dự đoán có thể kiểm chứng", "Cần thí nghiệm kiểm tra."]
  ],
  g7_b21: [
    ["multiple_choice", "Trao đổi chất ở sinh vật là:", ["Trao đổi chất và năng lượng với môi trường", "Chỉ ăn một lần", "Không cần nước", "Chỉ xảy ra ban ngày"], "Trao đổi chất và năng lượng với môi trường", "Đặc trưng sự sống."],
    ["multiple_choice", "Chuyển hóa năng lượng ở sinh vật gồm:", ["Quang hợp và hô hấp", "Chỉ quang hợp", "Chỉ nóng chảy", "Chỉ sự cháy"], "Quang hợp và hô hấp", "Hai quá trình cốt lõi."],
    ["multiple_choice", "Sinh vật chết khi:", ["Ngừng trao đổi chất cần thiết", "Chỉ thiếu ánh sáng một giờ", "Chỉ không có gió", "Chỉ mưa nhiều"], "Ngừng trao đổi chất cần thiết", "Trao đổi chất duy trì sự sống."]
  ],
  g7_b22: [
    ["multiple_choice", "Quang hợp diễn ra chủ yếu ở:", ["Lá xanh (lục lạp)", "Rễ", "Vỏ cây", "Hạt khô"], "Lá xanh (lục lạp)", "Clorophyll trong lục lạp."],
    ["multiple_choice", "Sản phẩm quang hợp gồm:", ["Chất hữu cơ và O₂", "Chỉ CO₂", "Chỉ nước thừa", "Chỉ nhiệt không"], "Chất hữu cơ và O₂", "Công thức tổng quát SGK."],
    ["multiple_choice", "Quang hợp cần:", ["Ánh sáng, CO₂, nước", "Chỉ không khí", "Chỉ đất", "Chỉ bóng tối"], "Ánh sáng, CO₂, nước", "Điều kiện cơ bản."]
  ],
  g7_b23: [
    ["multiple_choice", "Cây trong tối lâu ngày thường:", ["Vàng lá, còi cọc", "Quang hợp mạnh hơn", "Không hô hấp", "Không cần nước"], "Vàng lá, còi cọc", "Thiếu ánh sáng giảm quang hợp."],
    ["multiple_choice", "Tăng cường CO₂ (trong giới hạn) thường:", ["Tăng quang hợp", "Dừng hô hấp", "Làm cây chết ngay", "Không ảnh hưởng"], "Tăng quang hợp", "CO₂ là nguyên liệu quang hợp."],
    ["multiple_choice", "Nhiệt độ ảnh hưởng quang hợp vì:", ["Enzyme hoạt động phụ thuộc nhiệt độ", "Chỉ thay màu lá", "Chỉ ảnh hưởng rễ", "Không liên quan"], "Enzyme hoạt động phụ thuộc nhiệt độ", "Quá nóng/lạnh giảm hiệu suất."]
  ],
  g7_b24: [
    ["multiple_choice", "Chứng minh quang hợp cần ánh sáng bằng cách:", ["Che một phần lá, so sánh màu", "Đốt lá", "Ngâm rễ trong nước", "Không tưới cây"], "Che một phần lá, so sánh màu", "Biến số độc lập: ánh sáng."],
    ["multiple_choice", "Lá bị che kín ánh sáng thường:", ["Kém xanh hơn", "Xanh hơn", "Không đổi", "Biến thành rễ"], "Kém xanh hơn", "Giảm clorophyll."],
    ["multiple_choice", "Thí nghiệm quang hợp cần:", ["Cùng loại cây, cùng điều kiện nước", "Mỗi cây một loài", "Không ghi chép", "Chỉ làm một ngày"], "Cùng loại cây, cùng điều kiện nước", "Kiểm soát biến số."]
  ],
  g7_b25: [
    ["multiple_choice", "Hô hấp tế bào giải phóng:", ["Năng lượng (ATP)", "Chỉ ánh sáng", "Chỉ clorophyll", "Chỉ oxy thừa vô hạn"], "Năng lượng (ATP)", "Phân hủy chất hữu cơ."],
    ["multiple_choice", "Hô hấp hiếu khí cần:", ["Oxy", "Chỉ CO₂", "Chỉ ánh sáng", "Chỉ nước đá"], "Oxy", "Phản ứng có O₂."],
    ["multiple_choice", "Hô hấp tế bào xảy ra:", ["Mọi tế bào sống, mọi lúc", "Chỉ ban ngày", "Chỉ ở lá", "Chỉ khi ngủ"], "Mọi tế bào sống, mọi lúc", "Khác với quang hợp (chủ yếu ban ngày)."]
  ],
  g7_b26: [
    ["multiple_choice", "Tăng nhiệt độ (trong giới hạn) thường:", ["Tăng tốc độ hô hấp", "Dừng hô hấp hoàn toàn", "Chỉ tăng quang hợp", "Không ảnh hưởng enzyme"], "Tăng tốc độ hô hấp", "Enzyme hoạt động nhanh hơn."],
    ["multiple_choice", "Thiếu O₂ làm:", ["Giảm hô hấp hiếu khí", "Tăng quang hợp vô hạn", "Cây không cần nước", "Tế bào không cần ATP"], "Giảm hô hấp hiếu khí", "O₂ là chất nhận electron."],
    ["multiple_choice", "Hô hấp kỵ khí:", ["Không cần O₂ (sơ lược)", "Luôn cần ánh sáng", "Chỉ ở động vật", "Giống quang hợp"], "Không cần O₂ (sơ lược)", "Một dạng hô hấp tế bào."]
  ],
  g7_b27: [
    ["multiple_choice", "Thực vật hô hấp:", ["Cả ngày lẫn đêm", "Chỉ ban đêm", "Chỉ khi có hoa", "Không bao giờ"], "Cả ngày lẫn đêm", "Hô hấp liên tục."],
    ["multiple_choice", "Bọc kín nhánh cây có lá giúp chứng minh:", ["Hô hấp tạo hơi ẩm", "Chỉ quang hợp", "Cây không thở", "Chỉ thoát hơi nước"], "Hô hấp tạo hơi ẩm", "Thí nghiệm SGK."],
    ["multiple_choice", "Ban ngày cây vừa:", ["Quang hợp vừa hô hấp", "Chỉ hô hấp", "Không trao đổi khí", "Chỉ thải CO₂"], "Quang hợp vừa hô hấp", "Hai quá trình song song."]
  ],
  g7_b28: [
    ["multiple_choice", "Động vật trao đổi khí:", ["Hít O₂, thải CO₂", "Hít CO₂, thải O₂", "Không trao đổi", "Chỉ ban ngày"], "Hít O₂, thải CO₂", "Hô hấp khí."],
    ["multiple_choice", "Ban ngày cây xanh trong ánh sáng mạnh:", ["Thải O₂ nhiều (quang hợp > hô hấp)", "Không thải O₂", "Chỉ hít O₂", "Không hô hấp"], "Thải O₂ nhiều (quang hợp > hô hấp)", "Cân bằng khí quyển."],
    ["multiple_choice", "Rừng góp phần:", ["Điều hòa O₂ và CO₂", "Chỉ tạo đá", "Giảm O₂ vĩnh viễn", "Không liên quan khí quyển"], "Điều hòa O₂ và CO₂", "Vai trò sinh thái."]
  ],
  g7_b29: [
    ["multiple_choice", "Nước trong cơ thể sinh vật:", ["Dung môi, tham gia phản ứng", "Chỉ để nặng thêm", "Không cần thiết", "Chỉ ở rễ"], "Dung môi, tham gia phản ứng", "Quang hợp, hô hấp cần nước."],
    ["multiple_choice", "Khoáng N, P, K cần cho:", ["Sinh trưởng cây", "Chỉ làm cứng đá", "Chỉ tạo gió", "Không liên quan dinh dưỡng"], "Sinh trưởng cây", "Phân bón NPK."],
    ["multiple_choice", "Thiếu dinh dưỡng cây thường:", ["Còi, vàng lá", "Quang hợp vô hạn", "Không hô hấp", "Không cần nước"], "Còi, vàng lá", "Dấu hiệu suy dinh dưỡng."]
  ],
  g7_b30: [
    ["multiple_choice", "Rễ thực vật chủ yếu:", ["Hút nước và muối khoáng", "Quang hợp", "Thoát hơi nước chính", "Sản xuất O₂ chính"], "Hút nước và muối khoáng", "Chức năng rễ."],
    ["multiple_choice", "Thoát hơi nước chủ yếu ở:", ["Lá (khí khổ bốn)", "Rễ", "Hạt", "Vỏ thân"], "Lá (khí khổ bốn)", "Điều hòa nước cây."],
    ["multiple_choice", "Mạch dẫn trong thân:", ["Vận chuyển nước và chất", "Chỉ chứa không khí", "Chỉ quang hợp", "Không có chức năng"], "Vận chuyển nước và chất", "Mạch gỗ, mạch ray (sơ lược)."]
  ],
  g7_b31: [
    ["multiple_choice", "Tiêu hóa ở động vật biến:", ["Thức ăn thành chất hấp thu", "CO₂ thành O₂", "Nước thành đá", "Protein thành clorophyll"], "Thức ăn thành chất hấp thu", "Enzyme tiêu hóa."],
    ["multiple_choice", "Hấp thu chất dinh dưỡng chủ yếu ở:", ["Ruột non", "Da", "Móng", "Tóc"], "Ruột non", "Vào máu nuôi cơ thể."],
    ["multiple_choice", "Máu vận chuyển:", ["Chất dinh dưỡng đến tế bào", "Chỉ khí CO₂ duy nhất", "Chỉ nước mưa", "Không liên quan dinh dưỡng"], "Chất dinh dưỡng đến tế bào", "Tuần hoàn nội tiêu."]
  ],
  g7_b32: [
    ["multiple_choice", "Ngâm cành có lá trong nước nhuộm chứng minh:", ["Nước vận chuyển lên lá", "Rễ quang hợp", "Lá không thoát hơi", "Thân không có mạch"], "Nước vận chuyển lên lá", "Hướng vận chuyển nước."],
    ["multiple_choice", "Thoát hơi nước tạo:", ["Lực kéo dịch lên thân", "Chỉ làm khô đất", "Chỉ quang hợp", "Protein mới"], "Lực kéo dịch lên thân", "Hút nước từ rễ."],
    ["multiple_choice", "Thí nghiệm vận chuyển nước cần:", ["Cành tươi, có lá", "Cành khô không lá", "Chỉ hạt", "Chỉ rễ cắt rời"], "Cành tươi, có lá", "Thoát hơi nước cần lá."]
  ],
  g7_b33: [
    ["multiple_choice", "Cảm ứng ở sinh vật là:", ["Phản ứng với kích thích môi trường", "Chỉ ngủ", "Chỉ quang hợp", "Chỉ phân hủy đá"], "Phản ứng với kích thích môi trường", "Hướng hóa, nhiễm sắc..."],
    ["multiple_choice", "Cây mọc về phía sáng gọi là:", ["Hướng hóa (phototropism)", "Hô hấp", "Sinh sản vô tính", "Tiêu hóa"], "Hướng hóa (phototropism)", "Cảm ứng với ánh sáng."],
    ["multiple_choice", "Tập tính động vật là:", ["Cách phản ứng lặp lại theo kinh nghiệm hoặc bẩm sinh", "Chỉ quang hợp", "Chỉ phân chia tế bào", "Chỉ hút nước"], "Cách phản ứng lặp lại theo kinh nghiệm hoặc bẩm sinh", "Di cư, kiếm ăn..."]
  ],
  g7_b34: [
    ["multiple_choice", "Trồng cây đủ ánh sáng dựa trên:", ["Cảm ứng hướng hóa", "Chỉ may mắn", "Không liên quan sinh học", "Chỉ phản ứng hóa học vô cơ"], "Cảm ứng hướng hóa", "Ứng dụng thực tiễn."],
    ["multiple_choice", "Nhà kính điều chỉnh ánh sáng giúp:", ["Sinh trưởng cây tốt hơn", "Cây không hô hấp", "Cây không cần nước", "Loại bỏ quang hợp"], "Sinh trưởng cây tốt hơn", "Kiểm soát môi trường."],
    ["multiple_choice", "Giảm stress động vật trong chăn nuôi:", ["Cải thiện sinh trưởng, sinh sản", "Không ảnh hưởng", "Chỉ làm giảm ăn vô hạn", "Chỉ liên quan Vật lí"], "Cải thiện sinh trưởng, sinh sản", "Môi trường sống phù hợp."]
  ],
  g7_b35: [
    ["multiple_choice", "Quan sát mầm cong về ánh sáng là TH về:", ["Hướng hóa", "Quang hợp", "Sinh sản", "Tiêu hóa"], "Hướng hóa", "Cảm ứng ánh sáng."],
    ["multiple_choice", "Khi ghi TH cảm ứng nên:", ["Ghi thời gian, điều kiện kích thích", "Không vẽ hình", "Chỉ chụp selfie", "Không so sánh"], "Ghi thời gian, điều kiện kích thích", "Sổ tay khoa học."],
    ["multiple_choice", "Cây trong tối so với ánh sáng một phía:", ["Mọc thẳng hoặc vượt về sáng", "Không mọc", "Chỉ mọc rễ", "Không phản ứng"], "Mọc thẳng hoặc vượt về sáng", "Tìm nguồn sáng."]
  ],
  g7_b36: [
    ["multiple_choice", "Sinh trưởng là:", ["Tăng kích thước, số lượng tế bào", "Chỉ héo úa", "Chỉ quang hợp", "Chỉ thoát hơi nước"], "Tăng kích thước, số lượng tế bào", "Khác phát triển."],
    ["multiple_choice", "Phát triển là:", ["Hoàn thiện cấu trúc, chức năng", "Chỉ to hơn", "Chỉ giảm cân", "Chỉ hô hấp"], "Hoàn thiện cấu trúc, chức năng", "Ra hoa, chín quả..."],
    ["multiple_choice", "Cây cần để sinh trưởng:", ["Nước, ánh sáng, dinh dưỡng", "Chỉ CO₂", "Chỉ gió mạnh", "Không cần gì"], "Nước, ánh sáng, dinh dưỡng", "Điều kiện môi trường."]
  ],
  g7_b37: [
    ["multiple_choice", "Chọn giống cây tốt giúp:", ["Năng suất cao, chất lượng tốt", "Giảm quang hợp", "Cây không cần nước", "Không liên quan gen"], "Năng suất cao, chất lượng tốt", "Ứng dụng di truyền sơ lược."],
    ["multiple_choice", "Bón phân cân đối:", ["Cung cấp N, P, K phù hợp", "Chỉ tưới nước", "Không ảnh hưởng sinh trưởng", "Chỉ làm đất cứng"], "Cung cấp N, P, K phù hợp", "Dinh dưỡng khoáng."],
    ["multiple_choice", "Cắt tỉa cành ăn quả:", ["Kích thích ra hoa, quả", "Dừng sinh trưởng hoàn toàn", "Làm cây chết", "Chỉ trang trí"], "Kích thích ra hoa, quả", "Kỹ thuật canh tác."]
  ],
  g7_b38: [
    ["multiple_choice", "Theo dõi sinh trưởng hạt nên:", ["Đo chiều cao định kỳ, vẽ biểu đồ", "Chỉ nhìn một lần", "Không ghi ngày", "Không cần nước"], "Đo chiều cao định kỳ, vẽ biểu đồ", "Dữ liệu theo thời gian."],
    ["multiple_choice", "Cây thiếu nước so cây đủ nước:", ["Sinh trưởng chậm hơn", "Sinh trưởng nhanh hơn vô hạn", "Không khác", "Không nảy mầm"], "Sinh trưởng chậm hơn", "Nước cần cho sinh trưởng."],
    ["multiple_choice", "Nảy mầm là giai đoạn:", ["Sinh trưởng phát triển đầu tiên", "Chỉ sinh sản", "Chỉ hô hấp kỵ khí", "Chỉ quang hợp ban đêm"], "Sinh trưởng phát triển đầu tiên", "Hạt → cây con."]
  ],
  g7_b39: [
    ["multiple_choice", "Sinh sản vô tính:", ["Không qua giao tử", "Luôn cần hoa", "Chỉ ở động vật", "Tạo đa dạng gen cao"], "Không qua giao tử", "Con giống bố mẹ."],
    ["multiple_choice", "Ví dụ sinh sản vô tính:", ["Khoai tây mọc mắt", "Thụ phấn hoa", "Đẻ trứng có trứng", "Thụ tinh"], "Khoai tây mọc mắt", "Một cơ thể tạo con."],
    ["multiple_choice", "Sinh sản vô tính con:", ["Giống hệt bố mẹ về gen", "Luôn khác hoàn toàn", "Không có gen", "Chỉ là virus"], "Giống hệt bố mẹ về gen", "Không tái tổ hợp gen."]
  ],
  g7_b40: [
    ["multiple_choice", "Sinh sản hữu tính cần:", ["Giao tử đực và cái", "Chỉ một tế bào", "Chỉ nước", "Chỉ gió"], "Giao tử đực và cái", "Thụ tinh tạo hợp tử."],
    ["multiple_choice", "Thụ phấn ở thực vật có hoa là:", ["Chuyển phấn hoa đến noãn", "Hút nước rễ", "Quang hợp", "Thoát hơi nước"], "Chuyển phấn hoa đến noãn", "Bước sinh sản hữu tính."],
    ["multiple_choice", "Sinh sản hữu tính giúp:", ["Tạo đa dạng gen thế hệ sau", "Con luôn giống hệt", "Không cần hoa", "Chỉ một giới"], "Tạo đa dạng gen thế hệ sau", "Tái tổ hợp gen."]
  ],
  g7_b41: [
    ["multiple_choice", "Ngày dài/ngắn ảnh hưởng:", ["Ra hoa một số cây", "Chỉ quang hợp ban đêm", "Không liên quan sinh sản", "Chỉ hô hấp kỵ khí"], "Ra hoa một số cây", "Điều hòa sinh sản thực vật."],
    ["multiple_choice", "Hormone sinh sản:", ["Điều hòa hoạt động sinh sản", "Chỉ là protein tiêu hóa", "Chỉ clorophyll", "Không có ở sinh vật"], "Điều hòa hoạt động sinh sản", "Nội tiết (sơ lược)."],
    ["multiple_choice", "Nhiệt độ ảnh hưởng:", ["Nảy mầm hạt", "Chỉ màu lá", "Chỉ gió", "Không ảnh hưởng gen"], "Nảy mầm hạt", "Điều kiện môi trường."]
  ],
  g7_b42: [
    ["multiple_choice", "Cơ thể sinh vật là thể thống nhất nghĩa là:", ["Các bộ phận phối hợp", "Mỗi bộ phận sống riêng", "Không trao đổi chất", "Chỉ một tế bào"], "Các bộ phận phối hợp", "Hệ thống sống."],
    ["multiple_choice", "Tim hỏng ảnh hưởng:", ["Toàn bộ cơ thể", "Chỉ tóc", "Chỉ móng", "Không ảnh hưởng gì"], "Toàn bộ cơ thể", "Các cơ quan liên kết."],
    ["multiple_choice", "Cây có rễ hỏng thường:", ["Héo vì thiếu nước, dinh dưỡng", "Quang hợp mạnh hơn", "Không hô hấp", "Chỉ ra hoa nhiều"], "Héo vì thiếu nước, dinh dưỡng", "Rễ liên quan toàn thể."]
  ]
};

export const errors = [
  ["g7_b01", "ket luan truoc", "method_error", "Kết luận trước thí nghiệm", "Cần kiểm chứng giả thuyết bằng thí nghiệm.", "Quan sát → giả thuyết → thí nghiệm."],
  ["g7_b22", "chi can nuoc", "process_error", "Thiếu điều kiện quang hợp", "Quang hợp cần ánh sáng và CO₂, không chỉ nước.", "Clorophyll hấp thụ ánh sáng."],
  ["g7_b25", "chi hoi tho", "process_error", "Nhầm thở và hô hấp tế bào", "Thở là trao đổi khí; hô hấp tế bào tạo ATP.", "Hô hấp diễn ra trong tế bào."],
  ["g7_b27", "cay khong ho hap", "process_error", "Cho rằng cây không hô hấp", "Thực vật hô hấp mọi lúc.", "Quang hợp chủ yếu ban ngày."],
  ["g7_b28", "cay chi thai o2", "gas_error", "Nhầm trao đổi khí", "Cây vừa hô hấp vừa quang hợp; không chỉ thải O₂.", "Ban đêm cây chủ yếu hô hấp."],
  ["g7_b30", "re quang hop", "plant_error", "Nhầm chức năng rễ", "Rễ hút nước muối; quang hợp chủ yếu ở lá.", "Phân công cơ quan."],
  ["g7_b33", "cam ung la quang hop", "concept_error", "Nhầm cảm ứng và quang hợp", "Cảm ứng là phản ứng kích thích; quang hợp là trao đổi chất.", "Hướng hóa ≠ quang hợp."],
  ["g7_b36", "sinh truong la phat trien", "growth_error", "Nhầm sinh trưởng và phát triển", "Sinh trưởng: tăng kích thước; phát triển: hoàn thiện cấu trúc.", "Hai quá trình liên quan nhưng khác."],
  ["g7_b39", "vo tinh da dang gen", "repro_error", "Nhầm sinh sản vô tính", "Vô tính: con giống bố mẹ; ít đa dạng gen hơn hữu tính.", "Không qua giao tử."],
  ["g7_b40", "huu tinh giong het", "repro_error", "Nhầm sinh sản hữu tính", "Hữu tính tạo đa dạng gen nhờ giao tử.", "Thụ tinh tái tổ hợp gen."],
  ["g7_b42", "co quan doc lap", "system_error", "Nhầm thể thống nhất", "Các cơ quan phụ thuộc nhau trong cơ thể.", "Một bộ phận hỏng ảnh hưởng toàn thể."]
];

export function skillFromLesson(item, index) {
  const [id, title, chapter, chapterIndex, lessonNo, description, visualization] = item;
  const domainMap = {
    1: "Mở đầu & Phương pháp",
    7: "Trao đổi chất",
    8: "Cảm ứng",
    9: "Sinh trưởng",
    10: "Sinh sản"
  };
  return {
    id,
    title,
    grade: 7,
    book: "Kết nối tri thức",
    chapter,
    chapterIndex,
    lessonNo,
    domain: domainMap[chapterIndex] || chapter,
    level: chapterIndex === 1 ? 1 : chapterIndex === 7 ? 2 : chapterIndex === 8 ? 3 : 4,
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
  return [7, item[0], item[1], item[2], item[3], item[4], item[5], item[6]];
}

const grade7Skills = lessons.map((item, index) => skillFromLesson(item, index));
const grade7Lessons = lessons.map((item) => ({
  id: item[0],
  title: item[1],
  skill: item[0],
  chapter: item[2],
  source: SOURCE,
  xp: 50,
  steps: lessonSteps(item)
}));
const grade7Questions = lessons.flatMap(questionObjects);
const grade7Errors = errors.map(([skill, pattern, errorType, title, message, hint]) => ({
  pattern,
  skill,
  errorType,
  title,
  message,
  hint,
  recommendation: skill
}));

const isMain = process.argv[1]?.endsWith("generate-grade7-kntt.mjs");
if (isMain) {
  const lower = JSON.parse(await readFile("data/skills.json", "utf8")).filter((s) => s.grade < 7);
  const upper = JSON.parse(await readFile("data/skills.json", "utf8")).filter((s) => s.grade > 7);
  const lowerLessons = JSON.parse(await readFile("data/lessons.json", "utf8")).filter((l) => lower.some((s) => s.id === l.skill));
  const upperLessons = JSON.parse(await readFile("data/lessons.json", "utf8")).filter((l) => upper.some((s) => s.id === l.skill));
  const lowerQuestions = JSON.parse(await readFile("data/questions.json", "utf8")).filter((qItem) => lower.some((s) => s.id === qItem.skill));
  const upperQuestions = JSON.parse(await readFile("data/questions.json", "utf8")).filter((qItem) => upper.some((s) => s.id === qItem.skill));
  const otherErrors = JSON.parse(await readFile("data/errors.json", "utf8")).filter((e) => !e.skill?.startsWith("g7_"));

  await writeFile("data/skills.json", `${JSON.stringify([...lower, ...grade7Skills, ...upper], null, 2)}\n`);
  await writeFile("data/lessons.json", `${JSON.stringify([...lowerLessons, ...grade7Lessons, ...upperLessons], null, 2)}\n`);
  await writeFile("data/questions.json", `${JSON.stringify([...lowerQuestions, ...grade7Questions, ...upperQuestions], null, 2)}\n`);
  await writeFile("data/errors.json", `${JSON.stringify([...otherErrors, ...grade7Errors], null, 2)}\n`);

  console.log(`Grade 7 Sinh học KNTT: ${grade7Skills.length} bài, ${grade7Questions.length} câu hỏi, ${grade7Errors.length} mẫu lỗi.`);
  console.log(`Tổng ứng dụng: ${lower.length + grade7Skills.length + upper.length} bài, ${lowerQuestions.length + grade7Questions.length + upperQuestions.length} câu hỏi.`);
}
