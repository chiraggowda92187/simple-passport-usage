import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
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




passport.serializeUser(function(user : any, done){
    process.nextTick(function(){
        console.log("seriaize User called only once per login")
        done(null, {
            id : user.id,
            name : user.name,
            email : user.email
        })
    })
})
passport.deserializeUser(function(user : any, done){
    console.log("deserialize user called after login for every session.")
    const retreivedUser = users.find(user1 => user1.id === user.id)
    if(retreivedUser){
        
        process.nextTick(function(){
            return done(null, {
                id : retreivedUser.id,
                name : retreivedUser.name,
                email : retreivedUser.email
            })
        })
    }
    else{
        return done(new Error("Deserializing error"), false)
    }

})

authRouter.post('/login/localPassword', passport.authenticate('local', {
    failureRedirect : "/api/auth/error",
    successRedirect : "/api/data/encryptedData"
}));



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