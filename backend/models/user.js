import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password_hash: { type: String, required: true },
    // google_id: { type: String },
    otp: { type: String }
});

const User = mongoose.model('User', UserSchema);
export default User;