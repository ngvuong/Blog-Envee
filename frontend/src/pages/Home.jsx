import React, { useEffect } from 'react';
import styled from 'styled-components';
import Button from '../components/Button';
import BlogCard from '../components/BlogCard';
import Spinner from '../components/Spinner';
import { useBlog } from '../contexts/blogContext';
import { getBlogs } from '../api/blogService';

import { FaBlog } from 'react-icons/fa';
import { AiOutlineArrowDown } from 'react-icons/ai';
import web from '../assets/web.png';

function Home() {
  const [{ blogs, isLoading }, dispatch] = useBlog();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Blog Envee';
  }, []);

  useEffect(() => {
    if (!blogs.length) {
      dispatch({ type: 'LOADING' });
      getBlogs().then((data) => {
        if (!data.blogs.length) {
          dispatch({ type: 'STOP_LOADING' });
          return;
        }

        dispatch({ type: 'FETCH_BLOGS', blogs: data.blogs });
      });
    }
  }, [blogs, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <StyledContainer>
      <section>
        <div>
          <h1>Blog Envee</h1>
          <p>
            Welcome and enjoy your time at Blog Envee, the envy of tech blogs
            web wide. Read from a selection of blogs about cutting-edge
            technologies and everything web. Join in on the discussion and share
            your thoughts on your favorite content.
          </p>
          <a href='#blogs'>
            <Button tabIndex='-1' background='#d9d9d9'>
              Read Now <AiOutlineArrowDown />
            </Button>
          </a>
        </div>
        <img src={web} alt='web technologies' draggable='false' />
      </section>
      <hr />
      <section id='blogs'>
        <h2>
          <FaBlog /> Blogs [<span>{blogs.length}</span>]
        </h2>
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
  overflow-x: hidden;

  section:first-child {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10rem;
    font-size: clamp(1.6rem, 2.5vw, 2rem);

    div {
      width: 50%;
      text-align: left;
      animation: fadeIn 1s ease-in-out;

      a {
        color: #252525;
      }

      a:focus button {
        border-radius: 0.5rem;
        outline: 2px solid ${({ theme }) => theme.colors.gold_secondary};
        outline-offset: 0.5rem;
      }

      a:focus-visible {
        outline: none;
      }

      button {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        animation: fadeIn 2s ease;
      }
    }

    @keyframes fadeIn {
      0% {
        opacity: 0;
        transform: translateY(25%);
      }

      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }

    h1 {
      display: block;
      font-size: clamp(3.5rem, 4vw, 4.5rem);
      text-align: left;
      margin: 1rem 0;
    }

    p {
      margin-bottom: 1rem;
    }

    img {
      width: 30%;
      animation: zoomIn 1s ease-in-out;
    }

    @keyframes zoomIn {
      0% {
        opacity: 0;
        transform: scale(1.3);
      }

      100% {
        opacity: 1;
        transform: scale(1);
      }
    }
  }

  hr {
    border: 1px solid #ffcc20;
  }

  section:last-child {
    margin-top: 5rem;

    h2 {
      display: flex;
      align-items: baseline;
      font-size: 3rem;
      text-align: left;
      margin: 5rem 0;

      svg {
        margin-right: 1rem;
      }

      span {
        color: #ffcc20;
      }
    }

    div {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 5rem 2rem;
    }
  }

  @media (max-width: 768px) {
    padding: 2rem;

    section:first-child {
      flex-direction: column-reverse;
      gap: 2rem;

      div {
        width: 100%;
      }

      img {
        width: 50%;
      }
    }
  }
`;

export default Home;
