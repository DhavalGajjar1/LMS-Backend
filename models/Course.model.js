const mongoose = require('mongoose');
 const lessonSchema = mongoose.Schema({
    title:{type:String,required:true},
    videoUrl:{type:String,required:true},
    duration:{type:Number},

 });

 const courseSchema=mongoose.Schema(
    {
        title:{
            type:String,
            required:[true,'Please Add a course title'],
            trim:true,

        },
        description:{
            type:String,
            required:[true,"Please add a description"],
        },
        instructor:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,
        },
        thumbnail:{
            type:String,
            default:"default_course.jpg"
        },
        lessons:[lessonSchema],
        published:{
            type:Boolean,
            default:false,
        },
    },
    {
        timestamps:false,
    }
 )

 module.exports=mongoose.model('Course',courseSchema);