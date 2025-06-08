import React, { useState } from 'react';
import {
  FormContainer, FormGroup, Label, Input, Panel, SectionTitle
} from '../components/forms/StyledFormElements';

// Utility to convert camelCase/prop names to readable labels
const prettifyName = (name) => {
  const result = name.replace(/([A-Z])/g, ' \$1');
  return result.charAt(0).toUpperCase() + result.slice(1);
};

const SettingsPage = () => {
  const [formData, setFormData] = useState({
    faDashboardsApiUser: '',
    faDashboardsApiPass: '',
    playerUuid: '',
    address: '',
    city: '',
    state: '',
    country: '',
    geolocationLat: '',
    geolocationLon: '',
    infoStations: [''], // Example for array of strings
  });

  const handleChange = (e, index, field) => {
    const { name, value, type, checked } = e.target;
    if (field === 'infoStations') {
      const newStations = [...formData.infoStations];
      newStations[index] = value;
      setFormData(prev => ({ ...prev, infoStations: newStations }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  // Basic handling for adding/removing station inputs
  const addStationInput = () => {
    setFormData(prev => ({ ...prev, infoStations: [...prev.infoStations, ''] }));
  };

  const removeStationInput = (index) => {
    setFormData(prev => ({ ...prev, infoStations: prev.infoStations.filter((_, i) => i !== index) }));
  };


  return (
    <div id="settings" style={{padding: '30px'}}>
      <SectionTitle>Settings</SectionTitle>
      <FormContainer>
        <Panel>
          <legend>{prettifyName('faDashboardsApi')}</legend>
          <FormGroup>
            <Label htmlFor="faDashboardsApiUser">{prettifyName('user')}</Label>
            <Input type="text" name="faDashboardsApiUser" id="faDashboardsApiUser" value={formData.faDashboardsApiUser} onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="faDashboardsApiPass">{prettifyName('pass')}</Label>
            <Input type="password" name="faDashboardsApiPass" id="faDashboardsApiPass" value={formData.faDashboardsApiPass} onChange={handleChange} />
          </FormGroup>
        </Panel>

        <FormGroup>
          <Label htmlFor="playerUuid">{prettifyName('playerUuid')}</Label>
          <Input type="text" name="playerUuid" id="playerUuid" placeholder="GUID" value={formData.playerUuid} onChange={handleChange} />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="address">{prettifyName('address')}</Label>
          <Input type="text" name="address" id="address" placeholder="Address" value={formData.address} onChange={handleChange} />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="city">{prettifyName('city')}</Label>
          <Input type="text" name="city" id="city" placeholder="City" value={formData.city} onChange={handleChange} />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="state">{prettifyName('state')}</Label>
          <Input type="text" name="state" id="state" placeholder="State" value={formData.state} onChange={handleChange} />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="country">{prettifyName('country')}</Label>
          <Input type="text" name="country" id="country" placeholder="Country" value={formData.country} onChange={handleChange} />
        </FormGroup>

        <Panel>
          <legend>{prettifyName('geolocation')}</legend>
          <FormGroup>
            <Label htmlFor="geolocationLat">{prettifyName('lat')}</Label>
            <Input type="text" name="geolocationLat" id="geolocationLat" placeholder="Latitude" value={formData.geolocationLat} onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="geolocationLon">{prettifyName('lon')}</Label>
            <Input type="text" name="geolocationLon" id="geolocationLon" placeholder="Longitude" value={formData.geolocationLon} onChange={handleChange} />
          </FormGroup>
        </Panel>

        <Panel>
          <legend>{prettifyName('info')}</legend>
          <FormGroup>
            <Label>{prettifyName('stations')} (Array of Strings)</Label>
            {formData.infoStations.map((station, index) => (
              <div key={index} style={{display: 'flex', gap: '10px', alignItems: 'center'}}>
                <Input
                  type="text"
                  value={station}
                  onChange={(e) => handleChange(e, index, 'infoStations')}
                  placeholder={`Station ${index + 1}`}
                  style={{flexGrow: 1}}
                />
                {formData.infoStations.length > 1 && (
                   <button type="button" onClick={() => removeStationInput(index)} style={{padding: '8px', background: '#e74c3c', color: 'white', border: 'none', borderRadius: '4px'}}>Remove</button>
                )}
              </div>
            ))}
            <button type="button" onClick={addStationInput} style={{padding: '8px 12px', background: '#3498db', color: 'white', border: 'none', borderRadius: '4px', alignSelf: 'flex-start', marginTop: '5px'}}>Add Station</button>
          </FormGroup>
        </Panel>

      </FormContainer>
    </div>
  );
};

export default SettingsPage;
