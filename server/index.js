const http = require('http')
const express = require('express')
const mongoose = require('mongoose');
const {Server} = require("socket.io");
const {SerialPort, ReadlineParser} = require("serialport");
const {json} = require("express");

const app = express()
const server = http.createServer(app)
const port = 4000

const socket = new Server(server, {
    cors: {
        origin: `http://localhost:8888`,
    },
});

const serialPort = new SerialPort({
    path: 'COM5',
    baudRate: 9600,
})

const parser = serialPort.pipe(new ReadlineParser({delimiter: '\n'}));

serialPort.on('open', () => {

    parser.on('data', data => {
        console.log(data)
        // io.emit('suhu-sekarang', {c, f})
    })

    socket.on('connection', async io => {

        console.log(`client ${io.id} sudah tersambung`)


        serialPort.on('close', () => {
            console.log("Terputus")
        })

        serialPort.on('close', () => {
            console.log("Terputus")

        })

        io.on('disconnect', () => console.log(`${io.id} sudah terputus`))
    })


})


server.listen(port, async () => {
    console.log(`http://localhost:${port}`)
})