const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const helmet =require ('helmet');


app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
});


app.use(cors({
    origin: 'http://localhost:5173', // Vite frontend
    credentials: true,
}));
app.use(express.json());

app.use(helmet());
if(process.env.NODE_ENV==='devlopment'){
    app.use(morgan('dev'))
}

app.get('/',(req,res)=>{
    res.send("LMS API is running...")
});

const authRoutes=require('./routes/auth.routes');
const courseRoutes=require('./routes/course.routes');
const enrollmentRoutes = require('./routes/enrollment.routes');
const ProgressRoutes = require('./routes/progress.routes')


app.use('/api/auth',authRoutes);
app.use('/api/courses',courseRoutes);
app.use('/api/enrollments',enrollmentRoutes)
app.use('/api/progress',ProgressRoutes)

// app.use(errorHandler);

module.exports = app;
