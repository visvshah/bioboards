import mongoose from 'mongoose';


const userSchema = mongoose.Schema({
    fName: {
        type: String,
        required: [true, 'Please add a first name']
    },
    lName: {
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
    /** ,
    board1: {
        type: String,
        required: [false]
    },
    board2: {
        type: String,
        required: [false],
        unique: true
    },
    board3: {
        type: String,
        required: [false]
    },
    **/
},
{
    timestamps: true
})

const userModel = mongoose.model('userModels', userSchema);
export default userModel;