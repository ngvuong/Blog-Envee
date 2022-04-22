import { useState, useEffect, useRef } from 'react';
import Button from '../components/Button';
import Form from '../components/Form';
import { useAuth } from '../contexts/authContext';
import { Editor } from '@tinymce/tinymce-react';
import { getBlogs } from '../api/blogService';
import { useParams, useLocation } from 'react-router-dom';
import styled from 'styled-components';

function BlogEditor() {
  const [{ user }] = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: user.username,
    image: '',
    published: false,
  });
  const { blogid } = useParams();

  const location = useLocation();

  console.log(location);

  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  useEffect(() => {
    if (location.state.blog) {
      const { title, content, author, image, published } = location.state.blog;
      setFormData({ title, content, author, image, published });
    } else if (blogid) {
      getBlogs().then((data) => {
        const { title, content, author, image, published } = data.blogs.find(
          (blog) => blog._id === blogid
        );
        setFormData({ title, content, author, image, published });
      });
    }
  }, [blogid, location]);

  const { title, content, image, published } = formData;

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

  return (
    <StyledContainer>
      <h1>Blog Editor</h1>
      <Form>
        <div>
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
        </div>
        <div>
          <label htmlFor='content'>Content</label>
          <Editor
            apiKey={process.env.REACT_APP_API_KEY}
            onInit={(evt, editor) => (editorRef.current = editor)}
            initialValue='<p>This is the initial content of the editor.</p>'
            init={{
              height: 500,
              menubar: false,
              plugins: [
                'advlist',
                'autolink',
                'lists',
                'link',
                'image',
                'charmap',
                'anchor',
                'searchreplace',
                'visualblocks',
                'code',
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
                'removeformat | help',
              content_style:
                'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
              toolbar_mode: 'floating',
            }}
          />
          <button onClick={log}>Log editor content</button>
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
        <Button>Save</Button>
      </Form>
    </StyledContainer>
  );
}

const StyledContainer = styled.main`
  padding: 2rem 5rem;
`;

export default BlogEditor;
