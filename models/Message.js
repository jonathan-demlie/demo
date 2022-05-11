"use strict";
const {Sequelize,DataTypes}=require('sequelize');
const sequelize=require('../config/db');
const User=require('./User');

  const  Message = sequelize.define("message", {
    id: {
        type: DataTypes.INTEGER.UNSIGNED ,
        primaryKey: true ,
        autoIncrement: true
    },
    message_subject : {
        type:DataTypes.STRING
    },
    message_body :{
        type: DataTypes.TEXT,
        allowNull:false
    } ,
    sender_id : {
        type: DataTypes.INTEGER.UNSIGNED ,
        allowNull: false,
        
        // references: {
        //     model: "users",
        //     key: "id"
        // }
    },
    receiver_id :{
        type: DataTypes.INTEGER.UNSIGNED ,
        allowNull: false,
        
        // references: {
        //     model: "users",
        //     key: "id"
        // }
    },
    conversation_id : {
        type:DataTypes.STRING,
        allowNull : false
    } ,
    created_at : {
        type: 'TIMESTAMP' ,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    updated_at :{
        type: 'TIMESTAMP' ,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    
    viewed :{
    type: DataTypes.BOOLEAN
  },
},
  {
    timestamps: false,
    freezeTableName:true,
    tableName: 'message'
  }
  )


 
  
module.exports = Message



 // Message.belongsTo(User, {
  //   foreignKey:'sender_id',
  //   targetKey:'id',
  //   as:'user',
  // })
