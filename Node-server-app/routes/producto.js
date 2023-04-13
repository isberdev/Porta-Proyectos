//*rutas para productos
const express = require("express");
const router = express.Router();
const productocontrollers = require("../controllers/productocontrollers");
//*api/productos

router.post("/", productocontrollers.crearproducto);
router.get("/", productocontrollers.obtenerProductos);
router.put("/:id", productocontrollers.actualizarProducto);
router.get("/:id", productocontrollers.obtenerProducto);
router.delete("/:id", productocontrollers.eliminarProducto);
module.exports = router;
