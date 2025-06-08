import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { animate } from 'animejs';
import { useDashboard } from '../context/DashboardContext';
import { saveAs } from 'file-saver'; // Import file-saver

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
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
  display: block;

  color: ${({ hasData, isActive }) => {
    if (isActive) return '#ffffff';
    if (hasData) return '#5dade2';
    return '#7f8c8d';
  }};

  background-color: ${({ isActive }) => isActive ? '#3498db' : 'transparent'};

  &:hover { color: #ffffff; }
  &.active-link { background-color: #3498db; color: #ffffff; font-weight: 500; }
`;

const ExportButton = styled.button`
  font-size: 1.1em;
  padding: 13px 20px;
  margin-top: 30px; // Space above the button
  text-decoration: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #27ae60; // Green color for export
  color: white;
  border: none;
  text-align: center;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #229954; // Darker green on hover
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

const SideMenu = () => {
  const router = useRouter();
  const menuItemRefs = useRef([]);
  const { config, hasData } = useDashboard(); // Get global config

  useEffect(() => {
    menuItemRefs.current.forEach((itemEl) => {
      if (!itemEl) return;
      animate.remove(itemEl);
      const isActive = itemEl.classList.contains('active-link');
      const pathKey = itemEl.dataset.pathKey;

      itemEl.addEventListener('mouseenter', () => {
        if (!isActive) {
          animate({
            targets: itemEl,
            backgroundColor: ['rgba(52, 152, 219, 0)', 'rgba(52, 152, 219, 0.3)'],
            color: [itemEl.style.color, '#ffffff'],
            translateX: [0, 8], scale: [1, 1.05], duration: 300, easing: 'easeOutExpo'
          });
        }
      });
      itemEl.addEventListener('mouseleave', () => {
        if (!isActive) {
          animate({
            targets: itemEl,
            backgroundColor: 'rgba(52, 152, 219, 0)',
            color: hasData(pathKey) ? '#5dade2' : '#7f8c8d',
            translateX: 0, scale: 1, duration: 200, easing: 'easeInQuad'
          });
        }
      });
    });
    return () => { menuItemRefs.current.forEach(itemEl => { if(itemEl) animate.remove(itemEl); }); };
  }, [router.pathname, hasData, config]); // Added config to dependencies because hasData is re-created if config changes.

  const handleExport = () => {
    // We only want to export the 'settings' and 'panel' sections for now,
    // or any other sections that are actually implemented and have data structures
    // in our `initialState` in DashboardContext.js
    const exportableConfig = {
        settings: config.settings,
        panel: config.panel,
        // Add other configured sections here as they are implemented
    };

    const jsonString = JSON.stringify(exportableConfig, null, 2); // Pretty print JSON
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
              ref={el => menuItemRefs.current[index] = el}
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
