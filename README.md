# DISC-test PersonaAnalytics

DISC-test PersonaAnalytics es un MVP web para explorar estilos de trabajo en
contextos profesionales y educativos. Esta inspirado en modelos conductuales
tipo DISC, pero usa dimensiones, textos y perfiles propios para un assessment de
WorkStyle orientado a portfolio.

## Aviso de uso

Esta herramienta es una autoevaluación educativa y profesional de estilos de
trabajo. No es una prueba clínica, psicológica, médica ni un instrumento oficial
validado para selección de personal. Los resultados deben interpretarse como
tendencias conductuales, no como rasgos definitivos de personalidad.

## Stack

- Node.js
- Express.js
- EJS
- SQLite3
- HTML, CSS y JavaScript sin framework frontend

## Dimensiones

| Codigo | Dimension | Lectura |
| --- | --- | --- |
| A | Impulsor | Accion, velocidad, decision, liderazgo directo y resultados |
| B | Influenciador | Comunicacion, persuasion, energia social y relacion |
| C | Estabilizador | Cooperacion, paciencia, estabilidad y apoyo interpersonal |
| D | Analizador | Precision, logica, estructura, planificacion y calidad |

## Funcionalidad MVP

- Landing informativa en `/`
- Assessment con datos opcionales de nombre y rol en `/assessment`
- Preguntas de opcion A/B/C/D, escala Likert y pares espejo
- Scoring normalizado de 0 a 100 para las cuatro dimensiones
- Consistency Score basado en respuestas espejo
- Perfil principal, perfil secundario e interpretacion combinada
- Persistencia de resultados y respuestas en SQLite
- Vista de resultado guardado en `/results/:id`

## Instalacion y comandos

```bash
npm install
npm start
```

El servidor usa `process.env.PORT` o el puerto `3000` por defecto:

```text
http://localhost:3000
```

Para desarrollo con recarga:

```bash
npm run dev
```

## Estructura

```text
front/
|-- app.js
|-- config/
|   `-- db.js
|-- controllers/
|   `-- assessmentController.js
|-- data/
|   `-- questions.js
|-- database/
|   |-- database.db
|   `-- schema.sql
|-- models/
|   `-- assessmentModel.js
|-- public/
|   |-- css/style.css
|   |-- js/app.js
|   `-- disctestIcon.png
|-- routes/
|   `-- assessmentRoutes.js
|-- services/
|   |-- consistencyService.js
|   |-- profileService.js
|   `-- scoringService.js
`-- views/
    |-- assessment.ejs
    |-- index.ejs
    |-- results.ejs
    `-- partials/
```

`database/database.db` se crea al iniciar la aplicacion si todavia no existe.
`database/schema.sql` mantiene la definicion de las tablas `assessments` y
`answers`.

## Scoring

Las preguntas A/B/C/D suman puntos a la dimension elegida. Las preguntas Likert
aportan un valor de `1` a `5` a su dimension; los items inversos se convierten
con `6 - valor` antes de sumar. Cada dimension se normaliza contra su maximo
posible y se expresa de `0` a `100`.

Niveles:

- `0-20`: Muy bajo
- `21-40`: Bajo
- `41-60`: Medio
- `61-80`: Alto
- `81-100`: Muy alto

## Consistency Score

Los pares espejo comparan una afirmacion principal con su espejo inverso:

```text
respuesta_espejo_invertida = 6 - respuesta_espejo
diferencia = abs(respuesta_principal - respuesta_espejo_invertida)
```

La diferencia maxima por par es `4`. El servicio convierte la suma de
diferencias en un score de `0` a `100`.

- `90-100`: Muy consistente
- `75-89`: Consistente
- `60-74`: Ambivalente
- `40-59`: Inconsistente
- Menor que `40`: Posible respuesta aleatoria o poco fiable

## Futuras mejoras

- Autenticacion
- Dashboard admin
- Exportacion PDF
- Exportacion CSV
- Multiidioma
- API REST
- Graficos
- Comparacion de equipos
