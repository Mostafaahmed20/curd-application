var mongoose = require('mongoose')

let itemModel = new mongoose.model('item' , new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    ItemName:{type:String , maxlength:100 , minlength:10},
    isPuplish:{type:Boolean , required:true},
    Stock:{type:Number  , min:3 , max:100 , required:function(){this.isPuplish}},
    price:{type:Number , required:function(){this.isPuplish}},
    CreatedOn:{type:Date , default:Date.now },
    Catgory:{type:mongoose.Schema.Types.ObjectId , ref:'catgory'}
}))


module.exports = itemModel