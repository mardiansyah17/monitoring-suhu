const mongoose   = require('mongoose')

const temprature = new mongoose.Schema({
    celsius:mongoose.Schema.Types.Decimal128,
    farenheit:mongoose.Schema.Types.Decimal128,
})


module.exports = mongoose.model('temprature',temprature)