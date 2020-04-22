let ItemModel = require('./itemsModel') 
var mongoose = require('mongoose')
var CatgoryModel = new mongoose.model('catgory' , new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    CatgoryName:{type:String , maxlength:100 , minlength:10},
    isPuplish:{type:Boolean , required:true},
    stock:{type:Number , min:10 , max:100 },
    priceCatogory:{type:Number  ,  required:function(){this.isPuplish}},
    CreatedOn:{type:Date , default:Date.now},
    items:[{type:mongoose.Schema.Types.ObjectId , ref:'item'}]
}))


module.exports = CatgoryModel