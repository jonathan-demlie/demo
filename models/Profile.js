const {Sequelize,DataTypes}=require('sequelize');
const sequelize=require('../config/db')

const Profile=sequelize.define("profile",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false,
    },
    headline:{
        type:DataTypes.STRING,
        allowNull:true,
    },
    phone:{
        type:DataTypes.STRING,
        allowNull:true,
    },
    price:{
        type:DataTypes.DOUBLE,
        allowNull:false,
    },
    address:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    img:{
        type:DataTypes.STRING,
        allowNull:true,
    },
},
{
    timestamps:true,
}
)

module.exports = Profile

