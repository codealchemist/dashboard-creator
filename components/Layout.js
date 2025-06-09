// components/Layout.js
import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react'; // Import React for forwardRef

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

// NavLinkStyled is now a div, containing the styles
const NavLinkStyled = styled.div`
  color: ${({ theme, active }) => (active ? '#ffffff' : theme.colors.sidebarText)};
  padding: 14px 20px;
  font-size: 1.05em;
  font-weight: ${({ active }) => (active ? '600' : '500')};
  border-radius: 6px;
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out, transform 0.1s ease;

  /* Apply background and shadow based on active state */
  background-color: ${({ active, theme }) => (active ? theme.colors.sidebarActiveBg : 'transparent')};
  ${({ active, theme }) => active && `box-shadow: 0 0 10px rgba(26, 188, 156, 0.3);`}

  &:hover {
    /* Ensure hover on the NavLink (which is <a>) triggers style on NavLinkStyled */
    /* This will be handled by className prop passed to <a> by Link if needed,
       or by NavLink component logic. For simplicity, we style based on NavLinkStyled's hover directly. */
    background-color: ${({ theme, active }) => (active ? theme.colors.sidebarActiveBg : theme.colors.sidebarHoverBg)};
    color: #ffffff;
    transform: translateX(3px);
  }
`;

// NavLink is a React component that forwards refs and renders an <a> tag.
// The props 'active' and 'className' (from Link) are important.
// 'href' is also passed from Link.
const NavLink = React.forwardRef(({ href, children, className, active }, ref) => {
  // The className prop from <Link> might contain Next.js specific classes for active links,
  // though we are handling 'active' manually with `router.pathname`.
  // We combine router-based active state with styled-component's active prop.
  return (
    <a href={href} className={className} ref={ref} style={{ textDecoration: 'none' }}>
      <NavLinkStyled active={active}>
        {children}
      </NavLinkStyled>
    </a>
  );
});
NavLink.displayName = 'NavLink'; // Useful for debugging

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
              // Use legacyBehavior to make Link pass href to the <a> tag rendered by our NavLink component
              <Link key={item.name} href={item.path} passHref legacyBehavior>
                <NavLink active={isActive}>
                  {item.name}
                </NavLink>
              </Link>
            );
          })}
        </Nav>
      </Sidebar>
      <MainContent>{children}</MainContent>
    </LayoutContainer>
  );
};

export default Layout;
