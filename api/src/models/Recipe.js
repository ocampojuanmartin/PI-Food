const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id: {
      type: DataTypes.UUID, // hace una clave para que no coincidan los nombres
      allowNull: false,
      unique: true,
      primaryKey: true, // le indico que el ID es la primary key
      defaultValue: DataTypes.UUIDV4 // es el formato que lo genera
    },
    summary: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    score: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    healthScore: {
      type: DataTypes.STRING,
      allowNull: true
    },
    steps: {
      type: DataTypes.STRING,
      allowNull: true
    },
    img: {
      type: DataTypes.STRING,
      defaultValue: 'https://i.blogs.es/87930e/comidas-ricas/840_560.jpg'
    }
  },
  {
    timestamps: false,
    createdAt: false,
    updatedAt: false 
  });
};
