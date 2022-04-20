import { useState } from 'react';
import { useAuth } from '../contexts/authContext';
import { useBlog } from '../contexts/blogContext';
import { getBlogs } from '../api/blogService';
import axios from 'axios';
import styled from 'styled-components';

function CommentForm({ blogid }) {
  const [{ isAuthenticated, user }] = useAuth();
  const [, dispatch] = useBlog();
  const [comment, setComment] = useState({
    username: user ? user.username : '',
    content: '',
    blogid,
  });
  const [errors, setErrors] = useState({ username: '', content: '' });

  const { username, content } = comment;

  const onSubmit = (e) => {
    e.preventDefault();

    if (!username || !content) {
      setErrors({
        username: !username ? 'Username is required' : '',
        content: !content ? 'Comment is required' : '',
      });
      return;
    }

    axios.post('/api/comments', comment).then(() => {
      getBlogs().then((data) => {
        dispatch({ type: 'FETCH_BLOGS', blogs: data.blogs });
        setComment({ username: '', content: '', blogid });
      });
    });
  };

  return (
    <StyledCommentForm>
      {!isAuthenticated && (
        <input
          type='text'
          name='username'
          value={username}
          onChange={(e) => setComment({ ...comment, username: e.target.value })}
          placeholder='Name'
          required
        />
      )}
      {errors.username && <p role='alert'>{errors.username}</p>}
      <textarea
        name='content'
        value={content}
        onChange={(e) => setComment({ ...comment, content: e.target.value })}
        cols='30'
        rows='3'
        placeholder='What are your thoughts?'
        required
      ></textarea>
      {errors.content && <p role='alert'>{errors.content}</p>}
      <button type='submit' onClick={onSubmit} disabled={!username || !content}>
        Submit
      </button>
    </StyledCommentForm>
  );
}

const StyledCommentForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin: 2rem 0;

  input,
  textarea {
    min-height: 4rem;
    border: 1px solid #ccc;
    resize: vertical;
  }

  p {
    color: #f00;
    margin-top: -2rem;
  }

  button:disabled {
    opacity: 0.5;
    cursor: default;
  }
`;

export default CommentForm;
