import React from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import Layout from '../components/Layout';
import { DashboardProvider } from '../context/DashboardContext'; // Import DashboardProvider

const GlobalStyle = createGlobalStyle`
  body {
    /* font-family: 'Roboto', sans-serif; */
  }
`;

const theme = {
  colors: {
    primary: '#0070f3',
    secondary: '#1c1c1e',
  },
};

function MyApp({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <DashboardProvider> {/* Wrap Layout with DashboardProvider */}
        <ThemeProvider theme={theme}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </DashboardProvider>
    </>
  );
}

export default MyApp;
