import React from 'react';
import styled from 'styled-components';
import SideMenu from './SideMenu'; // Import the actual SideMenu

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
  background-color: #f0f2f5;
`;

// SideMenu itself will be styled, so no need for StyledSideMenuPlaceholder here
// SideMenu will take the place of the placeholder directly

const ContentArea = styled.main`
  flex-grow: 1;
  padding: 25px; // Added some padding
  overflow-y: auto;
  background-color: #ffffff; // Content area background
  margin: 10px; // Give a little space around content
  border-radius: 8px; // Rounded corners for content area
  box-shadow: 0 0 10px rgba(0,0,0,0.05);
`;

const Layout = ({ children }) => {
  return (
    <AppContainer>
      <SideMenu />
      <ContentArea>{children}</ContentArea>
    </AppContainer>
  );
};

export default Layout;
