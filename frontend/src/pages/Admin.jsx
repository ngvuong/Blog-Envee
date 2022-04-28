import { useState, useEffect } from 'react';
import styled from 'styled-components';
import BlogCard from '../components/BlogCard';
import Spinner from '../components/Spinner';
import { useAuth } from '../contexts/authContext';
import { getBlogs, deleteBlog } from '../api/blogService';
import { AiFillEdit } from 'react-icons/ai';

function Admin() {
  const [{ user }] = useAuth();
  const [blogs, setBlogs] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.title = 'Admin Dashboard';
  }, []);

  useEffect(() => {
    getBlogs('admin', user.token).then((data) => {
      const blogsByAuthor = data.blogs.reduce((acc, blog) => {
        if (!acc[blog.author]) {
          acc[blog.author] = [];
        }
        acc[blog.author].push(blog);
        return acc;
      }, {});
      setBlogs(blogsByAuthor);
      setIsLoading(false);
    });
  }, [user]);

  const onRemove = (id) => {
    deleteBlog(id, user.token).then(() => {
      setBlogs((prevBlogs) => {
        const newBlogs = { ...prevBlogs };
        Object.keys(blogs).forEach((author) => {
          newBlogs[author] = blogs[author].filter((blog) => blog._id !== id);
        });
        return newBlogs;
      });
    });
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <StyledContainer>
      <h1>Admin Dashboard</h1>
      <h2>
        <AiFillEdit /> Manage Blogs
      </h2>
      {Object.keys(blogs).map((author) => (
        <section key={author}>
          <h3>
            Posts by {author} [<span>{blogs[author].length}</span>]
          </h3>
          <div>
            {blogs[author].map((blog) => (
              <BlogCard
                key={blog._id}
                blog={blog}
                edit
                onRemove={() => onRemove(blog._id)}
              />
            ))}
          </div>
        </section>
      ))}
    </StyledContainer>
  );
}

const StyledContainer = styled.main`
  padding: 2rem 5rem;

  h2 {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 2rem;
  }

  section {
    margin-bottom: 4rem;

    & > h3 {
      font-size: 2rem;
      text-align: left;
      margin-bottom: 2rem;

      span {
        color: #ffcc20;
      }
    }

    div {
      display: flex;
      flex-wrap: wrap;
      gap: 4rem 2rem;
    }
  }
`;

export default Admin;
