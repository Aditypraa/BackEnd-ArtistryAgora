const router = require('express').Router();
const { index, processInvoiceWebhook } = require('./ordersController');
// Middleware
const { authenticatedUser, authorizeRoles } = require('../../../middlewares/authMiddlewares');

router.get('/orders', authenticatedUser, authorizeRoles('organizer', 'admin', 'owner'), index);
router.post('/order/webhook', processInvoiceWebhook);

module.exports = router;
