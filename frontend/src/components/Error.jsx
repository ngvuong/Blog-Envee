import styled from 'styled-components';
import { AiFillExclamationCircle } from 'react-icons/ai';

function Error({ children }) {
  return (
    <StyledP role='alert'>
      <AiFillExclamationCircle />
      {children}
    </StyledP>
  );
}

const StyledP = styled.p`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #db3030;
  background: #fcebee;
  padding: 0.5rem;
  margin: 2rem 0;
`;

export default Error;
