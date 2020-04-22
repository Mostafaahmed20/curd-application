var mongoose = require('mongoose')
// var dbdebug = require('debug')('app:db')

function connection(){
    mongoose.connect('mongodb+srv://dbuser:dbuser123@cluster0-uvpgm.mongodb.net/test?retryWrites=true&w=majority' ,{ useNewUrlParser: true })
    .then(()=>console.log('connected sucssesfuly ...........'))
    .catch((error)=>console.log(error))
}

module.exports = connection
