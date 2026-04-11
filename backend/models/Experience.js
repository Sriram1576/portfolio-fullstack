const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Experience title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  company: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true,
    maxlength: [100, 'Company name cannot exceed 100 characters']
  },
  description: {
    type: String,
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  startDate: {
    type: Date,
    required: [true, 'Start date is required']
  },
  endDate: {
    type: Date,
    default: null
  },
  currentlyWorking: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    enum: ['Internship', 'Full-time', 'Contract', 'Freelance', 'Training', 'Certification', 'Other'],
    default: 'Full-time'
  },
  location: {
    type: String,
    default: null
  },
  technologies: [{
    type: String,
    trim: true
  }],
  keyAchievements: [{
    type: String,
    maxlength: [300, 'Achievement cannot exceed 300 characters']
  }],
  icon: {
    type: String,
    default: null
  },
  orderIndex: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Experience', experienceSchema);
