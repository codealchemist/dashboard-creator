import React, { createContext, useState, useContext } from 'react';

const initialSettings = {
  'faDashboardsApi.user': '',
  'faDashboardsApi.pass': '',
  playerUuid: '',
  address: '',
  city: '',
  state: '',
  country: '',
  'geolocation.lat': '',
  'geolocation.lon': '',
  'info.stations': '', // Will remain comma-separated string in context for simplicity of form handling
};

export const SettingsContext = createContext({
  settings: initialSettings,
  updateSettings: () => console.warn('updateSettings called without a Provider'),
});

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(initialSettings);

  const updateSettings = (newSettings) => {
    setSettings(prevSettings => ({
      ...prevSettings,
      ...newSettings,
    }));
  };

  // This function can be used by the settings page to update individual fields easily
  const updateSettingField = (fieldName, value) => {
    setSettings(prevSettings => ({
      ...prevSettings,
      [fieldName]: value,
    }));
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, updateSettingField, initialSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);
