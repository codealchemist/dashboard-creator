// components/Layout.js
import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react'; // Import useState and useEffect

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

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return (
    <LayoutContainer>
      <Sidebar>
        <Logo>Dashboard Creator</Logo>
        <Nav>
          {menuItems.map((item) => {
            // Calculate isActive based on router.pathname for clarity
            const isActive = router.pathname === item.path;

            // Only apply the $active state if the component has mounted on the client
            // On the server and initial client render (before useEffect), $active will be effectively false.
            const $activePropValue = hasMounted && isActive;

            return (
              <NavLink key={item.name} href={item.path} $active={$activePropValue}>
                {item.name}
              </NavLink>
            );
          })}
        </Nav>
      </Sidebar>
      <MainContent>{children}</MainContent>
    </LayoutContainer>
  );
};

export default Layout;
