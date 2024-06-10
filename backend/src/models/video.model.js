import mongoose, { Schema } from "mongoose"
// import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"

const videoSchema = new Schema({
    videourl : {
        type : String,//Cloudinary url
        required : true,
    },
    title : {
        type : String,
        required : true,
    },
    description : {
        type : String,
        required : true
    },
    duration : {
        type : Number,
        required : true
    },
    owner : { //uploader
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    }
},{timestamps : true})

// mongoose.plugin(mongooseAggregatePaginate)

export const Video = mongoose.model("Video",videoSchema)