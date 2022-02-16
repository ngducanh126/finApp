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
    if(!(blog.authorExpert==undefined)){
        if( !(blog.authorExpert==(req.session._id))){
            req.flash('error','you do not have permission')
            res.redirect('/blog/')
        }else{
            next()
        }
    }




    // if( (!(blog.authorClient.equals(req.session._id)))  || (!(blog.authorExpert.equals(req.session._id)))){
    //     // req.flash('error','you do not have permission');
    //     // return res.redirect(`/blog/${id}`)
    //     res.send('you do not have permission')
    // }
    // next()
}

//SHOW ALL BLOGS
router.get('/',async(req,res)=>{
    const blogs=await Blog.find({}).populate('authorExpert').populate('authorClient');
    res.render('Blog/index2.ejs',{blogs})
})
router.post('/',async(req,res)=>{
    res.redirect('/')
})

// GET FORM TO CREATE NEW BLOG
router.get('/new',async(req,res)=>{
    if((req.session.isClient) || (req.session.isExpert)){
        res.render('Blog/new.ejs')
    }
    else{
        res.send('not log in')
    }
})

// CREATE A BLOG
router.post('/',async(req,res)=>{
    const blog=await new Blog(req.body);
    await blog.save();
    if(!(req.session.isClient==undefined)){
        const client=await Client.findById(req.session._id)
        blog.authorClient=await client._id
        blog.save();
        await client.blogs.push((blog._id))
        client.save()
        req.flash('success','you just created a blog')
        res.redirect('/blog/')
        // res.send(typeof(blog._id))
    }
    if(!(req.session.isExpert==undefined)){
        const expert=await Expert.findById(req.session._id)
        blog.authorExpert= await expert._id
        blog.save();
        await expert.blogs.push(blog._id)
        expert.save()
        req.flash('success','you just created a blog')
        res.redirect('/blog/')
    }
    
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
    if(blog.authorClient==true){
        // res.render("Blog/show2.ejs",{blog,comment:blog.comments})
        res.render("Blog/show2.ejs",{blog,commentList})
    }else{
        // res.render("Blog/show2.ejs",{blog,comment:blog.comments})
        res.render("Blog/show2.ejs",{blog,commentList})

    }
    
})

// FORM TO EDIT A BLOG
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




console.log('blog route is runningggggggggggggggg')
module.exports=router;