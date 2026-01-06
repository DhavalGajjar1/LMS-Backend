const mongoose = require('mongoose');

const connectDB = async ()=>{
    try{
        const conn = await mongoose.connect(process.env.DB_URL);
        console.log(`MongoDB connected`)
    }catch(error){
        console.error('Error');
        process.exit(1);
    }
    
};
module.exports=connectDB