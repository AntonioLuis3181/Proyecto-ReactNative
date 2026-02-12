// ============================================
// IMPORTACIONES
// ============================================
const express = require("express");
const path = require("path");
const cors = require("cors");
const { logMensaje } = require("./utils/logger.js");

// Rutas de la API
const plataformaRoutes = require("./routes/plataformaRoutes");
const cursoRoutes = require("./routes/cursoRoutes");

// ============================================
// INICIALIZACIÓN
// ============================================
const app = express();
// En Docker, el puerto interno suele ser 3000 por defecto
const port = process.env.PORT || 3000;

// ============================================
// MIDDLEWARE
// ============================================
app.use(express.json());
app.use(cors()); // Permite conexiones desde cualquier origen (necesario para Docker)
app.use(express.static(path.join(__dirname, "public")));

// ============================================
// RUTAS
// ============================================
app.use("/api/plataformas", plataformaRoutes);
app.use("/api/cursos", cursoRoutes);

// Ruta base para comprobar que el backend respira
app.get("/", (req, res) => {
    res.send("Backend funcionando correctamente en Docker");
});

// ============================================
// ARRANCAR SERVIDOR
// ============================================
// Solo arrancamos si este archivo se ejecuta directamente (no en tests)
if (process.env.NODE_ENV !== "test") {
    app.listen(port, () => {
        // Usamos console.log por si logger falla al inicio
        console.log(`🚀 Servidor Docker escuchando en el puerto ${port}`);
        if (logMensaje) logMensaje(`Servidor iniciado en puerto ${port}`);
    });
}

// Exportamos para los tests
module.exports = app;