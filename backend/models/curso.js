const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('curso', {
    id_curso: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    titulo: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    precio: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    horas: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    fecha_publicacion:{
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    imagen_url: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    id_plataforma: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'plataformas',
        key: 'id_plataforma'
      }
    }
  }, {
    sequelize,
    tableName: 'cursos',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_curso" },
        ]
      },
      {
        name: "id_plataforma",
        using: "BTREE",
        fields: [
          { name: "id_plataforma" },
        ]
      },
    ]
  });
};
