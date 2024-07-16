"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authIndex_1 = __importDefault(require("./routes/auth/authIndex"));
const to_be_encrypted_page_1 = __importDefault(require("./routes/to-be-encrypted-page"));
const app = (0, express_1.default)();
const cors_1 = __importDefault(require("cors"));
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    methods: "GET, POST, PUT, DELETE"
}));
app.use((0, express_session_1.default)({
    secret: "secret for session",
    resave: false,
    saveUninitialized: false,
}));
app.use(passport_1.default.session());
app.use("/api/auth", authIndex_1.default);
app.use("/api/data", to_be_encrypted_page_1.default);
app.listen(3000, () => {
    console.log("server running in port 3000...!");
});
