'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Load extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
          Load.belongsTo(models.Area, {
            foreignKey: 'areaId',
            as: 'Area'
          }); 
     
    }
  }
  Load.init({
    name: DataTypes.STRING,
    areaId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Load',
  });
  return Load;
};