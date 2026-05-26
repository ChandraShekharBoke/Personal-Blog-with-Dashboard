import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/apiService';
import './CreatePost.css';

const CreatePost = () => {

    const [title, setTitle] = useState('');
    const [markdownContent, setMarkdownContent] = useState('');
    const [categories, setCategories] = useState(''); // ✅ FIXED
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError('');

        // ✅ Validation
        if (!title.trim() || !markdownContent.trim()) {
            setError('Title and content are required.');
            setLoading(false);
            return;
        }

        // ✅ Convert categories string → array
        const categoriesArray = categories
            .split(',')
            .map(cat => cat.trim())
            .filter(cat => cat);

        try {
            await apiService.post('/posts', {
                title,
                markdownContent,
                categories: categoriesArray,
                author: 'Admin'
            });

            navigate('/admin/dashboard');

        } catch (err) {
            console.error('Failed to create post:', err);
            console.error('Server response:', err.response?.data); // Add this
            setError(err.response?.data?.message || err.response?.data?.error || 'Failed to create post. Please try again.');
            setLoading(false);
        }
    };

    return (
        <div className="create-post-page">
            <h2>Create New Post</h2>

            <form onSubmit={handleSubmit} className="create-post-form">

                {/* Title */}
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        className="form-control"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter post title"
                        disabled={loading}
                    />
                </div>

                {/* Markdown Content */}
                <div className="form-group">
                    <label htmlFor="markdownContent">Content (Markdown)</label>
                    <textarea
                        id="markdownContent"
                        className="form-control markdown-input"
                        value={markdownContent}
                        onChange={(e) => setMarkdownContent(e.target.value)}
                        placeholder="Write your post content here using Markdown..."
                        disabled={loading}
                    />
                </div>

                {/* Categories */}
                <div className="form-group">
                    <label htmlFor="categories">Categories (comma-separated)</label>
                    <input
                        type="text"
                        id="categories"
                        className="form-control"
                        value={categories}
                        onChange={(e) => setCategories(e.target.value)}
                        placeholder="e.g., React, Web Development, Tutorial"
                        disabled={loading}
                    />
                </div>

                {/* Error */}
                {error && <p className="error-message">{error}</p>}

                {/* Submit */}
                <button type="submit" className="submit-btn" disabled={loading}>
                    {loading ? 'Publishing...' : 'Publish Post'}
                </button>

            </form>
        </div>
    );
};

export default CreatePost;