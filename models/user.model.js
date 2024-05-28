import mongoose from "mongoose";
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
    },
    firstname:{
        type:String,
        required:true,
        minLength:3
    },
    lastname:{
        type:String,
        required:true,
        minLength:2
    },
    phone: {
        type: String,
        required: true,
        validate: {
          validator: function(v) {
            return /^\d{10}$/.test(v);
          },
          message: props => `${props.value} is not a valid 10-digit phone number!`
        }
      },
    password:{
        type:String,
        required:true
    },
},{timestamps:true});

userSchema.pre('save',async function(next){
    const user = this;

    if(!user.isModified('password')) return next();

    const saltFactor = 10;

    try{
        const salt = await bcrypt.genSalt(saltFactor);

        const hash = await bcrypt.hash(user.password,salt);

        user.password = hash;
        return next();
    }catch(error){
        console.log("Hashing error ",error);
        return next();
    }
});

const UserModal = mongoose.model("User",userSchema);

export default UserModal;