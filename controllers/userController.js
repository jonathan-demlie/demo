require('dotenv').config();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Profile = require('../models/Profile');
const Education = require('../models/Education');
const About = require('../models/About');

const register = async (req, res) => {
    const { firstName,lastName,email, password, role } = req.body;
    if (!(firstName||lastName || email || password)) {
        res.status(400).json({ message: "Fields can't be empty!" });
    }
    try {
        const result = await User.findOne({ 
            where:{
                email: email
            }
        })
        if (result) {
            res.status(400).json({
                message: 'User already exists!',
            });
        } else {
            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(password, salt);
            const user = await User.create({
                firstName,
                lastName,
                email,
                password: hash,
                role,
            });

            if (user) {
                jwt.sign({
                    id: user.id,
                }, process.env.TOKEN_KEY, function (err, token) {
                    res.status(201).json({
                        data:user,
                        token,
                    });
                }
                )
            } else {
                res.status(500).json({
                    message: 'Something went wrong!',
                });
            }
        }

    } catch (err) {
        res.status(500).json({
            message: "Internal server problem!",
            error: err,
        })
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!(email && password)) {
        res.status(400).json({
            message: "All fields are required!",
        })
    }

    try {
        const result = await User.findOne({
            where:{
                email: email,
            }
        });
        if (!result) {
            res.status(401).json({
                message: "Invalid Credentials!",
            })
        } else {
            bcrypt.compare(password, result.password, function (err, data) {
                if (err) {
                    res.status(500).json({
                        message: "Something went wrong!",
                    });
                } else if (data) {
                    const token = jwt.sign({
                        id: result.id,
                    },
                        process.env.TOKEN_KEY, function (err, token) {
                            res.status(200).json({
                                data:result,
                                token: token,
                            });
                        });
                } else {
                    res.status(401).json({
                        message: 'Invalid password!',
                    })
                }
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Internal server problem",
            error: error,
        })
    }
}
const fetchAll=async(req,res)=>{
    try {
        const users=await User.findAll({
            include:Profile
        })
        if(users){
            res.status(200).json({
                data:users,
                message:"users fetched successfully!"
            })
        }else{
            res.status(500).json({
                message:"Internal server problem!"
            })
        }
    } catch (error) {
        res.status(500).json({
            message:"something went wrong!"
        })
    }
}

const fetchTutor=async(req,res)=>{
    try {
        const users=await User.findAll({
            where:{
                role:"tutor"
            },
            include:Profile
        })
        if(users){
            res.status(200).json({
                data:users,
                message:"users fetched successfully!"
            })
        }else{
            res.status(500).json({
                message:"Internal server problem!"
            })
        }
    } catch (error) {
        res.status(500).json({
            message:"something went wrong!"
        })
    }
}

const show=async(req,res)=>{
    const id=req.params.id
    try {
        const user=await User.findOne({
            where:{
                id
            },
            include:[{model:Profile},{model:Education},{model:About}]
        })
        if(user){
            res.status(200).json({
                data:user,
                message:"user fetched successfully!"
            })
        }else{
            res.status(500).json({
                message:"Internal server problem!"
            })
        }
    } catch (error) {
        res.status(500).json({
            message:"something went wrong!"
        })
    }
}

const homeTutor=async(req,res)=>{
    try {
        const users=await User.findAll({
            where:{
                role:"tutor"
            },
            include:Profile,
            limit: 5,
        },
        )
        if(users){
            res.status(200).json({
                data:users,
                message:"users fetched successfully!"
            })
        }else{
            res.status(500).json({
                message:"Internal server problem!"
            })
        }
    } catch (error) {
        res.status(500).json({
            message:"something went wrong!"
        })
    }
}

module.exports = {
    register,
    login,
    fetchAll,
    fetchTutor,
    homeTutor,
    show,
}