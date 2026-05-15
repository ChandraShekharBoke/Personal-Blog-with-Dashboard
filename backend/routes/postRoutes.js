const express = require('express');
const router = express.Router();

const { protect } = require('../middleware/authMiddleware');

const {
    createPost,
    getAllPosts,
    getPostById,
    getPostBySlug,
    getPostByCategory,
    updatePost,
    deletePost
} = require('../controllers/postController');


// ✅ IMPORTANT: specific routes first
router.get('/category/:categoryName', getPostByCategory);
router.get('/slug/:slug', getPostBySlug);

// ✅ CRUD routes
router.get('/', getAllPosts);
router.post('/', protect, createPost);

router.get('/:id', getPostById);
router.put('/:id', protect, updatePost);
router.delete('/:id', protect, deletePost);

module.exports = router;