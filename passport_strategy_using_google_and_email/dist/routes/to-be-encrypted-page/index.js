"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const contentRouter = (0, express_1.Router)();
contentRouter.get('/successfullLogin', (req, res) => {
    return res.json({
        message: 'This is the data which you would be viewing only when successfully logged in...!',
    });
});
exports.default = contentRouter;
