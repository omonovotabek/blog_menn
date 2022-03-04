const mongoose = require('mongoose')
const config = require('config')

const DB_URL = config.get('DB_URL')

module.exports.connect = () => {
    mongoose.connect(DB_URL)
    .then(() => console.log(`MongoDb connected ...`))
    .catch((e) => console.log(e))
}


// module.exports.connect = async () => {
//     try {
//         await mongoose.connect(DB_URL)
//         console.log(`MongoDb connected ...`)
//     } catch (e) {
//         console.log(e)
//     }
// }