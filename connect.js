var mongoose = require('mongoose')
// var dbdebug = require('debug')('app:db')

function connection(){
    mongoose.connect('mongodb://localhost/MYAPP2' ,{ useNewUrlParser: true })
    .then(()=>console.log('connected sucssesfuly ...........'))
    .catch((error)=>console.log(error))
}

module.exports = connection