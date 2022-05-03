import styled from 'styled-components';

function Spinner() {
  return (
    <StyledContainer>
      <div />
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: #000;
  z-index: 2;

  div {
    position: fixed;
    top: 50%;
    left: 50%;
    width: 5rem;
    height: 5rem;
    border: 0.5rem solid rgba(0, 0, 0, 0.2);
    border-top: 0.5rem solid #2888dd;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    z-index: 2;
  }

  @keyframes spin {
    0% {
      transform: translate(-50%, -50%) rotate(0deg);
    }
    100% {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }
`;

export default Spinner;
