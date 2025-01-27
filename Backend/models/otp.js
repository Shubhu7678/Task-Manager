import mongoose from 'mongoose';
import { mailSender } from '../utils/mailSender.js';

const otpSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim : true,
    },
    otp: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires : '5m',
        
    }
})

async function sendVerificationEmail(email, otp) {

    try {
            
       const response = await mailSender(email, 'Email Verification', `Your OTP is ${otp}`);
        console.log("Otp sent successfully : ",response);

    } catch (error) { 

        console.log("Error occured while sending otp in opt model", error);
    }
}

otpSchema.pre('save', async function (next) { 

    await sendVerificationEmail(this.email, this.otp);
    next();
})


const Otp = mongoose.model('Otp', otpSchema);

export default Otp;