const express=require("express");
const UserModel=require("../models").Users;
const RateModel=require("../models").Rrating;
const RestModel=require("../models").Restuarants;
const Sequelize = require('sequelize');
const router=express.Router();
const jwtConfig=require("../config/jwt-config");
const jwtMiddleware=require("../config/jwt-middleware");
const formidableMiddleware = require('express-formidable');
// const jwtMiddleware = require("../config/jwt-middleware");
router.use(formidableMiddleware());
// router.post("/rating",(req,res)=>
// {
//     let username="admin";
//     let password="admin";
//     UserModel.findOne({ where: { username: username ,password:password} }).then((data)=>{
//        if(data)
//        {
//                 RateModel.create({  Restuarant_Id: req.fields.restuarant,
//                     User_Id: req.fields.ids,
//                     Rated: req.fields.Rated,
//                     DOV:new Date(),
//                     Comment:req.fields.Comment,}).then(()=>
//                 {
//                     res.send("Restuarant Rating Added");
//                 }); 
//        }      
//     });
// });
router.delete("/admin/rating:id",jwtMiddleware.checkToken,(req,res)=>{
   console.log("called");
                 RateModel.destroy({where:{id:req.params.id}
                 }).then((status)=>
                 {
                     res.json(status);
                 }); 
      
});
router.put("/admin/rating:id",jwtMiddleware.checkToken,(req,res)=>{
    
                 RateModel.update({  Restuarant_Id: req.fields.data.restuarant,
                    User_Id: req.fields.data.ids,
                    Rated: req.fields.data.Rated,
                    Comment:req.fields.data.Comment,},
                 { where: { id: req.params.id } }
                 ).then(()=>
                 {
                     res.send("Restuarant Rating Updated");
                 }); 
      
});
router.get("/admin/rating",jwtMiddleware.checkToken,(req,res)=>{
    RateModel.findAll().then((data)=>
    {
        
        res.status(200).send(data
        )        
    }); 
});
router.get("/admin/rating:id",jwtMiddleware.checkToken,(req,res)=>{
    console.log(req);
    RateModel.findAll({where:
                        {
                            id:req.params.id,
                        }}).then((rates)=>
                {console.log(rates);
                    RestModel.findAll().then((rests)=>
                    {console.log(rests);
                        UserModel.findAll().then((users)=>
                        {
                            res.json({rates:rates,rests:rests,users:users});   

                        });
                    });
                }).catch((err)=>{console.log(err)});
            });
router.post("/admin/rating",jwtMiddleware.checkToken,(req,res)=>{
    console.log(req.data.username);
    UserModel.findOne({where:{username:req.data.username}}).then((data)=>{

        console.log(data.id);
            RateModel.create({  Restuarant_Id: req.fields.data.restuarant,
                    User_Id: data.id,
                    Rated: req.fields.data.Rated,
                    DOV:new Date(),
                    Comment:req.fields.data.Comment,}
                 ).then(()=>
                 {
                     res.send("Restuarant Rating Added");
                 }); 
      
     });
    });

module.exports=router;
