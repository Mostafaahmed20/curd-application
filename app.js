let config = require('config') 
let server = require('express')
let app = server()
let port = process.env.port || 4000
let UserApi = require('./APIS/USER-API')
let ItemApi = require('./APIS/ITEAM-API')
let CatgoryApi = require('./APIS/catagory-API') 
let bodyParser = require('body-parser')
let jwt = require('jsonwebtoken')
// let express_Session = require('express-session')
let connectDb = require('./connect')
app.get('/' , (req , res) =>{
    res.send(`iam runing on port ${port }`)
})
// let configapp = `${config.get('Jwtprivetkey')}`
// console.log(configapp)
if(!config.get('Jwtprivetkey')){
    console.error('fatil erro :Jwtprivetkey is not defind');
    process.exit(1)
}
app.use(bodyParser.json())

// console.log(process.env.NODE_ENV)

connectDb(app)

UserApi(app)
ItemApi(app)
CatgoryApi(app)

// function error(err , req , res  ){
// res.status(500).json({massage:'internal server error '})
// }


app.listen(port , ()=>console.log(`app is listen to port ${port}`))