const express=require("express");
const jwt=require("jsonwebtoken");
const jwtConfig=require("../config/jwt-config");
const jwtMiddleware=require("../config/jwt-middleware");
const UserModel=require("../models").Users;
const router=express.Router();
const formidableMiddleware = require('express-formidable');
router.use(formidableMiddleware());

router.post("/createaccount",(req,res)=>
{  let username=req.fields.data.username;
    let password=req.fields.data.password;
     let email=req.fields.data.email;
        let type="standard";
        console.log(username,password);

    UserModel.findOne({ where: {username: username} }).then((data)=>{
        if(data)
           {
               res.json({message:"username already regisered"});
           }
        else
        {
            console.log(req.fields.data);
            UserModel.create({
            username: username,
            password: password,
            email: email,
            type:type,
        }).then(res.json({message:"Account created"}));
   
        }        
        
    });
});
router.post("/login",(req,res)=>
{   console.log(req.fields.data);
   // console.log("han han pohnch gai  hy backend p request or kia chahta hy")
    let username=req.fields.data.username;
    let password=req.fields.data.password;
    //let type="standard";
    UserModel.findOne({ where: { username: username ,password:password} }).then((data)=>{
        if(data)
        {
            let token=jwt.sign({
                username:data.username,
                password:data.password,
            },jwtConfig.secret,{expiresIn:jwtConfig.expiresIn,
            notBefore:jwtConfig.notBefore,
        });
        console.log(token);
        res.status(200).json({token:token,type:data.type});

            
            
            // res.status(200).json({
            //     status:1,
            //     message:"Users found",
            //     data:data
            // })
        }else
        {   
            res.status(500).json({
                status:0,
                message:"No Users"
            })
        }});
    //console.log(usermodel instanceof UserModel);
    // UserModel.findAll().then((data)=>
    // {
    //     if(data)
    //     {
    //         res.status(200).json({
    //             status:1,
    //             message:"Users found",
    //             data:data
    //         })
    //     }else
    //     {
    //         res.status(500).json({
    //             status:0,
    //             message:"No Users"
    //         })
    //     }
    // })
})

module.exports=router;