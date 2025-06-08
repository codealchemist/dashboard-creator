import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import SideMenu from './components/SideMenu';
import WelcomePage from './pages/WelcomePage';
import SettingsPage from './pages/SettingsPage';
import PanelPage from './pages/PanelPage'; // Import PanelPage
// Import SectionTitle from styled elements if it's the same, or use local definition
// For now, using local definition as per prompt.
// import { SectionTitle } from './components/forms/StyledFormElements';


const AppContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  background-color: #ecf0f1;
`;

const ContentArea = styled.main`
  flex-grow: 1;
  overflow-y: auto;
  scroll-behavior: smooth;
`;

const sections = {
  welcome: WelcomePage,
  settings: SettingsPage,
  panel: PanelPage, // Add PanelPage
  // ... other sections
};

// Order of menu items / sections in the UI
const menuItemsOrder = ['welcome', 'settings', 'panel', 'routes', 'pages', 'ticker', 'alarms', 'ipaws', 'messages', 'videos'];

// Local definition of SectionTitle as provided in the prompt for App.js
const SectionTitle = styled.h2`
  font-size: 2em;
  color: #2c3e50;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid #3498db;
`;

function App() {
  const [activeSection, setActiveSection] = useState('welcome');
  const contentAreaRef = useRef(null);

  const handleMenuItemClick = (sectionId) => {
    setActiveSection(sectionId);
    const sectionElement = document.getElementById(sectionId);
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const observerOptions = {
      root: contentAreaRef.current,
      rootMargin: '0px',
      threshold: 0.6
    };

    const callback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(callback, observerOptions);
    const currentSectionRefs = [];

    menuItemsOrder.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            observer.observe(el);
            currentSectionRefs.push(el);
        }
    });

    return () => {
        currentSectionRefs.forEach(el => {
            if (el) observer.unobserve(el);
        });
    };
  }, []);

  return (
    <AppContainer>
      <SideMenu activeSection={activeSection} onMenuItemClick={handleMenuItemClick} />
      <ContentArea ref={contentAreaRef} id="content-area">
        {menuItemsOrder.map(id => {
          const Component = sections[id];
          if (Component) {
            // Wrap component in a div with ID for IntersectionObserver and scrolling
            // The component itself should have its own padding and structure (e.g. WelcomePage, SettingsPage, PanelPage already have <div id="their_id" style={{padding...}}>)
            // So, the outer div here is primarily for the ID.
            return <div key={id} id={id}><Component /></div>;
          }
          // Placeholder for sections not yet implemented
          return (
            <div key={id} id={id} style={{ minHeight: '100vh', padding: '30px', borderTop: '1px solid #eee' }}>
              <SectionTitle>{id.charAt(0).toUpperCase() + id.slice(1)}</SectionTitle>
              <p>Content for {id} coming soon...</p>
            </div>
          );
        })}
      </ContentArea>
    </AppContainer>
  );
}

export default App;
