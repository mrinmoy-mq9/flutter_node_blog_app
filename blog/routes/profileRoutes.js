import express, { response } from 'express';
import Profile from '../mongoose/models/Profile.js';
import  Jwt  from 'jsonwebtoken';
import checkToken from '../middleware.js';
import router from './userRoutes.js';
import multer from 'multer';
import path from "path";


const storage = multer.diskStorage({
    destination: (req,file,cb) =>{
        cb(null , './upload');
    },
    filename:(req,file,cd) =>{
        cd(null , req.body.username + ".jpg");
    }
});

const fileFilter = (req, file ,cd) => {
    if (file.mimetype =="image/jpeg" || file.mimetype == "image/png"){
        cd(null, true);
    }else{
        cd(null, false);
    }
};

const upload = multer({
    storage:storage,
    limits: {
        fileSize: 1024 * 1024 * 6,
    },
    //fileFilter:fileFilter
});


router.route("/add/image").patch(checkToken , upload.single("img") , async (req ,res)=>{
    await Profile.findOneAndUpdate(
        { username:req.body.username},
        {
            $set:{
                img: req.body.title
            }
        },
        {
            new:true
        },
        
        
    ).then((profile) =>{
        const response = {
            message: "Image add successfull upload",
            data:profile,
        }

        return res.status(200).json(response);
    }).catch(err =>{
        if(err) return res.status(500).json(err);
    })
});


router.route("/add/title").patch(checkToken , upload.single("img") , async (req ,res)=>{
    await Profile.findOneAndUpdate(
        { username:req.body.username},
        {
            $set:{
                title: req.body.title
            }
        },
        {
            new:true
        },
        
    ).then((profile) =>{
        const response = {
            message: "Image add successfull upload",
            data:profile,
        }

        return res.status(200).json(response);
    }).catch(err =>{
        if(err) return res.status(500).json(err);
    })
})


router.route('/add').post(checkToken,(req ,res)=>{
    const profile = Profile({
        username:req.body.username,
        name:req.body.name,
        profession:req.body.profession,
        DOB:req.body.DOB,
        title:req.body.title,
        about:req.body.about,
    });

    profile.save()
    .then(()=>{
        return res.json({msg:"profile successfull stored"});
    })
    .catch((err)=>{
        return res.status(400).json({err:err});
    });

});


router.route('/find').get((req ,res)=>{
    Profile.find().then((result)=>{
            res.json({
                data:result ,
                msg:" profile"
                
               //req.params.username,
            })
    }).catch(err =>{
        res.status(500).json({msg:err})
    })
});

export default router