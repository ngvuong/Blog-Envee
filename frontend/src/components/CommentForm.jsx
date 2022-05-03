import Button from './Button';
import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/authContext';
import { createComment } from '../api/blogService';
import styled from 'styled-components';

function CommentForm({ blogid, addComment }) {
  const [{ isAuthenticated, user }] = useAuth();
  const [comment, setComment] = useState({
    username: user ? user.username : '',
    content: '',
  });
  const [errors, setErrors] = useState({ username: '', content: '' });

  const { username, content } = comment;

  useEffect(() => {
    if (!user) {
      setComment({ username: '', content: '' });
    }
  }, [user]);

  const onSubmit = (e) => {
    e.preventDefault();

    if (!username || !content) {
      setErrors({
        username: !username ? 'Username is required' : '',
        content: !content ? 'Comment is required' : '',
      });
      return;
    }

    createComment(blogid, comment).then((newComment) => {
      addComment(newComment);
      setComment({ ...comment, content: '' });
    });
  };

  return (
    <StyledCommentForm onSubmit={onSubmit}>
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
      <Button
        type='submit'
        color='#303030'
        background='#f7f7f7'
        disabled={!username || !content}
      >
        Submit
      </Button>
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
    background-color: rgba(0, 0, 0, 0.2);
    border: 1px solid #4e555a;
    resize: vertical;
  }

  input:-webkit-autofill,
  input:-webkit-autofill:focus {
    transition: background-color 600000s 0s, color 600000s 0s;
  }

  p {
    color: #d00;
    margin-top: -2rem;
  }

  button {
    align-self: flex-end;
  }
`;

export default CommentForm;
