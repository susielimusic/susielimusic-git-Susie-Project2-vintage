const mongoose = require('mongoose');

const loverSchema = new mongoose.Schema({
  fullName :String,
  firstName: String,
  lastName: String,
  userName:String,
  email: String,
  password: String,
  googleId:String,
  facebookId:String,
  companyName: String,
  address: {
    street: {type:String, default:"Not set"},
    city: {type:String,lowercase: true, trim: true , default:"Not set"},
    country: {type:String,lowercase: true, trim: true, default:"Not set"}
  },
  gender:String,
  imageUrl: String,
  createdAt: {type: Date, default: Date.now},
  //one lover can buy many products
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }]
});

const lover = mongoose.model('lover', loverSchema);

module.exports = lover;