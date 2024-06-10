import mongoose, { Schema } from "mongoose"

const courseSchema = new Schema({
    courseTitle: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    price : {
        type : Number,
        required :true
    },
    isDeleted:{
        type:Boolean,
        default : false
    },
    lectures: [
        {
            title: {
                type: String,
                required: true
            },
            description: {
                type: String,
                required: true
            },
            isDeleted:{
                type:Boolean,
                default : false
            },
            video: {
                public_id: {
                    type: String,
                    required: true
                },
                url: {
                    type: String,
                    required: true
                }
            }
        }
    ],
    poster: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    numOfVideos : {
        type : Number,
        default : 0
    },
    category : {
        type : String,
        required : true
    },
    uploaderId:{
       type : mongoose.Schema.Types.ObjectId,
       ref : "Uploader",
       required:true
    },
    uploaderName :{
        type : String,
        required :true
    },
    document: {
        public_id: {
            type: String,
        },
        url: {
            type: String,
        }
    },

    optedBy: [{
        userId : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User"
        }
    }]

}, { timestamps: true })


export const Course = mongoose.model("Course", courseSchema)