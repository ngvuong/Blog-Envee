import styled from 'styled-components';
import Button from './Button';
import { Link } from 'react-router-dom';
import { parseISO, format } from 'date-fns';

function BlogCard({ blog, edit, onRemove }) {
  return (
    <StyledArticle blog={blog} edit={edit}>
      <Link to={`/blogs/${blog._id}${edit ? '/edit' : ''}`} state={{ blog }}>
        <img src={blog.image} alt='blog post placeholder' />
        <h3>{blog.title}</h3>
        <p>{format(parseISO(blog.createdAt), 'MMMM do, yyyy')}</p>
        <ul>
          {blog.topics.map((topic) => (
            <li key={topic}>{topic}</li>
          ))}
        </ul>
      </Link>
      {onRemove && (
        <Button background='#800' onClick={onRemove}>
          Remove
        </Button>
      )}
    </StyledArticle>
  );
}

const StyledArticle = styled.article`
  flex: 1 1 30rem;
  box-shadow: 0 0 0.5rem 0.5rem rgba(0, 0, 0, 0.2);
  padding-bottom: 2rem;
  border: ${({ blog, edit }) =>
    edit
      ? blog.published
        ? '2px double #1abb5a'
        : '2px double #bb2626'
      : 'none'};

  a,
  a:link,
  a:visited {
    color: inherit;
  }

  h3 {
    font-size: 2.4rem;
    text-transform: capitalize;
    margin-top: 1rem;
  }

  img {
    width: 100%;
    height: 25vw;
    object-fit: cover;
    border-radius: 0.5rem;
    transition: all 0.25s cubic-bezier(0.5, 0, 0.5, 1);
  }

  a:hover img {
    box-shadow: 0 0 0 0.5rem ${({ theme }) => theme.colors.gold_primary};
    transform: scale(1.025);
  }

  p {
    color: #999;
    font-size: 2rem;
  }

  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.5rem;
    margin-top: 1rem;

    li {
      color: #ffcc20;
      text-transform: capitalize;
      background-color: #41555f;
      padding: 0 0.5rem;
      border-radius: 1rem;
    }
  }

  button {
    margin-top: 1rem;
  }

  @media (max-width: 768px) {
    img {
      height: 50vw;
    }
  }
`;

export default BlogCard;
