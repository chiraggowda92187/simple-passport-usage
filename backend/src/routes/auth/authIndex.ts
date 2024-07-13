import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { users } from "../../fake-db/db";
import { Router } from "express";


const authRouter = Router()


// export const initPassport = ()=>{
    passport.use(new LocalStrategy(function verify(email, password, done){
        const user = users.find((user) => user.email === email);
        console.log("Inisde the function where user is authenticated : ")
        console.log('Inisde the function where user is authenticated : email : ', email);
        console.log('Inisde the function where user is authenticated : password : ', password);
        if(!user){
            return done(null, false, {
                message : "User or password wrong..!"
            })
        }
        if(user.password===password){
            console.log("Inisde the password section , user.password : ", user.password)
            console.log("Inisde the password section , password : ", password)
            return done(null, user)
        }
        return done(null)
}))
// }


passport.serializeUser(function(user, done){
    process.nextTick(function(){
        done(null, user)
    })
})
passport.deserializeUser(function(user : any, done){
    process.nextTick(function(){
        done(null, user)
    })

})

authRouter.post("/login/localPassword", passport.authenticate('local',{
    successRedirect : "/api/data/encryptedData",
    failureRedirect : "/api/auth/error"
}))
authRouter.get("/login/localPassword", (req, res)=>{
    return res.json({
        message : "healthy "
    })
})

authRouter.get("/error", (req, res)=>{
    return (
        res.json({
            message : "You are not logged in...! Or failure in Login"
        })
    )
})

export default authRouter