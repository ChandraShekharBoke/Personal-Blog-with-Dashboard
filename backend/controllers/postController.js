const Post = require('../models/postModel');

// ✅ Get all posts (with pagination)
const getAllPosts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const skip = (page - 1) * limit;

        const totalPosts = await Post.countDocuments();
        const posts = await Post.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        res.status(200).json({
            posts,
            currentPage: page,
            totalPages: Math.ceil(totalPosts / limit),
            totalPosts,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching posts',
            error: error.message
        });
    }
};

// ✅ Get post by ID
const getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching post',
            error: error.message
        });
    }
};

// ✅ Get post by slug
const getPostBySlug = async (req, res) => {
    try {
        const post = await Post.findOne({ slug: req.params.slug });

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching post',
            error: error.message
        });
    }
};

// ✅ Get posts by category
const getPostByCategory = async (req, res) => {
    try {
        const categoryName = req.params.categoryName;

        const posts = await Post.find({ categories: categoryName })
            .sort({ createdAt: -1 });

        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching posts by category',
            error: error.message
        });
    }
};

// ✅ Create post
// const createPost = async (req, res) => {
//     try {
//         const { title, markdownContent, categories, author } = req.body;

//         if (!title || !markdownContent) {
//             return res.status(400).json({
//                 message: 'Please provide a title and content for the post.'
//             });
//         }

//         const newPost = await Post.create({
//             title,
//             markdownContent,
//             categories,
//             author,
//         });

//         res.status(201).json(newPost);
//     } catch (error) {
//     console.error('CREATE POST ERROR STACK:', error.stack); // ← ye add karo
//     res.status(400).json({
//         message: 'Failed to create post',
//         error: error.message
//     });
// }
// };

// ✅ Update post
const updatePost = async (req, res) => {
    try {
        const { title, markdownContent, categories } = req.body;

        const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            { title, markdownContent, categories },
            {
                new: true,
                runValidators: true,
            }
        );

        if (!updatedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }

        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(400).json({
            message: 'Error updating post',
            error: error.message
        });
    }
};

// ✅ Delete post
const deletePost = async (req, res) => {
    try {
        const deletedPost = await Post.findByIdAndDelete(req.params.id);

        if (!deletedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }

        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({
                message: `Invalid post ID: ${req.params.id}`
            });
        }

        res.status(500).json({
            message: 'Failed to delete post',
            error: error.message
        });
    }
};

const slugify = require('slugify');

const createPost = async (req, res) => {
    try {
        const { title, markdownContent, categories, author } = req.body;

        if (!title || !markdownContent) {
            return res.status(400).json({
                message: 'Please provide a title and content for the post.'
            });
        }

        const slug = slugify(title, { lower: true, strict: true }) + '-' + Date.now();

        const newPost = await Post.create({
            title,
            slug,
            markdownContent,
            categories,
            author,
        });

        res.status(201).json(newPost);
    } catch (error) {
        console.error('CREATE POST ERROR STACK:', error.stack);
        res.status(400).json({
            message: 'Failed to create post',
            error: error.message
        });
    }
};

// ✅ EXPORT EVERYTHING
module.exports = {
    createPost,
    getAllPosts,
    getPostById,
    getPostBySlug,
    getPostByCategory,
    updatePost,
    deletePost
};