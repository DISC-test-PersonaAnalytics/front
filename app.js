const express = require("express");
const path = require("path");

const app = express();
const assessmentRoutes = require("./routes/assessmentRoutes");
const assessmentModel = require("./models/assessmentModel");
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use("/", assessmentRoutes);

app.use((req, res) => {
  res.status(404).render("404", {
    title: "Pagina no encontrada"
  });
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).render("error", {
    title: "Error inesperado"
  });
});

async function startServer() {
  try {
    await assessmentModel.initialize();
    app.listen(PORT, () => {
      console.log(`Servidor iniciado en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("No se pudo iniciar la aplicacion:", error.message);
    process.exitCode = 1;
  }
}

startServer();
