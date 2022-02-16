const express=require("express");
const UserModel=require("../models").Users;
const RestModel=require("../models").Restuarants;
const jwtConfig=require("../config/jwt-config");
const jwtMiddleware=require("../config/jwt-middleware");
const formidableMiddleware = require('express-formidable');
const router=express.Router();
router.use(formidableMiddleware());

router.get("/admin",jwtMiddleware.checkToken,(req,res)=>
{  
            res.status(200).json({
                status:1,
                message:"its admin",
            })
        
})
router.get("/admin/users",jwtMiddleware.checkToken,(req,res)=>
{   let username="admin";
    let password="admin";
    UserModel.findOne({ where: { username: username ,password:password} }).then((data)=>{
        if(data)
        {
            UserModel.findAll().then((data=>{res.json(data)}));
            // res.status(200).json({
            //     status:1,
            //     message:"its admin",
            //     data:data,
            // })
        }else
        {
            res.status(500).json({
                status:0,
                message:"No Users"
            })
        }});
})
router.post("/admin/users",jwtMiddleware.checkToken,(req,res)=>
{       console.log(req.fields);
                  
    UserModel.create({
        username: req.fields.data.username,
        password: req.fields.data.password,
        email: req.fields.data.email,
        type:req.fields.data.type,
    }).then((data)=>{
        res.send(data);
    });
        
});
router.get("/admin/users:id",(req,res)=>
{  
    UserModel.findOne({ where: {id:req.params.id}}).then((data)=>{
        if(data)
        {
            res.json({data:data});
            // UserModel.findAll().then((data=>{res.json(data)}));
            // res.status(200).json({
            //     status:1,
            //     message:"its admin",
            //     data:data,
            // })
        }});
})
router.delete("/admin/users:id",(req,res)=>
{   
                   console.log(req.fields);
                    UserModel.destroy({where:
                    {id:req.params.id}
                }).then(res.send("User deleted"));
                }
        
)
router.put("/admin/users:id",(req,res)=>{
  console.log(req.fields)
                 UserModel.update({username: req.fields.data.username,
                    password: req.fields.data.password,
                    email: req.fields.data.email,
                    type:req.fields.data.type, },
                 { where: { id: req.params.id } }
                 ).then((data)=>
                 {
                     console.log(data);
                     res.send(data);
                 }); 
});
module.exports=router;