let isAdmain = require('../config/isAdmain')
let Auth = require('../middlewear/Auth')
var mongoose = require('mongoose')
var ItemModel = require('../MODELS/itemsModel')
var catgoryModel = require('../MODELS/catagoryModel')


function itemApi(app){

app.post('/inertItem' ,Auth ,  async (req , res)=>{
    const {ItemName , isPuplish ,  Stock , price , Catgory_id} = req.body
try{
let item = new ItemModel({
    _id:mongoose.Types.ObjectId() , 
    ItemName,
    isPuplish,
    Stock,
    price,
    catgory:Catgory_id
})
let itemsaved = await item.save()
res.status(200).json({massage:'sucsses '  , itemsaved})
let currntCatgory = await catgoryModel.findOne({_id:Catgory_id})
let pushItem = await currntCatgory.items.push(item._id)
pushItem.save()

}
catch(error){
console.log(error)
}
})


app.post('/Ubdateitem' ,[Auth , isAdmain ] , async (req,  res) =>{
    const{_id  , ItemName  , isPuplish , Stock , price , Catgory_id} = req.body
    try{
        
        let itemUbdate = await ItemModel.findByIdAndUpdate({_id:_id} , {ItemName , isPuplish , Stock , price , Catgory_id}).exec()
        res.status(200).json({massage:'sucsses .. ' , itemUbdate})
    }

    catch(error){
        res.status(400).json({massage:'error while ubdate'})
    }
    


})



}
module.exports = itemApi