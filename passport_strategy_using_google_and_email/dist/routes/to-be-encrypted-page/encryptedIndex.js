"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const contentRouter = (0, express_1.Router)();
contentRouter.get('/encryptedData', (req, res) => {
    console.log("The req.user is : ", req.user);
    if (req.user) {
        return res.json({
            message: 'This is the data which you would be viewing only when successfully logged in...!',
        });
    }
    req.logout((err) => {
        console.log(err);
    });
    return res.redirect("api/auth/login");
});
exports.default = contentRouter;
