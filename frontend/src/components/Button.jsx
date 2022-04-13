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
`;

export default Button;
