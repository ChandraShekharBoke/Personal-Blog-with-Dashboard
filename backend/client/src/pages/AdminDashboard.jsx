import { useState, useEffect } from 'react';
import './AdminDashboard.css'
import apiService from '../services/apiService';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await apiService.get('/posts')
        setPosts(response.data.posts)  
      }
      catch (error) {
        console.error('Error fetching posts:', error)
        setError(error.message)
      }
      finally {
        setLoading(false)
      }
    }
    fetchPosts()
  }, []);

  const handleDelete = async (postId) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this post? This action cannot be undone.');

    if (!isConfirmed) {
      return;
    }
    try {
      await apiService.delete(`/posts/${postId}`);
      setPosts(currrentPosts => currrentPosts.filter(post => post._id !== postId));

      alert('Post deleted successfully');
    }
    catch (error) {
      console.error('Error deleting post:', error);
      alert('Failed to delete post');
    }
  };

  if (loading) {
    return <div className='loading-message'>Loading...</div>;
  }
  if (error) {
    return <div className='error-message'>{error}</div>;
  }
  return (
    <div className='admin-dashboard'>

      <div className='dashboard-header'>

        <h2>Manage Posts</h2>

        <Link to="/admin/create-post" className="create-post-btn">
          + Create New Post
        </Link>

      </div>

      <table className='posts-table'>

        <thead>

          <tr>

            <th>Title</th>
            <th>Author</th>
            <th>Published Date</th>
            <th>Actions</th>

          </tr>

        </thead>

        <tbody>
          {posts.length > 0 ? (

            posts.map((post) => (

              <tr key={post._id}>

                <td>{post.title}</td>
                <td>{post.author}</td>
                <td>{new Date(post.createdAt).toLocaleString()}</td>

                <td className="action-buttons">
                  <Link to={`/admin/edit-post/${post._id}`} className="btn edit-btn">
                    Edit
                  </Link>


                  <button onClick={() => handleDelete(post._id)} className="btn delete-btn">
                    Delete
                  </button>

                </td>

              </tr>
            ))
          ) : (
            <tr>
              <td colSpan='4' style={{ textAlign: 'center' }}>No posts found</td>
            </tr>
          )}
        </tbody>

      </table>

    </div>
  )
}

export default AdminDashboard;