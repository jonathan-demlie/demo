const express =require("express")
const router =express.Router()
const {create,fetchAll,update,remove} =require('../controllers/subjectController')

router.route('/subject').get(fetchAll).post(create)
router.route('/subject/:id').put(update).delete(remove)

module.exports=router