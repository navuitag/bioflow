import { readFile, writeFile } from "node:fs/promises";

/**
 * SGK KHTN 6 – Kết nối tri thức (toàn bộ mạch Sinh học)
 * Chương I (1–4), III (15), V (18–21), VI (22–24), VII (25–39)
 */
export const lessons = [
  ["g6_b01", "Bài 1. Giới thiệu về Khoa học tự nhiên", "Mở đầu về Khoa học tự nhiên", 1, 1, "Nhận biết ba lĩnh vực KHTN và vai trò Sinh học trong đời sống.", "khtn"],
  ["g6_b02", "Bài 2. An toàn trong phòng thực hành", "Mở đầu về Khoa học tự nhiên", 1, 2, "Tuân thủ quy tắc an toàn khi quan sát mẫu sinh vật và làm thí nghiệm Sinh – Hóa – Vật lí.", "lab"],
  ["g6_b03", "Bài 3. Sử dụng kính lúp", "Mở đầu về Khoa học tự nhiên", 1, 3, "Dùng kính lúp quan sát cấu trúc mẫu sinh vật nhỏ: lá, hạt, côn trùng.", "magnifier"],
  ["g6_b04", "Bài 4. Sử dụng kính hiển vi quang học", "Mở đầu về Khoa học tự nhiên", 1, 4, "Làm mẫu lát mỏng, quan sát tế bào và cấu trúc vi mô bằng kính hiển vi.", "microscope"],
  ["g6_b15", "Bài 15. Một số lương thực, thực phẩm", "Lương thực và thực phẩm", 3, 15, "Thành phần dinh dưỡng; vai trò carbohydrate, protein, lipid và chất xơ đối với cơ thể.", "digestion"],
  ["g6_b18", "Bài 18. Tế bào – đơn vị cơ bản của sự sống", "Tế bào", 5, 18, "Nhận biết tế bào là đơn vị cơ bản; phân biệt tế bào đơn bào và cơ thể đa bào.", "cell"],
  ["g6_b19", "Bài 19. Cấu tạo và chức năng các thành phần của tế bào", "Tế bào", 5, 19, "Màng tế bào, tế bào chất, nhân; vai trò các bào quan chính trong tế bào.", "organelle"],
  ["g6_b20", "Bài 20. Sự lớn lên và sinh sản của tế bào", "Tế bào", 5, 20, "Tế bào lớn lên nhờ nuôi dưỡng; sinh sản bằng phân chia tế bào.", "reproduction"],
  ["g6_b21", "Bài 21. Thực hành: Quan sát và phân biệt một số loại tế bào", "Tế bào", 5, 21, "Quan sát tế bào thực vật, động vật dưới kính hiển vi; vẽ và so sánh.", "microscope"],
  ["g6_b22", "Bài 22. Cơ thể sinh vật", "Từ tế bào đến cơ thể", 6, 22, "Cơ thể sinh vật gồm nhiều tế bào; phân biệt cơ thể đơn bào và đa bào.", "cell"],
  ["g6_b23", "Bài 23. Tổ chức cơ thể đa bào", "Từ tế bào đến cơ thể", 6, 23, "Tế bào → mô → cơ quan → cơ thể; các cấp tổ chức trong sinh vật đa bào.", "organelle"],
  ["g6_b24", "Bài 24. Thực hành: Quan sát và mô tả cơ thể đơn bào, đa bào", "Từ tế bào đến cơ thể", 6, 24, "Quan sát amip, euglena (đơn bào) và mô thực vật, động vật (đa bào).", "microscope"],
  ["g6_b25", "Bài 25. Hệ thống phân loại sinh vật", "Đa dạng thế giới sống", 7, 25, "Phân loại theo giới, ngành, lớp, bộ, họ, chi, loài; tên khoa học hai phần.", "diversity"],
  ["g6_b26", "Bài 26. Khóa lưỡng phân", "Đa dạng thế giới sống", 7, 26, "Dùng khóa lưỡng phân để nhận biết sinh vật qua cặp đặc điểm đối lập.", "diversity"],
  ["g6_b27", "Bài 27. Vi khuẩn", "Đa dạng thế giới sống", 7, 27, "Vi khuẩn đơn bào, không có nhân thật; vai trò có lợi và có hại.", "microorganism"],
  ["g6_b28", "Bài 28. Thực hành: Làm sữa chua và quan sát vi khuẩn", "Đa dạng thế giới sống", 7, 28, "Lên men sữa nhờ vi khuẩn; quan sát mẫu an toàn trong phòng lab.", "lab"],
  ["g6_b29", "Bài 29. Virus", "Đa dạng thế giới sống", 7, 29, "Virus rất nhỏ, không có cấu trúc tế bào; cần tế bào chủ để sinh sản.", "microorganism"],
  ["g6_b30", "Bài 30. Nguyên sinh vật", "Đa dạng thế giới sống", 7, 30, "Amip, trùng roi, trùng giày; đơn bào, di chuyển và dinh dưỡng đa dạng.", "microorganism"],
  ["g6_b31", "Bài 31. Thực hành: Quan sát nguyên sinh vật", "Đa dạng thế giới sống", 7, 31, "Lấy mẫu nước ao, quan sát nguyên sinh vật dưới kính hiển vi.", "microscope"],
  ["g6_b32", "Bài 32. Nấm", "Đa dạng thế giới sống", 7, 32, "Nấm đa bào, hút chất hữu cơ; nấm men, nấm mốc và nấm lớn.", "microorganism"],
  ["g6_b33", "Bài 33. Thực hành: Quan sát các loại nấm", "Đa dạng thế giới sống", 7, 33, "Quan sát nấm men, nấm mốc trên mẫu an toàn; vẽ hình.", "lab"],
  ["g6_b34", "Bài 34. Thực vật", "Đa dạng thế giới sống", 7, 34, "Đặc điểm chung thực vật: rễ, thân, lá, hoa; quang hợp và vách cellulose.", "plant"],
  ["g6_b35", "Bài 35. Thực hành: Quan sát và phân biệt một số nhóm thực vật", "Đa dạng thế giới sống", 7, 35, "Phân biệt thực vật hạt trần và hạt kín qua mẫu thực tế.", "plant"],
  ["g6_b36", "Bài 36. Động vật", "Đa dạng thế giới sống", 7, 36, "Đặc điểm chung động vật; phân biệt không xương sống và có xương sống.", "animal"],
  ["g6_b37", "Bài 37. Thực hành: Quan sát và nhận biết một số nhóm động vật ngoài thiên nhiên", "Đa dạng thế giới sống", 7, 37, "Quan sát côn trùng, cá, lưỡng cư, chim trong môi trường tự nhiên hoặc mẫu.", "animal"],
  ["g6_b38", "Bài 38. Đa dạng sinh học", "Đa dạng thế giới sống", 7, 38, "Đa dạng gen, loài và hệ sinh thái; giá trị và nguy cơ suy giảm.", "diversity"],
  ["g6_b39", "Bài 39. Tìm hiểu sinh vật ngoài thiên nhiên", "Đa dạng thế giới sống", 7, 39, "Khảo sát sinh vật địa phương; bảo vệ môi trường sống và thiên nhiên.", "environment"]
];

