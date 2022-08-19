import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  html {
    font-size: 62.5%;
  }
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Noto Sans KR', sans-serif;
  }

  ul, ol, li {
    list-style: none;
  }

  .fcc {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  button {
    cursor: pointer;
  }
`;

export default GlobalStyle;
