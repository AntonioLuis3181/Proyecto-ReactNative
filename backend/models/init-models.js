var DataTypes = require("sequelize").DataTypes;
var _plataforma = require("./plataforma");
var _curso = require("./curso");

function initModels(sequelize) {
  var plataforma = _plataforma(sequelize, DataTypes);
  var curso = _curso(sequelize, DataTypes);

  curso.belongsTo(plataforma, { as: "plataforma", foreignKey: "id_plataforma"});
  plataforma.hasMany(curso, { as: "cursos", foreignKey: "id_plataforma"});

  return {
    plataforma,
    curso,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
