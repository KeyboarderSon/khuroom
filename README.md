## KHUROOM
> WebRTC를 이용한 화상스터디룸  


### Getting Started

본 프로젝트는 화상 스터디룸을 모방한 것으로 소리 송출은 제공되지 않고 영상만 송출됩니다.  

**configuration**  

local의 경우

* 시크릿탭을 이용하면 다수의 사용자처럼 테스트하기 편합니다.
* public/script.js

    ```javascript
    const myPeer = new Peer(undefined, {
    ...
    port: '3000'
    })
    ```

* server.js  
    ```server.listen(process.env.PORT || 3000);```  
    public/script.js의 port와 server.js의 후자 port num을 맞춰주시기 바랍니다. process.env.PORT가 동작하지 않을 때 default로 3000번이 동작합니다.

* secret.json  
    구글 로그인 기능을 넣었으므로 본인와 clientID와 cleintSecret을 넣어야 합니다. redirect URI가 passport.js의 callbackURL과 일치하도록 신경을 기울여 주세요. 자세한 사항은 [여기](https://www.a-mean-blog.com/ko/blog/%EB%8B%A8%ED%8E%B8%EA%B0%95%EC%A2%8C/_/Node-JS-%EC%84%9C%EB%B2%84%EC%97%90-%EA%B5%AC%EA%B8%80-%EC%86%8C%EC%85%9C-%EB%A1%9C%EA%B7%B8%EC%9D%B8-%EA%B8%B0%EB%8A%A5-%EB%84%A3%EA%B8%B0-1-2-Google-OAuth-Client-ID-Client-Secret-%EC%83%9D%EC%84%B1%EB%B0%A9%EB%B2%95)를 참조하세요.

    받은 clinetID와 clientSecret을 secret.json 파일을 생성하여 아래와 같이 넣어주세요. secret.json.example도 첨부하였습니다.
    ```json
    {
        "clientID": "...",
        "clientSecret": "..."
    }
    ```


배포의 경우(heroku 사용 시)

* public/script.js  
    PeerServer은 443 port에서 동작합니다.  

    ```javascript
    const myPeer = new Peer(undefined, {
    ...
    port: '443'
    })
    ```
* passport.js  
    secret.json은 공개된 파일이 아니기에 github와 연동된 heroku에서는 인식하지 못합니다. 그러므로 콘솔창에서 아래와 같이 수동 설정 해주세요.  
    ```heroku config:set CLIENT_ID=... CLIENT_SECRET=...```  

    passport.js를 아래와 같이 수정해주세요.  
    ```javascript
    passport.use(new GoogleStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: "..."
    }
    ```

* package.json  
  nodemon이 동작하지 않으므로 아래와 같이 바꿔주세요.
  ```javascript
  "scripts": {
    ...
    "start": "node server.js",
    ...
  }
  ```
  
**Install**

* ```npm install``` package를 intall 합니다.


* ```npm start``` node 혹은 nodemon이 동작합니다.


### Usage

* 배포는 heroku를 사용하였습니다. 장시간 이용이 없을 경우 로딩 시간이 길 수 있습니다.
* 초대된 사람은 로그인 뒤 초대된 링크를 주소창에 붙여넣어주세요.  
  
https://khuroom.herokuapp.com/main


### Contribution
pull request를 이용해주세요

### License
MIT License

### Contact
문의사항은 juanjh60@khu.ac.kr 혹은 juanjh60@naver.com으로 이메일 바랍니다.