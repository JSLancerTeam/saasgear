import { createGlobalStyle } from 'styled-components';
import { COLOR } from '@/constants/style';
 
const GlobalStyle = createGlobalStyle`
  .public-DraftEditor-content {
    min-height: 500px;
    overflow: auto;
  }
  * {
    font-family: 'Inter', sans-serif;
    font-style: normal;
  }
  a {
    color: ${COLOR.PRIMARY};
    text-decoration: none;
  }
  html, body {
    margin: 0;
    padding: 0;
    position: relative;
  }
`;
 
export default GlobalStyle;