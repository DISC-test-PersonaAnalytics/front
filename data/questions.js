const dimensions = {
  impulsor: {
    code: "A",
    name: "Impulsor"
  },
  influenciador: {
    code: "B",
    name: "Influenciador"
  },
  estabilizador: {
    code: "C",
    name: "Estabilizador"
  },
  analizador: {
    code: "D",
    name: "Analizador"
  }
};

const choiceQuestions = [
  {
    id: "p01",
    type: "choice",
    prompt: "Cuando aparece un problema urgente:",
    options: [
      { key: "A", dimension: "impulsor", text: "Actuo inmediatamente para destrabarlo." },
      { key: "B", dimension: "influenciador", text: "Coordino a las personas que pueden ayudar." },
      { key: "C", dimension: "estabilizador", text: "Mantengo la calma y sostengo al equipo." },
      { key: "D", dimension: "analizador", text: "Analizo la informacion critica primero." }
    ]
  },
  {
    id: "p02",
    type: "choice",
    prompt: "En un proyecto nuevo suelo aportar primero:",
    options: [
      { key: "A", dimension: "impulsor", text: "Objetivos concretos y decisiones rapidas." },
      { key: "B", dimension: "influenciador", text: "Entusiasmo, contactos y conversaciones." },
      { key: "C", dimension: "estabilizador", text: "Acuerdos de trabajo estables y apoyo." },
      { key: "D", dimension: "analizador", text: "Criterios, datos y estructura." }
    ]
  },
  {
    id: "p03",
    type: "choice",
    prompt: "Si una reunion se dispersa, prefiero:",
    options: [
      { key: "A", dimension: "impulsor", text: "Cerrar decisiones y responsables." },
      { key: "B", dimension: "influenciador", text: "Recuperar energia y participacion." },
      { key: "C", dimension: "estabilizador", text: "Escuchar para que nadie quede fuera." },
      { key: "D", dimension: "analizador", text: "Ordenar hechos, riesgos y siguientes pasos." }
    ]
  },
  {
    id: "p04",
    type: "choice",
    prompt: "Ante una incidencia de produccion me sale natural:",
    options: [
      { key: "A", dimension: "impulsor", text: "Tomar control del plan inmediato." },
      { key: "B", dimension: "influenciador", text: "Comunicar estado y alinear expectativas." },
      { key: "C", dimension: "estabilizador", text: "Acompanar al equipo bajo presion." },
      { key: "D", dimension: "analizador", text: "Revisar logs y validar la causa." }
    ]
  },
  {
    id: "p05",
    type: "choice",
    prompt: "Una entrega de calidad para mi necesita sobre todo:",
    options: [
      { key: "A", dimension: "impulsor", text: "Impacto visible y avance." },
      { key: "B", dimension: "influenciador", text: "Buena adopcion por las personas." },
      { key: "C", dimension: "estabilizador", text: "Continuidad y confianza en el proceso." },
      { key: "D", dimension: "analizador", text: "Pruebas, detalle y trazabilidad." }
    ]
  },
  {
    id: "p06",
    type: "choice",
    prompt: "Cuando hay desacuerdo tecnico tiendo a:",
    options: [
      { key: "A", dimension: "impulsor", text: "Elegir una direccion y probarla." },
      { key: "B", dimension: "influenciador", text: "Facilitar una conversacion convincente." },
      { key: "C", dimension: "estabilizador", text: "Buscar una salida cooperativa." },
      { key: "D", dimension: "analizador", text: "Comparar evidencia y restricciones." }
    ]
  },
  {
    id: "p07",
    type: "choice",
    prompt: "Mi ritmo ideal de trabajo se parece mas a:",
    options: [
      { key: "A", dimension: "impulsor", text: "Sprint intenso con decisiones frecuentes." },
      { key: "B", dimension: "influenciador", text: "Interaccion variada con clientes o equipo." },
      { key: "C", dimension: "estabilizador", text: "Flujo predecible con colaboracion." },
      { key: "D", dimension: "analizador", text: "Bloques enfocados para profundizar." }
    ]
  },
  {
    id: "p08",
    type: "choice",
    prompt: "Cuando recibo feedback, valoro especialmente:",
    options: [
      { key: "A", dimension: "impulsor", text: "Saber que accion mejora el resultado." },
      { key: "B", dimension: "influenciador", text: "Conversarlo con apertura y contexto." },
      { key: "C", dimension: "estabilizador", text: "Un tono respetuoso y constructivo." },
      { key: "D", dimension: "analizador", text: "Ejemplos claros y criterios verificables." }
    ]
  }
];

