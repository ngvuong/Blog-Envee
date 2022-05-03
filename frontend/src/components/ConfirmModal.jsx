import styled from 'styled-components';
import Button from './Button';

function ConfirmModal({ onConfirm, onCancel }) {
  return (
    <StyledConfirmModal>
      <div>
        <h1>Confirm permanent deletion?</h1>
        <Button background='#800' onClick={onConfirm}>
          Confirm
        </Button>
        <Button background='#275' onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </StyledConfirmModal>
  );
}

const StyledConfirmModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 3;

  div {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 70%;
    height: fit-content;
    background-color: #135;
    padding: 2rem;
    border-radius: 1rem;
    transform: translate(-50%, -50%);

    h1 {
      font-size: 3rem;
    }

    button {
      margin-right: 2rem;
    }
  }
`;

export default ConfirmModal;
