import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import anime from 'animejs';

const MenuContainer = styled.nav`
  width: 220px; // Fixed width for the menu
  background-color: #2c3e50; // Darker background for contrast
  padding: 25px 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  box-shadow: 3px 0px 10px rgba(0, 0, 0, 0.2);
`;

const MenuTitle = styled.h2`
  color: #ecf0f1;
  font-size: 1.5em;
  margin-bottom: 30px;
  border-bottom: 2px solid #3498db;
  padding-bottom: 10px;
`;

const MenuItem = styled.a` // Changed to 'a' for potential navigation later
  font-size: 1.1em;
  color: #95a5a6; // Initially grayed out
  padding: 12px 20px;
  margin: 8px 0;
  text-decoration: none;
  border-radius: 6px;
  width: 100%;
  box-sizing: border-box;
  text-align: left;
  cursor: pointer;
  transition: color 0.3s ease, background-color 0.3s ease; // Smooth transition for non-animejs properties

  &.has-data {
    color: #ecf0f1; // Normal color when data is present
  }

  &.active {
    background-color: #3498db;
    color: #ffffff;
    font-weight: bold;
  }

  &:hover:not(.active) {
    color: #ffffff; // Brighter color on hover for inactive items
  }
`;

const menuItemsList = [
  'Settings', 'Panel', 'Routes', 'Pages', 'Ticker',
  'Alarms', 'IPAWS', 'Messages', 'Videos'
];

const SideMenu = ({ onMenuItemClick, activeSection }) => {
  // For now, simulate which items have data.
  // In a real app, this would come from props or global state.
  const [itemsWithData, setItemsWithData] = useState({
    // 'Panel': true, // Example: Panel has data
  });

  const menuItemRefs = useRef([]);

  useEffect(() => {
    menuItemRefs.current.forEach((item, index) => {
      if (!item) return;

      // Clean up previous instances if any (though for hover it's less critical)
      anime.remove(item);

      item.addEventListener('mouseenter', () => {
        anime({
          targets: item,
          backgroundColor: ['#2c3e50', '#3498db'], // Animate background to blue
          color: ['#ecf0f1', '#ffffff'], // Animate text color to white
          translateX: [0, 10], // Slight move to the right
          duration: 300,
          easing: 'easeOutExpo'
        });
      });

      item.addEventListener('mouseleave', () => {
        // Only revert if not active
        if (!item.classList.contains('active')) {
          anime({
            targets: item,
            backgroundColor: '#2c3e50', // Back to original background
            color: item.classList.contains('has-data') ? '#ecf0f1' : '#95a5a6', // Revert to appropriate text color
            translateX: 0,
            duration: 200,
            easing: 'easeInQuad'
          });
        }
      });
    });

    // Cleanup event listeners when component unmounts
    return () => {
      menuItemRefs.current.forEach(item => {
        if (item) {
          // Not straightforward to remove anonymous listeners directly without storing them
          // For this scope, we'll rely on component unmount to stop interactions.
          // In a more complex app, manage listeners more carefully.
        }
      });
    };
  }, [itemsWithData]); // Re-run if itemsWithData changes, to update colors potentially

  // Example function to simulate adding data to a section
  // This would be triggered by form submissions in a real app
  const simulateDataAdd = (itemName) => {
    setItemsWithData(prev => ({ ...prev, [itemName]: true }));
  };

  return (
    <MenuContainer>
      <MenuTitle>Navigation</MenuTitle>
      {menuItemsList.map((item, index) => (
        <MenuItem
          key={item}
          ref={el => menuItemRefs.current[index] = el}
          href={`#${item.toLowerCase()}`} // Basic href for potential SPA routing
          className={`
            ${itemsWithData[item] ? 'has-data' : ''}
            ${activeSection === item.toLowerCase() ? 'active' : ''}
          `}
          onClick={(e) => {
            e.preventDefault(); // Prevent default anchor behavior
            if (onMenuItemClick) {
              onMenuItemClick(item.toLowerCase());
            }
            // simulateDataAdd(item); // Example: click adds data
          }}
        >
          {item}
        </MenuItem>
      ))}
      {/* Example button to test adding data */}
      {/* <button onClick={() => simulateDataAdd('Settings')} style={{marginTop: '20px', color: 'white'}}>Simulate Add Data to Settings</button> */}
    </MenuContainer>
  );
};

export default SideMenu;
