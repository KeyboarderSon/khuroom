const express = require('express')
const app = express()

// allow server to create to be use with socket io
// room setting을 위한 서버
const server = require('http').Server(app)
const io = require('socket.io')(server)
const { v4 : uuidV4 } = require('uuid')

app.set('view engine', 'ejs')
app.use(express.static('public'))

// user을 random한 uuid room으로(dynamic url)
app.get('/', (req, res) => {
    res.redirect(`/${uuidV4( )}`)
})

app.get('/:room', (req, res) =>{
    // room.ejs를 서버가 클라이언트에게 렌더링하여 보내겠다
    res.render('room', {roomId: req.params.room})
})

//연결이 되면 join room 이벤트 발생. roomid, userid를 패스함
io.on('connection', socket => {
    //서버에서 보낼 이벤트명
    socket.on('join-room', (roomId, userId)=>{
        //roomId방에 참여
        socket.join(roomId)
        //나를 제외한 그룹내 모두에게
        socket.broadcast.to(roomId).emit('user-connected', userId)
    })

})

server.listen(3000)