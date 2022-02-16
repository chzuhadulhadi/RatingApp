'use strict';

const {
  Model
} = require('sequelize');
//const { users } = require('./user');
//const { restuarants } = require('./restuarants');

module.exports = (sequelize, DataTypes) => {
  class Rrating extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //Users.belongsTo(Rrating);
      //Rrating.belongsTo(Model.users);
      //Rrating.belongsTo(restuarants);
      //Rrating.belongsTo(Model.restuarants);

    //  Rrating.belongsTo(models.restuarants,{Restuarant_Id:'id'});
    
    }
  }
  Rrating.init({
    Restuarant_Id: DataTypes.INTEGER,
    User_Id: DataTypes.INTEGER,
    Rated: DataTypes.FLOAT,
    DOV: DataTypes.DATEONLY,
    Comment: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Rrating',
    timestamps:false,
  });
 
  return Rrating;
};