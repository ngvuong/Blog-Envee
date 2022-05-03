import { useState } from 'react';
import styled from 'styled-components';
import Button from './Button';
import Image from './Image';
import ConfirmModal from '../components/ConfirmModal';
import { Link, useLocation } from 'react-router-dom';
import { parseISO, format } from 'date-fns';

function BlogCard({ blog, edit, onRemove }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const location = useLocation();

  return (
    <StyledArticle blog={blog} edit={edit}>
      <Link
        to={`/blogs/${blog._id}${edit ? '/edit' : ''}`}
        state={{ blog, from: location }}
      >
        <Image src={blog.image} alt='Blog post placeholder' />
        <h3>{blog.title}</h3>
        <p>{format(parseISO(blog.createdAt), 'MMMM do, yyyy')}</p>
        <ul>
          {blog.topics.map((topic) => (
            <li key={topic}>{topic}</li>
          ))}
        </ul>
      </Link>
      {onRemove && (
        <>
          <Button background='#800' onClick={() => setShowConfirm(true)}>
            Remove
          </Button>
          {showConfirm && (
            <ConfirmModal
              onConfirm={() => onRemove(blog._id)}
              onCancel={() => setShowConfirm(false)}
            />
          )}
        </>
      )}
    </StyledArticle>
  );
}

const StyledArticle = styled.article`
  grid-column: span 4 / span 4;
  padding: 1rem 1rem 2rem;
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
    text-align: left;
    margin-top: 1rem;
  }

  h3::first-letter {
    text-transform: uppercase;
  }

  img {
    width: 100%;
    height: 30vw;
    object-fit: cover;
    border-radius: 1rem;
    transition: all 0.25s cubic-bezier(0.5, 0, 0.5, 1);
    box-shadow: 0 0 5px #000;
  }

  a:hover img {
    box-shadow: 0 0 0 0.5rem ${({ theme }) => theme.colors.gold_primary};
    transform: scale(1.025);
  }

  p {
    color: #999;
    font-size: 2rem;
    text-align: left;
  }

  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
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

  @media (max-width: 1024px) {
    img {
      height: 45vw;
    }
  }

  @media (max-width: 640px) {
    img {
      height: 65vw;
    }
  }

  @media (max-width: 480px) {
    img {
      height: 75vw;
    }
  }
`;

export default BlogCard;
