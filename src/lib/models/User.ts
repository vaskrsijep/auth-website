import { Schema, model, models } from 'mongoose';

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    points: {
        type: Number,
        default: 0,
    },
    name: {
        type: String,
    },
}, {
    timestamps: true,
});

const User = models.User || model('User', userSchema);

export default User;
