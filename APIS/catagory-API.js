var mongoose = require('mongoose')
var CatgoryModel = require('../MODELS/catagoryModel')
var isAdmain = require('../config/isAdmain')
var isAdmain = require('../config/isAdmain')
var Athu = require('../middlewear/Auth')
function CatgoryApi(app){

app.post('/insertCatgory' ,Athu , async  (req , res )=>{
    const {CatgoryName , isPuplish , stock , priceCatogory , items_id } = req.body
    try{

        let Catgory = new CatgoryModel({
            _id:mongoose.Types.ObjectId(),
            CatgoryName,
            isPuplish,
            stock,
            priceCatogory,
            item:items_id
        
        })
        let Savedata = await Catgory.save()
        res.status(200).json({massage:'sucsses ' , Savedata})
    } 
    catch(error){
        console.log(error)
    }
})

app.post('/UbdateCatgory' ,[ Athu , isAdmain ], async (req , res)=>{
    const {_id , CatgoryName , isPuplish , stock , priceCatogory } = req.body
try{
    let UbdateCatgory = await CatgoryModel.findByIdAndUpdate({_id:_id} , {CatgoryName , isPuplish , stock , priceCatogory}).exec()
    res.status(200).json({massage:'ubdated sucssesfuly ..' , UbdateCatgory})
}
    catch(error){
        res.status(400).json({massage:'error while ubdating the catgory ..' , error})
    }


})


app.post('/removeCtgory' ,[Athu , isAdmain]  , async (req , res) =>{
    const { _id } = req.body
    try{
        let removeCatgoty = await CatgoryModel.findByIdAndRemove({_id:_id}).exec()
        res.status(200).json({massage:'sucsses removed .. ' , removeCatgoty})
    }
catch(error){
    res.status(400).json({massage:'error while remove the catgory ...'})
}

})


app.get('/getAllCatgory' ,[Athu  , isAdmain] ,  async  (req , res)=>{
    try{
        let AllCatgory = await CatgoryModel.find({}).exec()
        res.send(200).json({massage:'sucsses ...' , AllCatgory})
    }
    catch(error){
        res.status(400).json({massage:'error' , error})
    }
})




}
module.exports = CatgoryApi