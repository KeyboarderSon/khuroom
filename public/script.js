const socket = io('/')
const videoGrid = document.getElementById('video-grid')
//파라미터 첫번째가 고유 id 이는 서버가 만들어내도록 undefined라고.
const myPeer = new Peer(undefined, {
    host:'/',
    port: '3001',
})

const myVideo = document.createElement('video')
myVideo.muted = true

//방을 나갈 때 즉각적으로 화면 없앰을 처리하기 위해
const peers={}
navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
}).then(stream =>{//stream = video, audio
    addVideoStream(myVideo, stream)
    
    //누군가 call하고자 하면 (receive call하는 절차)
    myPeer.on('call', call => {
        //응답하면서 현재 내 stream을 보냄
        //아래 한줄만 answer하면 방장 말고 막들어온 유저에게는 방장의 정보가 안옴
        call.answer(stream)

        //방장 정보도 보내짐
        const video = document.createElement('video')
        call.on('stream', userVideoStream=>{
            addVideoStream(video, userVideoStream)
        })
    })
    
    socket.on('user-connected', userId=>{
        // 나의 stream을 이어진 유저에게 보내야겠다
        //connectToNewUser(userId, stream)
        setTimeout(() => {
            // user joined
            connectToNewUser(userId, stream)
          }, 1000)
    })
})

// close connection
socket.on('user-disconnected', userId =>{
    if (peers[userId]) peers[userId].close()
})


//peer server 연결되고 id 받으면 실행
myPeer.on('open', id => {
    // 서버에서 받을 이벤트명
    // console에 user connected : 고유 id 생성됨
    socket.emit('join-room', ROOM_ID, id)

})

//socket.on('user-connected', userId =>{
//    console.log('User connected : ' + userId)
//})

// 새로운 유저가 이 방으로 들어오려 할 때 make call
function connectToNewUser(userId, stream){
    //userId로 call을 하고 stream을 보낸다
    const call = myPeer.call(userId, stream)
    const video = document.createElement('video')
    //이벤트 listen : 반대로 반대편에서 stream 나에게 보내는 것
    call.on('stream', userVideoStream=>{
        //내 페이지에 상대 stream을 올린다
        addVideoStream(video, userVideoStream)
    })
    call.on('close', ()=>{
        video.remove()
    })

    // 유저가 방 나간 거 즉각처리하기 위해

    peers[userId] = call
}

function addVideoStream(video, stream){
    video.srcObject=stream
    video.addEventListener('loadedmetadata', ()=>{
        video.play()
    })
    videoGrid.append(video)
}

//cmd창에 peerjs --port 3001