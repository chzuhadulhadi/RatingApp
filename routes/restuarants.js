const express=require("express");
const UserModel=require("../models").Users;
const RateModel=require("../models").Rrating;
const RestModel=require("../models").Restuarants;

const Sequelize = require('sequelize');
const jwtConfig=require("../config/jwt-config");
const jwtMiddleware=require("../config/jwt-middleware");
const router=express.Router();
const formidableMiddleware = require('express-formidable');
router.use(formidableMiddleware());
router.post("/rating/:restuarant",jwtMiddleware.checkToken,(req,res)=>
{
    console.log(req);
    let username=req.data.username;
    let password=req.data.password;
    UserModel.findOne({ where: { username: username ,password:password} }).then((data)=>{
       if(data){
                  console.log(req.fields);
                    RateModel.create({
                        Restuarant_Id: req.params.restuarant,
                        User_Id: data.id,
                        Rated: req.fields.data.rating,
                        DOV:new Date(),
                        Comment:req.fields.data.comment,
                    }).then(res.send("Commented"));              
       }
    });
});
router.get("/standard/:restuarant",jwtMiddleware.checkToken,(req,res)=>
{
    //let username="local";
    //let password="local";
    
                  //console.log(req.fields);
    RestModel.findOne({where:{id:req.params.restuarant}}).then((rest_name)=>
    {
    if(rest_name)
    RateModel.findAll({where:
                        {
                            Restuarant_Id:req.params.restuarant,
                        },attributes:[[Sequelize.fn('avg',Sequelize.col('Rated')),"Average"],[Sequelize.fn('max',Sequelize.col('Rated')),"MAX"],[Sequelize.fn('min',Sequelize.col('Rated')),"MIN"],'comment','Rated'],
                raw:true,order: ['DOV']}).then((data)=>
                {
                    res.json({data:data,name:rest_name.Rest_name});
                })        
             
    }).catch((err)=>{console.log(err)});
});
    




router.get("/admin/restuarants",jwtMiddleware.checkToken,(req,res)=>
{
   
                RestModel.findAll().then((data)=>
                {
                    res.send(data);
                });        
});
router.get("/admin/restuarants:id",jwtMiddleware.checkToken,(req,res)=>
{
   
                RestModel.findOne({where:{id:req.params.id}}).then((data)=>
                {
                    res.send(data);
                });        
});
router.post("/admin/restuarants",jwtMiddleware.checkToken,(req,res)=>
{
                RestModel.create({
                     Rest_name:req.fields.data.Rest_name,
                }).then((data)=>
                {
                    res.send("Restuarant Added");
                }); 
      

});
router.delete("/admin/restuarants:id",jwtMiddleware.checkToken,(req,res)=>{
    RateModel.destroy({
        where:{Restuarant_Id:req.params.id}}).then(()=>{
    
            RestModel.destroy({where:{id:req.params.id}
            }).then((data)=>
            {
                res.json({data:data});
            }); 

        });      
    
    
});
router.put("/admin/restuarants:id",jwtMiddleware.checkToken,(req,res)=>{
               // console.log(req.fields);
                 RestModel.update({ Rest_name: req.fields.data.Rest_name },
                 { where: { id: req.params.id } }
                 ).then((data)=>
                 {
                     console.log(data[0]);
                     res.send(data);
                 }); 
});



module.exports=router;