const express = require('express');
const router = express.Router();
const {
  getAllExperience,
  getExperienceById,
  createExperience,
  updateExperience,
  deleteExperience
} = require('../controllers/experienceController');

// GET all experiences
router.get('/', getAllExperience);

// GET single experience
router.get('/:id', getExperienceById);

// POST create experience
router.post('/', createExperience);

// PUT update experience
router.put('/:id', updateExperience);

// DELETE experience
router.delete('/:id', deleteExperience);

module.exports = router;
