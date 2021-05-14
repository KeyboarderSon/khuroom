const express = require('express')
const app = express()

// allow server to create to be use with socket io
// room setting을 위한 서버
const server = require('http').Server(app)
const io = require('socket.io')(server)
const { v4 : uuidV4 } = require('uuid')

app.set('view engine', 'ejs')
app.use(express.static('public'))

// user을 random한 uuid room으로
app.get('/room', (req, res) => {
    res.redirect(`/room/${uuidV4( )}`)
})

app.get('/room/:room', (req, res) =>{
    // room.ejs를 서버가 클라이언트에게 렌더링하여 보내겠다
    res.render('room', {roomId: req.params.room})
})

server.listen(3000)