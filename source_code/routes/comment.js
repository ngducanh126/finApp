const express=require('express')
const router=express.Router({mergeParams:true});
const passport = require('passport');
const Client=require('../models/client')
const Expert=require('../models/expert')
const Blog=require('../models/blogs/blog')
const Comment=require('../models/blogs/comment')


// POST A COMMENT 

router.post('/',async(req,res)=>{
    const {id}=req.params
    const blog=await Blog.findById(id);
    const comment=await new Comment(req.body);
    await comment.save()
    await blog.comments.push(comment._id);      //BUGGGG    
    await blog.save();

    // CREATING AUTHOR FOR COMMENT
    if(!(req.session.isClient==undefined)){
        const client=await Client.findById(req.session._id)
        comment.authorClient=await client._id
        comment.save();
    }
    if(!(req.session.isExpert==undefined)){
        const expert=await Expert.findById(req.session._id)
        comment.authorExpert=await expert._id
        comment.save();
    }

    res.redirect(`/blog/${blog._id}`)
})

router.delete('/:commentId',async(req,res)=>{
    const {id,commentId}=req.params;
    const comment=await Comment.findById(commentId)
    const blog=await Blog.findByIdAndUpdate(id,{$pull:{comments:commentId}});
    res.redirect(`/blog/${id}`);
    
})


module.exports=router;