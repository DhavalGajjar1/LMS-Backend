const express = require('express');
const router = express.Router();
const{
    registerUser,
    LoginUser,
    getME
}=require('../controllers/auth.controller');
const protect = require('../middleware/auth.middleware')

router.post('/register',registerUser);
router.post('/login',LoginUser);
router.get('/me',protect,getME)

module.exports=router;