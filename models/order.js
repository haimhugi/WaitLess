const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    orderNumber: { type: String, required: true, unique: true },
    mealsNumber: { type: String, required: true },
    totalPrice: { type: String, required: true },
    date: { type: String, required: true },
    meals: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Meal' }],
    creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User' }
});

module.exports = mongoose.model('Order', orderSchema);
