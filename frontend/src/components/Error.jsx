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
  align-items: center;
  justify-content: center;
  gap: 1rem;
  color: #db3030;
  background: #fcebee;
  margin: 2rem 0;
`;

export default Error;
