import { Link } from 'react-router-dom';
import styled from 'styled-components';

import envee from '../assets/envee.svg';

function Header() {
  return (
    <StyledHeader>
      <h1>
        <img src={envee} alt='letter e' />
        <Link to='/'>
          Blog
          <img src={envee} alt='' />
          nvee
        </Link>
      </h1>

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

  img {
    height: 3.5rem;
    background: #2196f3;
    padding: 0.5rem;
    border-radius: 50%;
    margin-left: 0.5rem;
    vertical-align: middle;
  }

  ul {
    display: flex;
    gap: 1rem;
  }
`;

export default Header;
