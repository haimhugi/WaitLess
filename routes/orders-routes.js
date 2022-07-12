const express = require('express');
const { check } = require('express-validator');

const ordersControllers = require('../controllers/orders-controller');

const router = express.Router();

router.get('/:pid', ordersControllers.getOrderById);

router.get('/user/:uid', ordersControllers.getOrdersByUserId);

router.post(
    '/',
    [
        check('orderNumber').not().isEmpty(),
        check('mealsNumber').not().isEmpty(),
        check('totalPrice').not().isEmpty(),
        check('date').not().isEmpty(),
        check('meals').not().isEmpty(),
        check('creator').not().isEmpty(),
    ],
    ordersControllers.createOrder
);



router.delete('/:pid', ordersControllers.deleteOrder);

module.exports = router;