export const SOURCE = "Bám mạch SGK Khoa học tự nhiên 6 – Kết nối tri thức với cuộc sống (mạch Sinh học), nội dung tự biên soạn.";

export const core = {
  g6_b01: ["Sinh học trong KHTN", "Sinh học nghiên cứu sự sống: từ tế bào, sinh vật đến hệ sinh thái.", "Men vi sinh lên men sữa chua là ví dụ Sinh học ứng dụng.", "KHTN gồm Vật lí, Hóa học, Sinh học."],
  g6_b02: ["An toàn lab Sinh", "Không nếm, không ngửi mẫu sinh vật lạ; đeo găng tay và kính khi cần.", "Mẫu máu, dịch cơ thể chỉ xử lý theo hướng dẫn giáo viên.", "Rửa tay sau thí nghiệm; báo ngay khi bị đứt tay hoặc đổ hóa chất."],
  g6_b03: ["Kính lúp", "Phóng đại vài đến vài chục lần; quan sát gân lá, cánh côn trùng, bề mặt hạt.", "So sánh mặt trên và mặt dưới lá cùng loại cây.", "Giữ khoảng cách mắt – kính – vật để hình rõ."],
  g6_b04: ["Kính hiển vi", "Phóng đại hàng trăm đến hàng nghìn lần; làm mẫu mỏng trên lam kính.", "Quan sát tế bào hành tím: nhân, tế bào chất, vách tế bào.", "Vẽ hình đúng tỷ lệ; ghi độ phóng đại trên sơ đồ."],
  g6_b15: ["Dinh dưỡng", "Tinh bột, đường cung cấp năng lượng; protein xây dựng cơ thể; lipid dự trữ.", "Gạo nhiều tinh bột; đậu phụ nhiều protein thực vật.", "Ăn đủ nhóm thực phẩm, rửa sạch trước khi chế biến."],
  g6_b18: ["Tế bào", "Mọi sinh vật đều có tế bào; tế bào là đơn vị cơ bản của sự sống.", "Amip là sinh vật đơn bào; cây muống là sinh vật đa bào.", "Tế bào có màng, tế bào chất và thường có nhân."],
  g6_b19: ["Thành phần tế bào", "Nhân điều khiển hoạt động; tế bào chất là môi trường phản ứng sống.", "Tế bào thực vật có vách cellulose và thường có vacuole lớn.", "Màng tế bào điều hòa trao đổi chất với môi trường."],
  g6_b20: ["Phân chia tế bào", "Tế bào lớn lên nhờ hấp thu chất dinh dưỡng; sinh sản bằng phân chia.", "Một tế bào phân chia thành hai tế bào con giống hệt (sơ lược).", "Phân chia tế bào giúp cơ thể lớn lên và thay thế tế bào cũ."],
  g6_b21: ["Thực hành tế bào", "Làm mẫu lát mỏng, nhuộm iodine để thấy nhân rõ hơn.", "Tế bào thực vật có hình chữ nhật; tế bào động vật tròn hơn.", "Ghi chú độ phóng đại và tên bộ phận quan sát được."],
  g6_b22: ["Cơ thể sinh vật", "Cơ thể gồm một hoặc nhiều tế bào làm việc phối hợp.", "Giun đất đa bào; vi khuẩn đơn bào.", "Cơ thể đa bào có nhiều loại tế bào khác nhau."],
  g6_b23: ["Cấp tổ chức", "Tế bào → mô → cơ quan → cơ thể (sinh vật đa bào).", "Mô biểu bì bảo vệ; mô dẫn vận chuyển chất trong cây.", "Các cơ quan phối hợp tạo thành hệ cơ quan."],
  g6_b24: ["Thực hành đơn/đa bào", "Quan sát amip thay đổi hình dạng khi di chuyển.", "Mô thực vật gồm nhiều tế bào giống nhau sắp xếp.", "So sánh kích thước và hình dạng tế bào các mẫu."],
  g6_b25: ["Phân loại sinh vật", "Phân loại theo quan hệ họ hàng; tên Latin hai phần: chi + loài.", "Homo sapiens là tên khoa học của loài người.", "Hệ thống phân loại giúp tra cứu và nghiên cứu."],
  g6_b26: ["Khóa lưỡng phân", "Mỗi cặp câu hỏi chia nhóm sinh vật thành hai nhánh.", "Có cánh / không cánh → phân biệt côn trùng bay và không bay.", "Chọn đặc điểm dễ quan sát, ổn định để lập khóa."],
  g6_b27: ["Vi khuẩn", "Vi khuẩn rất nhỏ, đơn bào, không có nhân đặc biệt (sơ lược THCS).", "Vi khuẩn lactic acid lên men sữa; vi khuẩn có hại gây bệnh.", "Vệ sinh tay giúp hạn chế vi khuẩn gây bệnh."],
  g6_b28: ["Lên men sữa chua", "Vi khuẩn chuyển lactose thành axit lactic, đông sữa.", "Ủ sữa ấm với men sữa chua trong điều kiện vệ sinh.", "Thí nghiệm cần đun sạch dụng cụ và đậy kín hợp lý."],
  g6_b29: ["Virus", "Virus nhỏ hơn vi khuẩn; không có cấu trúc tế bào hoàn chỉnh.", "Virus cúm, HIV cần tế bào chủ để nhân lên.", "Vaccine giúp cơ thể tạo miễn dịch phòng virus."],
  g6_b30: ["Nguyên sinh vật", "Sinh vật đơn bào sống trong nước; amip, trùng giày, euglena.", "Amip bắt mồi bằng chân giả; euglena có dải roi.", "Nguyên sinh vật là nhóm đa dạng, không phải một loài."],
  g6_b31: ["TH nguyên sinh vật", "Giọt nước ao chứa nhiều nguyên sinh vật.", "Quan sát chuyển động và hình dạng dưới kính hiển vi.", "Không uống nước mẫu thí nghiệm."],
  g6_b32: ["Nấm", "Nấm hút chất hữu cơ; có thân sợi (mycelium) và bào tử.", "Nấm men lên men bánh mì; nấm mốc mọc trên thức ăn để lâu.", "Một số nấm ăn được, nhiều nấm hoang độc."],
  g6_b33: ["TH quan sát nấm", "Nuôi nấm mốc trên bánh mì ẩm trong túi sạch (theo hướng dẫn GV).", "Vẽ sợi nấm và bào tử nếu quan sát được.", "Không hít trực tiếp bào tử nấm mốc."],
  g6_b34: ["Thực vật", "Quang hợp; có rễ, thân, lá; thực vật hạt trần và hạt kín.", "Thông là thực vật hạt trần; cây ăn quả thường hạt kín.", "Thực vật là nhà sản xuất trong chuỗi thức ăn."],
  g6_b35: ["TH thực vật", "Quan sát rễ, thân, lá, hoa (nếu có) của mẫu cây.", "So sánh thực vật một nhị và hai nhị (sơ lược).", "Ghi tên địa phương và đặc điểm nhận biết."],
  g6_b36: ["Động vật", "Di chuyển tích cực; hô hấp khí; đa số ăn sẵn.", "Côn trùng có lớp vỏ cứng; cá thở bằng mang.", "Phân loại theo xương sống và môi trường sống."],
  g6_b37: ["TH động vật", "Quan sát côn trùng, chim, cá ngoài thiên nhiên an toàn.", "Ghi lại nơi sống, cách di chuyển, thức ăn.", "Không bắt sinh vật hoang dã trái phép."],
  g6_b38: ["Đa dạng sinh học", "Phong phú loài và môi trường giúp hệ sinh thái ổn định.", "Rừng nhiệt đới Việt Nam có nhiều loài đặc hữu.", "Mất rừng làm giảm đa dạng sinh học."],
  g6_b39: ["Sinh vật ngoài thiên nhiên", "Khảo sát cây, động vật, vi sinh tại công viên, ao hồ.", "Ghi sổ quan sát: thời tiết, loài gặp, hành vi.", "Bảo vệ thiên nhiên: không xả rác, không phá tổ."],
};

