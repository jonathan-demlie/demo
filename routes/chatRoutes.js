"user strict";
const express = require('express');
const router = express.Router();
const jwt    = require('jsonwebtoken');
const appSeckertKey = require('../config/appConfig').secret;
const {protect} =require('../middleware/auth')
const {getChat, 
    useToken, 
    fetchAll,
    create,
    findById
}=require('../controllers/messageController');

router.route('/tutor/chats').get( getChat);
router.use(useToken);
router.route('/tutor/contacts').post( fetchAll);
router.route('/tutor/messages', create).post(create);
router.route('/tutor/chat/:id').post(findById);

module.exports = router;