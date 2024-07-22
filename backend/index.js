const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const Usermodel = require("./userDatabase")
const app = express()
app.use(express.json())

app.use(cors())

//mongoose.connect("database ka name")
app.post('/signin', (req,res)=>{
    Usermodel.create(res.body).then(e => res.json(e)).catch(err=>res.json(err))
})
app.post('/login' , (req,res)=>{
    const {email, password} =req.body ;
    Usermodel.findOne({email: email})
    .then(user=>{
        if(user){
            if(user.password===password){
                res.json("success")
            }
            else{
                res.json("Password is incorrect")
            }
        }
        else{
            res.json("No User Found")
        }
    })
})
app.listen(3001, ()=>{
    console.log("Server is live")
})