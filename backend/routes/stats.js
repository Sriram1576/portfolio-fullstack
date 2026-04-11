const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const Skill = require('../models/Skill');
const Experience = require('../models/Experience');
const Contact = require('../models/Contact');

// Get portfolio statistics
router.get('/summary', async (req, res) => {
  try {
    const projectCount = await Project.countDocuments();
    const skillCount = await Skill.countDocuments();
    const experienceCount = await Experience.countDocuments();
    const contactCount = await Contact.countDocuments();
    const newMessages = await Contact.countDocuments({ status: 'NEW' });

    const avgSkillLevel = await Skill.aggregate([
      {
        $group: {
          _id: null,
          avgProficiency: { $avg: '$proficiency' }
        }
      }
    ]);

    res.status(200).json({
      success: true,
      data: {
        projects: projectCount,
        skills: skillCount,
        experience: experienceCount,
        contacts: contactCount,
        newMessages,
        avgSkillLevel: avgSkillLevel[0]?.avgProficiency || 0
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;