const likertQuestions = [
  { id: "p09", type: "likert", dimension: "impulsor", prompt: "Me moviliza convertir una idea en accion visible." },
  { id: "p10", type: "likert", dimension: "impulsor", prompt: "Puedo priorizar rapido cuando el tiempo es limitado." },
  { id: "p11", type: "likert", dimension: "impulsor", prompt: "Me resulta natural asumir responsabilidad por el resultado." },
  { id: "p12", type: "likert", dimension: "influenciador", prompt: "Explico ideas tecnicas con energia y cercania." },
  { id: "p13", type: "likert", dimension: "influenciador", prompt: "Genero confianza con conversaciones frecuentes." },
  { id: "p14", type: "likert", dimension: "influenciador", prompt: "Disfruto persuadir a otros sobre una propuesta." },
  { id: "p15", type: "likert", dimension: "estabilizador", prompt: "Soy constante cuando una tarea requiere seguimiento." },
  { id: "p16", type: "likert", dimension: "estabilizador", prompt: "Me importa que el equipo trabaje con calma y apoyo." },
  { id: "p17", type: "likert", dimension: "estabilizador", prompt: "Mantengo compromisos aunque el trabajo sea repetitivo." },
  { id: "p18", type: "likert", dimension: "analizador", prompt: "Busco evidencia antes de aceptar una conclusion." },
  { id: "p19", type: "likert", dimension: "analizador", prompt: "Organizo criterios y dependencias antes de entregar." },
  { id: "p20", type: "likert", dimension: "analizador", prompt: "Detecto inconsistencias que otros pueden pasar por alto." },
  {
    id: "p21",
    type: "likert",
    dimension: "impulsor",
    mirrorPair: "impulsor",
    prompt: "Me siento comodo tomando decisiones rapidas."
  },
  {
    id: "p22",
    type: "likert",
    dimension: "impulsor",
    reverse: true,
    mirrorPair: "impulsor",
    prompt: "Prefiero evitar asumir liderazgo o control."
  },
  {
    id: "p23",
    type: "likert",
    dimension: "influenciador",
    mirrorPair: "influenciador",
    prompt: "Disfruto interactuar y comunicarme con personas."
  },
  {
    id: "p24",
    type: "likert",
    dimension: "influenciador",
    reverse: true,
    mirrorPair: "influenciador",
    prompt: "Las interacciones sociales prolongadas suelen agotarme."
  },
  {
    id: "p25",
    type: "likert",
    dimension: "estabilizador",
    mirrorPair: "estabilizador",
    prompt: "Prefiero ambientes predecibles y equilibrados."
  },
  {
    id: "p26",
    type: "likert",
    dimension: "estabilizador",
    reverse: true,
    mirrorPair: "estabilizador",
    prompt: "Los cambios rapidos y constantes me resultan muy estimulantes."
  },
  {
    id: "p27",
    type: "likert",
    dimension: "analizador",
    mirrorPair: "analizador",
    prompt: "Necesito revisar detalles cuidadosamente antes de entregar trabajo."
  },
  {
    id: "p28",
    type: "likert",
    dimension: "analizador",
    reverse: true,
    mirrorPair: "analizador",
    prompt: "Prefiero actuar rapidamente aunque exista margen de error."
  }
];

module.exports = {
  dimensions,
  questions: [...choiceQuestions, ...likertQuestions]
};
