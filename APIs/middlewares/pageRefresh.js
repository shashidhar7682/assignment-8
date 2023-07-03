const path=require("path");

const pageRefresh=(req,res,next)=>{
    res.sendFile(path.join(__dirname,'../../build/index.html'))
}

module.exports=pageRefresh;