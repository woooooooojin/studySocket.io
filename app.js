const express = require("express")
const http = require("http")
const app = express();
const path = require("path")
const server = http.createServer(app) //express가 http를 통해서 실행

const socketIO = require('socket.io')

const moment = require('moment')

const io = socketIO(server)

app.use(express.static(path.join(__dirname,"src")))

const PORT = process.env.PORT || 4000;

server.listen(PORT, ()=>console.log(`server is running ${PORT}`))

io.on("connection",(socket)=>{
    socket.on("chatting",(data)=>{
        const { name, msg } = data

        io.emit("chatting", {
            name,
            msg,
            time : moment(new Date()).format("h:mm A"),
        })
    })
})