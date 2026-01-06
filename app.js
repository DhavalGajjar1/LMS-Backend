const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const helmet =require ('helmet');

app.use(express.json());
app.use(cors());
app.use(helmet());
if(process.env.NODE_ENV==='devlopment'){
    app.use(morgan('dev'))
}

app.get('/',(req,res)=>{
    res.send("LMS API is running...")
});

const authRoutes=require('./routes/auth.routes');

app.use('/api/auth',authRoutes);

// app.use(errorHandler);

module.exports = app;
