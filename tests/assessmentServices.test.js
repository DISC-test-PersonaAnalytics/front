const test = require("node:test");
const assert = require("node:assert/strict");
const { questions } = require("../data/questions");
const { calculateScores } = require("../services/scoringService");
const { calculateConsistency } = require("../services/consistencyService");

function buildAnswers() {
  return questions.reduce((answers, question) => {
    answers[question.id] = question.type === "choice" ? "A" : "3";
    return answers;
  }, {});
}

test("scores stay normalized when a dimension receives strong responses", () => {
  const answers = buildAnswers();

  questions
    .filter((question) => question.type === "likert" && question.dimension === "impulsor")
    .forEach((question) => {
      answers[question.id] = question.reverse ? "1" : "5";
    });

  const scores = calculateScores(questions, answers);

  assert.equal(scores.impulsor.score, 100);
  assert.equal(scores.impulsor.level, "Muy alto");
  assert.ok(scores.influenciador.score < scores.impulsor.score);
});

test("mirror pairs produce full consistency for inverse responses", () => {
  const consistency = calculateConsistency({
    p21: "5",
    p22: "1",
    p23: "4",
    p24: "2",
    p25: "3",
    p26: "3",
    p27: "2",
    p28: "4"
  });

  assert.deepEqual(consistency, {
    score: 100,
    label: "Muy consistente"
  });
});
