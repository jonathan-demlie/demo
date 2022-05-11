const {Sequelize,DataTypes}=require('sequelize');
const sequelize=require('../config/db')

const Schedule=sequelize.define("schedule",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false,
    },
    userId:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    tutorId:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    date:{
        type:DataTypes.DATE,
        allowNull:false,
    },
    desc:{
        type:DataTypes.STRING,
        allowNull:false,
    },
},
{
    timestamps:true,
}
)

module.exports = Schedule