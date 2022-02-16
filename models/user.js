'use strict'
const {DataTypes}=require("sequelize");
module.exports=(sequelize,DataTypes)=>
{
  const Users=sequelize.define('Users',
  {
    username:DataTypes.STRING,
    email:DataTypes.STRING,
    password:DataTypes.STRING,
    type:DataTypes.STRING
  },{
    timestamps:false
  });
  Users.associate=function(models)
  {
    
  }
  return Users;
}





















// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class User extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   User.init({
//     username: DataTypes.STRING,
//     email: DataTypes.STRING,
//     password: DataTypes.STRING
//   },{timestamps:false}, {
//     sequelize,
//     modelName: 'User',
//   });
//   return User;
// };