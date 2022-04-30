import styled from 'styled-components';
import { AiFillGithub } from 'react-icons/ai';

function Footer() {
  return (
    <StyledFooter>
      <div>&copy; 2022 Blog Envee</div>
      <a
        href='https://github.com/ngvuong/Blog-Envee'
        target='_blank'
        rel='noreferrer noopener'
      >
        <AiFillGithub />
      </a>
    </StyledFooter>
  );
}

const StyledFooter = styled.footer`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 1rem;
  background-color: ${({ theme }) => theme.colors.footer};
  margin-top: auto;

  div {
    color: ${({ theme }) => theme.colors.gold_primary};
    font-size: 2rem;
  }

  a,
  a:link,
  a:visited {
    color: inherit;
    height: 4rem;

    svg {
      font-size: 4rem;
      transition: all 0.5s;
    }
  }

  a:hover svg {
    transform: rotate(360deg);
  }
`;

export default Footer;
