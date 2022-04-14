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
    color: ${({ theme }) => theme.colors.link};
    text-decoration: none;
  }

  main, section {
    text-align: center;
  }

  button {
    font: inherit;
    color: inherit;
    font-weight: bold;
    background: transparent;
    border: none;
    cursor: pointer;
  }

  ul {
    list-style: none;
  }

  h1 {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: .5rem;
    font-size: 3rem;
    margin: 2rem 0;
  }

  h1,h2,h3,h4,h5,h6 {
    text-align: center;
  }

  input, textarea {
    font: inherit;
    color: inherit;
    background: inherit;
    padding: .5rem;
    border: none;
    resize: vertical;
  }

`;

export default GlobalStyles;
