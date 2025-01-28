import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Otp from '../models/otp.js';
import { mailSender } from '../utils/mailSender.js';

export const sendOtp = async (req, res) => {

    try {

        const { email } = req.body;

        if (!email) {

            return res.status(400).json({

                success: false,
                message: "Please enter email"
            });
        }

        const userExist = await User.findOne({ email: email });

        if (userExist) {

            return res.status(400).json({

                success: true,
                message: "User already exists"
            })
        }

        const otp = Math.floor(100000 + Math.random() * 900000);

        const otpData = await Otp.create({
            email: email,
            otp: otp
        })

        return res.status(200).json({

            success: true,
            message: "OTP sent successfully",
            data: otpData
        })

    } catch (error) {

        return res.status(500).json({

            success: false,
            message: "Internal server error"
        })
    }
}

export const signup = async (req, res) => {

    try {

        const { otp, name, email, password, confirmPassword } = req.body;

        if (!name || !email || !password || !confirmPassword) {

            return res.status(400).json({
                success: false,
                message: "Please enter all the fields"
            })
        }

        if (password !== confirmPassword) {

            return res.status(400).json({
                success: false,
                message: "Passwords do not match"
            })
        }

        const userExist = await User.findOne({ email: email });

        if (userExist) {

            return res.status(400).json({

                success: false,
                message: "User already exists"
            })
        }

        const otpExist = await Otp.findOne({ email: email });

        if (!otpExist) {

            return res.status(400).json({

                success: false,
                message: "OTP does not exist"

            })
        }

        if (otpExist.otp !== otp) {

            return res.status(400).json({
                success: false,
                message: "Invalid OTP"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const userImage = `https://ui-avatars.com/api/?name=${name}&background=random`;

        const user = new User({

            name: name,
            email: email,
            password: hashedPassword,
            profileImage: userImage
        });

        await user.save();

        return res.status(200).json({

            success: true,
            message: "User signed up successfully",

        });


    } catch (error) {

        console.log("Error occured while signing up", error);
        return res.status(500).json({
            success: false,
            message: "Error occured while signing up",
            error: error.message
        })
    }
}

export const login = async (req, res) => {

    try {

        const { email, password } = req.body;

        if (!email || !password) {

            return res.status(400).json({

                success: false,
                message: "Please enter all the fields"
            })
        }

        const userExist = await User.findOne({ email: email })

        if (!userExist) {

            return res.status(400).json({

                success: false,
                message: "User does not exist"
            })
        }

        const isPasswordMatched = await bcrypt.compare(password, userExist.password);

        if (!isPasswordMatched) {

            return res.status(400).json({

                success: false,
                message: "Invalid Credentials"
            })
        }

        const payload = {
            _id: userExist._id,
            name: userExist.name,
            email: userExist.email,
            profileImage: userExist.profileImage
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '8h' });

        userExist.password = undefined;

        return res.status(200).json({

            success: true,
            message: 'User logged in successfully',
            data: userExist,
            token: token,
        })

    } catch (error) {

        return res.status(500).json({

            success: false,
            message: "Internal Server Error"
        })
    }
}

export const sendUrlForPasswordReset = async (req, res) => { 

    try {

        const { email } = req.body;

        if (!email) { 

            return res.status(400).json({

                success: false,
                message: "Please enter email"
            })
        }

        const userExist = await User.findOne({ email: email });

        if (!userExist) { 

            return res.status(400).json({

                success: false,
                message: "User does not exist"
            })
        }
        
        const userId = userExist._id;
        const sendUrl = await mailSender(email, 'Password Reset Link', `http://localhost:3000/reset-password/${userId}`); 
        
        if (!sendUrl) { 

            return res.status(400).json({
                success: false,
                message: "Failed to send email"
            })

        }

        return res.status(200).json({

            success: true,
            message: "Password reset link sent successfully"
        })

    } catch (error) { 

        return res.status(500).json({

            success: false,
            message: "Internal Server Error",
            error : error.message 
        })
    }
}

export const resetPassword = async (req, res) => { 

    try {

        const { userId } = req.params;
        const { password } = req.body;

        if (!userId || !password) {

            return res.status(400).json({

                success: false,
                message: "Invalid Credential !"
            })
        }

        const userExist = await User.findById(userId);

        if (!userExist) { 

            return res.status(400).json({

                success: false,
                message: "User does not exist"

            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        userExist.password = hashedPassword;

        await userExist.save();

        return res.status(200).json({

            success: true,
            message: "Password reset successfully"
        })
        

    } catch (error) { 

        return res.status(500).json({

            success: false,
            message: "Internal Server Error",
            error : error.message
        })
    }
}