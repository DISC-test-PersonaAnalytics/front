const profileCatalog = {
  impulsor: {
    label: "Impulsor",
    interpretation: "Activa decisiones y avance cuando hay objetivos exigentes.",
    strengths: ["Velocidad para priorizar", "Orientacion a resultados", "Liderazgo directo bajo presion"],
    risks: ["Puede acelerar antes de escuchar suficiente", "Puede subestimar detalle o desgaste del equipo"],
    recommendations: ["Product Owner trainee", "Incident Manager junior", "Project Coordinator", "DevOps operativo"]
  },
  influenciador: {
    label: "Influenciador",
    interpretation: "Conecta personas, comunica ideas y ayuda a mover acuerdos.",
    strengths: ["Comunicacion cercana", "Persuasion", "Energia relacional"],
    risks: ["Puede abrir demasiados frentes", "Puede necesitar mas seguimiento documental"],
    recommendations: ["Helpdesk", "Customer Success tecnico", "Consultor IT junior", "Scrum Master junior"]
  },
  estabilizador: {
    label: "Estabilizador",
    interpretation: "Aporta continuidad, cooperacion y calma operativa.",
    strengths: ["Paciencia", "Apoyo interpersonal", "Constancia en procesos"],
    risks: ["Puede tardar en confrontar cambios necesarios", "Puede cargar con mas soporte del conveniente"],
    recommendations: ["Soporte IT", "QA tester", "Sysadmin junior", "Documentacion tecnica"]
  },
  analizador: {
    label: "Analizador",
    interpretation: "Cuida la precision, la logica y la calidad de la entrega.",
    strengths: ["Pensamiento estructurado", "Control de calidad", "Planificacion con evidencia"],
    risks: ["Puede demorar decisiones por exceso de revision", "Puede comunicar menos contexto humano"],
    recommendations: ["Backend developer", "Data analyst", "Ciberseguridad", "QA automation", "Bases de datos"]
  }
};

function sortProfiles(scores) {
  return Object.entries(scores).sort((left, right) => {
    if (right[1].score === left[1].score) {
      return profileCatalog[left[0]].label.localeCompare(profileCatalog[right[0]].label);
    }
    return right[1].score - left[1].score;
  });
}

function getProfile(scores) {
  const [primaryEntry, secondaryEntry] = sortProfiles(scores);
  const primaryKey = primaryEntry[0];
  const secondaryKey = secondaryEntry[0];
  const primary = profileCatalog[primaryKey];
  const secondary = profileCatalog[secondaryKey];

  return {
    primaryKey,
    secondaryKey,
    primaryProfile: primary.label,
    secondaryProfile: secondary.label,
    finalProfile: `${primary.label} + ${secondary.label}`,
    interpretation: `${primary.interpretation} Su dimension secundaria ${secondary.label.toLowerCase()} suma ${secondary.interpretation.toLowerCase()}`,
    strengths: [...new Set([...primary.strengths, ...secondary.strengths])].slice(0, 5),
    risks: [...new Set([...primary.risks, ...secondary.risks])].slice(0, 4),
    recommendations: [...new Set([...primary.recommendations, ...secondary.recommendations])].slice(0, 6)
  };
}

module.exports = {
  getProfile
};
