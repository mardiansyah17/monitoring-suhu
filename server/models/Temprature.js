const mongoose   = require('mongoose')

const moment = require('moment-timezone');

// Mengatur zona waktu Indonesia
const zonaIndonesia = 'Asia/Jakarta';


const temprature = new mongoose.Schema({
    celsius:mongoose.Schema.Types.Number,
    farenheit:mongoose.Schema.Types.Number,
    createdAt:{
        type:mongoose.Schema.Types.Date,
        default: () => moment.tz(zonaIndonesia).format()
    }
})


module.exports = mongoose.model('temprature',temprature)