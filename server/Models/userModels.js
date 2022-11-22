import mongoose from 'mongoose';


const userSchema = mongoose.Schema({
    fname: {
        type: String,
        required: [true, 'Please add a first name']
    },
    lname: {
        type: String,
        required: [true, 'Please add a last name']
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true
    },
    age: {
        type: String,
        required: [true, 'Please add a age']
    },
    password: {
        type: String,
        required: [true, 'Please add a password']
    }
},
{
    timestamps: true
})

const userModel = mongoose.model('userModels', userSchema);
export default userModel;