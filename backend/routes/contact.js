const express = require('express');
const router = express.Router();
const {
  getAllContacts,
  getContactById,
  createContact,
  updateContactStatus,
  deleteContact,
  getContactStats
} = require('../controllers/contactController');

// GET all contacts (admin)
router.get('/', getAllContacts);

// GET contact stats
router.get('/stats/summary', getContactStats);

// GET single contact
router.get('/:id', getContactById);

// POST create contact message
router.post('/', createContact);

// PUT update contact status
router.put('/:id', updateContactStatus);

// DELETE contact
router.delete('/:id', deleteContact);

module.exports = router;
