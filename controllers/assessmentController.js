const { dimensions, questions } = require("../data/questions");
const assessmentModel = require("../models/assessmentModel");
const { calculateScores, getLevel } = require("../services/scoringService");
const { calculateConsistency, getConsistencyLabel } = require("../services/consistencyService");
const { getProfile } = require("../services/profileService");

function renderLanding(req, res) {
  res.render("index", {
    title: "DISC-test PersonaAnalytics",
    dimensions
  });
}

function renderAssessment(req, res) {
  res.render("assessment", {
    title: "Assessment",
    questions,
    dimensions,
    error: null,
    formData: {}
  });
}

function isValidAnswer(question, answer) {
  if (question.type === "choice") {
    return question.options.some((option) => option.key === answer);
  }

  const value = Number(answer);
  return Number.isInteger(value) && value >= 1 && value <= 5;
}

function toStoredAnswers(answers) {
  return questions.map((question) => {
    const rawAnswer = answers[question.id];

    if (question.type === "choice") {
      const option = question.options.find((item) => item.key === rawAnswer);
      return {
        questionId: question.id,
        selectedOption: option.key,
        value: null,
        dimension: option.dimension
      };
    }

    return {
      questionId: question.id,
      selectedOption: null,
      value: Number(rawAnswer),
      dimension: question.dimension
    };
  });
}

async function submitAssessment(req, res, next) {
  const missingAnswer = questions.find(
    (question) => !isValidAnswer(question, req.body[question.id])
  );

  if (missingAnswer) {
    res.status(400).render("assessment", {
      title: "Assessment",
      questions,
      dimensions,
      error: "Responde todas las preguntas antes de calcular el perfil.",
      formData: req.body
    });
    return;
  }

  try {
    const scores = calculateScores(questions, req.body);
    const consistency = calculateConsistency(req.body);
    const profile = getProfile(scores);
    const resultId = await assessmentModel.saveAssessment(
      {
        candidateName: req.body.candidate_name?.trim() || null,
        candidateRole: req.body.candidate_role?.trim() || null,
        scores,
        consistency,
        profile
      },
      toStoredAnswers(req.body)
    );

    res.redirect(`/results/${resultId}`);
  } catch (error) {
    next(error);
  }
}

async function renderResults(req, res, next) {
  try {
    const assessment = await assessmentModel.findById(req.params.id);

    if (!assessment) {
      res.status(404).render("404", {
        title: "Resultado no encontrado"
      });
      return;
    }

    const scores = Object.keys(dimensions).reduce((result, dimension) => {
      const score = assessment[`${dimension}_score`];
      result[dimension] = {
        score,
        level: getLevel(score)
      };
      return result;
    }, {});

    res.render("results", {
      title: assessment.final_profile,
      assessment,
      dimensions,
      scores,
      consistency: {
        score: assessment.consistency_score,
        label: getConsistencyLabel(assessment.consistency_score)
      },
      profile: getProfile(scores)
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  renderLanding,
  renderAssessment,
  submitAssessment,
  renderResults
};
