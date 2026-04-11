const express = require('express');
const router = express.Router();
const {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
} = require('../controllers/projectController');

// GET all projects
router.get('/', getAllProjects);

// GET single project
router.get('/:id', getProjectById);

// POST create project
router.post('/', createProject);

// PUT update project
router.put('/:id', updateProject);

// DELETE project
router.delete('/:id', deleteProject);

module.exports = router;
