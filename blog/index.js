import express from 'express'
import cors from 'cors';

import connectDb from './mongoose/connectDb.js';
import Post from './mongoose/models/post.js';
import User from './mongoose/models/user.js';

import userRoute from './routes/userRoutes.js'
import profileRoute from './routes/profileRoutes.js';
import postRoute from './routes/postRoutes.js';

const app  = express()

const PORT = 3000

app.use(cors())
app.use(express.json())

app.use('/post',postRoute);
app.use('/user',userRoute);
app.use('/profile',profileRoute);


app.post('/',(req,res)=>{
    
    Post({
        name:req.body.name,
        title:req.body.title,
        desc:req.body.desc,
        photo:req.body.photo
    }).save()

    res.send('success....')
})

app.get('/',(req,res)=>{
     Post.findOne({desc:"nnn nnnn nnnnn"}).then((doc)=>{ console.log('no problem'), res.header("content-Type",'application/json'); res.json({"name":doc.name,"title":doc.title,"desc":doc.desc ,"photo":doc.photo})})
    

    //res.send("found it")
    
})


app.get('/user',(req,res)=>{
    User.findOne({userId:50}).then((doc)=>{ console.log('no problem'), res.header("content-Type",'application/json'); res.json({"userId":doc.userId,"id":doc.id,"title":doc.title})})
    //res.send("ghhg")
})

app.post('/user',(req,res)=>{
    console.log(req.body.userId);
    User({
        userId:req.body.userId,
        id:req.body.id,
        title:req.body.title,
    }).save().then(()=>console.log("no error"))

    res.send('success....')
})







const startServer = ()=>{

    try {
        connectDb("mongodb+srv://bradyfiction001:mrinmoydas@cluster0.ang7hid.mongodb.net/?retryWrites=true&w=majority")        
        app.listen(PORT , ()=>{
            console.log('server connected succes full')
        })

    } catch (error) {
        console.log(error)
    }
}


startServer()