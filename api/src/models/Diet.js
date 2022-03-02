const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('diet', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id: {
      type: DataTypes.UUID, // hace una clave para que no coincidan los nombres
      allowNull: false,
      unique: true,
      primaryKey: true, // le indico que el ID es la primary key
      defaultValue: DataTypes.UUIDV4 // es el formato que lo genera
    }
  },
  {
    timestamps: false,
    createdAt: false,
    updatedAt: false 
  });
};
