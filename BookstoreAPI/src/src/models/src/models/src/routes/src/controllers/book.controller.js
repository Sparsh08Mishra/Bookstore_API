const Book = require('../models/book.model');

// @desc    Create a new book
// @route   POST /api/books
// @access  Private
const createBook80 = async (req, res) => {
  try {
    const { title80, author80, category80, price80, rating80, publishedDate80 } = req.body;

    const book80 = await Book.create({
      title80,
      author80,
      category80,
      price80,
      rating80,
      publishedDate80,
    });

    res.status(201).json({
      success: true,
      data: book80,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: err.message,
    });
  }
};

// @desc    Get all books with filtering and search
// @route   GET /api/books
// @access  Private
const getBooks80 = async (req, res) => {
  try {
    const { author80, category80, rating80, title80 } = req.query;
    const query80 = {};

    // Apply filters if provided
    if (author80) {
      query80.author80 = author80;
    }

    if (category80) {
      query80.category80 = category80;
    }

    if (rating80) {
      query80.rating80 = rating80;
    }

    // Handle title search (partial match)
    if (title80) {
      query80.title80 = { $regex: title80, $options: 'i' };
    }

    const books80 = await Book.find(query80);

    res.status(200).json({
      success: true,
      count: books80.length,
      data: books80,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: err.message,
    });
  }
};

// @desc    Get book by ID
// @route   GET /api/books/:id
// @access  Private
const getBookById80 = async (req, res) => {
  try {
    const book80 = await Book.findById(req.params.id);

    if (!book80) {
      return res.status(404).json({
        success: false,
        message: 'Book not found',
      });
    }

    res.status(200).json({
      success: true,
      data: book80,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: err.message,
    });
  }
};

// @desc    Update book by ID
// @route   PUT /api/books/:id
// @access  Private
const updateBookById80 = async (req, res) => {
  try {
    const book80 = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!book80) {
      return res.status(404).json({
        success: false,
        message: 'Book not found',
      });
    }

    res.status(200).json({
      success: true,
      data: book80,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: err.message,
    });
  }
};

// @desc    Delete book by ID
// @route   DELETE /api/books/:id
// @access  Private
const deleteBookById80 = async (req, res) => {
  try {
    const book80 = await Book.findByIdAndDelete(req.params.id);

    if (!book80) {
      return res.status(404).json({
        success: false,
        message: 'Book not found',
      });
    }

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: err.message,
    });
  }
};

module.exports = {
  createBook80,
  getBooks80,
  getBookById80,
  updateBookById80,
  deleteBookById80,
};