const express = require("express");
const conectarDB = require("./config/db");
const cors = require("cors");

//*creamos servidor
const app = express();

//*conentamos la base de datos
conectarDB();
app.use(cors());
app.use(express.json());

app.use("/api/productos", require("./routes/producto"));

//*puerto de escucha del server
app.listen(4000, () => {
  console.log("El servidor en funcionamiento");
});
