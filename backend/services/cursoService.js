const initModels = require("../models/init-models.js").initModels;
const sequelize = require("../config/sequelize.js");
const { Op } = require("sequelize"); // <--- ¡MUY IMPORTANTE! Si falta esto, falla.

const models = initModels(sequelize);
const Curso = models.curso;
const Plataforma = models.plataforma;

class CursoService {
  
async getAllCursos(busqueda, fechaInicio, fechaFin) {
    let whereClause = {};

    // 1. Filtro por Título
    if (busqueda) {
        whereClause.titulo = { [Op.like]: `%${busqueda}%` };
    }

    // 2. Filtro por FECHA PUBLICACIÓN (Corregido)
    if (fechaInicio && fechaFin) {
        whereClause.fecha_publicacion = { [Op.between]: [fechaInicio, fechaFin] };
    } else if (fechaInicio) {
        whereClause.fecha_publicacion = { [Op.gte]: fechaInicio };
    } else if (fechaFin) {
        whereClause.fecha_publicacion = { [Op.lte]: fechaFin };
    }

    const result = await Curso.findAll({
      where: whereClause,
      include: [
        {
          model: Plataforma,
          as: "plataforma",
        },
      ],
    });
    return result;
  }
  async getCursoById(id) {
    try {
      const curso = await Curso.findByPk(id, {
        include: [
          {
            model: Plataforma,
            as: "plataforma",
          },
        ],
      });
      return curso;
    } catch (error) {
      throw error;
    }
  }

  async createCurso(curso) {
    const result = await Curso.create(curso);
    return result;
  }

  async deleteCurso(id_curso) {
    const numFilas = await Curso.destroy({
      where: { id_curso: id_curso },
    });
    return numFilas;
  }

  async updateCurso(curso) {
    let numFilas = await Curso.update(curso, {
      where: { id_curso: curso.id_curso },
    });

    if (numFilas == 0) {
        const existe = await Curso.findByPk(curso.id_curso);
        if (existe) {
            numFilas = 1;
        }
    }
    return numFilas;
  }
}

module.exports = new CursoService();