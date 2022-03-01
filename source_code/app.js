if(process.env.NODE_ENV !=='production'){
    require('dotenv').config();
}
const express=require('express')
const app=express();
const path=require('path')
const mongoose=require('mongoose')
const flash=require('connect-flash')
const methodOverride=require('method-override')
const ejsMate=require('ejs-mate')


//PASSPORT
const session=require('express-session')
const passport=require('passport');
const LocalStrategy=require('passport-local')

//MODELS
const Client=require('./models/client')
const Expert=require('./models/expert')
const Blog=require('./models/blogs/blog')
// // const companyAdmin=require('./models/companyAdmin')

// //ROUTES
const clientRoutes=require('./routes/client');
const expertRoutes=require('./routes/expert')
const blogRoutes=require('./routes/blog')
const commentRoutes=require('./routes/comment')

// const companyUserRoutes=require('./routes/companyUser')
// const reviewRoutes=require('./routes/review');
// const res = require('express/lib/response');




//MIDDLEWARE


app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'))
app.engine('ejs',ejsMate)


app.use(express.static(path.join(__dirname, 'public')))
app.use(methodOverride('_method'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(flash())

// app.use(express.static(path.join(__dirname, 'public')))



//PASSPORT and authentication CONFIGURATION
const sessionConfig={
    secret:'myproject secretssssssss',
    resave: false,
    saveUninitialized:false
    
}
app.use(session(sessionConfig))

app.use(passport.initialize())   // 1.initialize
app.use(passport.session())  //to create persistent login session  2. passport.session

passport.use('client',new LocalStrategy(Client.authenticate()))             //  3.use new local stretegy
passport.serializeUser(Client.serializeUser());                    //4 serialize and deserialize
passport.deserializeUser(Client.deserializeUser());

passport.use('expert',new LocalStrategy(Expert.authenticate()))             //  3.use new local stretegy
// passport.serializeUser(Expert.serializeUser());                    //4 serialize and deserialize
// passport.deserializeUser(Expert.deserializeUser());

mongoose.connect('mongodb://localhost:27017/financeApp')
.then(()=>{
    console.log('connection open!!!')
})
.catch(err=>{
    console.log('error')
})



app.use((req,res,next)=>{
    res.locals.currentUser=req.session
    res.locals.success=req.flash('success')
    res.locals.error=req.flash('error')
    next()
})

// ROUTING: 
app.get('/',async(req,res)=>{
    const expert=await Expert.find({})
    const blog=await Blog.find({}).populate('authorClient').populate('authorExpert')
    res.render('./Home/index3.ejs',{expert,blog})
})
app.use('/client',clientRoutes)
app.use('/expert',expertRoutes)
app.use('/blog',blogRoutes)
app.use('/blog/:id/comment',commentRoutes)
app.use('/draft',async(req,res)=>{
    res.redirect('/blog/')
    res.render('draft.ejs')
})
app.get('/signup',(req,res)=>{
    res.render('signup.ejs')
})


///
console.log('main app is running')
app.listen(3000,()=>{
    console.log('app is running on port 3000')
})