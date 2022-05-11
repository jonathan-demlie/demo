const {Sequelize,DataTypes}=require('sequelize');
const sequelize=require('../config/db');
const About = require('./About');
const Profile = require('./Profile');
const Report = require('./Report');
const Education =require('./Education');
const Review = require('./Review');
const User=sequelize.define("user",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false,
    },
    firstName:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    lastName:{
        type:DataTypes.STRING,
        allowNull:false,
    },

    role:{
        type:DataTypes.STRING,
        allowNull:false,
        defaultValue:'student',
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true,
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
    },
},
{
    timestamps:true,
}
)
User.hasMany(Report, {
    foreignKey: 'studentId'
})
User.hasMany(Report, {
    foreignKey: 'tutorId'
})
User.hasOne(Review, {
    foreignKey: 'studentId'
})
User.hasMany(Review, {
    foreignKey: 'tutorId'
})
User.hasOne(About)
User.hasOne(Profile)
User.hasOne(Education)
module.exports = User