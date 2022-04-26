import { useState, useEffect } from 'react';
import styled from 'styled-components';
import BlogCard from '../components/BlogCard';
import Button from '../components/Button';
import Spinner from '../components/Spinner';
import { useAuth } from '../contexts/authContext';
import { getBlogs } from '../api/blogService';
import { Link } from 'react-router-dom';
import { AiFillEdit, AiFillMeh } from 'react-icons/ai';

function Dashboard() {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [{ user }] = useAuth();

  useEffect(() => {
    document.title = 'Dashboard';
  }, []);

  useEffect(() => {
    getBlogs().then((data) => {
      const foundBlogs = data.blogs.filter(
        (blog) => blog.author === user.username
      );
      setBlogs(foundBlogs);
      setIsLoading(false);
    });
  }, [user]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <StyledContainer>
      <h1>{user.username} Dashboard</h1>
      <section>
        <h2>
          <span>
            <AiFillEdit /> Edit Blogs ({blogs.length})
          </span>
          <Link to='/editor'>
            <Button background='#1a77bb' tabIndex='-1'>
              New Blog
            </Button>
          </Link>
        </h2>
        <div>
          {blogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} edit={true} />
          ))}
          {!blogs.length && <AiFillMeh />}
        </div>
      </section>
    </StyledContainer>
  );
}

const StyledContainer = styled.main`
  padding: 2rem 5rem;

  section {
    margin: 5rem 0;

    h2 {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;

      span {
        display: flex;
        align-items: center;
        gap: 1rem;
      }
    }

    button {
      font-size: 2rem;
    }

    a {
      color: inherit;
    }

    div {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 4rem 2rem;

      svg {
        color: #ffcc20;
        font-size: 5rem;
      }
    }
  }
`;

export default Dashboard;
