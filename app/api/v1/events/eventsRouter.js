const router = require('express').Router();
const { index, find, create, update, destroy, changeStatus } = require('./eventsController');
// Middleware Auth
const { authenticatedUser, authorizeRoles } = require('../../../middlewares/authMiddlewares');

router.get('/events', authenticatedUser, authorizeRoles('organizer'), index);
router.get('/events/:id', authenticatedUser, authorizeRoles('organizer'), find);
router.post('/events', authenticatedUser, authorizeRoles('organizer'), create);
router.put('/events/:id', authenticatedUser, authorizeRoles('organizer'), update);
router.delete('/events/:id', authenticatedUser, authorizeRoles('organizer'), destroy);

// change Status Events
router.put('/events/:id/status', authenticatedUser, authorizeRoles('organizer'), changeStatus);

module.exports = router;
