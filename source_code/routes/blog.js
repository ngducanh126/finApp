if(process.env.NODE_ENV !=='production'){
    require('dotenv').config();
}

const express=require('express')
const router=express.Router();
const passport = require('passport');
// const ClientBlog = require('../models/blogs/clientBlog');
// const ExpertBlog = require('../models/blogs/expertBlog');
const Client=require('../models/client')
const Expert=require('../models/expert')
const Blog=require('../models/blogs/blog')
const Comment=require('../models/blogs/comment');
const comment = require('../models/blogs/comment');

//multer cloudinary
const multer=require('multer')
const {storage}=require('../cloudinary/index')
var upload=multer({storage:storage})


// MIDDLEWARES
const isAuthor=async(req,res,next)=>{
    const {id}=req.params;
    const blog=await Blog.findById(id);
    if(!(blog.authorClient==undefined)){
        if( !(blog.authorClient==(req.session._id))){
            req.flash('error','you do not have permission')
            res.redirect('/blog/')
            
        }else{
            next()
        }
    }
}

//SHOW BLOGS BY CATEGORY
router.get('/category/:category',async(req,res)=>{
    const {category}=req.params;
    const blogs=await Blog.find({category:category})
    res.render('Blog/category.ejs',{blogs:blogs})
})
//SHOW ALL BLOGS
router.get('/',async(req,res)=>{
    const blogs=await Blog.find({}).sort({views:-1}).populate('authorExpert').populate('authorClient');
    // const i=await blogs.length-1
    res.render('Blog/index.ejs',{blogs})
    // res.send(blogs)
})

// GET PAGE TO CREATE NEW BLOG
router.get('/new',async(req,res)=>{
    if((req.session.isClient) || (req.session.isExpert)){
        res.render('Blog/new.ejs')
    }
    else{
        res.send('not log in')
    }
})
// GET form TO CREATE NEW BLOG
router.get('/create',async(req,res)=>{
    if((req.session.isClient) || (req.session.isExpert)){
        res.render('Blog/create.ejs')
    }
    else{
        res.send('not log in')
    }
})

// CREATE A BLOG
router.post('/',upload.single('img'),async(req,res)=>{
        // const {views}=req.body
        // const view=
        // const {body,image,title,category}=req.body
        const blog=await new Blog(req.body);
        const clientUser=await Client.findById(req.session._id)
        blog.image.url=req.file.path
        blog.image.filename=req.file.filename
        blog.authorClient=await clientUser._id
        blog.save();
        await clientUser.blogs.push((blog._id))
        clientUser.save()
        req.flash('success','you just created a blog')
        res.redirect('/blog/')
        // res.render()
        // res.send(typeof(blog._id))
    
    
})

// SHOW 1 BLOG
router.get('/:id',async(req,res)=>{
    const {id}=req.params;
    const blog=await Blog.findById(id).populate('authorExpert').populate('authorClient').populate('comments');
    var commentList=new Array()
    for (c of blog.comments){
        var commentID=c._id
        commentList.push(await Comment.findById(commentID).populate('authorClient').populate('authorExpert'))
    }
    res.render("Blog/show.ejs",{blog,commentList})
})

// // FORM TO EDIT A BLOG
router.get('/:id/edit',isAuthor,async(req,res)=>{
    const {id}=req.params;
    const blog=await Blog.findById(id)
    console.log('form runnig')
    res.render('Blog/edit.ejs',{blog:blog})
})

//EDIT A BLOG
router.put('/:id',isAuthor,async(req,res)=>{
    const {id}=req.params;
    const blog=await Blog.findByIdAndUpdate(id,{body:req.body.body})
    req.flash('success','you just updated a blog')
    res.redirect('/blog/')
})

//DELETE A BLOG
router.delete('/:id',isAuthor,async(req,res)=>{
    const {id}=req.params
    const blog=await Blog.findByIdAndDelete(id)
    req.flash('success','you just deleted a blog')
    res.redirect('/blog/')
})
module.exports=router;