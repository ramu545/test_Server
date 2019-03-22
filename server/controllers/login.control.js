const mongoose = require('mongoose');
const User = mongoose.model('User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

 module.exports.register = async(req,res,next)=>{
    if(req.body && req.body.uname && req.body.email && req.body.password){
      //console.log(req.body);
      let salt = bcrypt.genSaltSync(10);
      let hashpassword = bcrypt.hashSync(req.body.password, salt);
      const user = new User({
         uname:req.body.uname,
         email:req.body.email,
         password:hashpassword
      });
      await User.findOne({email:req.body.email},(err,data)=>{
         if(err){
            let error =  {
               name:"Internal Server Error",
               message:"Finding User Faild",
            } 
            res.status(500).json(error);
         }
         else if(!data){
            user.save((err,user)=>{
               if(err){
                  let error = {
                     name:"Internal Server Error",
                     message:"Inserting User Faild",
                  }
                  res.status(500).json(error);   
               }
               else{
                  let jwtToken = jwt.sign({_id:user._id}, 'signature', { expiresIn: 60 * 60 });
                  let data = {
                     auth:true,
                     name:user.uname,
                     role:user.role,
                     token:jwtToken
                  }
                  res.status(200).send(data);
               }
            });
         }
         else{
            let result = {
               name:"User Allready Exit",
               message:"Create New Account",
               auth:true
            }
            res.status(200).json(result);
         }
      });
    }
    else{
      let error = {
         name:"Bad Request",
         message:"Required Fealds Are Missing"
      }
      res.status(400).json(error);
    }
 }

 module.exports.loginUser = async(req,res,next)=>{
   if(req.body && req.body.uname && req.body.email && req.body.password){
      User.findOne({email:req.body.email},(err,userdata)=>{
         if(err){
            let error= {
               name:"Internal Server",
               message:"User Not Find"
            }
            res.status(500).json(error);
         }
         else{
            let passwordMatch = bcrypt.compareSync(req.body.password, userdata.password);
            if(!passwordMatch){
               let perror = {
                  name:" Un Authorised ",
                  message:" Password not Matched ..! "
               }
               res.status(401).json(perror);
            }
            else{
               let jwtToken = jwt.sign({_id:userdata._id}, 'signature', { expiresIn: 60 * 60 });
               let data = {
                  auth:true,
                  name:userdata.uname,
                  role:userdata.role,
                  token:jwtToken
               }
               res.status(200).send(data);                
            }
         }
      });
   }
   else{
      let error = {
         name:"Bad Request",
         message:"Required Fealds Are Missing"
      }
      res.status(400).json(error);
   }
 }

 module.exports.authCheck = async (req,res,next)=>{
   let jwttoken = req.headers['jwt-token'];
   if(!jwttoken){
      let error = {
            name :"Token Not Found",
            message:"Token Not Avilable",
      }
      res.status(404).send(error);
   }
   else{
      jwt.verify(jwttoken,'signature',(err,sucess)=>{
         if(err){
            let error = {
               name:" Un Authorized ",
               message:" UnAuthorised User ..! "
            }
            res.status(401).json(error);
         }
         else{
            console.log(sucess);
         }
      })
   }
 }