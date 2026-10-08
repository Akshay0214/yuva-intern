const express=require('express'); const Post=require('../models/Post'); const router=express.Router();
router.get('/',async(req,res,next)=>{try{const posts=await Post.find({}).populate('author','name email').sort({createdAt:-1});res.json({count:posts.length,data:posts});}catch(e){next(e)}});
module.exports=router;