export const q = {
  g6_b01: [
    ["multiple_choice", "Sinh học nghiên cứu chủ yếu điều gì?", ["Sự sống và sinh vật", "Chỉ chuyển động cơ", "Chỉ phản ứng hóa học", "Chỉ hành tinh"], "Sự sống và sinh vật", "Sinh học là nhánh KHTN về sự sống."],
    ["multiple_choice", "KHTN gồm những lĩnh vực nào?", ["Vật lí, Hóa học, Sinh học", "Chỉ Toán", "Chỉ Văn", "Chỉ Địa"], "Vật lí, Hóa học, Sinh học", "Ba lĩnh vực cốt lõi THCS."],
    ["multiple_choice", "Ví dụ nào thuộc Sinh học?", ["Vi khuẩn lên men sữa chua", "Quả bóng rơi", "Muối tan trong nước", "Đo nhiệt độ"], "Vi khuẩn lên men sữa chua", "Quá trình sinh học vi sinh."]
  ],
  g6_b02: [
    ["multiple_choice", "Khi quan sát mẫu sinh vật lạ, em nên:", ["Không nếm, báo giáo viên", "Nếm thử vị", "Ngửi sát mũi", "Đổ mẫu ra sàn"], "Không nếm, báo giáo viên", "An toàn phòng thí nghiệm."],
    ["multiple_choice", "Dụng cụ bảo hộ khi làm TN Sinh gồm:", ["Găng tay, kính bảo hộ", "Chỉ dép lê", "Không cần gì", "Chỉ khẩu trang một lần"], "Găng tay, kính bảo hộ", "Bảo vệ da và mắt."],
    ["multiple_choice", "Sau thí nghiệm Sinh, em nên:", ["Rửa tay sạch", "Không rửa tay", "Ăn ngay trong lab", "Cất mẫu tùy tiện"], "Rửa tay sạch", "Vệ sinh cá nhân."]
  ],
  g6_b03: [
    ["multiple_choice", "Kính lúp dùng để:", ["Quan sát vật nhỏ phóng đại vài lần", "Quan sát tế bào chi tiết như hiển vi", "Đo nhiệt độ", "Cân khối lượng"], "Quan sát vật nhỏ phóng đại vài lần", "Phóng đại thấp hơn hiển vi."],
    ["multiple_choice", "Mẫu nào phù hợp quan sát bằng kính lúp?", ["Gân lá cây", "Cấu trúc vi khuẩn chi tiết", "Nguyên tử", "Hành tinh"], "Gân lá cây", "Vật nhỏ nhưng không vi mô."],
    ["multiple_choice", "Kính hiển vi khác kính lúp ở chỗ:", ["Phóng đại mạnh hơn nhiều", "Không phóng đại", "Chỉ dùng ban đêm", "Đo thời gian"], "Phóng đại mạnh hơn nhiều", "Hiển vi cần mẫu mỏng."]
  ],
  g6_b04: [
    ["multiple_choice", "Kính hiển vi quang học dùng để:", ["Quan sát tế bào và cấu trúc vi mô", "Ngắm sao", "Đo lực", "Cân khối lượng lớn"], "Quan sát tế bào và cấu trúc vi mô", "Công cụ Sinh học cơ bản."],
    ["multiple_choice", "Làm mẫu quan sát tế bào cần:", ["Lam kính, lam mỏng, nhuộm màu an toàn", "Chỉ giọt nước", "Không cần che kính", "Nếm thử mẫu"], "Lam kính, lam mỏng, nhuộm màu an toàn", "Mẫu mỏng giúp ánh sáng xuyên qua."],
    ["multiple_choice", "Tế bào thực vật thường có thêm so với động vật:", ["Vách tế bào", "Không có màng", "Không có tế bào chất", "Không có nhân"], "Vách tế bào", "Vách cellulose đặc trưng thực vật."]
  ],
  g6_b15: [
    ["multiple_choice", "Nhóm chất cung cấp năng lượng chính:", ["Carbohydrate (tinh bột, đường)", "Chỉ vitamin", "Chỉ khoáng", "Chỉ nước"], "Carbohydrate (tinh bột, đường)", "Nguồn năng lượng hàng ngày."],
    ["multiple_choice", "Protein có vai trò:", ["Xây dựng và sửa chữa cơ thể", "Chỉ tạo màu xanh lá", "Chỉ đốt cháy không khí", "Chỉ làm cứng xương độc lập"], "Xây dựng và sửa chữa cơ thể", "Đậu, trứng, thịt giàu protein."],
    ["multiple_choice", "Gạo tẻ chứa nhiều:", ["Tinh bột", "Protein nhất", "Chất béo duy nhất", "Vitamin D"], "Tinh bột", "Lương thực chính ở Việt Nam."]
  ],
  g6_b18: [
    ["multiple_choice", "Tế bào là:", ["Đơn vị cơ bản của sự sống", "Chỉ là hạt bụi", "Chỉ có ở động vật", "Chỉ có ở thực vật"], "Đơn vị cơ bản của sự sống", "Mọi sinh vật đều có tế bào."],
    ["multiple_choice", "Sinh vật đơn bào là sinh vật:", ["Cơ thể gồm một tế bào", "Không có tế bào", "Chỉ sống trên cạn", "Chỉ là virus"], "Cơ thể gồm một tế bào", "Ví dụ: vi khuẩn, amip."],
    ["multiple_choice", "Thành phần nào thường có trong tế bào?", ["Màng, tế bào chất, nhân", "Chỉ vách gỗ", "Chỉ lông vũ", "Chỉ vỏ cứng côn trùng"], "Màng, tế bào chất, nhân", "Cấu trúc cơ bản tế bào."]
  ],
  g6_b19: [
    ["multiple_choice", "Nhân tế bào có vai trò:", ["Chứa thông tin di truyền, điều khiển hoạt động", "Chỉ chứa nước", "Chỉ là vách bảo vệ", "Không có chức năng"], "Chứa thông tin di truyền, điều khiển hoạt động", "Nhân chứa ADN."],
    ["multiple_choice", "Màng tế bào:", ["Điều hòa vào – ra chất", "Chỉ làm cứng cơ thể", "Chỉ có ở virus", "Không liên quan trao đổi"], "Điều hòa vào – ra chất", "Màng chọn lọc."],
    ["multiple_choice", "Vacuole lớn thường gặp ở:", ["Tế bào thực vật", "Virus", "Chỉ vi khuẩn", "Không có ở sinh vật"], "Tế bào thực vật", "Chứa dịch bào."]
  ],
  g6_b20: [
    ["multiple_choice", "Tế bào lớn lên nhờ:", ["Hấp thu chất dinh dưỡng và tích lũy", "Chỉ uống nước một lần", "Không trao đổi chất", "Chỉ ngủ"], "Hấp thu chất dinh dưỡng và tích lũy", "Trao đổi chất nuôi tế bào."],
    ["multiple_choice", "Sinh sản tế bào thường qua:", ["Phân chia tế bào", "Chỉ hô hấp", "Chỉ quang hợp", "Bay đi"], "Phân chia tế bào", "Một tế bào → hai tế bào con."],
    ["multiple_choice", "Phân chia tế bào giúp:", ["Cơ thể lớn lên và thay tế bào cũ", "Chỉ làm giảm số tế bào", "Chỉ xảy ra ở virus", "Không liên quan sinh vật"], "Cơ thể lớn lên và thay tế bào cũ", "Quan trọng với sinh vật đa bào."]
  ],
  g6_b21: [
    ["multiple_choice", "Khi quan sát tế bào thực vật, thường thấy:", ["Vách tế bào hình chữ nhật", "Không có nhân", "Chỉ có vỏ côn trùng", "Không cần nhuộm"], "Vách tế bào hình chữ nhật", "Hình dạng đặc trưng."],
    ["multiple_choice", "Nhuộm iodine giúp:", ["Làm nổi bật nhân hoặc tinh bột", "Làm mẫu tan hết", "Đo nhiệt độ", "Tạo màu đen vĩnh viễn trên tay"], "Làm nổi bật nhân hoặc tinh bột", "Thuốc nhuộm an toàn trong SGK."],
    ["multiple_choice", "Vẽ hình quan sát cần ghi:", ["Độ phóng đại và tên bộ phận", "Chỉ màu yêu thích", "Không cần tỷ lệ", "Chỉ chữ ký"], "Độ phóng đại và tên bộ phận", "Sổ tay lab đúng chuẩn."]
  ],
  g6_b22: [
    ["multiple_choice", "Cơ thể sinh vật đa bào:", ["Gồm nhiều tế bào", "Chỉ một tế bào", "Không có tế bào", "Chỉ là mô đất"], "Gồm nhiều tế bào", "Người, cây muống là đa bào."],
    ["multiple_choice", "Ví dụ sinh vật đơn bào:", ["Amip", "Cây thông", "Con mèo", "Con người"], "Amip", "Một tế bào là cả cơ thể."],
    ["multiple_choice", "Các tế bào trong cơ thể đa bào:", ["Phối hợp làm việc", "Không liên quan nhau", "Chỉ giống hệt virus", "Không trao đổi chất"], "Phối hợp làm việc", "Tạo nên cơ thể hoàn chỉnh."]
  ],
  g6_b23: [
    ["multiple_choice", "Thứ tự tổ chức đúng:", ["Tế bào → mô → cơ quan → cơ thể", "Cơ thể → tế bào → mô", "Chỉ có tế bào → cơ thể", "Mô → tế bào → cơ quan"], "Tế bào → mô → cơ quan → cơ thể", "Cấp tổ chức đa bào."],
    ["multiple_choice", "Mô là:", ["Nhóm tế bào cùng loại làm chung chức năng", "Một tế bào duy nhất", "Chỉ là đất", "Chỉ là nước"], "Nhóm tế bào cùng loại làm chung chức năng", "Ví dụ: mô biểu bì."],
    ["multiple_choice", "Cơ quan là:", ["Nhiều mô phối hợp", "Chỉ một phân tử", "Chỉ một bào tử", "Không có chức năng"], "Nhiều mô phối hợp", "Ví dụ: lá, rễ, tim."]
  ],
  g6_b24: [
    ["multiple_choice", "Amip thuộc nhóm:", ["Sinh vật đơn bào", "Thực vật hạt kín", "Động vật có xương sống", "Virus"], "Sinh vật đơn bào", "Di chuyển bằng chân giả."],
    ["multiple_choice", "Mô thực vật gồm:", ["Nhiều tế bào", "Một phân tử nước", "Chỉ không khí", "Chỉ đá"], "Nhiều tế bào", "Đa bào."],
    ["multiple_choice", "So sánh đơn bào và đa bào dựa trên:", ["Số tế bào tạo nên cơ thể", "Chỉ màu sắc", "Chỉ nơi sống trên cạn", "Chỉ kích thước Trái Đất"], "Số tế bào tạo nên cơ thể", "Tiêu chí phân loại cơ bản."]
  ],
  g6_b25: [
    ["multiple_choice", "Tên khoa học thường gồm:", ["Tên chi và tên loài", "Chỉ tên địa phương", "Chỉ một chữ", "Chỉ số điện thoại"], "Tên chi và tên loài", "Ví dụ: Homo sapiens."],
    ["multiple_choice", "Phân loại sinh vật giúp:", ["Tra cứu và nghiên cứu quan hệ họ hàng", "Chỉ để đặt tên vui", "Không có ích", "Chỉ dùng cho đá"], "Tra cứu và nghiên cứu quan hệ họ hàng", "Hệ thống phân cấp."],
    ["multiple_choice", "Cấp phân loại từ rộng đến hẹp (một dãy):", ["Giới → ngành → lớp → bộ → họ → chi → loài", "Loài → giới duy nhất", "Chỉ có giới và loài", "Chi → giới → loài → ngành"], "Giới → ngành → lớp → bộ → họ → chi → loài", "Thứ tự SGK THCS."]
  ],
  g6_b26: [
    ["multiple_choice", "Khóa lưỡng phân dùng:", ["Cặp đặc điểm đối lập", "Chỉ một câu hỏi", "Chỉ màu sắc yêu thích", "Chỉ đo nhiệt độ"], "Cặp đặc điểm đối lập", "Có / không; dài / ngắn..."],
    ["multiple_choice", "Mỗi bước khóa lưỡng phân chia mẫu thành:", ["Hai nhóm", "Mười nhóm", "Không chia", "Một nhóm duy nhất"], "Hai nhóm", "Nguyên tắc lưỡng phân."],
    ["multiple_choice", "Đặc điểm tốt để lập khóa nên:", ["Dễ quan sát, ổn định", "Thay đổi liên tục", "Không nhìn thấy", "Chỉ nghe mùi"], "Dễ quan sát, ổn định", "Giúp phân loại chính xác."]
  ],
  g6_b27: [
    ["multiple_choice", "Vi khuẩn có hình dạng:", ["Cầu, que, xoắn...", "Chỉ hình vuông lớn", "Chỉ hình cây", "Chỉ cánh chim"], "Cầu, que, xoắn...", "Đa dạng hình thái."],
    ["multiple_choice", "Vi khuẩn có lợi:", ["Lên men sữa chua, làm phân bón", "Luôn gây chết người ngay", "Không có vai trò nào", "Chỉ sống trên Mặt Trời"], "Lên men sữa chua, làm phân bón", "Ứng dụng thực tế."],
    ["multiple_choice", "Vi khuẩn khác virus ở chỗ:", ["Vi khuẩn là tế bào sống (sơ lược)", "Giống hệt nhau", "Virus lớn hơn", "Vi khuẩn không sinh sản"], "Vi khuẩn là tế bào sống (sơ lược)", "Virus cần tế bào chủ."]
  ],
  g6_b28: [
    ["multiple_choice", "Sữa chua tạo được nhờ:", ["Vi khuẩn lactic acid lên men sữa", "Chỉ đun sôi", "Chỉ để trong tủ đá", "Chỉ thêm đường"], "Vi khuẩn lactic acid lên men sữa", "Lên men sinh học."],
    ["multiple_choice", "Khi làm sữa chua cần:", ["Vệ sinh dụng cụ và ủ ấm phù hợp", "Nếm thử liên tục khi ủ", "Để mở không che", "Dùng mẫu bẩn"], "Vệ sinh dụng cụ và ủ ấm phù hợp", "Điều kiện lên men."],
    ["multiple_choice", "Lên men là:", ["Vi sinh vật biến đổi chất hữu cơ", "Chỉ đốt cháy", "Chỉ tan trong nước", "Chỉ quang hợp"], "Vi sinh vật biến đổi chất hữu cơ", "Quá trình sinh học."]
  ],
  g6_b29: [
    ["multiple_choice", "Virus:", ["Không có cấu trúc tế bào hoàn chỉnh", "Lớn hơn cây thông", "Tự quang hợp", "Luôn có lợi"], "Không có cấu trúc tế bào hoàn chỉnh", "Cần tế bào chủ."],
    ["multiple_choice", "Virus sinh sản bằng cách:", ["Chiếm tế bào chủ để nhân lên", "Phân chia như amip", "Quang hợp", "Sinh sản hữu tính như hoa"], "Chiếm tế bào chủ để nhân lên", "Không tự nhân lên độc lập."],
    ["multiple_choice", "Vaccine giúp:", ["Tạo miễn dịch phòng bệnh virus", "Làm virus lớn hơn", "Thay thế tế bào", "Không liên quan sức khỏe"], "Tạo miễn dịch phòng bệnh virus", "Phòng bệnh truyền nhiễm."]
  ],
  g6_b30: [
    ["multiple_choice", "Nguyên sinh vật thường sống:", ["Trong nước", "Chỉ trên Mặt Trời", "Chỉ trong đá núi nung", "Không cần môi trường"], "Trong nước", "Ao, hồ, giọt nước."],
    ["multiple_choice", "Amip di chuyển bằng:", ["Chân giả", "Cánh", "Vây cá", "Bánh xe"], "Chân giả", "Thay đổi hình dạng tế bào."],
    ["multiple_choice", "Euglena có:", ["Dải roi giúp di chuyển", "Vỏ cua", "Lông vũ", "Xương sống"], "Dải roi giúp di chuyển", "Nguyên sinh vật biết di chuyển."]
  ],
  g6_b31: [
    ["multiple_choice", "Lấy mẫu nước ao quan sát cần:", ["Dụng cụ sạch, làm theo hướng dẫn GV", "Uống thử nước ao", "Không cần kính hiển vi", "Ném mẫu vào mắt"], "Dụng cụ sạch, làm theo hướng dẫn GV", "An toàn thí nghiệm."],
    ["multiple_choice", "Nguyên sinh vật trong giọt nước:", ["Thường cần kính hiển vi để thấy rõ", "To bằng cá mập", "Không di chuyển", "Chỉ là đá"], "Thường cần kính hiển vi để thấy rõ", "Kích thước vi mô."],
    ["multiple_choice", "Ghi sổ quan sát nên có:", ["Hình vẽ và mô tả chuyển động", "Chỉ chữ ký bạn bè", "Không ghi thời gian", "Chỉ màu mực"], "Hình vẽ và mô tả chuyển động", "Sổ tay khoa học."]
  ],
  g6_b32: [
    ["multiple_choice", "Nấm dinh dưỡng bằng cách:", ["Hút chất hữu cơ từ môi trường", "Quang hợp", "Bắt mồi bằng nanh", "Bay như chim"], "Hút chất hữu cơ từ môi trường", "Không quang hợp."],
    ["multiple_choice", "Nấm men dùng trong:", ["Làm bánh mì, lên men", "Chỉ làm gạch", "Chỉ đúc kim loại", "Chỉ đo lực"], "Làm bánh mì, lên men", "Vi sinh có ích."],
    ["multiple_choice", "Nấm mốc thường mọc:", ["Trên thức ăn để lâu ẩm", "Trên kim loại", "Trong chân không", "Chỉ dưới nước biển sâu"], "Trên thức ăn để lâu ẩm", "Điều kiện ẩm, hữu cơ."],
  ],
  g6_b33: [
    ["multiple_choice", "Quan sát nấm mốc an toàn:", ["Không hít trực tiếp bào tử", "Ăn thử nấm mốc", "Quát mạnh vào mặt bạn", "Không che mẫu"], "Không hít trực tiếp bào tử", "Bảo vệ đường hô hấp."],
    ["multiple_choice", "Thân nấm gồm:", ["Sợi nấm (mycelium)", "Chỉ một tế bào lớn duy nhất", "Chỉ lá cây", "Chỉ xương"], "Sợi nấm (mycelium)", "Cấu trúc cơ bản nấm."],
    ["multiple_choice", "Nấm sinh sản bằng:", ["Bào tử", "Chỉ hạt có cánh", "Chỉ đẻ con", "Chỉ phân hạch như tế bào người"], "Bào tử", "Bào tử nhẹ, lan rộng."]
  ],
  g6_b34: [
    ["multiple_choice", "Đặc điểm chung thực vật:", ["Quang hợp, có rễ thân lá", "Chỉ ăn thịt", "Không có tế bào", "Chỉ sống dưới đáy biển sâu"], "Quang hợp, có rễ thân lá", "Nhà sản xuất."],
    ["multiple_choice", "Thực vật hạt trần:", ["Hạt không được bao kín quả", "Luôn là cây hoa", "Không có lá", "Chỉ sống trong nước"], "Hạt không được bao kín quả", "Ví dụ: thông, bách."],
    ["multiple_choice", "Vách tế bào thực vật chứa:", ["Cellulose", "Chỉ sắt", "Chỉ nhựa cao su", "Chỉ muối ăn"], "Cellulose", "Làm cứng tế bào."]
  ],
  g6_b35: [
    ["multiple_choice", "Phân biệt thực vật hạt kín quan sát:", ["Hoa, quả, hạt được bao kín", "Không bao giờ có rễ", "Không có lá", "Chỉ mọc trên đá"], "Hoa, quả, hạt được bao kín", "Đặc điểm nhóm hạt kín."],
    ["multiple_choice", "Khi quan sát mẫu cây nên ghi:", ["Hình dạng lá, rễ, thân", "Chỉ tên bạn cùng nhóm", "Không cần vẽ", "Chỉ màu bút"], "Hình dạng lá, rễ, thân", "Mô tả đặc điểm."],
    ["multiple_choice", "Thực vật một nhị có:", ["Một nhị trong hoa", "Mười nhị", "Không có hoa", "Chỉ có rễ"], "Một nhị trong hoa", "Ví dụ: đậu (sơ lược)."]
  ],
  g6_b36: [
    ["multiple_choice", "Động vật khác thực vật ở chỗ:", ["Di chuyển tích cực, đa số ăn sẵn", "Quang hợp", "Có vách cellulose", "Không có tế bào"], "Di chuyển tích cực, đa số ăn sẵn", "Dịch dưỡng."],
    ["multiple_choice", "Động vật không xương sống:", ["Côn trùng, giun, mềm...", "Chim, cá, thú", "Chỉ khủng long", "Chỉ cây cối"], "Côn trùng, giun, mềm...", "Không có xương sống."],
    ["multiple_choice", "Cá thở bằng:", ["Mang", "Phổi như người", "Lá cây", "Vỏ cua"], "Mang", "Hô hấp dưới nước."]
  ],
  g6_b37: [
    ["multiple_choice", "Quan sát động vật ngoài thiên nhiên:", ["Giữ an toàn, không làm hại sinh vật", "Bắt chim hoang dã trái phép", "Ném đá vào tổ", "Phá tổ ong"], "Giữ an toàn, không làm hại sinh vật", "Đạo đức khảo sát."],
    ["multiple_choice", "Ghi chép quan sát nên có:", ["Nơi sống, cách di chuyển, thức ăn", "Chỉ chữ ký", "Không cần thời gian", "Chỉ màu áo"], "Nơi sống, cách di chuyển, thức ăn", "Sổ tay tự nhiên."],
    ["multiple_choice", "Côn trùng có:", ["Lớp vỏ cứng bảo vệ", "Lông vũ", "Vú nuôi con", "Mang cá"], "Lớp vỏ cứng bảo vệ", "Đặc điểm nhóm côn trùng."]
  ],
  g6_b38: [
    ["multiple_choice", "Đa dạng sinh học gồm:", ["Đa dạng gen, loài, hệ sinh thái", "Chỉ một loài", "Chỉ đá và cát", "Chỉ khí quyển"], "Đa dạng gen, loài, hệ sinh thái", "Ba cấp độ đa dạng."],
    ["multiple_choice", "Mất rừng làm:", ["Giảm môi trường sống và loài", "Tăng vô hạn loài", "Không ảnh hưởng", "Chỉ tăng đá"], "Giảm môi trường sống và loài", "Nguy cơ tuyệt chủng."],
    ["multiple_choice", "Bảo vệ đa dạng sinh học:", ["Bảo vệ nguồn gen và hệ sinh thái", "Đốt rừng trồng lại một cây", "Xả rác tự do", "Săn bắt bừa bãi"], "Bảo vệ nguồn gen và hệ sinh thái", "Phát triển bền vững."]
  ],
  g6_b39: [
    ["multiple_choice", "Khảo sát sinh vật địa phương giúp:", ["Hiểu mối liên hệ sinh vật – môi trường", "Chỉ để giết sinh vật", "Không có mục đích", "Chỉ chụp ảnh không ghi chép"], "Hiểu mối liên hệ sinh vật – môi trường", "Học từ thiên nhiên."],
    ["multiple_choice", "Hành động bảo vệ thiên nhiên:", ["Không xả rác, trồng cây", "Phá tổ chim", "Đốt rác rừng", "Khai thác trái phép"], "Không xả rác, trồng cây", "Trách nhiệm cộng đồng."],
    ["multiple_choice", "Sổ quan sát thiên nhiên nên ghi:", ["Thời tiết, loài gặp, hành vi", "Chỉ điểm số", "Không cần ngày tháng", "Chỉ lời chúc"], "Thời tiết, loài gặp, hành vi", "Phương pháp khoa học."]
  ]
};

