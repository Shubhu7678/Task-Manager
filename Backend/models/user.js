import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
    },
    profileImage: {
        type: String,
    },
    tasks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref : 'Task',
        }
    ],

}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

export default User;