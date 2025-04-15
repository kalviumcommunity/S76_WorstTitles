const mongoose = require("mongoose");

const worstTitleSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

const WorstTitle = mongoose.model("worst_tittles", worstTitleSchema);

module.exports = WorstTitle;
