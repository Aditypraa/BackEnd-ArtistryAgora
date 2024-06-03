const router = require('express').Router();
const {
  getCMSUsers,
  createCMSOrganizer,
  createCMSUsers,
  getCMSUserById,
  updateCMSUser,
  deleteCMSUser,
  getCMSOrganizers,
  getCMSOrganizerById,
  updateCMSOrganizer,
  deleteCMSOrganizer,
} = require('./organizersController');
// Middleware
const { authenticatedUser, authorizeRoles } = require('../../../middlewares/authMiddlewares');

// Organizer
router.get('/organizers', authenticatedUser, authorizeRoles('owner'), getCMSOrganizers);
router.post('/organizers', authenticatedUser, authorizeRoles('owner'), createCMSOrganizer);
router.get('/organizers/:id', authenticatedUser, authorizeRoles('owner'), getCMSOrganizerById);
router.put('/organizers/:id', authenticatedUser, authorizeRoles('owner'), updateCMSOrganizer);
router.delete('/organizers/:id', authenticatedUser, authorizeRoles('owner'), deleteCMSOrganizer);

// Users/Admin
router.get('/users', authenticatedUser, authorizeRoles('organizer'), getCMSUsers);
router.post('/users', authenticatedUser, authorizeRoles('organizer'), createCMSUsers);
router.get('/users/:id', authenticatedUser, authorizeRoles('organizer'), getCMSUserById);
router.put('/users/:id', authenticatedUser, authorizeRoles('organizer'), updateCMSUser);
router.delete('/users/:id', authenticatedUser, authorizeRoles('organizer'), deleteCMSUser);

module.exports = router;
