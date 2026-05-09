const express = require("express");
const path = require("path");

const app = express();

const tareaRoutes = require("./routes/tareaRouter");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/", tareaRoutes);
app.listen(3000, () => {
  console.log("Servidor iniciado");
});
