const mongoose = require('mongoose');

const WishlistDataModel = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserInfo', // Reference to the User model
        required: true
    },
    items: [{
        type: String,
        ref: 'ProductData' // Reference to the Product model
    }]
});

module.exports = mongoose.model('Wishlist', WishlistDataModel);
