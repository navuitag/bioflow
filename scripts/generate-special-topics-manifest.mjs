/**
 * Quét thư mục special-topic/ và sinh data/special-topics.json
 * Chạy: node scripts/generate-special-topics-manifest.mjs
 */
import { readdir, writeFile } from "node:fs/promises";

const ROOT = "special-topic";

const SLUG_TITLES = {
  "Te-bao-Cau-tao-te-bao": "Tế bào, cấu tạo tế bào",
  "Thuc-vat": "Thực vật",
  "Dong-vat": "Động vật",
  "Co-the-nguoi": "Cơ thể người",
  "Di-truyen-hoc": "Di truyền học",
  "Sinh-thai-hoc": "Sinh thái học",
  "Bai-toan-tong-hop": "Bài toán tổng hợp"
};

const CATEGORIES = [
  { id: "cell", title: "Tế bào", emoji: "🔬", max: 1 },
  { id: "organisms", title: "Sinh vật", emoji: "🌿", max: 4 },
  { id: "genetics_ecology", title: "Di truyền & sinh thái", emoji: "🧬", max: 6 },
  { id: "synthesis", title: "Tổng hợp", emoji: "📊", max: 99 }
];

function titleFromSlug(slug) {
  return SLUG_TITLES[slug] || slug.replace(/-/g, " ");
}

function categoryForOrder(order) {
  return CATEGORIES.find((c) => order <= c.max) || CATEGORIES[CATEGORIES.length - 1];
}

async function main() {
  const files = await readdir(ROOT);
  const topics = [];

  for (const file of files.filter((f) => f.endsWith(".png"))) {
    const match = file.match(/^(\d+)\.(.+)\.png$/i);
    if (!match) continue;

    const order = Number(match[1]);
    const slug = match[2];
    const cat = categoryForOrder(order);
    const path = `${ROOT}/${file}`;

    topics.push({
      id: `cd${String(order).padStart(2, "0")}`,
      order,
      code: `CD${String(order).padStart(2, "0")}`,
      title: titleFromSlug(slug),
      slug,
      category: cat.id,
      categoryTitle: cat.title,
      pdf: null,
      image: path
    });
  }

  topics.sort((a, b) => a.order - b.order);

  const payload = {
    meta: {
      title: "Chuyên đề Sinh học",
      subtitle: "7 sơ đồ chuyên đề — xem trực tiếp trên hệ thống",
      topicCount: topics.length,
      source: "Bộ tài liệu chuyên đề trong thư mục special-topic/"
    },
    overviews: [],
    categories: CATEGORIES.map(({ id, title, emoji }) => ({ id, title, emoji })),
    topics
  };

  await writeFile("data/special-topics.json", `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  console.log(`✓ special-topics.json — ${topics.length} chuyên đề`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
