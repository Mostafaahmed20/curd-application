
let config = require('config')
let jwt = require('jsonwebtoken')


async function athu( req , res , next ){

let token = req.header('x-auth-token' )
if(!token)    return  res.status(401).json({massage:'denied ...no token verfied '})


    try{
        let verfiyToken = await jwt.verify(token , config.get( 'Jwtprivetkey'))
     req.user = verfiyToken
        next();
        // res.status(200).json({massage:'token verfied '})
    }
    catch(error){
res.status(400).json({massage:'inValid token ...' , error})
    }

}


module.exports = athu