const express =require("express")
const router =express.Router()
const {create,fetchAll,show,update,remove} =require('../controllers/reportController')

router.route('/report').post(create)
router.route('/report/:id').get(show).get(fetchAll).put(update).delete(remove)

module.exports=router