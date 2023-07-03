const jwt=require("jsonwebtoken")
require('dotenv').config()
const verifyToken=(req,res,next)=>{
    //get bearer(authentication key) token from req headers
    const bearerToken=req.headers.authorization
    //if bearer token not found
    if(bearerToken===undefined){
        res.send({message:"Unauthorized access...Please login first"})
    }
    //if bearer token is found
    else{
        //get token from bearer token
        const token=bearerToken.split(" ")[1]
        //verify token
        try{
            jwt.verify(token,process.env.SECRET_KEY)
            //calling next middleware
            next()
        }
        catch(err){
            //forward err to err handling middleware
            next(new Error("Session expired, Please re-login to continue"))
        }
    }
}
module.exports=verifyToken;