import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useBlog } from '../contexts/blogContext';
import { getBlogs } from '../api/blogService';
import Spinner from '../components/Spinner';
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
          <h1>{blog.title}</h1>
          <p>
            {format(parseISO(blog.createdAt), 'MMMM do, yyyy')}
            {blog.createdAt !== blog.updatedAt ? (
              <>
                &mdash; Updated{' '}
                {format(parseISO(blog.updatedAt), 'MMMM do, yyyy')}
              </>
            ) : (
              ''
            )}
          </p>
          <img src={blog.image} alt='blog post placeholder' />
        </article>
      ) : (
        notFound && <h1>Blog not found</h1>
      )}
    </StyledContainer>
  );
}

const StyledContainer = styled.main`
  padding: 0 5rem;

  article {
    display: flex;
    flex-direction: column;
    gap: 2rem;

    h1 {
      font-size: 4rem;
      text-transform: capitalize;
      margin: 0;
    }

    p {
      color: #999;
      font-size: 2rem;
    }

    img {
      width: 100%;
    }
  }
`;

export default Blog;
