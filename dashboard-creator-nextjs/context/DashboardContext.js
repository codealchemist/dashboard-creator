import React, { createContext, useState, useContext, useCallback } from 'react';

// Define initial state structure based on Settings and Panel pages
// This should match the initial states previously defined in those page components
const initialSettingsState = {
  faDashboardsApiUser: '',
  faDashboardsApiPass: '',
  playerUuid: '',
  address: '',
  city: '',
  state: '',
  country: '',
  geolocationLat: '',
  geolocationLon: '',
  infoStations: [''],
};

const initialPanelState = {
  position: 'left',
  props_useBattalionChief: false,
  props_pillTitle: '',
  props_surfFlagStatus: false,
  props_useFlagStatus: false,
  props_showWindCompass: false,
  props_hideForecastPanel: false,
  props_timeDiff: 0,
  props_useWeather: false,
  props_currentWeatherProps_showHumidity: false,
  props_currentWeatherProps_showWind: false,
  props_currentWeatherProps_showWindDirection: false,
  props_currentWeatherProps_showHeatIndex: false,
  props_bgColor: '#FFFFFF',
  props_textColor: '#000000',
  props_useDate: false,
  props__useBackgroundImage: false,
  props_agencyHash: '',
  props__useLogoWidth: false,
  props__useSecondAgencyHash: false,
  props__useMottoFontSize: false,
  props__usePillTextColor: false,
  props__usePillBorderColor: false,
  props__usePillBackgroundColor: false,
  props_dateTimeFormat: '',
  props__customizeClockFontSize: false,
  props__useStationName: false,
  props__useStationNameFontSize: false,
  props__enableShift: false,
  props__enableShift2: false,
  props_shift_prefix: '',
  props_shift_sufix: '',
  props_shift_ignoreDaylightSavings: false,
  props_shift_defaultColor: '#000000',
  props_shift_sameColorAsShiftLetter: false,
  props_shift_prefixColor: '#000000',
  props_shift_start: '',
  props_shift_items: [{ value: '', color: '#0000FF' }, { value: '', color: '#FF0000' }],
  props_useBackgroundImage: false,
  battalionChief_battalionTitles: [''],
};

const initialState = {
  settings: initialSettingsState,
  panel: initialPanelState,
  // Other sections will be added here later
  // routes: {}, pages: {}, ticker: {}, etc.
};

export const DashboardContext = createContext({
  config: initialState,
  updateSettings: () => {},
  updatePanel: () => {},
  hasData: () => false, // Added hasData to default context
  // Add update functions for other sections later
});

export const DashboardProvider = ({ children }) => {
  const [config, setConfig] = useState(initialState);

  // Update functions need to be memoized with useCallback if they are dependencies of useEffect in consumers
  const updateSettings = useCallback((newSettingsData) => {
    setConfig(prevConfig => ({
      ...prevConfig,
      settings: newSettingsData,
    }));
  }, []);

  const updatePanel = useCallback((newPanelData) => {
    setConfig(prevConfig => ({
      ...prevConfig,
      panel: newPanelData,
    }));
  }, []);

  // Example: Check if a section has data (very basic check)
  // This logic can be refined. E.g., compare against initial state.
  const hasData = useCallback((sectionName) => {
    const section = config[sectionName];
    if (!section) return false;

    if (sectionName === 'settings') {
        return JSON.stringify(section) !== JSON.stringify(initialSettingsState);
    }
    if (sectionName === 'panel') {
        return JSON.stringify(section) !== JSON.stringify(initialPanelState);
    }
    // Add checks for other sections
    return false;
  }, [config]); // config is a dependency for hasData


  return (
    <DashboardContext.Provider value={{ config, updateSettings, updatePanel, hasData }}>
      {children}
    </DashboardContext.Provider>
  );
};

// Custom hook to use the DashboardContext
export const useDashboard = () => useContext(DashboardContext);
