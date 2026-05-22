CREATE TABLE IF NOT EXISTS assessments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  candidate_name TEXT,
  candidate_role TEXT,
  impulsor_score INTEGER NOT NULL,
  influenciador_score INTEGER NOT NULL,
  estabilizador_score INTEGER NOT NULL,
  analizador_score INTEGER NOT NULL,
  consistency_score INTEGER NOT NULL,
  primary_profile TEXT NOT NULL,
  secondary_profile TEXT NOT NULL,
  final_profile TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS answers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  assessment_id INTEGER NOT NULL,
  question_id TEXT NOT NULL,
  selected_option TEXT,
  value INTEGER,
  dimension TEXT,
  FOREIGN KEY (assessment_id) REFERENCES assessments(id)
);
