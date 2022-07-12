const express = require('express');
const { check } = require('express-validator');

const ordersController = require('../controllers/orders-controller');

const router = express.Router();

router.get('/:pid', ordersController.getOrderById);

router.get('/user/:uid', ordersController.getOrdersByUserId);

router.post(
    '/',
    [
        check('orderNumber').not().isEmpty(),
        check('mealsNumber').not().isEmpty(),
        check('totalPrice').not().isEmpty(),
        check('date').not().isEmpty(),
        check('meals').not().isEmpty(),
        check('onTable').not().isEmpty(),
        check('status').not().isEmpty(),
        check('creator').not().isEmpty(),
    ],
    ordersController.createOrder
);



router.delete('/:pid', ordersController.deleteOrder);


router.patch(
    '/update-status/:pid',
    [
        check('status').not().isEmpty(),
    ],
    ordersController.updateStatus
);

module.exports = router;
