import { levelFromXp } from "../assets/js/utils.js";

export function getGamificationSummary(state) {
  const level = levelFromXp(state.xp);
  const currentLevelXp = state.xp % 120;
  const badges = [];

  if (state.completedLessons.includes("g6_b01")) badges.push("Khởi đầu Sinh học");
  if (state.completedLessons.includes("g6_b04")) badges.push("Thợ kính hiển vi");
  if (state.completedLessons.includes("g6_b18")) badges.push("Hiểu tế bào");
  if (state.completedLessons.includes("g6_b34")) badges.push("Bậc thầy thực vật");
  if (state.completedLessons.includes("g6_b38")) badges.push("Người bảo vệ đa dạng");
  if (state.completedLessons.includes("g7_b22")) badges.push("Bậc thầy quang hợp");
  if (state.completedLessons.includes("g7_b33")) badges.push("Hiểu cảm ứng sinh vật");
  if (state.completedLessons.includes("g7_b40")) badges.push("Sinh sản hữu tính");
  if (state.completedLessons.includes("g8_b37")) badges.push("Thần kinh cơ bản");
  if (state.completedLessons.includes("g8_b44")) badges.push("Hiểu hệ sinh thái");
  if (state.completedLessons.includes("g8_b47")) badges.push("Người bảo vệ môi trường");
  if (state.completedLessons.includes("g9_b37")) badges.push("Bậc thầy Mendel");
  if (state.completedLessons.includes("g9_b48")) badges.push("Công nghệ gen");
  if (state.completedLessons.includes("g9_b51")) badges.push("Nhà tiến hóa học");
  if (state.completedLessons.length >= 3) badges.push("Nhịp học đều");
  if (state.streak >= 7) badges.push("7 ngày liên tiếp");
  if (state.answers.filter((answer) => answer.correct).length >= 10) badges.push("Mười câu chắc tay");

  return {
    level,
    currentLevelXp,
    nextLevelXp: 120,
    badges
  };
}

export function xpForAnswer(correct) {
  return correct ? 10 : 0;
}
