const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Project title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Project description is required'],
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  shortDescription: {
    type: String,
    maxlength: [200, 'Short description cannot exceed 200 characters']
  },
  image: {
    type: String,
    default: 'https://via.placeholder.com/800x600?text=Project'
  },
  technologies: [{
    type: String,
    trim: true
  }],
  category: {
    type: String,
    enum: ['AI', 'ML', 'Web', 'Mobile', 'Data Science', 'Finance', 'Other'],
    default: 'Other'
  },
  status: {
    type: String,
    enum: ['LIVE', 'ACTIVE', 'COMPLETED', 'ARCHIVED'],
    default: 'ACTIVE'
  },
  link: {
    type: String,
    default: null
  },
  githubLink: {
    type: String,
    default: null
  },
  featured: {
    type: Boolean,
    default: false
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

module.exports = mongoose.model('Project', projectSchema);
