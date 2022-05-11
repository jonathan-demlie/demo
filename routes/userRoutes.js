const express=require('express')
const router=express.Router()
const {register,login,fetchTutor,fetchAll,homeTutor,show}=require('../controllers/userController')

router.post('/register',register)
router.post('/login',login)
router.get('/users',fetchAll)
router.get('/tutors',fetchTutor)
router.get('/home-tutors',homeTutor)
router.get('/user/:id',show)

module.exports=router