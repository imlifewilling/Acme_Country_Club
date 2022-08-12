const {client, Member, Facility, Booking, seedAndSync} = require('../db')
const express = require('express')
const app = express.Router()

module.exports = app

app.get('/api/bookings', async(req, res, next) => {
    try{
        const bookings = await Booking.findAll({
            include: [
                {
                    model: Member,
                    as: 'booker'
                },
                {
                    model: Facility,
                    as: 'facility'
                }
            ]
        })
        res.send(bookings)
    }catch(error){
        next(error)
    }
})






