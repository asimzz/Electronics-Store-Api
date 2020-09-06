const express = require('express');
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  productPhotoUpload,
  getSpecificProducts,
} = require('../controllers/products');

const Product = require('../models/Product');

// Include other resource routers
const reviewRouter = require('./reviews');

const router = express.Router();

const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');

// Re-route into other resource routers
router.use('/:productId/reviews', reviewRouter);

router.route('/:id/photo').put(protect, authorize('admin'), productPhotoUpload);

router
  .route('/')
  .get(protect, advancedResults(Product), getProducts)
  .post(protect, authorize('admin'), createProduct);

router
  .route('/:id')
  .get(getProduct)
  .put(protect, authorize('admin'), updateProduct)
  .delete(protect, authorize('admin'), deleteProduct);

router.route('/advancedSearch').post(protect, getSpecificProducts);

module.exports = router;
