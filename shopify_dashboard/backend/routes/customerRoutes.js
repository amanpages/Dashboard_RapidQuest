const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

router.get('/new-customers', customerController.getNewCustomers);
router.get('/customer-distribution', customerController.getCustomerDistribution);

module.exports = router;
