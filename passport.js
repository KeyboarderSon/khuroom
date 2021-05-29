const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const secret = require('./secret.json');

//userid를 세션에 저장 req.user로 저장됨
passport.serializeUser(function(user, done) {
    done(null, user);
    //done(null, user.id);
  });
  
//passport.session이 cookie를 가지고 아래를 부르며 cookie에서 id를 꺼내어
//findById를 해서 DB에 존재하면  
passport.deserializeUser(function(user, done) {
    //User.findById(id, function(err, user) {
      done(null, user);
    //});
});

// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.

passport.use(new GoogleStrategy({
    clientID: secret.clientID,
    clientSecret: secret.clientSecret,
    callbackURL: "http://localhost:3000/auth/google/callback"
  },

  function(accessToken, refreshToken, profile, done) {
       /*profile info의 id를 사용하여 db에 저장된 사용자인지 확인
       User.findOrCreate({ googleId: profile.id }, function (err, user) {
         return done(err, user);
       });*/

       //done이 되면 serialzeUser이 call되어 cookie에 유저가 들어감
       return done(null, profile);

  }
));

