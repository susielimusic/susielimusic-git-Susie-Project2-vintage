const mongoose = require('mongoose');

const ownerSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  username: { type: String, required: true },
  password: { type: String, required: true },
  email:    { type: String, required: true },
  companyName: String,
  address: {
    street: String,
    city: String,
    country: String
  },
  imageUrl: String,
  description: String,
  website: String,
  description: String,
  createdAt: {type: Date, default: Date.now},
  //one owner can produce many products
  product: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }]
});


const owner = mongoose.model('owner', ownerSchema);

module.exports = owner;