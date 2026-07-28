const mongoose = require('mongoose');
 
const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  bannerUrl: {
    type: String,
  },
  date: {
    type: Date,
  },
  location: {
    type: String,
  },
  capacity: {
    type: Number,
  },
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default : 'pending'
  },
  attendee: [{
    type : mongoose.Schema.Types.ObjectId ,
    ref : 'User'
  }]
},{ timestamps: true }
);
const Event = mongoose.model('Event', eventSchema);
 
module.exports = Event;