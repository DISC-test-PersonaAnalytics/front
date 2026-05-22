const mirrorPairs = [
  { primaryId: "p21", mirrorId: "p22" },
  { primaryId: "p23", mirrorId: "p24" },
  { primaryId: "p25", mirrorId: "p26" },
  { primaryId: "p27", mirrorId: "p28" }
];

function getConsistencyLabel(score) {
  if (score >= 90) {
    return "Muy consistente";
  }
  if (score >= 75) {
    return "Consistente";
  }
  if (score >= 60) {
    return "Ambivalente";
  }
  if (score >= 40) {
    return "Inconsistente";
  }
  return "Posible respuesta aleatoria o poco fiable";
}

function calculateConsistency(answers) {
  const totalDifference = mirrorPairs.reduce((difference, pair) => {
    const primaryValue = Number(answers[pair.primaryId]);
    const invertedMirrorValue = 6 - Number(answers[pair.mirrorId]);
    return difference + Math.abs(primaryValue - invertedMirrorValue);
  }, 0);
  const maxPossibleDifference = mirrorPairs.length * 4;
  const score = Math.round(
    100 - (totalDifference / maxPossibleDifference) * 100
  );

  return {
    score,
    label: getConsistencyLabel(score)
  };
}

module.exports = {
  calculateConsistency,
  getConsistencyLabel
};
