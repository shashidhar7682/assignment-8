const errHandlingMiddleware=(err,req,res,next)=>{
    res.send({message:({message:err.message})})
};
module.exports=errHandlingMiddleware