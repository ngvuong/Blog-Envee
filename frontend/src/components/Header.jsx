import { useAuth } from '../contexts/authContext';
import { logout } from '../api/authService';
import { Link, useLocation } from 'react-router-dom';
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

  const location = useLocation();

  const onLogout = () => {
    dispatch({ type: 'LOGOUT' });
    logout();
  };

  return (
    <StyledHeader>
      <div>
        <Link to='/'>
          B<span>log</span>
          <img src={envee} alt='Letter e' />
          <span>nvee</span>
        </Link>
      </div>

      <nav>
        <ul>
          {isAuthenticated ? (
            <>
              <li>
                <Link to='/dashboard'>
                  <AiOutlineUser /> {user.username}
                </Link>
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
                <Link to='/login' state={{ from: location }}>
                  {' '}
                  <AiOutlineLogin /> Login
                </Link>
              </li>
              <li>
                <Link to='/register' state={{ from: location }}>
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
  z-index: 2;

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

  @media (max-width: 480px) {
    ul {
      flex-direction: column;
      gap: 0;
    }
  }

  @media (max-width: 360px) {
    margin: 0;

    span {
      display: none;
    }

    img {
      vertical-align: text-top;
      margin: 0;
    }
  }
`;

export default Header;
