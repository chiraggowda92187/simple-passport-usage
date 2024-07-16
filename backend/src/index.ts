import express from "express"
import authRouter from "./routes/auth/authIndex"
import contentRouter from "./routes/to-be-encrypted-page/encryptedIndex"
const app = express()
import cors from "cors"
import session from "express-session"
import passport from "passport"
import cookieparser from "cookie-parser"


app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: 'GET, POST, PUT, DELETE',
  })
);
app.use(express.json())
app.use(cookieparser())
app.use(express.urlencoded({extended : false}))



// initPassport()


app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    
  })
);

app.use(passport.session())

app.use("/api/auth", authRouter)
app.use("/api/data", contentRouter)





app.listen(3000, ()=>{
    console.log("server running in port 3000...!")
})