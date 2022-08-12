const {client, Member, Facility, Booking, seedAndSync} = require('./db')
const express = require('express')

const app = express()

app.get('/api/facilities', require('./assets/facilities'))

app.get('/api/bookings', require('./assets/bookings'))

app.get('/api/members', require('./assets/members'))

const init = async () => {
    try{
        await client.sync({force : true})
        await seedAndSync()
        const port = process.env.PORT||3000
        app.listen(port, ()=> console.log(`listening on port: ${port}`))
    }catch(error){
        console.log(error)
    }
}

init()






