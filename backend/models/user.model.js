import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
    username: { 
        type: String,
        required: true 
    },
    email:{
        type: String,
        required:true
    },
    password: { 
        type: String, 
        required: true 
    },
    tasks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Task', 
        },
    ],
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.generateJWTToken = function(){
    return jwt.sign(
        {id:this._id,email:this.email,role:this.role,subscription:this.subscription},
        process.env.JWT_SECRET_KEY,
        {expiresIn:process.env.JWT_EXPIRES}
    );
}

userSchema.methods.correctPassword = async function(password){
    return await bcrypt.compare(password,this.password);
}

const User = mongoose.model('User',userSchema);
export default User;