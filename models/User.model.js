const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

const userSchema= mongoose.Schema(
    {
        name:{
            type:String,
            required:[true,'please add a name'],
        
        },
        email:{
            type:String,
            required:[true,'please add an email'],
            unique:true,
        },
        password:{
            type:String,
            required:[true,'Please add a password'],
            minlength:6,
            select:false,
        },
        role:{
            type:String,
            enum:['student','instructor','admin'],
            default: 'student',

        },
    },
    {
        timestamps:true,
    }
);

userSchema.pre('save',async function (next){
    if(!this.isModified('password')){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt);

});

userSchema.methods.matchPassword= async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword,this.password);
}
module.expports=mongoose.model('User',userSchema);