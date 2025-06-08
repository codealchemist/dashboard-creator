import React from 'react'; // Removed useEffect, useRef
import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/router';
// import anime from 'animejs'; // REMOVED
import { useDashboard } from '../context/DashboardContext';
// import { saveAs } from 'file-saver'; // This was in SideMenu, keep it if export button is here.

const MenuContainer = styled.nav`
  width: 230px;
  background-color: #2c3e50;
  padding: 25px 10px;
  display: flex;
  flex-direction: column;
  height: 100%;
  box-shadow: 3px 0px 10px rgba(0, 0, 0, 0.2);
  overflow-y: auto;
`;

const MenuTitle = styled.h2`
  color: #ecf0f1;
  font-size: 1.6em;
  text-align: center;
  margin-bottom: 30px;
  padding-bottom: 10px;
  border-bottom: 1px solid #3498db;
`;

const MenuItemLink = styled.a`
  font-size: 1.1em;
  padding: 13px 20px;
  margin: 7px 0;
  text-decoration: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out; // Basic CSS transition
  display: block;

  color: ${({ hasData, isActive }) => {
    if (isActive) return '#ffffff';
    if (hasData) return '#5dade2';
    return '#7f8c8d';
  }};

  background-color: ${({ isActive }) => isActive ? '#3498db' : 'transparent'};

  &:hover {
    color: #ffffff; // Keep basic CSS hover
    background-color: rgba(52, 152, 219, 0.15); // Simple background hover
  }
  &.active-link {
    background-color: #3498db;
    color: #ffffff;
    font-weight: 500;
  }
`;

const ExportButton = styled.button`
  font-size: 1.1em;
  padding: 13px 20px;
  margin-top: 30px;
  text-decoration: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #27ae60;
  color: white;
  border: none;
  text-align: center;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #229954;
  }
`;

const menuItemsList = [
  { name: 'Welcome', path: '/' },
  { name: 'Settings', path: '/settings' }, { name: 'Panel', path: '/panel' },
  { name: 'Routes', path: '/routes' }, { name: 'Pages', path: '/pages' },
  { name: 'Ticker', path: '/ticker' }, { name: 'Alarms', path: '/alarms' },
  { name: 'IPAWS', path: '/ipaws' }, { name: 'Messages', path: '/messages' },
  { name: 'Videos', path: '/videos' },
];

// Assuming saveAs is still needed for export button, if not remove it too.
// For now, assuming it's still there. If not, remove the import too.
// It seems saveAs was imported in a previous version of SideMenu. Let's ensure it's there if button is.
// Re-adding saveAs import if it was removed by broad sed, as ExportButton needs it.
import { saveAs } from 'file-saver';


const SideMenu = () => {
  const router = useRouter();
  // const menuItemRefs = useRef([]); // REMOVED
  const { config, hasData } = useDashboard();

  // useEffect for animejs animations REMOVED

  const handleExport = () => {
    const exportableConfig = {
        settings: config.settings,
        panel: config.panel,
    };
    const jsonString = JSON.stringify(exportableConfig, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    saveAs(blob, 'dashboard-config.json');
  };

  return (
    <MenuContainer>
      <MenuTitle>Dashboard</MenuTitle>
      {menuItemsList.map((item, index) => {
        const isActive = router.pathname === item.path;
        const pathKey = item.path.replace('/', '') || 'welcome';
        return (
          <Link key={item.name} href={item.path} passHref legacyBehavior>
            <MenuItemLink
              // ref={el => menuItemRefs.current[index] = el} // REMOVED ref
              isActive={isActive}
              hasData={hasData(pathKey)}
              className={isActive ? 'active-link' : ''}
              data-path-key={pathKey}
            >
              {item.name}
            </MenuItemLink>
          </Link>
        );
      })}
      <ExportButton onClick={handleExport}>
        Export JSON Config
      </ExportButton>
    </MenuContainer>
  );
};
export default SideMenu;
