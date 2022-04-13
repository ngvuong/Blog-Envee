import { Link } from 'react-router-dom';
import styled from 'styled-components';

import envee from '../assets/envee.svg';

function Header() {
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
          <li>
            <Link to='/login'>Login</Link>
          </li>
          <li>
            <Link to='/register'>Register</Link>
          </li>
        </ul>
      </nav>
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  color: ${({ theme }) => theme.colors.gold_primary};
  background-color: ${({ theme }) => theme.colors.header};

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
  }
`;

export default Header;
