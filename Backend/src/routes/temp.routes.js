import express from 'express';
const router = express.Router();


router.get('/get',(req,res)=>{
    res.send("Hello Temp Routes");
})


export default router;