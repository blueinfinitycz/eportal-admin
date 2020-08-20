const express = require('express');
const router = express.Router();
const config = require('../../config')
const data = require('./data.json')


router.post('/login',(req, res, next)=>{
    console.log("LOGIN PRED: ",data.admin.login === req.body.login && data.admin.password===req.body.pass)
        if(data.admin.login === req.body.login && data.admin.password===req.body.pass){
            console.log("LOGIN PO: ")
            res.header('Set-Cookie', `userID=${config.JWT_TOKEN}, userName=${data.admin.login}; max-age=3600`)
            res.send({isLogged:1, user:data.admin.login})
        }else{
            res.send({isLogged: 0, user: ''})
        }
})

router.post('/logout',(req, res)=>{
    console.log('LOGOUT')
    res.header('Set-Cookie', `userID=${config.JWT_TOKEN}; max-age=0`)
    res.send({isLogged: 0, user: ''})
})


module.exports=router;