const app = require('./app');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
dotenv.config();

const PORT = process.env.PORT 



app.listen(PORT,()=>{
    connectDB();
    console.log(`server running on port ${PORT}`)
})