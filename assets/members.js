const {client, Member, Facility, Booking, seedAndSync} = require('../db')
const express = require('express')
const app = express.Router()

module.exports = app

app.get('/api/members', async(req, res, next) => {
    try{
        const members = await Member.findAll({
            include: [
                {
                    model: Member,
                    as: 'sponsor'
                },
                {
                    model: Member,
                    as: 'sponsored'
                }
            ]
        })
        res.send(members)
    }catch(error){
        next(error)
    }
})
