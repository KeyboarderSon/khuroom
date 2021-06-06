const videoGrid = document.getElementById('video-grid')
var muteButton=document.getElementById('muteButton')
const myVideo = document.createElement('video')
//내목소리는 나한테 안들리게 해야지
myVideo.muted = true
let IsMute=false;
let myStream;

navigator.mediaDevices.getUserMedia({
    //다른 사람에게 video, audio 다 보내려면 다 true
    video: true,
    audio: true//*********나중에 이거 false하면 될듯!!!*********
}).then(stream =>{//stream = video, audio
    addVideoStream(myVideo, stream)
    myStream=stream
})


function addVideoStream(video, stream){
    //내 비디오를 나한테서 틀 수 있게함 
    video.srcObject=stream
    video.addEventListener('loadedmetadata', ()=>{
        video.play()
    })
    videoGrid.append(video)
}