export const errors = [
  ["g6_b02", "nem thu", "safety_error", "Nếm mẫu sinh vật", "Không nếm mẫu trong phòng thí nghiệm.", "Quan sát và báo giáo viên."],
  ["g6_b03", "hien vi", "tool_error", "Nhầm kính lúp và hiển vi", "Kính hiển vi phóng đại mạnh hơn kính lúp.", "Kính lúp quan sát vật nhỏ; hiển vi quan sát tế bào."],
  ["g6_b04", "lup", "tool_error", "Dùng kính lúp thay hiển vi", "Quan sát tế bào cần kính hiển vi và mẫu mỏng.", "Làm mẫu trên lam kính."],
  ["g6_b15", "chi co protein", "nutrition_error", "Nhầm nhóm dinh dưỡng", "Gạo nhiều tinh bột, không phải chỉ protein.", "Cân bằng các nhóm thực phẩm."],
  ["g6_b18", "khong co te bao", "cell_error", "Cho rằng virus có tế bào đầy đủ", "Virus không có cấu trúc tế bào hoàn chỉnh.", "Mọi sinh vật sống đều có tế bào (virus là ngoại lệ đặc biệt)."],
  ["g6_b19", "khong co nhan", "cell_error", "Nhầm cấu tạo tế bào", "Tế bào eukaryote có nhân.", "Nhân chứa thông tin di truyền."],
  ["g6_b20", "te bao khong sinh san", "cell_error", "Nhầm lớn lên và sinh sản", "Tế bào sinh sản bằng phân chia.", "Phân chia tạo tế bào con."],
  ["g6_b23", "co quan truoc mo", "organization_error", "Nhầm thứ tự tổ chức", "Thứ tự: tế bào → mô → cơ quan → cơ thể.", "Mô gồm nhiều tế bào."],
  ["g6_b27", "virus la vi khuan", "microbe_error", "Nhầm virus và vi khuẩn", "Virus nhỏ hơn và cần tế bào chủ.", "Vi khuẩn là tế bào sống."],
  ["g6_b29", "virus co te bao", "concept_error", "Nhầm virus và tế bào", "Virus không có cấu trúc tế bào đầy đủ.", "Virus cần tế bào chủ để nhân lên."],
  ["g6_b32", "nam quang hop", "fungus_error", "Nhầm nấm và thực vật", "Nấm không quang hợp, hút chất hữu cơ.", "Nấm là nhóm riêng."],
  ["g6_b34", "dong vat quang hop", "concept_error", "Nhầm thực vật và động vật", "Quang hợp là đặc trưng của thực vật.", "Động vật không quang hợp."],
  ["g6_b36", "ca thở phoi", "animal_error", "Nhầm cơ quan hô hấp cá", "Cá thở bằng mang.", "Phổi là của động vật trên cạn (sơ lược)."],
  ["g6_b38", "chi co cay", "concept_error", "Thu hẹp đa dạng sinh học", "Đa dạng sinh học gồm vi sinh vật, động vật, thực vật.", "Xem đa dạng ở nhiều cấp độ."]
];

