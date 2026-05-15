const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true
    },
    slug: {
        type: String,
        unique: true,
    },
    markdownContent: {
        type: String,
        required: [true, 'Content is required'],
        trim: true
    },
    categories: {
        type: [String],
        default: [],
    },
    author: {
        type: String,
        default: 'Admin'
    }
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);

postSchema.pre('save', function (next) {
    if (this.isNew || this.isModified('title')) {
        this.slug =
            slugify(this.title, { lower: true, strict: true }) +
            '-' +
            Date.now();
    }
    next();
});