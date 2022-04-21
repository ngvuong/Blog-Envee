import { useState, useEffect } from 'react';
import BlogCard from '../components/BlogCard';
import Button from '../components/Button';
import { getBlogs } from '../api/blogService';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

function Dashboard() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    if (!blogs.length) {
      getBlogs().then((data) => {
        setBlogs(data.blogs);
      });
    }
  }, [blogs]);

  return (
    <StyledContainer>
      <h1>Envee Dashboard</h1>
      <section>
        <h2>
          <span>Edit Blogs</span>
          <Button background='#1a77bb' tabIndex='-1'>
            <Link to='/editor'>New Blog</Link>
          </Button>
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
      text-align: left;
      margin-bottom: 2rem;
    }

    button {
      font-size: 2rem;
    }

    a {
      color: inherit;
    }

    div {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(25rem, 1fr));
      gap: 4rem 2rem;
    }
  }
`;

export default Dashboard;
