// controllers/plataformaController.js
const { logMensaje } = require("../utils/logger.js");
const plataformaService = require("../services/plataformaService");

class PlataformaController {
async getAllPlataformas(req, res) {
    try {
      const { busqueda, fechaInicio, fechaFin } = req.query;

      const plataformas = await plataformaService.getAllPlataformas(busqueda, fechaInicio, fechaFin);
      
      return res.status(200).json({
        ok: true,
        datos: plataformas,
        mensaje: "Plataformas recuperadas correctamente",
      });
    } catch (err) {
      console.error("Error en getAllPlataformas:", err);
      return res.status(500).json({
        ok: false,
        datos: null,
        mensaje: "Error al recuperar plataformas",
      });
    }
  }
  async createPlataforma(req, res) {
    const plataforma = req.body;

    try {
      const plataformaNew = await plataformaService.createPlataforma(plataforma);

      return res.status(201).json({
        ok: true,
        datos: plataformaNew,
        mensaje: "Plataforma creada correctamente",
      });
    } catch (err) {
      logMensaje("Error en createPlataforma:", err);
      return res.status(500).json({
        ok: false,
        datos: null,
        mensaje: "Error al crear una plataforma",
      });
    }
  }
  async deletePlataforma(req, res) {
    const id_plataforma = req.params.id;

    try {
      const numFilas = await plataformaService.deletePlataforma(id_plataforma);

      if (numFilas == 0) {
        return res.status(404).json({
          ok: false,
          datos: null,
          mensaje: "Plataforma no encontrada: " + id_plataforma,
        });
      } else {
        // Borrado correcto
        return res.status(204).send();
      }
    } catch (err) {
      logMensaje("Error en deletePlataforma:", err);
      return res.status(500).json({
        ok: false,
        datos: null,
        mensaje: "Error al borrar una plataforma",
      });
    }
  }

  async updatePlataforma(req, res) {
    // Recupero el id_plataforma de la ruta
    const id_plataforma = req.params.id;
    // El objeto del plataforma llega en el body
    const plataforma = req.body;

    try {
      const numFilas = await plataformaService.updatePlataforma(plataforma);

      if (numFilas == 0) {
        // No se ha encontrado lo que se quería actualizar o no hay nada que cambiar
        return res.status(404).json({
          ok: false,
          datos: null,
          mensaje: "No encontrado: " + plataforma.id_plataforma,
        });
      } else {
        // Al dar status 204 no se devuelva nada
        res.status(204).send();
      }
    } catch (err) {
      logMensaje("Error en EditPlataforma:", err);
      return res.status(500).json({
        ok: false,
        datos: null,
        mensaje: "Error al editar una plataforma",
      });
    }
  }

  async getPlataformaById(req, res) {
    const id_plataforma = req.params.id;
    try {
      const plataforma = await plataformaService.getPlataformaById(id_plataforma);
      // plataforma != null -- se ha encontrado el directos
      if (plataforma) {
        return res.status(200).json({
          ok: true,
          datos: plataforma,
          mensaje: "Plataforma recuperada correctamente",
        });
      } else {
        return res.status(404).json({
          ok: false,
          datos: null,
          mensaje: "Plataforma no encontrada",
        });
      }
    } catch (err) {
      logMensaje("Error en getPlataformaById:", err);
      return res.status(500).json({
        ok: false,
        datos: null,
        mensaje: "Error al recuperar una plataforma",
      });
    }
  }
}

module.exports = new PlataformaController();
