const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Skill name is required'],
    trim: true,
    maxlength: [50, 'Skill name cannot exceed 50 characters']
  },
  proficiency: {
    type: Number,
    required: [true, 'Proficiency level is required'],
    min: [0, 'Proficiency must be at least 0'],
    max: [100, 'Proficiency cannot exceed 100']
  },
  category: {
    type: String,
    enum: ['Programming', 'Frontend', 'Backend', 'Database', 'DevOps', 'Tools', 'Soft Skills', 'Other'],
    default: 'Other'
  },
  subcategory: {
    type: String,
    default: null
  },
  icon: {
    type: String,
    default: null
  },
  description: {
    type: String,
    maxlength: [200, 'Description cannot exceed 200 characters']
  },
  yearsOfExperience: {
    type: Number,
    default: 0
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

module.exports = mongoose.model('Skill', skillSchema);
