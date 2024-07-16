import { Router } from "express";




const contentRouter = Router()



contentRouter.get('/encryptedData', (req, res) => {
  console.log("The req.user is : ", req.user)
  if(req.user){
    return res.json({
      message:
        'This is the data which you would be viewing only when successfully logged in...!',
    });
  }
  req.logout((err)=>{
    console.log(err)
  })
  return res.redirect("api/auth/login")  
});


export default contentRouter