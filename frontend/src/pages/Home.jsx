import React, { useState, useEffect } from 'react';
import Button from '../components/Button';
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

  const blogCards = blogs.map((blog) => {
    return (
      <article key={blog._id}>
        <Link to={`blogs/${blog._id}`}>
          <img src={blog.image} alt='blog post placeholder' />
          <h3>{blog.title}</h3>
          <p>{format(parseISO(blog.createdAt), 'MMMM do, yyyy')}</p>
          <ul>
            {blog.topics.map((topic) => (
              <li key={topic}>{topic}</li>
            ))}
          </ul>
        </Link>
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
            web wide. Read from a selection of blogs about cutting-edge
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
    margin-bottom: 10rem;

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
      font-size: 2rem;
      margin-bottom: 1rem;
    }

    img {
      width: 30%;
    }

    a {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: #252525;
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

    article {
      flex: 1 1 30rem;
      box-shadow: 0 0 0.5rem 0.5rem rgba(0, 0, 0, 0.2);
      padding-bottom: 2rem;

      a {
        color: inherit;
      }

      h3 {
        font-size: 2.4rem;
        text-transform: capitalize;
        margin-top: 2rem;
      }

      img {
        width: 100%;
        height: 30vw;
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
          text-transform: capitalize;
          background-color: #41555f;
          padding: 0 0.5rem;
          border-radius: 1rem;
        }
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
