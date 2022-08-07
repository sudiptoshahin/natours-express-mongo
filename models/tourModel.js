const mongoose = require('mongoose');
const validator = require('validator');

/** SCHEMA- & MODEL */
const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A tour must have a name'],
        unique: true,
        minLength: [10, 'The should contain at least 10 characters'],
        maxLength: [40, 'Tour name should not excceds 40 character'],
        validate: [validator.isAlpha, 'Tour name must only contain characters']
    },
    duration: {
        type: String,
        required: ['true', 'A tour must have a duration']
    },
    maxGroupSize: {
        type: Number,
        required: ['true', 'A tour must have a group size']
    },
    difficulty: {
        type: String,
        required: ['true', 'Should have a difficulty'],
        enum: {
            values: [ 'easy', 'medium', 'hard' ],
            message: 'Difficulty is either easy, medium or hard'
        }
    },
    rating: {
        type: Number,
        default: 4.5
    },
    ratingAverage: {
        type: Number,
        // required: [true, 'This field is required'],
        // default: 4.5,
        min: [1, 'Rating can not be below 1.0'],
        max: [5, 'Rating can not be above 5.0']
    },
    ratingQuantity: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        required: [true, 'A tour must have a price']
    },
    priceDiscount: {
        type: Number,
        validate: {
            validator: function(value) {
                return value < this.price; // 250 < 200
            },
            message: "Discount price ({VALUE}) should be less than regular price."
        }
    },
    summary: {
        type: String,
        trim: true,
        required: [true, 'A tour must have a description']
    },
    description: {
        type: String,
        trim: true
    },
    imageCover: {
        type: String,
        required: [true, 'A tour must have a cover image']
    },
    images: [String], 
    createdAt: {
        type: Date,
        default: Date.now()
    },
    startDates: [Date]
});
// model
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;