import { normalizeBio } from "../assets/js/utils.js";

export function analyzeError(answer, question, errorPatterns) {
  const normalized = normalizeBio(answer);
  const pattern = errorPatterns.find((item) => {
    const sameSkill = !item.skill || item.skill === question.skill;
    return sameSkill && normalized.includes(normalizeBio(item.pattern));
  });

  if (pattern) {
    return pattern;
  }

  if (question.skill === "g7_b04" || question.skill === "g7_b05") {
    if (normalized.includes("tho") && !normalized.includes("hohap")) {
      return {
        skill: question.skill,
        errorType: "process_error",
        title: "Nhầm thở và hô hấp tế bào",
        message: "Thở là trao đổi khí; hô hấp tế bào giải phóng năng lượng từ glucose.",
        hint: question.hint,
        recommendation: question.skill
      };
    }
  }

  if (question.skill.includes("g7_b07") || question.skill.includes("circulation")) {
    return {
      skill: question.skill,
      errorType: "circulation_error",
      title: "Nhầm vai trò mạch máu",
      message: "Động mạch đi từ tim; tĩnh mạch về tim. Máu mang oxy và chất dinh dưỡng.",
      hint: question.hint,
      recommendation: question.skill
    };
  }

  return {
    skill: question.skill,
    errorType: "logic_error",
    title: "Cần kiểm tra lại lập luận",
    message: "Đáp án chưa khớp. Hãy đọc lại dữ kiện và thử mô hình trực quan hoặc từng bước.",
    hint: question.hint,
    recommendation: question.skill
  };
}
