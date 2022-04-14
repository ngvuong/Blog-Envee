import { useAuth } from '../contexts/authContext';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import {
  AiOutlineUserAdd,
  AiOutlineLogin,
  AiOutlineLogout,
  AiOutlineUser,
} from 'react-icons/ai';
import envee from '../assets/envee.svg';

function Header() {
  const [{ isAuthenticated, user }, dispatch] = useAuth();

  const onLogout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <StyledHeader>
      <div>
        <Link to='/'>
          Blog
          <img src={envee} alt='Letter e' />
          nvee
        </Link>
      </div>

      <nav>
        <ul>
          {isAuthenticated ? (
            <>
              <li>
                <AiOutlineUser /> {user.username}
              </li>
              <li>
                <button onClick={onLogout}>
                  {' '}
                  <AiOutlineLogout /> Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to='/login'>
                  {' '}
                  <AiOutlineLogin /> Login
                </Link>
              </li>
              <li>
                <Link to='/register'>
                  {' '}
                  <AiOutlineUserAdd /> Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  position: sticky;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${({ theme }) => theme.colors.gold_primary};
  background-color: ${({ theme }) => theme.colors.header};
  padding: 1rem;
  border-radius: 1rem;
  margin: 1rem 2rem;
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.2);

  div {
    font-size: 3.2rem;
    font-weight: 900;

    a {
      text-shadow: 5px 5px 5px #000;
    }
  }

  div a,
  nav a {
    color: inherit;
  }

  img {
    height: 3.5rem;
    background: #2196f3;
    padding: 0.5rem;
    border-radius: 50%;
    margin-left: 0.5rem;
    vertical-align: middle;
    box-shadow: 5px 5px 5px #000;
  }

  ul {
    display: flex;
    gap: 1rem;
    font-weight: bold;

    a,
    button,
    li {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
  }
`;

export default Header;
