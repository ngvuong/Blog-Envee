import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useBlog } from '../contexts/blogContext';
import { getBlogs } from '../api/blogService';
import Spinner from '../components/Spinner';
import Comment from '../components/Comment';
import styled from 'styled-components';
import { parseISO, format } from 'date-fns';

function Blog() {
  const [blog, setBlog] = useState();
  const [notFound, setNotFound] = useState(false);
  const [{ blogs, isLoading }, dispatch] = useBlog();
  const { blogid } = useParams();

  useEffect(() => {
    if (!blogs.length) {
      dispatch({ type: 'LOADING' });
      getBlogs().then((data) => {
        const publishedBlogs = data.blogs.filter((blog) => blog.published);
        dispatch({ type: 'FETCH_BLOGS', blogs: publishedBlogs });
      });
    } else {
      setBlog(() => {
        const blog = blogs.find((blog) => blog._id === blogid);
        if (!blog) setNotFound(true);
        document.title =
          blog.title.replace(/\b\w/g, (l) => l.toUpperCase()) || 'Blog Envee';
        return blog;
      });
    }
  }, [blogid, blogs, dispatch]);

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
              {`Posted by ${blog.author} on ${format(
                parseISO(blog.createdAt),
                'MMMM do, yyyy'
              )}`}
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
          <img src={blog.image} alt='blog post placeholder' />
          <ul>
            {blog.topics.map((topic) => (
              <li key={topic}>{topic}</li>
            ))}
          </ul>
          <section>{blog.content}</section>
          <section>
            <h2>Discussion ({blog.comments.length})</h2>
            <></>
            {blog.comments.map((comment) => (
              <Comment key={comment._id} comment={comment} />
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
    width: 70%;
    margin: 0 auto;

    div {
      text-align: left;

      h1 {
        display: block;
        font-size: 4rem;
        text-transform: capitalize;
        text-align: left;
        line-height: 1.2;
        margin: 0;
      }

      p {
        color: #999;
      }
    }

    img {
      width: 100%;
      height: 50rem;
      object-fit: cover;
    }

    ul {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      gap: 0.5rem;

      li {
        text-transform: capitalize;
        background-color: #41555f;
        padding: 0 0.5rem;
        border-radius: 1rem;
      }
    }

    section {
      text-align: left;

      h2 {
        text-align: left;
      }
    }
  }
`;

export default Blog;
