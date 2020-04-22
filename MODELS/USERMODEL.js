

let mongoose = require('mongoose')
let jwt = require('jsonwebtoken')
let config = require('config')

let UserSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId, 
    UserName:{type:String , maxlength:100 , minlength:10},
    email:{type:String , maxlength:100},
    password:{type:String ,  maxlength:1024},
    phone:{type:String , maxlength:13},
    isAdmain:{type:Boolean},
    item:[{type:mongoose.Schema.Types.ObjectId , ref:'item'}] 

})

UserSchema.methods.generateAthuToken = function (){
    let token = jwt.sign({_id:this._id , isAdmain:this.isAdmain} ,config.get( 'Jwtprivetkey'))  
    return token  
}

let UserModel = mongoose.model('User' , UserSchema)

module.exports = UserModel