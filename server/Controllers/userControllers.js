
import userModel from "../Models/userModels.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const registerUser = async (req, res) => {
    const { fname, lname, email, age, password} = req.body;
    console.log("fname: " + fname);
    console.log("lname: " + lname);
    console.log("email: " + email);
    console.log("age: " + age);
    console.log("password: " + password);
    /**
    if(!fname.length > 0 || !lname.length > 0 ||!email.length > 0 || !password.length > 0 || !age.length > 0) {
        res.status(400)
        throw new Error('Please add all fields')
    }
    **/
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)
    // Create user
    const user = await userModel.create({
        fname,
        lname,
        email,
        age,
        password: hashedPassword,
    })
    // Check if user exists
    const userExists = await userModel.findOne({email})

    if(userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    if(user) {
        res.status(201).json({
            _id: user.id,
            fname: user.fname,
            lname: user.lname,
            email: user.email,
            age: user.age,
            password: user.password,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }

    res.json({message: 'Register User'})
}


export const loginUser = async (req, res) => {
    const {email, password} = req.body

    const user = await userModel.findOne({email})

    if(user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    }
}

export const getMe = async (req, res) => {
    const {_id, name, email } = await User.findById(req.user.id)

    res.status(200).json({
        id: _id,
        name,
        email,
        school,
        isOrganizer
    })
    res.json({message: 'User data display'})
}

//TODO: add env for token encrypt
const generateToken = (id) => {
    return jwt.sign({ id }, abc123, {
        expiresIn: '30d',
    })
}
