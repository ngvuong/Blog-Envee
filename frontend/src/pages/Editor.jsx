import styled from 'styled-components';

function Editor() {
  console.log(process.env.REACT_APP_API_KEY);
  return (
    <StyledContainer>
      <h1>Blog Editor</h1>
    </StyledContainer>
  );
}

const StyledContainer = styled.main`
  padding: 2rem 5rem;
`;

export default Editor;
