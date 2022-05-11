const Review=require('../models/Review')

const create = async (req, res) => {
    const {rate,content,tutorId,studentId} =req.body
    if(!content){
        res.status(409).json({
            message:"All fields are required!"
        })
    }
    try {
        const result = await Review.create({
            studentId,
            tutorId,
            rate, 
            content,
        });
        if (result) {
            res.status(201).json({
                data:result,
                message: 'Review submited successfully!',
            });
        } else {
          res.status(500).json({
              message:"Something went wrong!"
          })
        }

    } catch (err) {
        res.status(500).json({
            message: "Internal server problem!",
            error: err,
        })
    }
};

const fetchAll=async(req,res)=>{
    const tutorId=req.params.id
    try {
        const result=await Review.findAll({
            where:{
                tutorId:tutorId
            }
        })
        if(result){
            res.status(200).json({
                data:result,
                message:"Review fetched successfully!"
            })
        }else{
            res.status(500).json({
                message:"No user with this tutor id"
            })
        }
    } catch (error) {
        res.status(500).json({
            message:"Internal server problem",
            error
        })
    }
}

const show=async(req,res)=>{
    const id=req.params.id
    try {
        const result=await Review.findOne({
            where:{
                id
            }
        })
        if(result){
            res.status(200).json({
                data:result,
                message:"Review fetched successfully!"
            })
        }else{
            res.status(500).json({
                message:"No review with this id"
            })
        }
    } catch (error) {
        res.status(500).json({
            message:"Internal server problem",
            error
        })
    }
}

const update=async(req,res)=>{
    const id=req.params.id
    try {
        const result=await Review.update(req.body,{
            where:{
                id
            }
        })

        if(result){
            res.status(200).json({
                message:"Review updated successfully!"
            })
        }else{
            res.status(500).json({
                message:"Review not updated!"
            })
        }
    } catch (error) {
        res.status(500).json({
            error,
            message:"Inernal server problem"
        })
    }
}

const remove=async(req,res)=>{
    const id=req.params.id
    try {
        const result=await Review.destroy({
            where:{
                id
            }
        })
        if(result){
            res.status(200).json({
                message:"Review deleted successfully!",
            })
        }else{
            res.status(400).json({
                message:"No report with this id",
            })
        }
    } catch (error) {
        res.status(500).json({
            message:"Internal server problem",
            error
        })
    }
}
module.exports = {
    create,
    fetchAll,
    show,
    update,
    remove
}