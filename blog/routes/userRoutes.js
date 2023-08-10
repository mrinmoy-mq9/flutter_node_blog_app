import express from 'express';
import User from '../mongoose/models/user.js';
import  Jwt  from 'jsonwebtoken';
import checkToken from '../middleware.js';
import Post from '../mongoose/models/post.js';

const router = express.Router();


router.route('/:username').get( checkToken,(req ,res)=>{
    User.findOne({username:req.params.username}).then((result)=>{
            res.json({
                data:result ,
                username:req.params.username,
                
               //req.params.username,
            })
    }).catch(err =>{
        res.status(500).json({msg:err})
    })
});



router.route('/checkusername/:username').get( (req ,res)=>{
    User.findOne({username:req.params.username}).then((result)=>{
        if(result != null){
            return res.json({
                status:true ,    
            });
        }else return res.json({
            status:false,
        });  
        
    }).catch(err =>{
        res.status(500).json({msg:err})
    })
});


router.route('/login').post((req ,res)=>{
    User.findOne({username:req.body.username}).then((result)=>{
        if(result === null){
            return res.status(403).json('username is incorrect');
         }
        if(result.password === req.body.password){

          let token =  Jwt.sign({username:req.body.username}, 'MyBlogThing',   { expiresIn:"24h",});
            res.json({ token:token, msg:"succes"})
        }else{
            res.status(403).json('password is incorect')
        }
    }).catch(err =>{
        res.status(500).json({msg:{'gg':"bbbbvbv"}})
   })
});

router.route('/register').post((req,res) => {

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

    
})


router.route('/update/:username').patch(checkToken,(req,res) => {

    User.findOneAndUpdate(
        {username:req.params.username},
        {$set: { password: req.body.password}},
    ).then((user)=>{
        if(!user) return res.status(404).json(" user not found");
        const msg ={
            msg:"password succfully updated",
            username:req.params.username
        }
        return res.json(msg);
    }).catch(err =>{
        console.error('Error updating model:', err);
        res.status(500).json({ err: 'Internal server error' });
    });

    
   
});



router.route('/delete/:username').delete(checkToken ,(req,res) => {

    User.findOneAndDelete(
        {username:req.params.username},
        
    ).then(
        ()=>{
            //if(!user) return res.status(500).json({msg:user});
            const msg = {
                msg:"password success fully delete",
                username:req.params.username,
            }
            return  res.json({msg});
        }
    ).catch((err)=>{
        console.error('Error deleteing model:', err);
        res.status(500).json({ err: 'Internal server error' });
    });
    
});



router.route('/post/add').post((req ,res)=>{
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


router.route('/register').post((req,res) => {

    console.log('post add ....');
    //res.send("post add.....");
    const profile = Post({
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
    



    
})


router.route('/post/:postid').get((req ,res)=>{
    User.findOne({header:req.params.postid}).then((result)=>{
            res.json({
                data:result ,
                postid:req.params.postid,
                
               //req.params.username,
            })
    }).catch(err =>{
        res.status(500).json({msg:err})
    })
});


router.route('/update/:postid').patch((req,res) => {

    User.findOneAndUpdate(
        {username:req.params.postid},
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

    User.findOneAndDelete(
        {username:req.params.postid},
        
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