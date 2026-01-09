const mongoose = require('mongoose')

const progressSchema = mongoose.Schema(
    {
        enrollment:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Enrollment",
            required:true,
        },
        completedLessons:[
            {
                type:mongoose.Schema.Types.ObjectId
            },
        ],
        completionPercentage:{
            type:Number,
            default:0,
        },
        lastAccessed:{
            type:Date,
            default:Date.now,
        },
    },
    {
        timestamps:true,
    }
);

module.exports=mongoose.model('Progress',progressSchema);