import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import apiService from '../services/apiService';
import './EditPost.css';
 
const EditPost = () => {
    const { id } = useParams();
    const navigate = useNavigate();
 
    const [title, setTitle] = useState('');
    const [markdownContent, setMarkdownContent] = useState('');
    const [categories, setCategories] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
 
    // ✅ Fetch existing post data
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await apiService.get(`/posts/${id}`);
                const post = response.data;
                setTitle(post.title);
                setMarkdownContent(post.markdownContent);
                setCategories(post.categories ? post.categories.join(', ') : '');
            } catch (err) {
                console.error('Failed to fetch post:', err);
                setError('Failed to load post. Please try again.');
            } finally {
                setFetching(false);
            }
        };
        fetchPost();
    }, [id]);
 
    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError('');
 
        if (!title.trim() || !markdownContent.trim()) {
            setError('Title and content are required.');
            setLoading(false);
            return;
        }
 
        const categoriesArray = categories
            .split(',')
            .map(cat => cat.trim())
            .filter(cat => cat);
 
        try {
            await apiService.put(`/posts/${id}`, {
                title,
                markdownContent,
                categories: categoriesArray,
            });
 
            navigate('/admin/dashboard');
        } catch (err) {
            console.error('Failed to update post:', err);
            setError(err.response?.data?.message || 'Failed to update post. Please try again.');
            setLoading(false);
        }
    };
 
    if (fetching) {
        return <div className="loading-message">Loading post...</div>;
    }
 
    return (
        <div className="edit-post-page">
            <h2>Edit Post</h2>
 
            <form onSubmit={handleSubmit} className="edit-post-form">
 
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
 
                {/* Buttons */}
                <div className="form-actions">
                    <button
                        type="button"
                        className="cancel-btn"
                        onClick={() => navigate('/admin/dashboard')}
                        disabled={loading}
                    >
                        Cancel
                    </button>
                    <button type="submit" className="submit-btn" disabled={loading}>
                        {loading ? 'Updating...' : 'Update Post'}
                    </button>
                </div>
 
            </form>
        </div>
    );
};
 
export default EditPost;