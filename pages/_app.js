import Layout from '../components/Layout';
import { createGlobalStyle, ThemeProvider } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Roboto', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #f4f6f8;
  }
  * {
    box-sizing: border-box;
  }
`;

const theme = {
  colors: {
    primary: '#3498db', // Blue
    secondary: '#5dade2', // Lighter Blue for accents if needed (was #2ecc71 Green)
    accent: '#e74c3c', // Red
    background: '#f7f9fb', // Even lighter Grey for main background
    text: '#34495e', // Dark Blue-Grey
    sidebarBg: '#283747', // Slightly darker, more saturated blue-grey
    sidebarText: '#eaeded', // Lighter grey for better contrast
    sidebarHoverBg: '#34495e', // Existing hover
    sidebarActiveBg: '#1abc9c', // Teal for Sidebar active
  },
  fonts: {
    main: 'Roboto, sans-serif',
  }
};

function MyApp({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
