"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authIndex_1 = __importDefault(require("./routes/auth/authIndex"));
const encryptedIndex_1 = __importDefault(require("./routes/to-be-encrypted-page/encryptedIndex"));
const app = (0, express_1.default)();
const cors_1 = __importDefault(require("cors"));
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
app.use((0, cors_1.default)({
    origin: 'http://localhost:5173',
    methods: 'GET, POST, PUT, DELETE',
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.urlencoded({ extended: false }));
// initPassport()
app.use((0, express_session_1.default)({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
}));
app.use(passport_1.default.session());
app.use("/api/auth", authIndex_1.default);
app.use("/api/data", encryptedIndex_1.default);
app.listen(3000, () => {
    console.log("server running in port 3000...!");
});
