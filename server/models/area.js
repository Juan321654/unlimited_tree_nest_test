'use strict';
const {
     Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
     class Area extends Model {
          /**
           * Helper method for defining associations.
           * This method is not a part of Sequelize lifecycle.
           * The `models/index` file will call this method automatically.
           */
          static associate(models) {
               // define association here
               Area.belongsTo(models.Floor, {
                    foreignKey: 'floorId',
                    as: 'Floor'
               });

               Area.hasMany(this, {
                    as: 'Subareas',
                    foreignKey: 'areaId'
               });

               Area.hasMany(models.Load, {
                    foreignKey: 'areaId',
                    as: 'Loads_Simple',
               })
          }
     }
     Area.init({
          name: DataTypes.STRING,
          floorId: {
               type: DataTypes.INTEGER,
               allowNull: false,
               references: {
                    model: 'Floors',
                    key: 'id'
               }
          },
          areaId: {
               type: DataTypes.INTEGER,
               allowNull: true,  // Allows top-level areas without parents
               references: {
                    model: 'Areas', // This is the name of the table that will store the areas
                    key: 'id'
               }
          }
     }, {
          sequelize,
          modelName: 'Area',
     });
     return Area;
};