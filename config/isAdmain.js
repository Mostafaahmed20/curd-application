
function  isAdmain (req , res , next){
if(!req.user.isAdmain) return res.status(403).json({massage:'forbedden ...'})
next()

}


module.exports = isAdmain