export function skillFromLesson(item, index) {
  const [id, title, chapter, chapterIndex, lessonNo, description, visualization] = item;
  return {
    id,
    title,
    grade: 6,
    book: "Kết nối tri thức",
    chapter,
    chapterIndex,
    lessonNo,
    domain: chapterIndex === 1 ? "Mở đầu & Quan sát" : chapterIndex === 3 ? "Dinh dưỡng" : chapterIndex === 5 ? "Tế bào" : chapterIndex === 6 ? "Tổ chức cơ thể" : "Đa dạng sinh vật",
    level: chapterIndex <= 1 ? 1 : chapterIndex <= 3 ? 2 : chapterIndex <= 6 ? 3 : 4,
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
  const [grade, id, title, chapter, chapterIndex, lessonNo, description, visualization] = [
    6, item[0], item[1], item[2], item[3], item[4], item[5], item[6]
  ];
  return [grade, id, title, chapter, chapterIndex, lessonNo, description, visualization];
}

const grade6Skills = lessons.map((item, index) => skillFromLesson(item, index));
const grade6Lessons = lessons.map((item) => ({
  id: item[0],
  title: item[1],
  skill: item[0],
  chapter: item[2],
  source: SOURCE,
  xp: 50,
  steps: lessonSteps(item)
}));
const grade6Questions = lessons.flatMap(questionObjects);
const grade6Errors = errors.map(([skill, pattern, errorType, title, message, hint]) => ({
  pattern,
  skill,
  errorType,
  title,
  message,
  hint,
  recommendation: skill
}));

const isMain = process.argv[1]?.endsWith("generate-grade6-kntt.mjs");
if (isMain) {
  const upper = JSON.parse(await readFile("data/skills.json", "utf8")).filter((s) => s.grade > 6);
  const upperLessons = JSON.parse(await readFile("data/lessons.json", "utf8")).filter((l) => upper.some((s) => s.id === l.skill));
  const upperQuestions = JSON.parse(await readFile("data/questions.json", "utf8")).filter((qItem) => upper.some((s) => s.id === qItem.skill));
  const upperErrors = JSON.parse(await readFile("data/errors.json", "utf8")).filter((e) => e.skill && !e.skill.startsWith("g6_"));

  await writeFile("data/skills.json", `${JSON.stringify([...grade6Skills, ...upper], null, 2)}\n`);
  await writeFile("data/lessons.json", `${JSON.stringify([...grade6Lessons, ...upperLessons], null, 2)}\n`);
  await writeFile("data/questions.json", `${JSON.stringify([...grade6Questions, ...upperQuestions], null, 2)}\n`);
  await writeFile("data/errors.json", `${JSON.stringify([...grade6Errors, ...upperErrors], null, 2)}\n`);

  console.log(`Grade 6 Sinh học KNTT: ${grade6Skills.length} bài, ${grade6Questions.length} câu hỏi, ${grade6Errors.length} mẫu lỗi.`);
  console.log(`Tổng ứng dụng: ${grade6Skills.length + upper.length} bài, ${grade6Questions.length + upperQuestions.length} câu hỏi.`);
}
