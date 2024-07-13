import { Router } from "express";




const contentRouter = Router()



contentRouter.get('/encryptedData', (req, res) => {
  return res.json({
    message:
      'This is the data which you would be viewing only when successfully logged in...!',
  });
});


export default contentRouter