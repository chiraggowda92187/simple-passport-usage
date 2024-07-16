import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { users } from "../../fake-db/db";
import { Router } from "express";


const authRouter = Router()


// export const initPassport = ()=>{
    console.log("initialized")
    passport.use(new LocalStrategy({ usernameField: "email", passwordField: "password" },function verify(email, password, done){
        console.log(email, password)
        // Database Call
        const user = users.find((user) => user.email === email);
        console.log('Inisde the function where user is authenticated : email : ', email);
        console.log('Inisde the function where user is authenticated : password : ', password);

        // Authenticating User 
        // We are sending the found user to be stored in the session 
        // If there is no such user then we send error or whatever appropriate thing to notify the server to not store the session.
        // Then based on whether r not the session is stored the 
        if(!user){
            return done(null, false, {
                message : "User or password wrong..!"
            })
        }
        if(user.password===password){
            console.log("Inisde the password section , user.password : ", user.password)
            console.log("Inisde the password section , password : ", password)

            return done(null, user)
        }
        else{
            console.log("user password not correct..!")
            return done(null, false, {
                message : `User password wrong : ${password}`,
            })
        }
}))
// }


// Google Strategy


passport.use(new GoogleStrategy({
    clientID : "your_google_client_id",
    clientSecret :"your_google_client_secret",
    callbackURL : "http://localhost:3000/api/auth/login/Google/callback",
},function verify(accessToken, refreshToken, profile, done){
    // primsa / database call to store the user in the databse of ours
    // The id we shoudl use should be the id of our databse not google's because there may occur a situation where the id may same.
    if(profile){  // typically the response that we get after the databse callshould be used here instead of profile.
        return done(null, profile)
    }
    else {
        return done(null, false, {message : "Not authenticated verify() function failed."})
    }
}))



passport.serializeUser(function(user : any, done){
    process.nextTick(function(){
        console.log("seriaize User called only once per login")
        done(null, user)
    })
})
passport.deserializeUser(function(user : any, done){
    console.log("deserialize user called after login for every session.")
    // const retreivedUser = users.find(user1 => user1.id === user.id)
    // if(retreivedUser){
        
        process.nextTick(function(){
            return done(null, user)
        })
    // }
    // else{
    //     return done(new Error("Deserializing error"), false)
    // }

})

authRouter.post('/login/localPassword', passport.authenticate('local', {
    scope :["profile", "email"],
}));

authRouter.get("/login/Google", passport.authenticate("google", {
    scope : ['profile', 'email']
}))

authRouter.get("/login/Google/callback", passport.authenticate("google", {
    successRedirect : "/api/data/encryptedData",
    failureRedirect : "/api/auth/error"
}))



// Here after calling we can use alternatively us==by passing a function to the passport.authenticate("strategy_name", {optins | callback}) instead of options
// passport.authenticate('local', function (req, res, next) {
//   console.log(req.body);
//   passport.authenticate(
//     'local',
//     function (err: any, user: any, info: any, status: any) {
//       if (err) {
//         console.log('Authentication error:', err);
//         return next(err);
//       }
//       if (!user) {
//         console.log('Authentication failed:', info);
//         return res.redirect('/api/auth/error');
//       }
//       console.log('Login successful, redirecting to data...');
//       req.logIn(user, function (err) {
//         console.log('Inside the callback function of login, user: ', user);
//         if (err) {
//           console.log('Login Error', err);
//           return next(err);
//         }
//         return res.redirect('/api/data/encryptedData'); // Moved inside the callback
//       });
//     }
//   )(req, res, next);
// });


authRouter.get("/login/localPassword", (req, res)=>{
    return res.json({
        message : "healthy "
    })
})

authRouter.get("/error", (req, res)=>{
    return (
        res.json({
            message : "You are not logged in...! Or failure in Login"
        })
    )
})

export default authRouter