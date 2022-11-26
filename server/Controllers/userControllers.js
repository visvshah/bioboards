import asyncHandler from "express-async-handler";
import userModel from "../Models/userModels.js";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import express from "express";
export const registerUser = asyncHandler(async (req, res) => {
    const { fName, lName, email, age, password} = await req.body;
    
    /**
    if(!fname.length > 0 || !lname.length > 0 ||!email.length > 0 || !password.length > 0 || !age.length > 0) {
        res.status(400)
        throw new Error('Please add all fields')
    }
    **/
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)
    // Check if user exists
    const userExists = await userModel.findOne({email})
    if(userExists) {
        res.status(400)
        throw new Error('User already exists')
    }
    // Create user
    const user = await userModel.create({
        fName,
        lName,
        email,
        age,
        password: hashedPassword,
        board1: "",
        board2: "",
        board3: "",
    })
    const userToken = jwt.sign({fName, lName, email, id: user._id}, "profile", {expiresIn: "1h"});
    if(user) {
        res.status(201).json({
            _id: user.id,
            fName: user.fName,
            lName: user.lName,
            email: user.email,
            age: user.age,
            password: user.password,
            board1: user.board1,
            board2: user.board2,
            board3: user.board3,
            token: userToken,
        })
        
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
})


export const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body
    const user = await userModel.findOne({email})
    if(user && (await bcrypt.compare(password, user.password))) {
        const userToken = jwt.sign({fName:user.fName, lName:user.lName, email:user.email, _id: user._id}, "profile", {expiresIn: "1h"});
        res.json({
            _id: user.id,
            fName: user.fName,
            lName: user.lName,
            email: user.email,
            age: user.age,
            password: user.password,
            board1: user.board1,
            board2: user.board2,
            board3: user.board3,
            token: userToken,
        })
    } else {
        res.status(400);
        throw new Error('Invalid credentials');
    }
})

export const updateBoards = asyncHandler(async (req, res) => {
    const {board1, board2, board3, _id} = req.body;
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(`No user with id: ${_id}`)
    const user = await userModel.findById(_id);
    if(user) {
        user.board1 = board1;
        user.board2 = board2;
        user.board3 = board3;
        const newUser = await userModel.findByIdAndUpdate(_id, user, {new:true});
        res.status(200).json({
            newUser
        })
    }
    else {
        res.status(400);
        throw new Error('Invalid credentials');
    }
    
})
export const getBoards = asyncHandler(async (req, res) => {
    const {_id} = req.body;
    if (!mongoose.Types.ObjectId.isValid(_id)) return response.status(404).send(`No list with id: ${_id}`)
    const user = await userModel.findById(_id);
    if(user) {
        const boards = {
            board1: user.board1,
            board2: user.board2,
            board3: user.board3,
        };
        res.status(200).json(boards);
    } else{
        res.status(400);
        throw new Error('User not Found');
    }
})

const generateToken = (id) => {
    return jwt.sign({id}, "abc123", {
        expiresIn: '30d',
    })

}
