const express = require("express");
const cors = require('cors')
var cr = {
    orgin: "http://localhost:3000"
}

const UserRoute=require("./routes/user");
const SUserRoute=require("./routes/standard");
const AUserRoute=require("./routes/admin");
const RestRoute=require("./routes/restuarants");
const RateRoute=require("./routes/rating");
const PORT = 8000;
const app = express();
app.use(cors(cr));
app.use("/",RateRoute);
app.use("/",UserRoute);
app.use("/",SUserRoute);
app.use("/",AUserRoute);
app.use("/",RestRoute);
app.get("/", (req, res)=>{
    // let username="admin";
    // let password="admin";
    
    res.status(200).json({
        status: 1,
        message: "Welcome to home page"
    });
});
app.listen(PORT, ()=>{
    console.log("Application is running at PORT 8000");
})