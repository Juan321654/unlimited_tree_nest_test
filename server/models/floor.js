'use strict';
const {
     Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
     class Floor extends Model {
          /**
           * Helper method for defining associations.
           * This method is not a part of Sequelize lifecycle.
           * The `models/index` file will call this method automatically.
           */
          static associate(models) {
               // define association here
               Floor.belongsTo(models.Building, {
                    foreignKey: 'buildingId',
                    as: 'Building'
               });

               Floor.hasMany(models.Area, {
                    foreignKey: 'floorId'
               });
          }
     }
     Floor.init({
          name: DataTypes.STRING,
          buildingId: {
               type: DataTypes.INTEGER,
               allowNull: false,
               references: {
                    model: 'Buildings',
                    key: 'id'
               }
          }
     }, {
          sequelize,
          modelName: 'Floor',
     });
     return Floor;
};