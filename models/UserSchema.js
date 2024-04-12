import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    googleId: String,
    displayName: String,
    email: String,
    image: String,
    password: String,
   
}, { timestamps: true });

const userdb = mongoose.model('users', UserSchema);

export default userdb;
