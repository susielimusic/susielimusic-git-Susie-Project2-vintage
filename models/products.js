const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  imageUrl: String,
  weight: Number,
  size: String,
  createdAt: {type: Date, default: Date.now},
  //one Product can be bought by many vintage lovers
  // lover: [{
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Lover'
  // }],
  //one Product is only procuded by one specific owner
  // owner: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Owner'
  // }
});

const Product = mongoose.model('Products', productSchema);

module.exports = Product;