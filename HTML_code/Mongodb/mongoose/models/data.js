import mongoose from "mongoose";
const todoSchema = new mongoose.Schema({
    name : String,
    income : Number,
    city : String
});

export const todo = mongoose.model('todo',todoSchema); 