const JWT=require("jsonwebtoken");
const jwtConfig=require("./jwt-config");
const UserModel=require("../models").Users;

let validateToken=(req,res,next)=>
{
    //console.log("tire");
    //console.log(req.headers);
    let tokenValue=req.headers["authorization"];
    if(tokenValue)
    {
        JWT.verify(tokenValue,jwtConfig.secret,(err,data)=>{
            if(err)
            {
                return res.json({status:0,
                message:"Timeout",
                err:err
            });
            }
            else
    {
        req.data=data;
//databaseverification
console.log(data.username,data.password);
UserModel.findOne({ where: { username: data.username ,password:data.password} }).then((data)=>{
    if(data)
    {
        //console.log(data,req);
        next();
    }
    else
        {   
            res.status(500).json({
                status:0,
                message:"Not in DB"
            });
        } 
});
        //dbms
        //console.log(data,req);
        //next();
    }
        });
    }
    else
    {
        return res.json({
            message:"No token",
        })
    }
}
module.exports=
{
    checkToken:validateToken
}