if(process.env.NODE_ENV !=='production'){
    require('dotenv').config();
}
const express=require('express')
const router=express.Router();
const passport = require('passport');
const Client=require('../models/client')
const Expert=require('../models/expert')
const Appointment=require('../models/appointment')

//multer cloudinary
const multer=require('multer')
const {storage}=require('../cloudinary/index')
var upload=multer({storage:storage})

router.get('/',(req,res)=>{
    res.send('client page')
})

/// 1. AUTHENTICATION

//REGISTER
router.get('/register',(req,res)=>{
    res.render('Client/register.ejs')
})
router.post('/register',upload.single('img'), async(req,res)=>{
    const {fullname,email,age,username,password,img}=req.body
    const client= await new Client({fullname,email,age,username});
    client.img.url= await req.file.path
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
    req.flash('success','you created an account and logged in!')
    res.redirect('/')
})

//LOGIN 

router.get('/login',(req,res)=>{
    res.render('Client/login.ejs')
})
router.post('/login',passport.authenticate('client',{failureRedirect:'/client/login'}),async(req,res)=>{
    req.session._id=req.user._id;
    req.session.isClient=true;
    const expert= await Expert.find({})
    req.flash('success','logged in success')
    res.redirect('/')
    // res.render("Home/index.ejs",{expert:expert})
})
//LOG OUT
router.get('/logout',(req,res)=>{
    req.session.destroy();
    res.redirect('/')
})


// 2. VIEW profile and appointments

// PROFILE
// router.get('/profile',async(req,res)=>{
//     const client= await Client.findById(req.session._id)
//     // res.render('Client/profile.ejs',{client})
//     // res.render('Client/myprofile',{client})
//     res.send('hey')
// })
// router.post('/profile',async(req,res)=>{
//     res.redirect('/client/profile')
// })
router.get('/profile',async(req,res)=>{
    const clientUser=await Client.findById(req.session._id)
    res.render('Client/profile.ejs',{clientUser})
})
// form to edit profile
router.get('/profile/edit',async(req,res)=>{
    const clientUser= await Client.findById(req.session._id)
    res.render('Client/edit.ejs',{clientUser})
})
// edit profile
router.put('/profile',async(req,res)=>{
    const {fullname,age,email}=req.body
    const clientId=req.session._id
    const client=await Client.findByIdAndUpdate(clientId,{fullname:fullname,age:age,email:email})
    await client.save()
    req.flash('success','you just updated your profile')
    res.redirect("/client/profile")
})

//view appointment
router.get('/profile/appointment',async(req,res)=>{
    const id=req.session._id
    const appointment=await Appointment.find({client:id}).populate('client').populate('expert')
    const pending=[];
    const confirmed=[]
    for (let a of appointment){
        if(a.state=='pending'){
            pending.push(a)
        }
        if(a.state=='confirmed'){
            confirmed.push(a)
        }
    }
    res.render('Client/appointment/index.ejs',{pending,confirmed})
    
    // for (let a of appointment){
    //     console.log(a.expert.fullname)
    // }
})


// // CREATING BLOGS
// // router.







console.log('running client routeeeee')
module.exports=router;