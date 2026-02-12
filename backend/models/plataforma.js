const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('plataformas', {
    id_plataforma: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    url_web: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    es_gratuita:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    fecha_alta: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAM")
    }
  }, {
    sequelize,
    tableName: 'plataformas',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_plataforma" },
        ]
      },
    ]
  });
};
