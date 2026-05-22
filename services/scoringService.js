const { dimensions } = require("../data/questions");

const CHOICE_POINTS = 5;

function createDimensionMap(initialValue = 0) {
  return Object.keys(dimensions).reduce((result, dimension) => {
    result[dimension] = initialValue;
    return result;
  }, {});
}

function getLevel(score) {
  if (score <= 20) {
    return "Muy bajo";
  }
  if (score <= 40) {
    return "Bajo";
  }
  if (score <= 60) {
    return "Medio";
  }
  if (score <= 80) {
    return "Alto";
  }
  return "Muy alto";
}

function calculateScores(questions, answers) {
  const totals = createDimensionMap();
  const maximums = createDimensionMap();

  questions.forEach((question) => {
    if (question.type === "choice") {
      Object.keys(maximums).forEach((dimension) => {
        maximums[dimension] += CHOICE_POINTS;
      });

      const selectedOption = question.options.find(
        (option) => option.key === answers[question.id]
      );

      if (selectedOption) {
        totals[selectedOption.dimension] += CHOICE_POINTS;
      }
      return;
    }

    maximums[question.dimension] += 5;
    const rawValue = Number(answers[question.id]);
    const value = question.reverse ? 6 - rawValue : rawValue;
    totals[question.dimension] += value;
  });

  const scores = Object.keys(totals).reduce((result, dimension) => {
    const score = maximums[dimension]
      ? Math.round((totals[dimension] / maximums[dimension]) * 100)
      : 0;

    result[dimension] = {
      score,
      level: getLevel(score)
    };
    return result;
  }, {});

  return scores;
}

module.exports = {
  calculateScores,
  getLevel
};
