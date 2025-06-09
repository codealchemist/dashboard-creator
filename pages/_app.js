// pages/_app.js
import Layout from '../components/Layout';
import { createGlobalStyle, ThemeProvider } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Roboto', sans-serif; /* Using Roboto as a modern font */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #f4f6f8; /* Light background for the entire app */
  }
  * {
    box-sizing: border-box;
  }
`;

// Simple theme object
const theme = {
  colors: {
    primary: '#3498db', // Blue
    secondary: '#2ecc71', // Green
    accent: '#e74c3c', // Red
    background: '#f4f6f8', // Light Grey
    text: '#34495e', // Dark Blue-Grey
    sidebarBg: '#2c3e50', // Dark Blue-Grey for Sidebar
    sidebarText: '#ecf0f1', // Light Grey for Sidebar text
    sidebarHoverBg: '#34495e', // Darker Blue-Grey for Sidebar hover
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
