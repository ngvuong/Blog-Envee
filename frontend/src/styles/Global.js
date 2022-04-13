import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  *, *::after, *::before {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 62.5%;
  }

  body {
    color: ${({ theme }) => theme.colors.text};
    font-family: 'Open Sans', sans-serif;
    font-size: 1.6rem;
    line-height: 1.5;
    background-color: ${({ theme }) => theme.colors.background};
  }

  a, a:link, a:visited {
    text-decoration: none;
  }

  button {
    font: inherit;
    background: transparent;
    border: none;
    cursor: pointer;
  }

`;

export default GlobalStyles;
