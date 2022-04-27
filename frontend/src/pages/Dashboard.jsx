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
    getBlogs('user', user.token).then((data) => {
      setBlogs(data.blogs);
      setIsLoading(false);
    });
  }, [user]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <StyledContainer>
      <h1>{user.username}'s Dashboard</h1>
      <section>
        <h2>
          <span>
            <AiFillEdit /> Edit Blogs [<span>{blogs.length}</span>]
          </span>
          {user.admin && (
            <Link to='/dashboard/admin'>
              <Button background='#5d5d5d' tabIndex='-1'>
                Admin Dashboard
              </Button>
            </Link>
          )}
          <Link to='/editor'>
            <Button background='#445566' tabIndex='-1'>
              New Blog
            </Button>
          </Link>
        </h2>
        <div>
          {blogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} edit />
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
      margin-bottom: 5rem;

      & > span {
        display: flex;
        align-items: center;

        svg {
          margin-right: 1rem;
        }

        span {
          color: #ffcc20;
        }
      }
    }

    button {
      font-size: clamp(1.6rem, 2.5vw, 2rem);
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

  @media (max-width: 768px) {
    padding: 2rem;

    h2 {
      flex-direction: column-reverse;
      gap: 2rem;
    }
  }
`;

export default Dashboard;
