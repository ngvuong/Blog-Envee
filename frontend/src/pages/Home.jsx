import React, { useState, useEffect } from 'react';
import Button from '../components/Button';
import { getBlogs } from '../api/blogService';
import styled from 'styled-components';

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

  const blogCards = blogs.map((blog) => {
    return (
      <article key={blog._id}>
        <h3>{blog.title}</h3>
        <img src={blog.image} alt='blog post placeholder' />
      </article>
    );
  });

  return (
    <StyledContainer>
      <section>
        <div>
          <h1>Blog Envee</h1>
          <p>
            Welcome and enjoy your time at Blog Envee, the envy of tech blogs
            web wide. Read from a selection of blogs of cutting-edge
            technologies and everything web. Join in on the discussion and share
            your thoughts on your favorite content.
          </p>
          <Button background='#d9d9d9'>
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
        <div>{blogCards}</div>
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
    margin-bottom: 5rem;

    div {
      width: 50%;
      text-align: left;
    }

    h1 {
      display: block;
      font-size: 4rem;
      text-align: left;
      margin: 1rem 0;
    }

    p {
      margin-bottom: 1rem;
    }

    img {
      width: 30%;
    }

    a {
      color: #252525;
    }

    h2 {
      font-size: 3rem;
    }
  }

  section:last-child {
    margin-top: 5rem;

    h2 {
      margin: 2rem 0;
    }

    div {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      gap: 2rem;
    }
    article {
      flex: 1 1 20rem;
      background-color: #2d5050;

      img {
        width: 100%;
      }
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
