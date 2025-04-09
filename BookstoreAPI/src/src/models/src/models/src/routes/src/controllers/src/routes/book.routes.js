const express = require('express');
const {
  createBook80,
  getBooks80,
  getBookById80,
  updateBookById80,
  deleteBookById80,
} = require('../controllers/book.controller');
const { protect80 } = require('../middlewares/auth.middleware');

const router80 = express.Router();

// Protect all routes
router80.use(protect80);

router80
  .route('/')
  .post(createBook80)
  .get(getBooks80);

router80
  .route('/:id')
  .get(getBookById80)
  .put(updateBookById80)
  .delete(deleteBookById80);

module.exports = router80;