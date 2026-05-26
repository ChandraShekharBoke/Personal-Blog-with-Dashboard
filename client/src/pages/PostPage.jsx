import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import apiService from '../services/apiService';
import './markdown-styles.css'; // ✅ fixed path (recommended)
import { Helmet } from 'react-helmet-async';
import CategoryTag from '../components/CategoryTag';

const PostPage = () => {
  const { slug } = useParams();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);

        // ✅ FIX: correct backend route
        const response = await apiService.get(`/posts/slug/${slug}`);

        setPost(response.data);
      } catch (err) {
        console.error("Failed to fetch post:", err);
        setError('Post not found or an error occurred.');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  // ✅ SEO helper
  const createMetaDescription = (markdown) => {
    if (!markdown) return '';

    const plainText = markdown
      .replace(/!\[.*?\]\(.*?\)/g, '')
      .replace(/\[(.*?)\]\(.*?\)/g, '$1')
      .replace(/[`*#_~]/g, '')
      .replace(/\s+/g, ' ');

    return plainText.substring(0, 155).trim() + '...';
  };

  // ✅ Loading / Error states
  if (loading) return <div className="status">Loading...</div>;
  if (error) return <div className="status error">{error}</div>;
  if (!post) return <div className="status">Post not found.</div>;

  return (
    <article className="post-page">

      {/* ✅ SEO */}
      <Helmet>
        <title>{`${post.title} | My Awesome Blog`}</title>
        <meta
          name="description"
          content={createMetaDescription(post.markdownContent)}
        />
      </Helmet>

      {/* ✅ Title */}
      <h1>{post.title}</h1>

      {/* ✅ Meta */}
      <p className="post-meta">
        By {post.author} on{" "}
        {new Date(post.createdAt).toLocaleDateString()}
      </p>

      {/* ✅ Categories */}
      {post.categories && post.categories.length > 0 && (
        <div className="categories-container">
          {post.categories.map((category) => (
            <CategoryTag key={category} category={category} />
          ))}
        </div>
      )}

      {/* ✅ Markdown Content */}
      <div className="post-content markdown-body">
        <ReactMarkdown>{post.markdownContent}</ReactMarkdown>
      </div>

    </article>
  );
};

export default PostPage;