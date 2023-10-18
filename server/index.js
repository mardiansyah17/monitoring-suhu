const http = require('http')
const express = require('express')
const mongoose = require('mongoose');
const { Server } = require("socket.io");
const {SerialPort, ReadlineParser} = require("serialport");

const app = express()
const server = http.createServer(app)
const port = 4000

const Temprature = require('./models/Temprature')

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/suhu');

    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}


const serialPort = new SerialPort({
    path: 'COM5',
    baudRate: 9600,
})

const parser = serialPort.pipe(new ReadlineParser({delimiter: '\n'}));

serialPort.on('open',async ()=>{
   await main().then(()=>console.log("database ok")).catch(err => console.log(err));
const tempratures = await Temprature.find()
    console.log(tempratures)
   parser.on('data',async data=>{
       const c = parseFloat(data).toFixed(2)
             const f = parseFloat((9 / 5 * parseFloat(data)) + 32).toFixed(2)

       // await temprature.create({celsius:c,farenheit:f})

   })
    console.log('mantap')

})

const io = new Server(server);


server.listen(port,async ()=>{

    console.log(`http://localhost:${port}`)
})