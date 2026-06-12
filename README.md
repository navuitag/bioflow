# BioFlow VN

Ứng dụng web học **Sinh học THCS** (lớp 6–9): micro-learning, mô hình trực quan (2D/3D) và phân tích lỗi sai. Frontend-only, offline-first.

## Chạy thử

```bash
cd bioflow
python3 -m http.server 8080
```

Mở trình duyệt: `http://localhost:8080`

## Cấu trúc

- `index.html` — shell SPA
- `assets/` — CSS, JS (router, state)
- `components/` — navbar, lesson/quiz card, flashcard, memory, modal
- `modules/` — lesson, quiz, error, visualization, scene3d, practice, gamification
- `data/` — `skills.json`, `lessons.json`, `questions.json`, `errors.json`
- `vendor/` — Three.js cho mô hình 3D

## Tính năng

- **Lesson Engine** — bài học theo vi kỹ năng, tiến độ mastery
- **Quiz Engine** — trắc nghiệm và nhập đáp án (xáo trộn đáp án)
- **Flashcards & Memory Training** — ôn thuật ngữ và khái niệm
- **Error Analysis** — phân loại lỗi theo mẫu Sinh học THCS
- **Visualization** — sơ đồ 2D + mô hình 3D tương tác (tế bào, thực vật, hệ sinh thái…)
- **Gamification** — XP, level, badge, daily quest, streak

## Lộ trình nội dung

- **Lớp 6:** 27 bài — Mở đầu KHTN & quan sát (1–4), lương thực (15), tế bào (18–21), tổ chức cơ thể (22–24), đa dạng thế giới sống (25–39)
- **Lớp 7:** 23 bài — Phương pháp KHTN (1); trao đổi chất & năng lượng (21–32); cảm ứng (33–35); sinh trưởng (36–38); sinh sản (39–42)
- **Lớp 8:** 18 bài — Cơ thể người (30–40): vận động, tiêu hóa, tuần hoàn, hô hấp, thần kinh, sinh sản…; Sinh vật & môi trường (41–47)
- **Lớp 9:** 16 bài — Di truyền Mendel & cơ sở phân tử (36–41), di truyền NST (42–46), di truyền người & công nghệ gen (47–48), tiến hóa (49–51)

Tạo lại nội dung:

```bash
node scripts/generate-grade6-kntt.mjs   # Lớp 6 Sinh học KNTT (27 bài)
node scripts/generate-grade7-kntt.mjs   # Lớp 7 Sinh học KNTT (23 bài)
node scripts/generate-grade8-kntt.mjs   # Lớp 8 Sinh học KNTT (18 bài)
node scripts/generate-grade9-kntt.mjs   # Lớp 9 Sinh học KNTT (16 bài)
node scripts/generate-all.mjs           # Toàn bộ lớp 6–9 (84 bài)
```

Giao diện dùng cùng bảng màu với [PhyFlow](../phyflow) và [MathFlow](../mathflow) (`#20a36b`, nền `#f7fbff`).

---

## Tác giả

- **Nguyễn Anh Vũ**
- Email: [navuitag@gmail.com](mailto:navuitag@gmail.com)
- Điện thoại: [0986201079](tel:+84986201079)
