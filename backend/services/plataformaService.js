const initModels = require("../models/init-models.js").initModels;
const sequelize = require("../config/sequelize.js");
const { Op } = require("sequelize"); // <--- VITAL: Importar operadores

const models = initModels(sequelize);
const Plataforma = models.plataforma;

class PlataformaService {
  
  // Ahora aceptamos busqueda (texto), fechaInicio y fechaFin
  async getAllPlataformas(busqueda, fechaInicio, fechaFin) {
    
    let whereClause = {};

    // 1. Filtro por Nombre (si hay texto)
    if (busqueda) {
        whereClause.nombre = { [Op.like]: `%${busqueda}%` };
    }

    // 2. Filtro por Fechas (si hay fechas)
    if (fechaInicio && fechaFin) {
        // Busca ENTRE las dos fechas
        whereClause.fecha_alta = { [Op.between]: [fechaInicio, fechaFin] };
    } else if (fechaInicio) {
        // Solo desde una fecha en adelante
        whereClause.fecha_alta = { [Op.gte]: fechaInicio };
    } else if (fechaFin) {
        // Solo hasta una fecha
        whereClause.fecha_alta = { [Op.lte]: fechaFin };
    }

    const result = await Plataforma.findAll({
      where: whereClause,
    });
    return result;
  }

  // ... El resto de métodos (getById, create, update, delete) se quedan IGUAL ...
  // (Copia aquí tus funciones createPlataforma, updatePlataforma, etc. que ya tenías)
  
  async createPlataforma(plataforma) {
      return await Plataforma.create(plataforma);
  }
  
  async getPlataformaById(id) {
      return await Plataforma.findByPk(id);
  }

  async deletePlataforma(id) {
      return await Plataforma.destroy({ where: { id_plataforma: id } });
  }

  async updatePlataforma(plataforma) {
      return await Plataforma.update(plataforma, { where: { id_plataforma: plataforma.id_plataforma } });
  }
}

module.exports = new PlataformaService();