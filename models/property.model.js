import mongoose,{Schema} from "mongoose";

const propertySchema = new mongoose.Schema({
    user:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    name:{
        type:String,
        unique:true,
        required:true
    },
    place: {
        type: String,
        required: true
    },
    area: {
        type: Number,
        required: true
    },
    bedroom: {
        type: Number,
        required: true
    },
    bathroom: {
        type: Number,
        required: true
    },
    hospital: {
        type: Boolean,
        default: false
    },
    college: {
        type: Boolean,
        default: false
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    pet: {
        type: Boolean,
        default: false
    },
    views:{
        type:Number,
        default:0
    },
    likes:{
        type:Number,
        default:0
    }
});

const PropertyModel = mongoose.model('Property', propertySchema);

export default PropertyModel