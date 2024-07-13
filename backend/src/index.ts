import express from "express"
import authRouter from "./routes/auth/authIndex"
import contentRouter from "./routes/to-be-encrypted-page/encryptedIndex"
const app = express()
import cors from "cors"
import session from "express-session"
import passport from "passport"


app.use(express.json())

app.use(cors({
    origin : "http://localhost:5173",
    methods : "GET, POST, PUT, DELETE"
}))
// initPassport()
app.use(session({
    secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: true }
}))

app.use(passport.session())

app.use("/api/auth", authRouter)
app.use("/api/data", contentRouter)





app.listen(3000, ()=>{
    console.log("server running in port 3000...!")
})