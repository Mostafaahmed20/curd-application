let isAdmain = require('../config/isAdmain')
let athu  = require('../middlewear/Auth')
let config = require('config')
var mongoose = require('mongoose')
let UserModel = require('../MODELS/USERMODEL')
let bcrypt = require('bcrypt')
let salt = 10
let jwt = require('jsonwebtoken')
function UserApi(app){
app.post('/register' ,async ( req , res , next)=>{
    const{UserName , email , password , phone , item } = req.body
    try{

        let hashedPass = await bcrypt.hash(password , salt) 
        let user = new UserModel({
            _id:mongoose.Types.ObjectId(),
            UserName,
            email,
            password:hashedPass,
            phone,
            item
    
        })
          await user.save()
        let tokenRegister = user.generateAthuToken() 
        res.header('x-auth-token' , tokenRegister ).send(user)
    }
    catch(err){
        
        next(err) 
    }
})


app.post('/login' ,athu, async (req , res)=>{
    const{email} = req.body
    
    let user1 = await UserModel.findOne({email})
    if(!user1)
        res.status(400).json({massage:"inValid email or password"})
    
let passcompar = bcrypt.compare(req.body.password , user1.password)
if(!passcompar){
res.status(400).json({massage:"inValid email or password"})
}

let token  = user1.generateAthuToken();

res.send(token)

})


app.get('/getUser'  , athu , async  (req , res )=>{
    try{
let userone =await UserModel.findById(req.user._id).select('-password')
res.status(200).json({massage:'sucsses ' , userone})
    }
    catch(error){
        console.log(error)
    }

})

app.post('/deleteUser' ,[athu , isAdmain]  , async  (req , res)=>{
    const{_id } = req.body
    try{
        let deleteUser =  await UserModel.findByIdAndDelete({_id:_id}).exec()
        res.status(200).json({massage:'deleted  sucssefuly .. ' , deleteUser})
    }
    catch(error){
        res.status(400).json({massage:'error' , error})
    }
     
})


app.get('/getAllusers' , async (req , res )=>{
    let AllUsers = await UserModel.find({}).exec()
    res.status(200).json({massage:'sucsses users from database ' , AllUsers})
})





}

module.exports = UserApi