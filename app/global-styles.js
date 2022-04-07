import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    // font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    // 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    // sans-serif;
    font-family: 'Rubik', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
  }

  .otpInput {
    width: 3rem !important;
    height: 3rem;
    margin: 0 1rem;
    font-size: 2rem;
    text-align: center;
    border-radius: 4px;
    border: 1px solid rgba(0, 0, 0, 0.3);
  }

`;

export default GlobalStyle;
