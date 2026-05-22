const fs = require("fs");
const path = require("path");
const db = require("../config/db");

const schemaPath = path.join(__dirname, "..", "database", "schema.sql");

function run(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function onRun(error) {
      if (error) {
        reject(error);
        return;
      }
      resolve({ id: this.lastID, changes: this.changes });
    });
  });
}

function get(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (error, row) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(row);
    });
  });
}

function exec(sql) {
  return new Promise((resolve, reject) => {
    db.exec(sql, (error) => {
      if (error) {
        reject(error);
        return;
      }
      resolve();
    });
  });
}

async function initialize() {
  const schema = fs.readFileSync(schemaPath, "utf8");
  await exec(schema);
}

async function saveAssessment(result, answers) {
  await run("BEGIN TRANSACTION");

  try {
    const assessment = await run(
      `INSERT INTO assessments (
        candidate_name,
        candidate_role,
        impulsor_score,
        influenciador_score,
        estabilizador_score,
        analizador_score,
        consistency_score,
        primary_profile,
        secondary_profile,
        final_profile
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        result.candidateName,
        result.candidateRole,
        result.scores.impulsor.score,
        result.scores.influenciador.score,
        result.scores.estabilizador.score,
        result.scores.analizador.score,
        result.consistency.score,
        result.profile.primaryProfile,
        result.profile.secondaryProfile,
        result.profile.finalProfile
      ]
    );

    for (const answer of answers) {
      await run(
        `INSERT INTO answers (
          assessment_id,
          question_id,
          selected_option,
          value,
          dimension
        ) VALUES (?, ?, ?, ?, ?)`,
        [
          assessment.id,
          answer.questionId,
          answer.selectedOption,
          answer.value,
          answer.dimension
        ]
      );
    }

    await run("COMMIT");
    return assessment.id;
  } catch (error) {
    await run("ROLLBACK");
    throw error;
  }
}

function findById(id) {
  return get("SELECT * FROM assessments WHERE id = ?", [id]);
}

module.exports = {
  initialize,
  saveAssessment,
  findById
};
