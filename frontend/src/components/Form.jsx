import styled from 'styled-components';

function Form(props) {
  return <StyledForm action='' method='POST' {...props} />;
}

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 50%;
  padding: 1rem;
  margin: 2rem auto;

  &::before {
    content: '';
    width: 100%;
    height: 1px;
    background: #686868;
    margin: 0 auto;
  }

  div {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  label {
    color: ${({ theme }) => theme.colors.gold_secondary};
  }

  input,
  textarea {
    border: 1px solid #4c636e;
    border-radius: 0.5rem;
  }

  input:valid {
    border: 1px solid #4caf50;
  }

  input:not(:placeholder-shown):invalid,
  input.invalid {
    border: 1px solid #da5050;
  }
`;

export default Form;