const multer = require('multer')
const moment = require('moment')

module.exports.imgUpload = multer({
    storage: multer.diskStorage({
       destination(req, file, cb){
           cb(null, 'uploads')
       },
       filename(req, file, cb) {
           const date = moment().format("DDMMYYYY-HHmmss SSS")
           cb(null, `${date}-${file.originalname}`)
       }
    }),
    fileFilter(req, file, cb) {
        if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg'){
            cb(null, true)
        }else{
            cb(null, false)
        } 
    },
    limits: {
       fileSize: 1024*1024*5
    }
}).single('image')