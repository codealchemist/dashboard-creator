import React from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import Layout from '../components/Layout';
import { DashboardProvider } from '../context/DashboardContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';

const GlobalStyle = createGlobalStyle`
  body {
    /* Poppins font is in globals.css */
    /* overflow-x: hidden; is in globals.css body */
  }
  /* Ensure motion divs take up height if their content doesn't immediately */
  /* This targets the direct child of AnimatePresence for page transitions */
  .page-transition-motion-div {
    width: 100%;
    height: 100%;
  }
`;

const theme = {
  colors: {
    primary: '#3498db', // Blue
    primaryHover: '#2980b9',
    secondary: '#2c3e50', // Dark Blue/Grey
    danger: '#e74c3c', // Red
    dangerHover: '#c0392b',
    success: '#2ecc71', // Green
    successHover: '#27ae60',
    // Add other theme colors as needed
  },
};

// Adjusted page variants slightly for potentially smoother feel
const pageVariants = {
  initial: { opacity: 0, x: "-20vw", scale: 0.95 }, // Less extreme x, slightly less scale down
  in: { opacity: 1, x: 0, scale: 1 },
  out: { opacity: 0, x: "20vw", scale: 1.05 } // Less extreme x, slightly less scale up
};
const pageTransition = { type: "tween", ease: "anticipate", duration: 0.5 }; // Slightly faster

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  return (
    <>
      <GlobalStyle />
      <DashboardProvider>
        <ThemeProvider theme={theme}>
          <Layout>
            <AnimatePresence mode='wait'>
              <motion.div
                key={router.route}
                className="page-transition-motion-div" // Added class for more specific styling if needed
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
                // style={{ width: '100%', height: '100%' }} // Replaced with class or ensure Layout handles sizing
              >
                <Component {...pageProps} />
              </motion.div>
            </AnimatePresence>
          </Layout>
        </ThemeProvider>
      </DashboardProvider>
    </>
  );
}
export default MyApp;
