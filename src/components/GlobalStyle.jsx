import {createGlobalStyle} from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
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
`

export default GlobalStyle