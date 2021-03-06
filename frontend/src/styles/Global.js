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
    font-family: 'Asul', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 1.6rem;
    line-height: 1.5;
    background-color: ${({ theme }) => theme.colors.background};
    animation: hideScroll 1s backwards;
  }

  @keyframes hideScroll {
    from, to { 
      overflow-x: hidden;
    }
  }

  #root {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    
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
    font-size: clamp(3rem, 4vw, 4rem);
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

  code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}
`;

export default GlobalStyles;
