import express from 'express';
import User from '../mongoose/models/user.js';
import  Jwt  from 'jsonwebtoken';
import checkToken from '../middleware.js';
import Post from '../mongoose/models/post.js';

const router = express.Router();






router.route('/add').post((req ,res)=>{
    console.log('post add ....');
    //res.send("post add.....");
    const profile = new Post({
        "header":req.body.header,
        "title":req.body.title,
        "desc":req.body.desc,
        "photo":req.body.photo,
    });

    profile.save()
    .then(()=>{
        return res.json({msg:"post successfull stored in mongo bd"});
    })
    .catch((err)=>{
        return res.status(400).json({err:err});
    });

});





router.route('/:postid').get((req ,res)=>{
    Post.findOne({"title":req.params.postid}).then((result)=>{
            res.json({
                data:result ,
                postid:req.params.postid,
                
               //req.params.username,
            })
    }).catch(err =>{
        res.status(500).json({msg:err})
    })
});


router.route('/find/all').get((req ,res)=>{
    Post.find().then((result)=>{
            res.status(200).json({
                "data":result
                //postid:req.params.postid
                
               //req.params.username,
            })
    }).catch(err =>{
        res.status(500).json({msg:err})
    })
});


router.route('/update/:postid').patch((req,res) => {

    User.findOneAndUpdate(
        {header:req.params.postid},
        {$set: { title: req.body.title}},
    ).then((user)=>{
        if(!user) return res.status(404).json(" user not found");
        const msg ={
            msg:"post succfully updated",
            postid:req.params.postid
        }
        return res.json(msg);
    }).catch(err =>{
        console.error('Error updating model:', err);
        res.status(500).json({ err: 'Internal server error' });
    });

    
   
});



router.route('/delete/:postid').delete( (req,res) => {

    Post.findOneAndDelete(
        {header:req.params.postid},
        
    ).then(
        ()=>{
            //if(!user) return res.status(500).json({msg:user});
            const msg = {
                msg:"post success fully delete",
                postid:req.params.postid,
            }
            return  res.json({msg});
        }
    ).catch((err)=>{
        console.error('Error deleteing model:', err);
        res.status(500).json({ err: 'Internal server error' });
    });
    
});


export default router