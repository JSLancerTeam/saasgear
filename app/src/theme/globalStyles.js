import { createGlobalStyle } from 'styled-components';
import { COLORS } from '@/constants/style';
 
const GlobalStyle = createGlobalStyle`
  .public-DraftEditor-content {
    min-height: 500px;
    overflow: auto;
  }
  * {
    font-family: 'Inter', sans-serif;
    font-style: normal;
    box-sizing: border-box;
    letter-spacing: 0.5px;
  }
  a {
    color: ${COLORS.PRIMARY};
    text-decoration: none;
  }
  html, body {
    margin: 0;
    padding: 0;
    position: relative;
  }

  h1, h2, h3, h4, h5, h6, ul, li, p {
    margin: 0;
    padding: 0;
  }
`;
 
export default GlobalStyle;