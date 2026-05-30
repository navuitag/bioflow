import { readFile, writeFile } from "node:fs/promises";
import { lessons as G6_LESSONS, core as G6_CORE, q as G6_Q, errors as G6_ERRORS, toLessonRow } from "./generate-grade6-kntt.mjs";
import { lessons as G7_LESSONS, core as G7_CORE, q as G7_Q, errors as G7_ERRORS, toLessonRow as g7ToRow } from "./generate-grade7-kntt.mjs";
import { lessons as G8_LESSONS, core as G8_CORE, q as G8_Q, errors as G8_ERRORS, toLessonRow as g8ToRow } from "./generate-grade8-kntt.mjs";
import { lessons as G9_LESSONS, core as G9_CORE, q as G9_Q, errors as G9_ERRORS, toLessonRow as g9ToRow } from "./generate-grade9-kntt.mjs";
const SOURCE = "Bám mạch SGK Khoa học tự nhiên / Sinh học THCS – Kết nối tri thức với cuộc sống, nội dung tự biên soạn.";
const lessonRows = [
  ...G6_LESSONS.map(toLessonRow),
  ...G7_LESSONS.map(g7ToRow),
  ...G8_LESSONS.map(g8ToRow),
  ...G9_LESSONS.map(g9ToRow)
];
const core = {
  ...G6_CORE,
  ...G7_CORE,
  ...G8_CORE,
  ...G9_CORE
};
const q = {
  ...G6_Q,
  ...G7_Q,
  ...G8_Q,
  ...G9_Q
};
const errors = [
  ...G6_ERRORS,
  ...G7_ERRORS,
  ...G8_ERRORS,
  ...G9_ERRORS
];

function skillFromRow(row, indexInGrade, gradeRows) {
  const [grade, id, title, chapter, chapterIndex, lessonNo, description, visualization] = row;
  return {
    id,
    title,
    grade,
    book: "Kết nối tri thức",
    chapter,
    chapterIndex,
    lessonNo,
    domain: chapter,
    level: chapterIndex <= 1 ? 1 : chapterIndex <= 2 ? 2 : chapterIndex <= 4 ? 3 : 4,
    prerequisite: indexInGrade === 0 ? [] : [gradeRows[indexInGrade - 1][1]],
    description,
    visualization
  };
}

function lessonSteps(row) {
  const [, id, , , , , description, visualization] = row;
  const [visualTitle, visualContent, example, summary] = core[id];
  return [
    { type: "intro", title: "Mục tiêu vi kỹ năng", content: description },
    { type: "visualization", title: visualTitle, content: visualContent, visualization },
    { type: "example", title: "Ví dụ từ SGK", content: example },
    { type: "summary", title: "Ghi nhớ nhanh", content: summary }
  ];
}

function questionObjects(id) {
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

const byGrade = {};
for (const row of lessonRows) {
  const grade = row[0];
  if (!byGrade[grade]) byGrade[grade] = [];
  byGrade[grade].push(row);
}

const skills = [];
const lessonData = [];
const questions = [];

for (const grade of [6, 7, 8, 9]) {
  const rows = byGrade[grade] || [];
  rows.forEach((row, index) => {
    const id = row[1];
    skills.push(skillFromRow(row, index, rows));
    lessonData.push({
      id,
      title: row[2],
      skill: id,
      chapter: row[3],
      source: SOURCE,
      xp: 50,
      steps: lessonSteps(row)
    });
    questions.push(...questionObjects(id));
  });
}

const allErrors = errors.map(([skill, pattern, errorType, title, message, hint]) => ({
  pattern,
  skill,
  errorType,
  title,
  message,
  hint,
  recommendation: skill
}));

await writeFile("data/skills.json", `${JSON.stringify(skills, null, 2)}\n`);
await writeFile("data/lessons.json", `${JSON.stringify(lessonData, null, 2)}\n`);
await writeFile("data/questions.json", `${JSON.stringify(questions, null, 2)}\n`);
await writeFile("data/errors.json", `${JSON.stringify(allErrors, null, 2)}\n`);

const counts = {};
for (const s of skills) counts[s.grade] = (counts[s.grade] || 0) + 1;
console.log("BioFlow KNTT Sinh học – lessons per grade:", counts);
console.log(`Total: ${skills.length} skills, ${lessonData.length} lessons, ${questions.length} questions, ${allErrors.length} error patterns.`);
