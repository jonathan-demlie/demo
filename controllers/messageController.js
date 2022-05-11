const Message = require('../models/Message');
const Users=require('../models/User');
var jwt    = require('jsonwebtoken');
var appSeckertKey = require('../config/appConfig').secret;

const getChat= async(req, res)=>{
    try {
        const chats = await Message.list();
        res.json(chats);
       } 
            catch(err){
            return res.status(403).json({
                message:"chat is not rendered"
            })
            }}
const useToken = async (req, res, next) => {
    var token = await req.body.token || req.query.token || req.headers['x-access-token'];
            if (!token)
                return res.status(403).json({ success: false, message: 'No token provided.' });
            jwt.verify(token, appSeckertKey, (err, decoded) => {
                if (err) {
                    return res.status(403).json({ 
                        success: false, message: 'Failed to authenticate token.' });
                } else {
                    // if everything is good, save to request for use in other routes
                    req.decoded = decoded;
                    next();
                }
            });
}
const fetchAll = async (req, res) => {
    try {
        const result = await Users.findAll({
            where: { 'id': { $ne: req.decoded.id } },
            include: [{
                model: Message, 
                // model:model.message
                as: 'userMessages',
                order: [['id', 'DESC']],
                limit: 1
            }],
            order: [['id', 'DESC'],]
        });
        if (result) {
            res.status(201).json({
                data: result,
                message: "done",
            });
        }
        else {
            res.status(500).json({
                message: "message not  avialable",
            })
        }
    }
    catch (err) {
        res.status(500).json({
            message: "internal serverl error",
            error: err,
        });
    }
}
const create=(req, res)=>{

    const message = {'message_subject':'private Message', 'message_body':req.body.message_body,
    'sender_id': req.decoded.id, 'receiver_id':req.body.receiver_id, 'conversation_id': req.body.conversation_id,
    'delivered': 0};
 Message.create(message)
    .then(userMessages => {
        Users.findOne({where: { 'id': req.decoded.id }}).then( user => {
            message['user']= {avatarPath: user.avatarPath, firstName: user.firstName};
            message['created_at']= userMessages.created_at;
            return  res.status(200).json(message  );
        });
    }).catch(error => res.status(400).json(error));
}
const findById=(req, res)=>{
    return Message.findAll({
        where:{
            $or:[
                {'sender_id': req.params.id, 'receiver_id': req.decoded.id},
                {'sender_id': req.decoded.id, 'receiver_id': req.params.id},
            ]
        }, include: [{
            model:Users,
                as :'user'
        }]
    }).then(userMessages =>  res.status(200).json( userMessages))
      .catch(error => res.status(400).json(error))
}

module.exports = {
    getChat,
    useToken,
    fetchAll,
    create,
    findById

}


