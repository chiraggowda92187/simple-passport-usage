"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const passport_google_oauth20_1 = require("passport-google-oauth20");
const db_1 = require("../../fake-db/db");
const express_1 = require("express");
const authRouter = (0, express_1.Router)();
// export const initPassport = ()=>{
console.log("initialized");
passport_1.default.use(new passport_local_1.Strategy({ usernameField: "email", passwordField: "password" }, function verify(email, password, done) {
    console.log(email, password);
    // Database Call
    const user = db_1.users.find((user) => user.email === email);
    console.log('Inisde the function where user is authenticated : email : ', email);
    console.log('Inisde the function where user is authenticated : password : ', password);
    // Authenticating User 
    // We are sending the found user to be stored in the session 
    // If there is no such user then we send error or whatever appropriate thing to notify the server to not store the session.
    // Then based on whether r not the session is stored the 
    if (!user) {
        return done(null, false, {
            message: "User or password wrong..!"
        });
    }
    if (user.password === password) {
        console.log("Inisde the password section , user.password : ", user.password);
        console.log("Inisde the password section , password : ", password);
        return done(null, user);
    }
    else {
        console.log("user password not correct..!");
        return done(null, false, {
            message: `User password wrong : ${password}`,
        });
    }
}));
// }
// Google Strategy
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: "68813882535-sdrb29itpimmeok7h5b0auv47pvfla88.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:3000/api/auth/login/Google/callback",
}, function verify(accessToken, refreshToken, profile, done) {
    // primsa / database call to store the user in the databse of ours
    // The id we shoudl use should be the id of our databse not google's because there may occur a situation where the id may same.
    if (profile) { // typically the response that we get after the databse callshould be used here instead of profile.
        return done(null, profile);
    }
    else {
        return done(null, false, { message: "Not authenticated verify() function failed." });
    }
}));
passport_1.default.serializeUser(function (user, done) {
    process.nextTick(function () {
        console.log("seriaize User called only once per login");
        done(null, user);
    });
});
passport_1.default.deserializeUser(function (user, done) {
    console.log("deserialize user called after login for every session.");
    // const retreivedUser = users.find(user1 => user1.id === user.id)
    // if(retreivedUser){
    process.nextTick(function () {
        return done(null, user);
    });
    // }
    // else{
    //     return done(new Error("Deserializing error"), false)
    // }
});
authRouter.post('/login/localPassword', passport_1.default.authenticate('local', {
    scope: ["profile", "email"],
}));
authRouter.get("/login/Google", passport_1.default.authenticate("google", {
    scope: ['profile', 'email']
}));
authRouter.get("/login/Google/callback", passport_1.default.authenticate("google", {
    successRedirect: "/api/data/encryptedData",
    failureRedirect: "/api/auth/error"
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
authRouter.get("/login/localPassword", (req, res) => {
    return res.json({
        message: "healthy "
    });
});
authRouter.get("/error", (req, res) => {
    return (res.json({
        message: "You are not logged in...! Or failure in Login"
    }));
});
exports.default = authRouter;
