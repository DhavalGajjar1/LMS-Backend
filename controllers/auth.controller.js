const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler');
const User = require('../models/User.model') ;
const generateToken = require('../config/jwt');

const registerUser = asyncHandler(async(req,res)=>{
    const {name,email,password,role}=req.body;

if(!name||!email||!password){
    res.status(400);
    throw new Error("Please Add All Fields");
}

const userExits=await User.findOne({email});

if(userExits){
    res.status(400);
    throw new Error('User already exists')
}

const user = await User.create({
    name,
    email,
    password,
    role:role||'student',
});

if(user){
    res.status(201).json({
        _id:user.id,
        name:user.name,
        email:user.email,
        role:user.role,
        token:generateToken(user._id),
    });
}else{
    res.status(400);
    throw new Error('Invalid user Data');
}

});

const LoginUser = asyncHandler(async(req,res)=>{
    const {email , password}=req.body;

    const user = await User.findOne({email}).select('+password');

    if (user && (await user.matchPassword(password))){
        res.json({
            _id:user.id,
            name:user.name,
            email:user.email,
            role:user.role,
            token:generateToken(user._id),
    }); 
    }else{
    res.status(400);
    throw new Error('Invalid Credentials');
    }
});

const getMe=asyncHandler(async(req,res)=>{
    res.status(200).json(req.user);
});
module.exports={
    registerUser,
    LoginUser,
    getMe,
};