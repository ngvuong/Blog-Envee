import { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import Spinner from '../components/Spinner';
import Comment from '../components/Comment';
import CommentForm from '../components/CommentForm';
import Image from '../components/Image';
import { useBlog } from '../contexts/blogContext';
import { getBlogs } from '../api/blogService';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { parseISO, format } from 'date-fns';
import {
  AiOutlineUser,
  AiTwotoneCalendar,
  AiOutlineLike,
} from 'react-icons/ai';

function Blog() {
  const location = useLocation();
  const [blog, setBlog] = useState(location?.state?.blog || null);
  const [comments, setComments] = useState(blog?.comments || []);
  const [notFound, setNotFound] = useState(false);
  const [{ blogs, isLoading }, dispatch] = useBlog();
  const { blogid } = useParams();
  const navigate = useNavigate();

  const fetchBlog = useCallback(() => {
    if (blogs.length) {
      const blog = blogs.find((blog) => blog._id === blogid);
      if (!blog) {
        setNotFound(true);
        return;
      }
      setBlog(blog);
      setComments(blog.comments);
      navigate(location.pathname, { state: { blog }, replace: true });
    } else {
      dispatch({ type: 'LOADING' });
      getBlogs().then((data) => {
        if (!data.blogs.length) {
          setNotFound(true);
          dispatch({ type: 'STOP_LOADING' });
          return;
        }
        dispatch({ type: 'FETCH_BLOGS', blogs: data.blogs });
      });
    }
  }, [blogid, blogs, dispatch, location, navigate]);

  useEffect(() => {
    if (!blog) {
      fetchBlog();
    } else {
      document.title =
        blog.title.replace(/\b\w/g, (l) => l.toUpperCase()) || 'Blog Envee';
    }
  }, [blog, fetchBlog]);

  useEffect(() => {
    Prism.highlightAll();
    window.scrollTo(0, 0);
  }, []);

  const addComment = (comment) => {
    setComments([comment, ...comments]);
    navigate(location.pathname, { replace: true });
  };

  const removeComment = (comment) => {
    setComments((prevComments) =>
      prevComments.filter((c) => c._id !== comment._id)
    );
    navigate(location.pathname, { replace: true });
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <StyledContainer>
      {blog ? (
        <article>
          <div>
            <h1>{blog.title}</h1>
            <p>
              <AiOutlineUser />
              {`Posted by ${blog.author}`}
            </p>
            <p>
              <AiTwotoneCalendar />
              {format(parseISO(blog.createdAt), 'MMMM do, yyyy')}
              {blog.createdAt !== blog.updatedAt ? (
                <>
                  {' '}
                  &mdash; Updated{' '}
                  {format(parseISO(blog.updatedAt), 'MMMM do, yyyy')}
                </>
              ) : (
                ''
              )}
            </p>
          </div>
          <Image src={blog.image} alt='Blog post placeholder' />
          <ul>
            {blog.topics.map((topic) => (
              <li key={topic}>{topic}</li>
            ))}
          </ul>
          <section dangerouslySetInnerHTML={{ __html: blog.content }} />
          <div>
            <button>
              {blog.likes} <AiOutlineLike />
            </button>
          </div>
          <section>
            <h2>
              Discussion [<span>{comments.length}</span>]
            </h2>
            <CommentForm blogid={blogid} addComment={addComment} />
            {comments.map((comment) => (
              <Comment
                key={comment._id}
                comment={comment}
                blogid={blogid}
                removeComment={removeComment}
              />
            ))}
          </section>
        </article>
      ) : (
        notFound && <h1>Blog not found</h1>
      )}
    </StyledContainer>
  );
}

const StyledContainer = styled.main`
  padding: 0 5rem;
  margin: 5rem 0;

  article {
    display: flex;
    flex-direction: column;
    gap: 5rem;
    width: 80%;
    margin: 0 auto;
    font-size: clamp(1.6rem, 3vw, 1.8rem);

    & > div {
      text-align: left;

      h1 {
        display: block;
        text-transform: capitalize;
        text-align: left;
        line-height: 1.2;
        margin: 0;
      }

      p {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: #999;
        font-size: 1.4rem;
      }
    }

    img {
      width: 100%;
      height: clamp(25rem, 40vw, 50rem);
      object-fit: cover;
    }

    ul {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      gap: 0.5rem;

      li {
        color: #ffcc20;
        text-transform: capitalize;
        background-color: #41555f;
        padding: 0 0.5rem;
        border-radius: 1rem;
      }
    }

    & > div:last-of-type {
      display: flex;
      justify-content: center;

      button {
        display: flex;
        align-items: baseline;
        gap: 1rem;
        color: #ffcc20;
        background-color: #455;
        padding: 1rem 2rem;
        border: 1px solid #ffcc20;
        border-radius: 0.5rem;
      }

      button:hover {
        box-shadow: 0 0 5px #ffcc20;
      }
    }

    section {
      text-align: left;

      & > p {
        margin: 2rem 0;
      }

      p > code {
        color: #f5a;
      }

      h2 {
        text-align: left;

        span {
          color: #ffcc20;
        }
      }
    }
  }

  @media (max-width: 768px) {
    padding: 0 2rem;
    article {
      gap: 3rem;
      width: 100%;
    }
  }
`;

export default Blog;
