// components/Layout.js
import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/router'; // Import useRouter

const LayoutContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const Sidebar = styled.div`
  width: 250px; /* Slightly wider sidebar */
  background-color: ${({ theme }) => theme.colors.sidebarBg};
  color: ${({ theme }) => theme.colors.sidebarText};
  padding: 25px;
  display: flex;
  flex-direction: column;
  box-shadow: 2px 0 5px rgba(0,0,0,0.1); /* Subtle shadow for depth */
`;

const MainContent = styled.main` /* Changed from div to main for semantics */
  flex-grow: 1;
  padding: 30px; /* Increased padding */
  background-color: ${({ theme }) => theme.colors.background};
  overflow-y: auto;
`;

const Logo = styled.h1`
  font-size: 1.8em; /* Larger logo */
  color: ${({ theme }) => theme.colors.sidebarText};
  margin-bottom: 40px; /* More space below logo */
  text-align: center;
  font-weight: bold;
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
`;

const NavLink = styled.a`
  color: ${({ theme }) => theme.colors.sidebarText};
  text-decoration: none;
  padding: 12px 15px; /* Adjusted padding */
  margin-bottom: 8px;
  font-size: 1.1em;
  border-radius: 5px;
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;

  &:hover {
    background-color: ${({ theme }) => theme.colors.sidebarHoverBg};
    color: #ffffff;
    cursor: pointer;
  }

  &.active {
    background-color: ${({ theme }) => theme.colors.sidebarActiveBg};
    color: #ffffff;
    font-weight: bold;
  }
`;

const menuItems = [
  { name: 'Home', path: '/' }, // Added Home link
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
  const router = useRouter(); // Get router instance

  return (
    <LayoutContainer>
      <Sidebar>
        <Logo>Dashboard Creator</Logo>
        <Nav>
          {menuItems.map((item) => (
            <Link key={item.name} href={item.path} passHref>
              <NavLink className={router.pathname === item.path ? 'active' : ''}>
                {item.name}
              </NavLink>
            </Link>
          ))}
        </Nav>
      </Sidebar>
      <MainContent>{children}</MainContent>
    </LayoutContainer>
  );
};

export default Layout;
