const socket = io('')

// 서버에서 받을 이벤트명
socket.emit('join-room', ROOM_ID, 10)

socket.on('user-connected', userId =>{
    console.log('User connected : ' + userId)
})