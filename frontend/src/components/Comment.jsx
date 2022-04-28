import Button from './Button';
import { deleteComment } from '../api/blogService';
import { useBlog } from '../contexts/blogContext';
import { useAuth } from '../contexts/authContext';
import { parseISO, formatDistance } from 'date-fns';
import styled from 'styled-components';

function Comment({ comment, blogid, removeComment }) {
  const [{ user }] = useAuth();
  const [, dispatch] = useBlog();

  const onDelete = () => {
    deleteComment(blogid, comment._id, user.token).then((blogs) => {
      dispatch({ type: 'RESET_BLOGS' });
      removeComment(comment);
    });
  };

  return (
    <StyledComment>
      <p>{comment.content}</p>
      <p>
        {`Posted by ${comment.username} ${formatDistance(
          parseISO(comment.createdAt),
          new Date(),
          { addSuffix: true }
        )}`}
      </p>
      {user && user.admin && (
        <Button background='#A00' onClick={onDelete}>
          Delete
        </Button>
      )}
    </StyledComment>
  );
}

const StyledComment = styled.div`
  background-color: rgba(0, 0, 0, 0.2);
  padding: 1rem;
  border-radius: 1rem;
  margin: 1rem 0;

  p:first-child {
    color: inherit;
    padding: 0.5rem 0;
  }

  p:last-of-type {
    font-size: 1.2rem;
  }

  button {
    display: block;
    margin-left: auto;
  }
`;

export default Comment;
