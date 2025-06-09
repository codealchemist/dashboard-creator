// components/Layout.js
import styled from 'styled-components';
import Link from 'next/link'; // Import Link
import { useRouter } from 'next/router';

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

// NavLink is now styled(Link)
const NavLink = styled(Link)`
  display: block; /* Ensures proper block behavior for padding, etc. */
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

  return (
    <LayoutContainer>
      <Sidebar>
        <Logo>Dashboard Creator</Logo>
        <Nav>
          {menuItems.map((item) => {
            const isActive = router.pathname === item.path;
            return (
              // Use NavLink (which is styled(Link)) directly.
              // href is a required prop for Link.
              // $active is the transient prop for styling.
              <NavLink key={item.name} href={item.path} $active={isActive}>
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
