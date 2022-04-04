const app = require('./app')
const config = require('config')
const db = require('./database/mongoDb')
const PORT = config.get('PORT')

async function startServer () {
    try {
        db.connect()
        app.listen(PORT, () => {
            console.log(`Server listen on ${PORT} port`)
        })
    } catch (e) {
        res.status(500).json({message: "Serverda kutilmagan hato yuz berdi"})
    }
}

startServer() 