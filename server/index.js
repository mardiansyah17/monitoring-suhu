const http = require('http')
const express = require('express')
const mongoose = require('mongoose');
const {Server} = require("socket.io");
const {SerialPort, ReadlineParser} = require("serialport");

const app = express()
const server = http.createServer(app)
const port = 4000

const socket = new Server(server, {
    cors: {
        origin: `http://localhost:8888`,
    },
});


socket.on('connection', async io => {

    console.log(`client ${io.id} sudah tersambung`)
    io.on('disconnect', () => console.log(`${io.id} sudah terputus`))
})

// const serialPort = new SerialPort({
//     path: 'COM5',
//     baudRate: 9600,
// })
//
//
//
// const Temprature = require('./models/Temprature')
//

//
//
// const parser = serialPort.pipe(new ReadlineParser({delimiter: '\n'}));
//

// async function main() {
//     await mongoose.connect('mongodb://127.0.0.1:27017/suhu');
//
//     // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
// }

// serialPort.on('open', async () => {
//     await main().then(() => console.log("database ok")).catch(err => console.log(err));
//     socket.on('connection', async io => {
//         const tempratures = await Temprature.find()
//
//         console.log(`client ${io.id} sudah tersambung`)
//         io.emit('data-suhu', tempratures)
//         parser.on('data', async data => {
//             const c = parseFloat(parseFloat(data).toFixed(2))
//             const f = parseFloat(parseFloat((9 / 5 * parseFloat(data)) + 32).toFixed(2))
//             io.emit('suhu-sekarang', {c, f})
//             // await Temprature.create({celsius:c,farenheit:f})
//         })
//
//
//         io.on('disconnect', () => console.log(`${io.id} sudah terputus`))
//     })
// })


server.listen(port, async () => {
    console.log(`http://localhost:${port}`)
})