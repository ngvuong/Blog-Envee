import styled from 'styled-components';

function Button(props) {
  return <StyledButton {...props} />;
}

const StyledButton = styled.button`
  color: ${({ color }) => (color ? color : 'inherit')};
  background: ${({ background }) => (background ? background : '#fff')};
  padding: 0.5rem;
  border: 1px solid ${({ theme }) => theme.colors.gold_secondary};
  border-radius: 0.5rem;
  transition: all 0.25s cubic-bezier(0.5, 0, 0.5, 1);

  &:hover:not(:disabled) {
    outline: 2px solid ${({ background }) => (background ? background : '#fff')};
    outline-offset: 2px;
  }

  &:active:not(:disabled) {
    transform: translateY(4px);
  }
`;

export default Button;
