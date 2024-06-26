const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require('./router/auth')
const coverRoutes = require('./router/cover')
const userRoutes = require('./router/user')
const claimRoutes = require('./router/claim')
require("dotenv").config();


const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;
const app = express();


app.use(bodyParser.json());
app.use(cors());
app.use('/auth',authRoutes)
app.use('/cover',coverRoutes)
app.use('/user',userRoutes)
app.use('/claim',claimRoutes)


mongoose.connect(MONGO_URL).then(()=>{
    console.log("database connected");
}).catch((error)=>{
    console.log(error)

})


app.get('/',(req,res)=>{
    return res.status(200).json({message:'server working'})
})

app.listen(PORT,"0.0.0.0",()=>{
    console.log('SERVER STARTED ON ',PORT);
})