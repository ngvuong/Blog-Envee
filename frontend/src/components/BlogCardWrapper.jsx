import styled from 'styled-components';

function BlogCardWrapper({ children }) {
  return <StyledBlogCardWrapper>{children}</StyledBlogCardWrapper>;
}

const StyledBlogCardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  justify-content: center;
  gap: 4rem 2rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(8, minmax(0, 1fr));
  }

  @media (max-width: 640px) {
    grid-template-columns: repeat(4, minmax(0, 10rem));
  }
`;

export default BlogCardWrapper;
