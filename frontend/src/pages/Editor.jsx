import { useState } from 'react';
import Button from '../components/Button';
import { useAuth } from '../contexts/authContext';
import Form from '../components/Form';
import styled from 'styled-components';

function Editor() {
  const [{ user }] = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: user.username,
    image: '',
    published: false,
  });

  const { title, content, image, published } = formData;

  const onChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <StyledContainer>
      <h1>Blog Editor</h1>
      <Form>
        <label htmlFor='title'>Title</label>
        <input
          type='text'
          id='title'
          name='title'
          value={title}
          onChange={onChange}
          placeholder='Blog title'
          required
        />
        <label htmlFor='content'>Content</label>
        <textarea
          id='content'
          name='content'
          value={content}
          onChange={onChange}
          placeholder='Blog content'
          required
        />
        <label htmlFor='image'>Image</label>
        <input
          type='text'
          id='image'
          name='image'
          value={image}
          onChange={onChange}
          placeholder='Image URL'
        />
        <label htmlFor='published'>Published</label>
        <input
          type='checkbox'
          id='published'
          name='published'
          value={published}
          onChange={onChange}
        />
        <Button>Save</Button>
      </Form>
    </StyledContainer>
  );
}

const StyledContainer = styled.main`
  padding: 2rem 5rem;
`;

export default Editor;
