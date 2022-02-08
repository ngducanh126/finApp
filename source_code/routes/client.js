const express=require('express')
const router=express.Router();
const passport = require('passport');
const Client=require('../models/client')

router.get('/',(req,res)=>{
    res.send('client page')
})

/// 1. AUTHENTICATION

//REGISTER
router.get('/register',(req,res)=>{
    res.render('Client/register.ejs')
})
router.post('/register',async(req,res)=>{
    const {fullname,email,age,username,password}=req.body
    const client= await new Client({fullname,email,age,username});
    const registeredClient=await Client.register(client,password);
    // res.send('register success')
    // req.login(registeredClient,err=>{
    //     // if(err)return next(err)
    //     // req.flash('success','registered and logged into yelpcamp successfully')
    //     req.session._id=req.user._id;
    //     req.session.isClient=true;
    //     req.render('Home/index.ejs')
    // })
    req.session._id=client._id;
    req.session.isClient=true;
    res.render('Home/index.ejs')
    
    
})

//LOGIN 

router.get('/login',(req,res)=>{
    res.render('Client/login.ejs')
})
router.post('/login',passport.authenticate('client',{failureRedirect:'/client/login'}),(req,res)=>{
    // res.send(req.session)
    // res.redirect('/')
    // req.flash('info','login success')
    req.session._id=req.user._id;
    req.session.isClient=true;
    res.render("Home/index.ejs")
})
//LOG OUT
router.get('/logout',(req,res)=>{
    req.session.destroy();
    res.send('you just logged out')
    // res.render('users/login')

})



// CREATING BLOGS
// router.







console.log('running client routeeeee')
module.exports=router;