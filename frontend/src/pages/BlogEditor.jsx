import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Button from '../components/Button';
import Form from '../components/Form';
import { createBlog } from '../api/blogService';
import { useAuth } from '../contexts/authContext';
import { getBlogs } from '../api/blogService';
import { Editor } from '@tinymce/tinymce-react';
import { useParams, useLocation } from 'react-router-dom';

function BlogEditor() {
  const [{ user }] = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: user.username,
    image: '',
    topics: '',
    published: false,
  });
  const [errors, setErrors] = useState({ title: '', content: '' });

  const { blogid } = useParams();

  const location = useLocation();

  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
      editorRef.current.focus();
    }
  };

  useEffect(() => {
    if (location?.state?.blog) {
      const { title, content, author, image, topics, published } =
        location.state.blog;
      setFormData({ title, content, author, image, topics, published });
    } else if (blogid) {
      getBlogs().then((data) => {
        const { title, content, author, image, topics, published } =
          data.blogs.find((blog) => blog._id === blogid);
        setFormData({ title, content, author, image, topics, published });
      });
    }
  }, [blogid, location]);

  const { title, content, image, topics, published } = formData;

  const onChange = (e) => {
    const { name, value } = e.target;
    if (name === 'published') {
      setFormData({ ...formData, published: !published });
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const onSave = (e) => {
    e.preventDefault();
    console.log(formData);
    if (!title || !content) {
      setErrors({
        title: title ? '' : 'Title is required*',
        content: content ? '' : 'Content is required*',
      });
      return;
    }
    createBlog(formData, user.token);
  };

  return (
    <StyledContainer>
      <h1>Blog Editor</h1>
      <Form onSubmit={onSave}>
        <div>
          <label htmlFor='title'>
            Title<span>*</span>
          </label>
          <input
            type='text'
            id='title'
            name='title'
            value={title}
            onChange={onChange}
            placeholder='Blog title'
            required
            autoFocus
          />
          {errors.title && <p role='alert'>{errors.title}</p>}
        </div>
        <div>
          <label htmlFor='content' onClick={log}>
            Content<span>*</span>
          </label>
          <Editor
            apiKey={process.env.REACT_APP_API_KEY}
            onInit={(evt, editor) => (editorRef.current = editor)}
            init={{
              selector: 'textarea',
              height: 400,
              menubar: false,
              skin: 'oxide-dark',
              plugins: [
                'advlist',
                'autolink',
                'lists',
                'link',
                'image',
                'charmap',
                'anchor',
                'searchreplace',
                'code',
                'codesample',
                'fullscreen',
                'insertdatetime',
                'media',
                'table',
                'preview',
                'help',
                'wordcount',
              ],
              toolbar:
                'undo redo | blocks | ' +
                'bold italic forecolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist outdent indent | ' +
                'removeformat | help | link | image | code | codesample | preview | fullscreen',
              content_style:
                'body { font-family:Helvetica,Arial,sans-serif; font-size:14px; background-color:#222f3e; color:#F7F7F7; }',
              toolbar_mode: 'sliding',
            }}
            textareaName='content'
            value={content}
            onEditorChange={(content) =>
              onChange({ target: { name: 'content', value: content } })
            }
          />
          {errors.content && <p role='alert'>{errors.content}</p>}
          <button type='button' onClick={log}>
            Log editor content
          </button>
        </div>
        <div>
          <label htmlFor='image'>Image</label>
          <input
            type='text'
            id='image'
            name='image'
            value={image}
            onChange={onChange}
            placeholder='Image URL'
          />
        </div>
        <div>
          <label htmlFor='topics'>Topics (Comma separated)</label>
          <input
            type='text'
            id='topics'
            name='topics'
            value={topics}
            onChange={onChange}
            placeholder='Comma separated topics'
          />
        </div>
        <div>
          <label htmlFor='published'>Publish</label>
          <input
            type='checkbox'
            id='published'
            name='published'
            checked={published}
            value={published}
            onChange={onChange}
          />
        </div>
        <Button background='green' type='submit' disabled={!title || !content}>
          Save
        </Button>
      </Form>
    </StyledContainer>
  );
}

const StyledContainer = styled.main`
  padding: 2rem 5rem;

  form {
    width: 70%;

    #published {
    }
  }

  p[role='alert'] {
    color: #d00;
    text-align: left;
  }

  @media (max-width: 768px) {
    padding: 1rem;

    form {
      width: 100%;
    }
  }
`;

export default BlogEditor;
