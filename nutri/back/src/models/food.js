import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true,
    },
    calories: {
        type: Number,
        required: true,
    },
    carbs: {
        type: Number,
        required: true,
    },
    proteins: {
        type: Number,
        required: true,
    },
    fats: {
        type: Number,
        required: true,
    },
    class: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    });

export const Food = mongoose.model("Food", foodSchema);

module.exports = Food;