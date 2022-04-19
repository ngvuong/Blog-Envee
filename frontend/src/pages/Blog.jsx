import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getBlogDetails } from '../api/blogService';
import styled from 'styled-components';
import { parseISO, format } from 'date-fns';

function Blog() {
  const [blog, setBlog] = useState();
  const blogId = useParams().blogid;

  useEffect(() => {
    getBlogDetails(blogId).then((data) => {
      setBlog(data.blog);
    });
  }, [blogId]);

  return (
    <>
      {blog && (
        <StyledContainer>
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
        </StyledContainer>
      )}
    </>
  );
}

const StyledContainer = styled.main`
  padding: 0 5rem;

  h1 {
    font-size: 4rem;
    text-transform: capitalize;
  }
  p {
    color: #999;
    font-size: 2rem;
  }
`;

export default Blog;
