"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initPassport = void 0;
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const db_1 = require("../../fake-db/db");
const express_1 = require("express");
const authRouter = (0, express_1.Router)();
const initPassport = () => {
    passport_1.default.use(new passport_local_1.Strategy(function verify(email, password, done) {
        const user = db_1.users.find((user) => user.email === email);
        console.log("Inisde the function where user is authenticated : ");
        console.log('Inisde the function where user is authenticated : email : ', email);
        console.log('Inisde the function where user is authenticated : password : ', password);
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
        return done(null);
    }));
};
exports.initPassport = initPassport;
passport_1.default.serializeUser(function (user, done) {
    process.nextTick(function () {
        done(null, user);
    });
});
passport_1.default.deserializeUser(function (user, done) {
    process.nextTick(function () {
        done(null, user);
    });
});
authRouter.post("/login/localPassword", passport_1.default.authenticate('local', {
    successRedirect: "/api/data/encryptedData",
    failureRedirect: "/api/auth/error"
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
