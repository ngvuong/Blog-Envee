import { useState, useEffect } from 'react';
import BlogCard from '../components/BlogCard';
import Button from '../components/Button';
import Spinner from '../components/Spinner';
import { getBlogs } from '../api/blogService';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

function Dashboard() {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.title = 'Dashboard';
  }, []);

  useEffect(() => {
    if (!blogs.length) {
      getBlogs().then((data) => {
        setBlogs(data.blogs);
        setIsLoading(false);
      });
    }
  }, [blogs]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <StyledContainer>
      <h1>Envee Dashboard</h1>
      <section>
        <h2>
          <span>Edit Blogs ({blogs.length})</span>
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
    }

    button {
      font-size: 2rem;
    }

    a {
      color: inherit;
    }

    div {
      display: flex;
      flex-wrap: wrap;
      gap: 4rem 2rem;
    }
  }
`;

export default Dashboard;
