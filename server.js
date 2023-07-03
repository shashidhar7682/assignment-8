//create express app
const exp=require("express")

const app=exp() 

require('dotenv').config()

//assign port number
const port=process.env.PORT || 5000 //if some web providers environment like heroku assign their own port number or else it will choose 5000

app.use(exp.json())

//assign port number
app.listen(port,()=>console.log("Listening on port 5000..."))

const path=require("path");

//for validating CORS policy
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//connect react build
app.use(exp.static(path.join(__dirname,'./build')))

//import user app
const userApp=require("./APIs/userAPI")

//connect user api
app.use("/user-api",userApp)

//error handling midleware
const errHandlingMiddleware=require("./APIs/middlewares/errorHandlingMiddleware")

app.use(errHandlingMiddleware);

//page refresh
app.use('/*',(req,res,next)=>{
    res.sendFile(path.join(__dirname,'./build/index.html'),err=>{
        if(err){
            next(err)
        }
    })
})

//page refresh middleware
// const pageRefresh=require('./APIs/middlewares/pageRefresh')

// app.use("/*",pageRefresh)

//invalid path middleware
const invalidPathMiddleware=require("./APIs/middlewares/invalidPathMiddleware")

app.use("*",invalidPathMiddleware)

//connect to mongoclient
const mclient=require('mongodb').MongoClient

mclient.connect('mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.8.0')
.then((dbRef)=>{
    const dbObj=dbRef.db("test")
    const userCollectionObj=dbObj.collection("userCollection")
    app.set("userCollectionObj",userCollectionObj)
    console.log("Connection to Test DB - Success")
})
.catch((err)=>console.log("Connection to Test DB - Failed"))

