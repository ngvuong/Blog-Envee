import React, { useState, useEffect } from 'react';
import Button from '../components/Button';
import BlogCard from '../components/BlogCard';
import { getBlogs } from '../api/blogService';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { parseISO, format } from 'date-fns';

import { AiOutlineArrowDown } from 'react-icons/ai';
import web from '../assets/web.png';

function Home() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    getBlogs().then((data) => {
      const publishedBlogs = data.blogs.filter((blog) => blog.published);
      setBlogs(publishedBlogs);
    });
  }, []);

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
          <Button tabIndex='-1' background='#d9d9d9'>
            <a href='#blogs'>
              Read Now <AiOutlineArrowDown />
            </a>
          </Button>
        </div>
        <img src={web} alt='web technologies' draggable='false' />
      </section>
      <hr />
      <section id='blogs'>
        <h2>Blogs</h2>
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

  section:first-child {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10rem;

    div {
      width: 50%;
      text-align: left;
      animation: fadeIn 1s ease-in-out;
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
      font-size: 4rem;
      text-align: left;
      margin: 1rem 0;
    }

    p {
      font-size: 2rem;
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

    a {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: #252525;
    }

    a:focus {
      border-radius: 0.5rem;
      outline: 2px solid ${({ theme }) => theme.colors.gold_secondary};
      outline-offset: 1.2rem;
    }
  }

  section:last-child {
    margin-top: 5rem;

    h2 {
      font-size: 3rem;
      margin: 5rem 0;
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
