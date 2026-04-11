const express = require('express');
const router = express.Router();
const {
  getAllSkills,
  getSkillsByCategory,
  getSkillById,
  createSkill,
  updateSkill,
  deleteSkill
} = require('../controllers/skillController');

// GET all skills
router.get('/', getAllSkills);

// GET skills by category
router.get('/grouped/category', getSkillsByCategory);

// GET single skill
router.get('/:id', getSkillById);

// POST create skill
router.post('/', createSkill);

// PUT update skill
router.put('/:id', updateSkill);

// DELETE skill
router.delete('/:id', deleteSkill);

module.exports = router;
