import React from 'react'; // Removed useState, using context now
import Head from 'next/head';
import { useDashboard } from '../context/DashboardContext'; // Import useDashboard
import {
  PageContainer, SectionTitle, Form, FormGroup, Label, Input, Panel, ArrayInputContainer, ArrayItemContainer, Button
} from '../components/forms/StyledFormElements';

const prettifyName = (name) => {
  const result = name.replace(/([A-Z])/g, ' \$1');
  return result.charAt(0).toUpperCase() + result.slice(1);
};

const SettingsPage = () => {
  const { config, updateSettings } = useDashboard(); // Use context
  const settingsData = config.settings; // Get settings data from context

  // handleChange now needs to create a new settingsData object and pass it to updateSettings
  const handleChange = (e, index, field) => {
    const { name, value, type, checked } = e.target;
    let newSettingsData = { ...settingsData };

    if (field === 'infoStations') {
      const newStations = [...settingsData.infoStations];
      newStations[index] = value;
      newSettingsData = { ...newSettingsData, infoStations: newStations };
    } else {
      newSettingsData = { ...newSettingsData, [name]: type === 'checkbox' ? checked : value };
    }
    updateSettings(newSettingsData); // Update global state
  };

  const addStationInput = () => {
    const newSettingsData = { ...settingsData, infoStations: [...settingsData.infoStations, ''] };
    updateSettings(newSettingsData);
  };

  const removeStationInput = (index) => {
    const newSettingsData = { ...settingsData, infoStations: settingsData.infoStations.filter((_, i) => i !== index) };
    updateSettings(newSettingsData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Settings Data (from context):', settingsData);
    // Export functionality will use this context data
  };

  return (
    <>
      <Head><title>Settings - Dashboard Creator</title></Head>
      <PageContainer>
        <SectionTitle>Settings Configuration</SectionTitle>
        <Form onSubmit={handleSubmit}>
          {/* FormGroups remain the same, but value and onChange are now tied to context-driven state */}
          <Panel><legend>{prettifyName('faDashboardsApi')}</legend>
            <FormGroup><Label htmlFor="faDashboardsApiUser">{prettifyName('user')}</Label><Input type="text" name="faDashboardsApiUser" id="faDashboardsApiUser" value={settingsData.faDashboardsApiUser} onChange={handleChange} /></FormGroup>
            <FormGroup><Label htmlFor="faDashboardsApiPass">{prettifyName('pass')}</Label><Input type="password" name="faDashboardsApiPass" id="faDashboardsApiPass" value={settingsData.faDashboardsApiPass} onChange={handleChange} /></FormGroup>
          </Panel>
          <FormGroup><Label htmlFor="playerUuid">{prettifyName('playerUuid')}</Label><Input type="text" name="playerUuid" id="playerUuid" placeholder="Enter GUID" value={settingsData.playerUuid} onChange={handleChange} /></FormGroup>
          <FormGroup><Label htmlFor="address">{prettifyName('address')}</Label><Input type="text" name="address" id="address" placeholder="Enter Address" value={settingsData.address} onChange={handleChange} /></FormGroup>
          <FormGroup><Label htmlFor="city">{prettifyName('city')}</Label><Input type="text" name="city" id="city" placeholder="Enter City" value={settingsData.city} onChange={handleChange} /></FormGroup>
          <FormGroup><Label htmlFor="state">{prettifyName('state')}</Label><Input type="text" name="state" id="state" placeholder="Enter State" value={settingsData.state} onChange={handleChange} /></FormGroup>
          <FormGroup><Label htmlFor="country">{prettifyName('country')}</Label><Input type="text" name="country" id="country" placeholder="Enter Country" value={settingsData.country} onChange={handleChange} /></FormGroup>
          <Panel><legend>{prettifyName('geolocation')}</legend>
            <FormGroup><Label htmlFor="geolocationLat">{prettifyName('lat')}</Label><Input type="text" name="geolocationLat" id="geolocationLat" placeholder="Latitude" value={settingsData.geolocationLat} onChange={handleChange} /></FormGroup>
            <FormGroup><Label htmlFor="geolocationLon">{prettifyName('lon')}</Label><Input type="text" name="geolocationLon" id="geolocationLon" placeholder="Longitude" value={settingsData.geolocationLon} onChange={handleChange} /></FormGroup>
          </Panel>
          <Panel><legend>{prettifyName('info')}</legend>
            <FormGroup><Label>{prettifyName('stations')} (Array of Strings)</Label>
              <ArrayInputContainer>
                {settingsData.infoStations.map((station, idx) => (
                  <ArrayItemContainer key={idx}>
                    <Input type="text" value={station} onChange={(e) => handleChange(e, idx, 'infoStations')} placeholder={`Station ${idx + 1}`} style={{flexGrow: 1}}/>
                    {(settingsData.infoStations.length > 0) && (<Button type="button" className="remove" onClick={() => removeStationInput(idx)}>Remove</Button>)}
                  </ArrayItemContainer>
                ))}
                <Button type="button" className="add" onClick={addStationInput}>Add Station</Button>
              </ArrayInputContainer>
            </FormGroup>
          </Panel>
        </Form>
      </PageContainer>
    </>
  );
};
export default SettingsPage;
