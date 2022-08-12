const {client, Member, Facility, Booking, seedAndSync} = require('../db')
const express = require('express')
const app = express.Router()

module.exports = app


app.get('/api/facilities', async(req, res, next) => {
    try{
        const facilities = await Facility.findAll({
            include: Booking
        })
        res.send(facilities)
    }catch(error){
        next(error)
    }
})