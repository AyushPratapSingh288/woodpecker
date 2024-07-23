const mongoose = require("mongoose")

const UserDB = new mongoose.Schema({
     username : String ,
     email : String ,
     password : String
})

const Usermodel = mongoose.model("userData" , UserDB)
module.exports = Usermodel