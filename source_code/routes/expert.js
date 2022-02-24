const express=require('express')
const router=express.Router();
const passport = require('passport');
const Expert=require('../models/expert')
const Client=require('../models/client')
// const Blog=require('../models/blog')
const Appointment=require('../models/appointment')


// router.get('/',(req,res)=>{
//     res.send('expert page')
// })


// 1. SIGN UP, LOGIN, LOGOUT 

//REGISTER
router.get('/register',(req,res)=>{
    res.render('Expert/register.ejs')
})
router.post('/register',async(req,res)=>{
    const {fullname,email,age,username,password,experience,freetime}=req.body
    const expert= await new Expert({fullname,email,age,username,experience,freetime});
    const registeredExpert=await Expert.register(expert,password);
    
    req.session._id=expert._id;
    req.session.isExpert=true;
    req.flash('success','you have created an account and logged in')
    res.redirect('/expert/profile')
})

//LOGIN 

router.get('/login',(req,res)=>{
    res.render('Expert/login.ejs')
})
router.post('/login',passport.authenticate('expert',{}),(req,res)=>{
    
    
    req.session._id=req.user._id;
    req.session.isExpert=true;
    req.flash('success','you just logged in')
    res.redirect('/expert/profile')

})
//LOG OUT
router.get('/logout',(req,res)=>{
    req.session.destroy();
    res.redirect('/expert/profile')

})
router.get('/session',(req,res)=>{
    if(req.user){
        res.send(req.user)
    }else{
        res.send('no session')
    }
})


// VIEW PROFILE AND APPOINTMENTS

// View profile 
router.get('/profile',async(req,res)=>{
    const expertId=req.session._id
    const expert= await Expert.findById(expertId)
    res.render('Expert/profile.ejs',{expert})
})
// get form to edit profile
router.get('/profile/edit',async(req,res)=>{
    const expertId=req.session._id
    const expert= await Expert.findById(expertId)
    res.render('Expert/edit.ejs',{expert})
})

// edit profile
router.put('/profile',async(req,res)=>{
    const {fullname,age,experience,email,freetime}=req.body
    const expertId=req.session._id
    const expert=await Expert.findByIdAndUpdate(expertId,{fullname:fullname,age:age,experience:experience,email:email,freetime:freetime})
    await expert.save()
    req.flash('success','you just updated your profile')
    res.redirect("/expert/profile")
})

// view appointmens
router.get('/profile/appointment',async(req,res)=>{
    const id=req.session._id
    const expert= await Expert.findById(id)
    const appointment=await Appointment.find({expert:id}).populate('client').populate('expert')
    
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
    res.render('Expert/appointment/index.ejs',{pending,confirmed,expert})
})





// 3. View experts and schedule appointments
router.get('/list',async(req,res)=>{
    const expert= await Expert.find({})
    res.render('Expert/viewExpert/index.ejs',{expert})
})
router.post('/list',async(req,res)=>{
    res.redirect('/list')
})
router.post('/profile/appointment/:id',async(req,res)=>{
    const {id}=req.params
    const appointment=await Appointment.findByIdAndUpdate(id,{state:"confirmed",message:req.body.message})
    req.flash('success','you just confirmed an appointment')
    res.redirect("/expert/profile/appointment")
})
// router.get('/:id',async(req,res)=>{
//     const {id}=req.params
//     const expert= await Expert.findById(id)
//     res.render('Expert/viewExpert/show.ejs',{expert})
// })
router.post('/:id/appointment',async(req,res)=>{
    const {id}=req.params
    const clientId=req.session._id

    const client=await Client.findById(clientId)
    const expert= await Expert.findById(id)

    const appointment= await new Appointment({client:client._id,expert:expert._id,time:req.body.time})
    await appointment.save()
    // res.render('Expert/viewExpert/show.ejs',{expert})
    // res.send('you just made an appointment')
    res.redirect('/expert/list')
})




console.log('running expert route')

module.exports=router;