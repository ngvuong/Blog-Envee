import { useState, useEffect } from 'react';
import BlogCard from '../components/BlogCard';
import { getBlogs } from '../api/blogService';
import styled from 'styled-components';

function Dashboard() {
  const [blogs, setBlogs] = useState([]);

  // useEffect(() => {
  //   if(!blogs.length) {
  //   getBlogs().then((data) => {
  //   }
  return (
    <StyledContainer>
      <h1>Envee Dashboard</h1>
      <section>
        <h2>Edit Blogs</h2>
        <div>
          {blogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>
      </section>
    </StyledContainer>
  );
}

const StyledContainer = styled.main`
  padding: 5rem;
`;

export default Dashboard;
