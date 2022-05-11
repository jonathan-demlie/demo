"user strict";

const express = require("express");
const dotenv = require('dotenv');
const cors = require('cors')
dotenv.config()
const app = express()
const PORT = process.env.PORT
const db = require('./config/db')
const User=require("./models/User");

const userRoutes = require('./routes/userRoutes')
const subjectRoutes = require('./routes/subjectRoutes')
const profileRoutes = require('./routes/profileRoutes')
const educationRoutes = require('./routes/educationRoutes')
const reportRoutes = require('./routes/reportRoutes')
const reviewRoutes=require('./routes/reviewRoutes')
const aboutRoutes=require('./routes/aboutRoutes')
const chatRoutes = require('./routes/chatRoutes');
//
var open = require("open")
, server = require('http').createServer(app)
, io = require("socket.io")(server)
var jwt    = require('jsonwebtoken');
var appSeckertKey = require('./config/appConfig').secret;

app.use(    express.urlencoded({extended: true,}));
//
app.use(express.json());
app.use('/images', express.static('images'));
app.use(cors())
app.use('/api', userRoutes)
app.use('/api', subjectRoutes)
app.use('/api', profileRoutes)
app.use('/api', educationRoutes)
app.use('/api', reportRoutes)
app.use('/api',reviewRoutes)
app.use('/api',aboutRoutes)
//chat route
 app.use('/api',chatRoutes);

 app.get('/chat', (req, res) => { res.render('chat'); });


db.sync().then(result => {
    if (result) {
        app.listen(PORT || 5000, () => {
            console.log('app started at port:', PORT);
        });
    } else {
        console.log("Database not connected!")
    }
}).catch(error => {
    console.log(error);
});


io.use((socket, next) => {
    let token = socket.handshake.query.token;
    jwt.verify(token, appSeckertKey, (err, decoded) => {
        if (err) {
            console.log(err);
            return next(new Error('authentication error'));
        }

        socket.decodedtoken = decoded;
        return next();
    });
});
io.of('/messages').on('connection', function(socket) {
    console.log('a user connected');
    console.log(socket.id);

    jwt.verify(socket.handshake.query.token, appSeckertKey, (err, decoded) => {
        let decodedToken = decoded;

        User.update({'isActive': 1, 'socketID': socket.id}, {where: {'id': decodedToken.id}})
            .then(user => {
                console.log('user is online');
                socket.broadcast.emit('online User', decodedToken.id);
            });

        socket.on('disconnect', function (data) {
            model.user.update({'isActive': 0, 'socketID': null}, {where: {'id': decodedToken.id}}).then(user => {
                console.log('user is offline');
                socket.broadcast.emit('disconnected User', decodedToken.id);
            });
            console.log('user disconnected');
            socket.emit('disconnected');
        });

        socket.on('message', function (msg) {
            console.log('new message');
            User.findOne({where: {'id': decodedToken.id}}).then(user => {
                socket.to(msg.conversation_id).emit('new message',
                    {
                        message_body: msg.message_body, user: {avatarPath: user.avatarPath, firstName: user.firstName},
                        created_at: msg.created_at
                });
                socket.emit(msg.conversation_id,message);
            });

            User.findOne({where: {'id': msg.receiver_id}}).then(user => {
                socket.to(user.socketID).emit('notify', {
                    message_body: msg.message_body, sender_id: decodedToken.id,
                    created_at: msg.created_at
                });
            });
        });


        socket.on('join room', function (roomname) {
            socket.join(roomname);
        });


    });
});
