"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const fake_db_1 = require("../../fake-db");
const express_1 = require("express");
const authRouter = (0, express_1.Router)();
passport_1.default.use(new passport_local_1.Strategy(function verify(email, password, done) {
    const user = fake_db_1.users.find((user) => {
        if (user.email === email) {
            return user;
        }
    });
    if (!user) {
        return done(null, false, {
            message: "User or password wrong..!"
        });
    }
    if (user.password === password) {
        return done(null, user);
    }
}));
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
    successRedirect: "/api/encryptedData",
    failureRedirect: "/api/auth/error"
}));
authRouter.get("/error", (req, res) => {
    return (res.json({
        message: "You are not logged in...! Or failure in Login"
    }));
});
exports.default = authRouter;
