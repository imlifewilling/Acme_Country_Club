const { Connection } = require('pg')
const  Sequelize = require('sequelize')


//set up the db
const client = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_country_club_db')

//create models
const Member = client.define('member', {
    id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
    },
    name: {
        type: Sequelize.STRING(20)
    }
})

const Facility = client.define('facility', {
    id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
    },
    name: {
        type: Sequelize.STRING(20)
    }
})

const Booking = client.define('booking', {
    id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
    }
})

//build up the connections
Member.belongsTo(Member, {as: 'sponsor'})
Member.hasMany(Member, {as: 'sponsored', foreignKey:'sponsorId'})
Booking.belongsTo(Facility)
Facility.hasMany(Booking)
Booking.belongsTo(Member, {as: 'booker'})
Member.hasMany(Booking, {foreignKey:'bookerId'})

//set SQL to put in data
const seedAndSync = async() => {
    const[moe, lucy, ethyl, larry] = await Promise.all(
        ['moe', 'lucy', 'ethyl', 'larry'].map(
            name => Member.create({name})
        )
    )
    const [tennis, pingpong, marbles] = await Promise.all(
        ['tennis', 'ping pong', 'marbles'].map(
            name => Facility.create({name})
        )
    )
    //update member connection
    moe.sponsorId = lucy.id
    larry.sponsorId = lucy.id
    ethyl.sponsorId = moe.id

    await Promise.all([
        moe.save(),
        larry.save(),
        ethyl.save(),
        tennis.save(),
        Booking.create({bookerId: moe.id, facilityId: tennis.id}),
        Booking.create({bookerId: lucy.id, facilityId: marbles.id}),
        Booking.create({bookerId: lucy.id, facilityId: marbles.id})
    ])
}

module.exports = {
    client,
    Member,
    Facility,
    Booking,
    seedAndSync
}






