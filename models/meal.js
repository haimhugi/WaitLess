const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mealSchema = new Schema({
    image: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    review: {
        numOfReviews: { type: Number, required: false },
        average: { type: Number, required: false }
    },
    category: { type: String, required: true },
});

module.exports = mongoose.model('Meal', mealSchema);