const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.get('/total-sales-over-time', orderController.getTotalSalesOverTime);
router.get('/sales-growth-rate', orderController.getSalesGrowthRate);
router.get('/repeat-customers', orderController.getRepeatCustomers);
router.get('/customer-lifetime-value', orderController.getCustomerLifetimeValue);

module.exports = router;
