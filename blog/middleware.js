import  Jwt from "jsonwebtoken";



const checkToken = (req,res,next) => {
    let token = req.headers["authorization"];
    console.log('next js nnnnnn   ',token);
    token = token.slice(7,token.length);
    if(token){

        console.log('next js kkkkkk   ',token);

        Jwt.verify(token,'MyBlogThing',(err , decoded)=>{
            if(err){
                return res.json({
                    status:false,
                    msg:'token is invalid'
                })
            }else{
                req.decoded = decoded;
                next();
            }
        })
    }else{
        return res.json({
            status:false,
            msg:"token is not provided"
        })
    }
}


export default checkToken