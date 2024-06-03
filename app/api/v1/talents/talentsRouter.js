const router = require('express').Router();
const { index, find, update, create, destroy } = require('./talentsController');
// Middleware Auth
const { authenticatedUser, authorizeRoles } = require('../../../middlewares/authMiddlewares');

router.get('/talents', authenticatedUser, authorizeRoles('organizer'), index);
router.get('/talents/:id', authenticatedUser, authorizeRoles('organizer'), find);
router.post('/talents', authenticatedUser, authorizeRoles('organizer'), create);
router.put('/talents/:id', authenticatedUser, authorizeRoles('organizer'), update);
router.delete('/talents/:id', authenticatedUser, authorizeRoles('organizer'), destroy);

module.exports = router;
