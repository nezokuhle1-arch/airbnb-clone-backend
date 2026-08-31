const mongoose = require('mongoose');

/**
 * Accommodation Schema notes
 * Accommodation is a schema that represents an accommodation for a user.
 * It contains the title, description, location, type, price, guests, bedrooms, bathrooms, amenities, images, weeklyDiscount, cleaningFee, serviceFee, occupancyTaxes, enhancedCleaning, selfCheckin, rating, reviews, specificRatings, and host.
 * @typedef {Object} Accommodation
 * @property {string} title - The title of the accommodation.
 * @property {string} description - The description of the accommodation.
 * @property {string} location - The location of the accommodation.
 * @property {string} type - The type of the accommodation.
 * @property {number} price - The price of the accommodation.
 * @property {number} guests - The number of guests the accommodation can accommodate.
 * @property {number} bedrooms - The number of bedrooms in the accommodation.
 * @property {number} bathrooms - The number of bathrooms in the accommodation.
 * @property {array} amenities - The amenities of the accommodation.
 * @property {array} images - The images of the accommodation.
 * @property {number} weeklyDiscount - The weekly discount of the accomodation.
 * @property {number} cleaningFee - The cleaning fee of the accommodation.
 * @property {number} serviceFee - The service fee of the accommodation.
 * @property {number} occupancyTaxes - The occupancy taxes of the accommodation.
 * @property {boolean} enhancedCleaning - Whether the accommodation has enhanced cleaning.
 * @property {boolean} selfCheckin - Whether the accommodation has self checkin.
 * @property {number} rating - The rating of the accommodation.
 * @property {number} reviews - The reviews of the accommodation.
 * @property {object} specificRatings - The specific ratings of the accommodation.
 * @property {number} cleanliness - The cleanliness rating of the accommodation.
 * @property {number} communication - The communication rating of the accommodation.
 * @property {number} checkIn - The check-in rating of the accommodation.
 * @property {number} accuracy - The accuracy rating of the accommodation.
 * @property {number} location - The location rating of the accommodation.
 * @property {number} value - The value rating of the accommodation.
 * @property {ObjectId} host - The host of the accommodation.
 */

const accommodationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    location: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    guests: {
        type: Number,
    },
    bedrooms: {
        type: Number,
    },
    bathrooms: {
        type: Number,
    },
    amenities: {
        type: [String],
        default: [],
    },
    images: {
        type: [String],
        default: [],
    },
    weeklyDiscount: {
        type: Number,
        default: 0,
    },
    cleaningFee: {
        type: Number,
        default: 0,
    },
    serviceFee: {
        type: Number,
        default: 0,
    },
    occupancyTaxes: {
        type: Number,
        default: 0,
    },
    enhancedCleaning: {
        type: Boolean,
        default: false,
    },
    selfCheckin: {
        type: Boolean,
        default: false,
    },
    rating: {
        type: Number,
        default: 0,
    },
    reviews: {
        type: Number,
        default: 0,
    },
    specificRatings: {
        cleanliness: {type: Number, default: 0},
        communication: {type: Number, default: 0},
        checkIn: {type: Number, default: 0},
        accuracy: {type: Number, default: 0},
        location: {type: Number, default: 0},
        value: {type: Number, default: 0},
    },
    host: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
})

module.exports = mongoose.model('Accommodation', accommodationSchema);