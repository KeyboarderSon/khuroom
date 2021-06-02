const bodyParser = require('body-parser');
const express = require('express')
const app = express()
const passport = require('passport')
const cookieSession = require('cookie-session')
require('./passport');
//app.use, app.set...만있고
//routes.js에 app.get 등이 있다.


// allow server to create to be use with socket io
// room setting을 위한 서버
const server = require('http').Server(app)
const io = require('socket.io')(server)
const { v4 : uuidV4 } = require('uuid')

//const indexRoute = require('./')

//뷰 엔진 설정
app.set('view engine', 'ejs')
app.use(express.static('public'))


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())

app.use(cookieSession({
    name: 'khuroom-session',
    keys: ['key1', 'key2']
    
}))

//middleware
const isLogin = function(req, res, next ){
    if (req.user){
        next()
    } else{
        res.sendStatus(401);
    }
}

app.use(passport.initialize());
app.use(passport.session());



app.get('/main', function(req, res){
    res.render('index')
});


app.get('/logout', function(req, res){
    req.session = null;
    req.logout()
    res.redirect('/main')
});

// user을 random한 uuid room으로(dynamic url)
app.get('/', isLogin, function(req, res){
    res.redirect(`/${uuidV4( )}`)
})

// preview 추가하자
app.get('/preview', isLogin, function(req, res){
    res.render('preview')
})

//동적페이지. room.ejs로 렌더링. room.ejs에서 roomId라는 변수 사용가능
app.get('/:room', isLogin, function(req, res){

    res.render('room', {roomId: req.params.room, username : req.user.displayName})
})



app.get('/auth/google', passport.authenticate('google',
 { scope: ['profile', 'email'] }));

 app.get('/auth/google/callback',
    passport.authenticate('google', {failureRedirect:'/main'}),
    function(req, res){
        res.redirect('/preview');
 })




//연결이 되면 join room 이벤트 발생. roomid, userid를 패스함
io.on('connection', socket => {
    socket.on('preview', function(){

    })
    //서버에서 보낼 이벤트명
    socket.on('join-room', function(roomId, userId){
        //roomId방에 참여
        //나를 제외한 그룹내 모두에게
        socket.to(roomId).emit('user-connected', userId)

        //방을 나갈 때
        socket.on('disconnect', function(){
            //방 나간 유저의 id를 얻을 수 있음
            socket.to(roomId).emit('user-disconnected', userId)
        })
    })
})




server.listen(3000)