// components/Layout.js
import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState, useEffect, useCallback } from 'react'; // Import useCallback
import { useSettings } from '../context/SettingsContext'; // Import useSettings

const LayoutContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const Sidebar = styled.div`
  width: 260px;
  background-color: ${({ theme }) => theme.colors.sidebarBg};
  color: ${({ theme }) => theme.colors.sidebarText};
  padding: 20px;
  display: flex;
  flex-direction: column;
  box-shadow: 3px 0 10px rgba(0,0,0,0.05);
  transition: width 0.3s ease;
`;

const MainContent = styled.main`
  flex-grow: 1;
  padding: 30px;
  background-color: ${({ theme }) => theme.colors.background};
  overflow-y: auto;
`;

const Logo = styled.h1`
  font-size: 1.9em;
  color: #ffffff;
  margin-bottom: 35px;
  text-align: center;
  font-weight: 700;
  letter-spacing: 0.5px;
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex-grow: 1; /* Allow Nav to take available space, pushing button down if it's a sibling */
`;

const NavLink = styled(Link)`
  display: block;
  color: ${({ theme, $active }) => ($active ? '#ffffff' : theme.colors.sidebarText)};
  text-decoration: none;
  padding: 14px 20px;
  font-size: 1.05em;
  font-weight: ${({ $active }) => ($active ? '600' : '500')};
  border-radius: 6px;
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out, transform 0.1s ease;
  position: relative;
  cursor: pointer;

  background-color: ${({ $active, theme }) => ($active ? theme.colors.sidebarActiveBg : 'transparent')};
  ${({ $active, theme }) => $active && `box-shadow: 0 0 10px rgba(26, 188, 156, 0.3);`}

  &:hover {
    background-color: ${({ theme, $active }) => ($active ? theme.colors.sidebarActiveBg : theme.colors.sidebarHoverBg)};
    color: #ffffff;
    transform: translateX(3px);
  }
`;

// Styled button for actions like "Export Dashboard"
const SidebarButton = styled.button`
  display: block;
  width: 100%;
  color: #ffffff; // White text for better contrast on primary color
  background-color: ${({ theme }) => theme.colors.primary}; // Use theme primary color
  text-decoration: none;
  padding: 14px 20px;
  font-size: 1.05em;
  font-weight: 600; // Slightly bolder for emphasis
  border-radius: 6px;
  transition: background-color 0.2s ease-in-out, transform 0.1s ease;
  cursor: pointer;
  border: none;
  text-align: center; // Center text for a button look
  margin-top: 15px; // Add margin for separation from NavLink items

  &:hover {
    background-color: ${({ theme }) => theme.colors.accent}; // Use accent color on hover, or a darker primary
    color: #ffffff;
    transform: translateY(-1px); // Slight lift effect
  }

  &:active {
    background-color: ${({ theme }) => theme.colors.accent}; // Darker shade for active state
    transform: translateY(0px); // Reset lift effect
  }
`;

const menuItems = [
  { name: 'Home', path: '/' },
  { name: 'Settings', path: '/settings' },
  { name: 'Panel', path: '/panel' },
  { name: 'Pages', path: '/pagesection' },
  { name: 'Ticker', path: '/ticker' },
  { name: 'Alarms', path: '/alarms' },
  { name: 'IPAWS', path: '/ipaws' },
  { name: 'Messages', path: '/messages' },
  { name: 'Videos', path: '/videos' },
];

const Layout = ({ children }) => {
  const router = useRouter();
  const [hasMounted, setHasMounted] = useState(false);
  const { settings } = useSettings(); // Get settings from context

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const handleExport = useCallback(() => {
    if (!settings) {
      console.error("Settings data not available for export.");
      return;
    }

    const transformedData = {
      faDashboardsApi: {
        user: settings['faDashboardsApi.user'] || "",
        pass: settings['faDashboardsApi.pass'] || "",
      },
      playerUuid: settings.playerUuid || "",
      address: settings.address || "",
      city: settings.city || "",
      state: settings.state || "",
      country: settings.country || "",
      geolocation: {
        lat: settings['geolocation.lat'] || "",
        lon: settings['geolocation.lon'] || "",
      },
      info: {
        stations: settings['info.stations']
          ? settings['info.stations'].split(',').map(s => s.trim()).filter(s => s)
          : [],
      },
    };

    const jsonString = JSON.stringify(transformedData, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'dashboard-config.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    URL.revokeObjectURL(url);
    console.log('Exporting Dashboard Configuration:', transformedData);
  }, [settings]);


  return (
    <LayoutContainer>
      <Sidebar>
        <Logo>Dashboard Creator</Logo>
        <Nav>
          {menuItems.map((item) => {
            const isActive = router.pathname === item.path;
            const $activePropValue = hasMounted && isActive;
            return (
              <NavLink key={item.name} href={item.path} $active={$activePropValue}>
                {item.name}
              </NavLink>
            );
          })}
        </Nav>
        {/* Spacer div to push the button to the bottom, if Nav doesn't fill space */}
        {/* Alternatively, make Sidebar a flex column and Nav grow, then place button after Nav */}
        {/* For now, adding it directly after Nav. If Nav has flex-grow:1, this will be at the bottom of items in Nav or just after it.
            The Sidebar is display:flex, flex-direction:column. If Nav doesn't have flex-grow, this button will appear right after it.
            Added flex-grow: 1 to Nav to push this button towards the bottom of the sidebar, assuming there's space after nav items.
            If not, we might need a wrapper div for Nav and Button, or adjust Sidebar flex properties.
        */}
        <SidebarButton onClick={handleExport}>
          Export Dashboard
        </SidebarButton>
      </Sidebar>
      <MainContent>{children}</MainContent>
    </LayoutContainer>
  );
};

export default Layout;
