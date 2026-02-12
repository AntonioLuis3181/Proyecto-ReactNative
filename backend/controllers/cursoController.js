// controllers/cursoController.js
const { logMensaje } = require("../utils/logger.js");
const cursoService = require("../services/cursoService");

class CursoController {
async getAllCursos(req, res) {
    try {
      const { busqueda, fechaInicio, fechaFin } = req.query; 

      const cursos = await cursoService.getAllCursos(busqueda, fechaInicio, fechaFin);
      
      return res.status(200).json({
        ok: true,
        datos: cursos,
        mensaje: "Cursos recuperados correctamente",
      });
    } catch (err) {
      console.error("Error en getAllCurso:", err);
      return res.status(500).json({
        ok: false,
        datos: null,
        mensaje: "Error al recuperar cursos",
      });
    }
  }
  async createCurso(req, res) {
    const curso = req.body;

    try {
      const cursoNew = await cursoService.createCurso(curso);

      return res.status(201).json({
        ok: true,
        datos: cursoNew,
        mensaje: "Curso creado correctamente",
      });
    } catch (err) {
      logMensaje("Error en createCurso:", err);
      return res.status(500).json({
        ok: false,
        datos: null,
        mensaje: "Error al crear un curso",
      });
    }
  }
  async deleteCurso(req, res) {
    const id_curso = req.params.id;

    try {
      const numFilas = await cursoService.deleteCurso(id_curso);

      if (numFilas == 0) {
        return res.status(404).json({
          ok: false,
          datos: null,
          mensaje: "Curso no encontrado: " + id_curso,
        });
      } else {
        return res.status(200).json({
          ok:true,
          datos:null,
          mensaje:"Curso borrado correctamente",
        });
      }
    } catch (err) {
      console.error("Error en deleteCurso:", err);
      return res.status(500).json({
        ok: false,
        datos: null,
        mensaje: "Error al borrar una curso",
      });
    }
  }

  async updateCurso(req, res) {
    // Recupero el id_curso de la ruta
    const id_curso = req.params.id;
    // El objeto del curso llega en el body
    const curso = req.body;

    curso.id_curso = id_curso;

    try {
      const numFilas = await cursoService.updateCurso(curso);

      if (numFilas == 0) {
        return res.status(404).json({
          ok: false,
          datos: null,
          mensaje: "No encontrado: " + curso.id_curso,
        });
      } else {
        return res.status(200).json({
          ok: true,
          datos: null,
          mensaje: "Curso actualizado correctamente",
        });
      }
    } catch (err) {
      console.error("Error en EditCurso:", err);
      return res.status(500).json({
        ok: false,
        datos: null,
        mensaje: "Error al editar un curso",
      });
    }
  }

  async getCursoById(req, res) {
    const id_curso = req.params.id;
    try {
      const curso = await cursoService.getCursoById(id_curso);
      // curso != null -- se ha encontrado el directos
      if (curso) {
        return res.status(200).json({
          ok: true,
          datos: curso,
          mensaje: "Curso recuperado correctamente",
        });
      } else {
        return res.status(404).json({
          ok: false,
          datos: null,
          mensaje: "Curso no encontrado",
        });
      }
    } catch (err) {
      logMensaje("Error en getCursoById:", err);
      return res.status(500).json({
        ok: false,
        datos: null,
        mensaje: "Error al recuperar un curso",
      });
    }
  }
}

module.exports = new CursoController();
