// module.exports = function(app, passport){


//     //메인페이지 route
//     app.get('/main', function(req,res){
//         res.render('index.ejs')
//     })

//     app.get('/logout', function(req, res){
//         req.logout();
//         res.redirect('/main')
//     })

//     app.get('/login', passport.authenticate('local-login',{
//         successRedirect : '/', // if success redirect to room
//         failureRedirect : '/login',
//         failureFlash : true
//     }))


//     //google authentication
//     app.get('/auth/google', passport.authenticate('google', {scope : ['email']}))

//     app.get('/auth/google/callback', passport.authenticate('google', {
//         successRedirect : '/',
//         failureRedirect : '/login'
//     }))

//     // app.get('/auth/google/callback', passport.authenticate('google'),
//     // function(req, res) {
//     //     req.session.name=req.user.displayName;
//     //     req.session.email=req.user.emails[0].value;
//     //     res.redirect('/profile');
//     // });

//     // app.get('/logout',function(req,res){
//     //     req.session.destroy(function(err) {
//     //         if(err) {
//     //             console.log(err);
//     //         } else {
//     //             res.redirect('/');
//     //         }
//     //     });
//     // });

//     //mysql create table
//     //https://github.com/tharun208/Social-Login/blob/master/backend.sql



//     //google authorized
//     app.get('/connect/google', passport.authorize('google',{
//         scope:['email']
//     }))

//     app.get('/connect/google/callback', passport.authorize('google', {
//         successRedirect: '/',
//         failureRedirect: '/login'
//     }))

// }