let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let UserSchema = new Schema({
  userName: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  email: {
    type: String,
    lowercase: true,
    trim: true
  },
  phone: {type: String, optional: false},
});


module.exports = mongoose.model('User', UserSchema);