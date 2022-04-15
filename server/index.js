const app = require('./app')
const config = require('config')
const db = require('./database/mongoDb')
const PORT = config.get('PORT')


        db.connect()
        app.listen(PORT, () => {
            console.log(`Server listen on ${PORT} port`)
        })

 
