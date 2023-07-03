const exp=require("express")
const userApp=exp.Router()
require('dotenv').config()
const expressAsyncHandler=require("express-async-handler")
const verifyToken=require("./middlewares/verifyToken")
const multerObj=require("./middlewares/cloudinaryConfig");
const jwt=require("jsonwebtoken")
let bcryptjs=require("bcryptjs")
//create user
userApp.post("/user-signup",multerObj.single("photo"),expressAsyncHandler(async(req,res)=>{
    //get user collection object
    const userCollectionObj=req.app.get("userCollectionObj")
    //get new user from request
    const newUser=JSON.parse(req.body.user);
    //check for duplicate user by username
    let userOfDB=await userCollectionObj.findOne({username:newUser.username})
    //if user already exist, send response to client "User already existed"
    if(userOfDB!==null){
        res.status(200).send({message:"User Already Existed"})
    }
    //if user not existed
    else{
        //add CDN link of cloudinary image to new user obj
        newUser.image=req.file.path;
        //hash the password
        let hashedPassword=await bcryptjs.hash(newUser.password,5)
        //replace plain password 
        newUser.password=hashedPassword
        //insert user
        await userCollectionObj.insertOne(newUser)
        //send res
        res.status(201).send({message:"User Created"})
    }
}))
//get user-deatils by username (for Account page)
userApp.get('/get-user/:username',verifyToken,expressAsyncHandler(async(req,res)=>{
    //get user collection object
    const userCollectionObj=req.app.get("userCollectionObj")
    //get username from URL
    let usernameFromUrl=req.params.username
    //find the user by username
    const userOfDB=await userCollectionObj.findOne({username:usernameFromUrl})
    //if user not found
    if(userOfDB===null){
        res.status(200).send({message:"User not found"})
    }
    //if user found
    else{
        //remove password from userOfDB
        delete userOfDB.password
        res.status(200).send({message:"User",payload:userOfDB})
    }
}))
//User Login
userApp.post('/user-login',expressAsyncHandler(async(req,res)=>{
    //get user collection object
    const userCollectionObj=req.app.get("userCollectionObj")
    //get user credentials
    const userCredObj=req.body
    //verify username
    let userOfDB=await userCollectionObj.findOne({username:userCredObj.username})
    //if username is invalid
    if(userOfDB===null){
        res.status(200).send({message:"Invalid Username"})
    }
    //if username is valid
    else{
        //hash password and compare with password in DB to verify password
        let isEqual=await bcryptjs.compare(userCredObj.password,userOfDB.password)
        //if passwords are not matched
        if(isEqual===false){
            res.status(200).send({message:"Invalid Password"})
        }
        //if password matched
        else{
            let jwtToken=jwt.sign({username:userOfDB.username},process.env.SECRET_KEY,{expiresIn:"10m"})
            //delete password from user of db
            delete userOfDB.password
            //send token in response
            res.status(200).send({message:"success",token:jwtToken,user:userOfDB})
        }
    }
}))
//get all users-list
userApp.get('/get-users',verifyToken,expressAsyncHandler(async(req,res)=>{
    //get user collection object
    const userCollectionObj=req.app.get("userCollectionObj")
    //get users from db
    await userCollectionObj.find().toArray()
    .then((userList)=>{
        res.status(200).send({message:"UserList",payload:userList})
    })
    .catch((err)=>{
        console.log("Error in Retriving UserList",err)
        res.send({message:"Error",errMessage:err.message})
    })
}))
//update user credentials
userApp.put('/update-user',verifyToken,expressAsyncHandler(async(req,res)=>{
    //get user collection object
    const userCollectionObj=req.app.get("userCollectionObj")
    //get modified user from client
    let modifiedUser=req.body
    let oldusername=modifiedUser.username;
    //if username update required
    if(typeof(modifiedUser.newusername)!='undefined'){
        modifiedUser.username=modifiedUser.newusername
        await delete modifiedUser.newusername
        console.log(modifiedUser)
    }    
    //get user from db
    let userOfDB=await userCollectionObj.findOne({username:oldusername})
    //if username is invalid
    if(userOfDB===null){
        res.status(200).send({message:"Invalid Username"})
    }
    //if username is valid
    else{
        //hash the password
        if(typeof(modifiedUser.password)!='undefined'){
            let hashedPassword=await bcryptjs.hash(modifiedUser.password,5)
            //replace plain password 
            modifiedUser.password=hashedPassword;
        }
        //insert user
        await userCollectionObj.updateOne({username:oldusername},{$set:modifiedUser})
        //send res
        res.status(200).send({message:"User Modified"})
    }
}))
module.exports=userApp;