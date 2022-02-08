const express=require('express')
const router=express.Router();
const passport = require('passport');
const Expert=require('../models/expert')

router.get('/',(req,res)=>{
    res.send('expert page')
})

//REGISTER
router.get('/register',(req,res)=>{
    res.render('Expert/register.ejs')
})
router.post('/register',async(req,res)=>{
    const {fullname,email,age,username,password}=req.body
    const expert= await new Expert({fullname,email,age,username});
    const registeredExpert=await Expert.register(expert,password);
    // req.login(registeredExpert,err=>{
    //     req.session._id=req.user._id;
    //     req.session.isExpert=true;
    //     req.render('Home/index.ejs')
    // })
    req.session._id=expert._id;
    req.session.isExpert=true;
    res.render('Home/index.ejs')
})

//LOGIN 

router.get('/login',(req,res)=>{
    res.render('Expert/login.ejs')
})
router.post('/login',passport.authenticate('expert',{}),(req,res)=>{
    // res.send(req.session)
    // res.redirect('/')
    // req.flash('info','login success')
    // res.send(req.user)
    req.session._id=req.user._id;
    req.session.isExpert=true;
    res.render('Home/index.ejs')
})
//LOG OUT
router.get('/logout',(req,res)=>{
    req.session.destroy();
    res.send('you just logged out')
    // res.render('users/login')

})
router.get('/session',(req,res)=>{
    if(req.user){
        res.send(req.user)
    }else{
        res.send('no session')
    }
})
// VIEW MY ACCOUNT 
// router.get('/profile')

console.log('running expert route')

module.exports=router;