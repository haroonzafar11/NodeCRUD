const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const product_controller = require('../controllers/product.controller');


// a simple test url to check that all of our files are communicating correctly.
router.get('/test', product_controller.test);
router.post('/create', product_controller.create);
router.get('/:id/detail', product_controller.details);
router.get('/all', product_controller.allProducts);
router.put('/:id/update', product_controller.update);
router.delete('/:id/delete', product_controller.delete);

module.exports = router;