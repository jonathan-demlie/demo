const express=require('express')
const router=express.Router();
const {create,update,show,uploadProfile} =require('../controllers/profileController')
const {protect}=require('../middleware/auth')
const uploadImage=require('../middleware/image');

router.route('/profile').post(protect,create)
router.route('/profile/:id').get(protect,show).put(protect,update)
router.route('/profile-image/:id').put(uploadImage,uploadProfile)
module.exports=router