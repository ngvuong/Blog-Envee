import { parseISO, formatDistance } from 'date-fns';
import styled from 'styled-components';

function Comment({ comment }) {
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

  p:last-child {
    font-size: 1.2rem;
  }
`;

export default Comment;
