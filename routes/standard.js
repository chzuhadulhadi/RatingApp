const express=require("express");
const jwtConfig=require("../config/jwt-config");
const jwtMiddleware=require("../config/jwt-middleware");
const UserModel=require("../models").Users;
const RestModel=require("../models").Restuarants;
const router=express.Router();
router.get("/standard",jwtMiddleware.checkToken,(req,res)=>
{   
            //let tot={};

            RestModel.findAll().then((data)=>
            {
                //console.log(JSON.stringify(data));
                // data2.forEach(element => {
                //     console.log(JSON.stringify(element));
                // });
                // console.log(data);
                //JSON.stringify(data);
                //for(var i=0;i<data.length;i++)
                res.status(200).json({
                    status:1,
                    message:" Standard User Restuarants List",
                    data:data,
                    type:JSON.stringify(data)
                })        
            });
            // res.status(200).json({
            //     status:1,
            //     message:"Users found",
            //     data:data
            // })
        
        

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
// router.post("/standard/:id",(req,res)=>
// {   let username="local";
//     let password="local";
//     let type="standard";
//     let id=req.params.id;
//     UserModel.findOne({ where: { username: username ,password:password} }).then((data)=>{
//         if(data)
//         {

//             RestModel.findOne({ where: {id:id} }).then((data2)=>
//             {
//                 res.status(200).json({
//                         status:1,
//                         message:"post req",
//                         data:data2
//                     })     
//             });
//             // res.status(200).json({
//             //     status:1,
//             //     message:"Users found",
//             //     data:data
//             // })
//         }else
//         {
//             res.status(500).json({
//                 status:0,
//                 message:"No Users"
//             })
//         }});
// })
module.exports=router;