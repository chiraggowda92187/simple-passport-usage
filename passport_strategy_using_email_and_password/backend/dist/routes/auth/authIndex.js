"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
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
passport_1.default.serializeUser(function (user, done) {
    process.nextTick(function () {
        console.log("seriaize User called only once per login");
        done(null, {
            id: user.id,
            name: user.name,
            email: user.email
        });
    });
});
passport_1.default.deserializeUser(function (user, done) {
    console.log("deserialize user called after login for every session.");
    const retreivedUser = db_1.users.find(user1 => user1.id === user.id);
    if (retreivedUser) {
        process.nextTick(function () {
            return done(null, {
                id: retreivedUser.id,
                name: retreivedUser.name,
                email: retreivedUser.email
            });
        });
    }
    else {
        return done(new Error("Deserializing error"), false);
    }
});
authRouter.post('/login/localPassword', passport_1.default.authenticate('local', {
    failureRedirect: "/api/auth/error",
    successRedirect: "/api/data/encryptedData"
}));
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
