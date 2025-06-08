import React, { useState } from 'react';
import {
  FormContainer, FormGroup, Label, Input, Select, CheckboxContainer, CheckboxInput, Panel, SectionTitle, ColorInputContainer, ArrayInputContainer, ArrayItemContainer
} from '../components/forms/StyledFormElements';

// Utility to convert camelCase/prop names to readable labels
const prettifyName = (name) => {
  if (name.startsWith('_')) {
    name = name.substring(1); // Remove leading underscore for display
  }
  const result = name.replace(/([A-Z])/g, ' \$1');
  return result.charAt(0).toUpperCase() + result.slice(1);
};

// Initial state structure for Panel, derived from the issue
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
  props_bgColor: '#ffffff',
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
  props__enableShift2: false, // Assuming this is a separate boolean
  props_shift_prefix: '',
  props_shift_sufix: '', // Corrected typo from 'sufix' to 'suffix' if intended, using as is from spec
  props_shift_ignoreDaylightSavings: false,
  props_shift_defaultColor: '#000000',
  props_shift_sameColorAsShiftLetter: false,
  props_shift_prefixColor: '#000000',
  props_shift_start: '', // DATE_TIME
  props_shift_items: [
    { value: '', color: '#000000' },
    { value: '', color: '#000000' },
    { value: '', color: '#000000' },
    { value: '', color: '#000000' },
  ],
  props_useBackgroundImage: false,
  // props_battalionChief_ds: {}, // Ignoring ds and transformer
  // props_battalionChief_transformer: {}, // Ignoring ds and transformer
  battalionChief_battalionTitles: [''], // Array of strings
  // battalionChief_ds: {}, // Ignoring ds and transformer
  // battalionChief_transformer: {} // Ignoring ds and transformer
};


const PanelPage = () => {
  const [formData, setFormData] = useState(initialPanelState);

  const handleChange = (e, index, field, subField) => {
    const { name, value, type, checked } = e.target;

    if (field === 'props_shift_items') {
      const newItems = [...formData.props_shift_items];
      newItems[index][subField] = value;
      setFormData(prev => ({ ...prev, props_shift_items: newItems }));
    } else if (field === 'battalionChief_battalionTitles') {
      const newTitles = [...formData.battalionChief_battalionTitles];
      newTitles[index] = value;
      setFormData(prev => ({ ...prev, battalionChief_battalionTitles: newTitles }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const addShiftItem = () => {
    setFormData(prev => ({
      ...prev,
      props_shift_items: [...prev.props_shift_items, { value: '', color: '#000000' }]
    }));
  };

  const removeShiftItem = (index) => {
    setFormData(prev => ({
      ...prev,
      props_shift_items: prev.props_shift_items.filter((_, i) => i !== index)
    }));
  };

  const addBattalionTitle = () => {
    setFormData(prev => ({ ...prev, battalionChief_battalionTitles: [...prev.battalionChief_battalionTitles, ''] }));
  };

  const removeBattalionTitle = (index) => {
    setFormData(prev => ({ ...prev, battalionChief_battalionTitles: prev.battalionChief_battalionTitles.filter((_, i) => i !== index) }));
  };

  const handleColorChange = (e) => {
    const { name, value } = e.target;
    // This function assumes the text input and color input have the same 'name'
    // and the color input updates the text input via its linked state.
    setFormData(prev => ({ ...prev, [name]: value }));
  };


  return (
    <div id="panel" style={{padding: '30px'}}>
      <SectionTitle>Panel Configuration</SectionTitle>
      <FormContainer>

        <FormGroup>
          <Label htmlFor="position">{prettifyName('position')}</Label>
          <Select name="position" id="position" value={formData.position} onChange={handleChange}>
            {[
              { label: "Left", value: "left" },
              { label: "Right", value: "right" },
              { label: "Top", value: "top" },
              { label: "Bottom", value: "bottom" }
            ].map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
          </Select>
        </FormGroup>

        <Panel>
          <legend>{prettifyName('props')}</legend>

          <CheckboxContainer>
            <CheckboxInput name="props_useBattalionChief" id="props_useBattalionChief" checked={formData.props_useBattalionChief} onChange={handleChange} />
            <Label htmlFor="props_useBattalionChief">{prettifyName('useBattalionChief')}</Label>
          </CheckboxContainer>

          <FormGroup>
            <Label htmlFor="props_pillTitle">{prettifyName('pillTitle')}</Label>
            <Input type="text" name="props_pillTitle" id="props_pillTitle" value={formData.props_pillTitle} onChange={handleChange} />
          </FormGroup>

          {/* Other Boolean props */}
          {[
            'props_surfFlagStatus', 'props_useFlagStatus', 'props_showWindCompass', 'props_hideForecastPanel',
            'props_useWeather', 'props_useDate', 'props__useBackgroundImage', 'props__useLogoWidth',
            'props__useSecondAgencyHash', 'props__useMottoFontSize', 'props__usePillTextColor',
            'props__usePillBorderColor', 'props__usePillBackgroundColor', 'props__customizeClockFontSize',
            'props__useStationName', 'props__useStationNameFontSize', 'props__enableShift', 'props__enableShift2',
            'props_useBackgroundImage' // Note: props_useBackgroundImage is listed twice in spec, handling once
          ].filter((v, i, a) => a.indexOf(v) === i) // Ensure unique props if duplicated in list
          .map(propName => (
            <CheckboxContainer key={propName}>
              <CheckboxInput name={propName} id={propName} checked={formData[propName]} onChange={handleChange} />
              <Label htmlFor={propName}>{prettifyName(propName.replace('props_', ''))}</Label>
            </CheckboxContainer>
          ))}

          <FormGroup>
            <Label htmlFor="props_timeDiff">{prettifyName('timeDiff')} (Number)</Label>
            <Input type="number" name="props_timeDiff" id="props_timeDiff" value={formData.props_timeDiff} onChange={handleChange} />
          </FormGroup>

          <Panel>
            <legend>{prettifyName('currentWeatherProps')}</legend>
            {[
              'props_currentWeatherProps_showHumidity', 'props_currentWeatherProps_showWind',
              'props_currentWeatherProps_showWindDirection', 'props_currentWeatherProps_showHeatIndex'
            ].map(propName => (
              <CheckboxContainer key={propName}>
                <CheckboxInput name={propName} id={propName} checked={formData[propName]} onChange={handleChange} />
                <Label htmlFor={propName}>{prettifyName(propName.replace('props_currentWeatherProps_', ''))}</Label>
              </CheckboxContainer>
            ))}
          </Panel>

          {/* Color Props */}
          {['props_bgColor', 'props_textColor'].map(propName => (
            <FormGroup key={propName}>
              <Label htmlFor={propName}>{prettifyName(propName.replace('props_', ''))} (Color)</Label>
              <ColorInputContainer>
                <Input type="text" name={propName} id={propName} value={formData[propName]} onChange={handleChange} />
                <Input type="color" name={propName} value={formData[propName]} onChange={handleColorChange} /* Links to text input via shared state key */ />
              </ColorInputContainer>
            </FormGroup>
          ))}

          <FormGroup>
            <Label htmlFor="props_agencyHash">{prettifyName('agencyHash')} (URL)</Label>
            <Input type="url" name="props_agencyHash" id="props_agencyHash" value={formData.props_agencyHash} onChange={handleChange} placeholder="https://example.com" />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="props_dateTimeFormat">{prettifyName('dateTimeFormat')}</Label>
            <Input type="text" name="props_dateTimeFormat" id="props_dateTimeFormat" value={formData.props_dateTimeFormat} onChange={handleChange} placeholder="e.g., YYYY-MM-DD HH:mm:ss" />
          </FormGroup>

          <Panel>
            <legend>{prettifyName('shift')}</legend>
            <FormGroup>
              <Label htmlFor="props_shift_prefix">{prettifyName('prefix')}</Label>
              <Input type="text" name="props_shift_prefix" id="props_shift_prefix" value={formData.props_shift_prefix} onChange={handleChange} />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="props_shift_sufix">{prettifyName('sufix')}</Label> {/* As per spec */}
              <Input type="text" name="props_shift_sufix" id="props_shift_sufix" value={formData.props_shift_sufix} onChange={handleChange} />
            </FormGroup>
            <CheckboxContainer>
              <CheckboxInput name="props_shift_ignoreDaylightSavings" id="props_shift_ignoreDaylightSavings" checked={formData.props_shift_ignoreDaylightSavings} onChange={handleChange} />
              <Label htmlFor="props_shift_ignoreDaylightSavings">{prettifyName('ignoreDaylightSavings')}</Label>
            </CheckboxContainer>

            {['props_shift_defaultColor', 'props_shift_prefixColor'].map(propName => (
              <FormGroup key={propName}>
                <Label htmlFor={propName}>{prettifyName(propName.replace('props_shift_', ''))} (Color)</Label>
                <ColorInputContainer>
                  <Input type="text" name={propName} id={propName} value={formData[propName]} onChange={handleChange} />
                  <Input type="color" name={propName} value={formData[propName]} onChange={handleColorChange} />
                </ColorInputContainer>
              </FormGroup>
            ))}

            <CheckboxContainer>
              <CheckboxInput name="props_shift_sameColorAsShiftLetter" id="props_shift_sameColorAsShiftLetter" checked={formData.props_shift_sameColorAsShiftLetter} onChange={handleChange} />
              <Label htmlFor="props_shift_sameColorAsShiftLetter">{prettifyName('sameColorAsShiftLetter')}</Label>
            </CheckboxContainer>
            <FormGroup>
              <Label htmlFor="props_shift_start">{prettifyName('start')} (Date Time)</Label>
              <Input type="datetime-local" name="props_shift_start" id="props_shift_start" value={formData.props_shift_start} onChange={handleChange} />
            </FormGroup>

            <Label>{prettifyName('items')} (Array of Objects)</Label>
            <ArrayInputContainer>
              {formData.props_shift_items.map((item, index) => (
                <ArrayItemContainer key={index} style={{border: '1px solid #eee', padding: '10px', borderRadius: '4px'}}>
                  <FormGroup style={{flexGrow: 1}}>
                    <Label htmlFor={`props_shift_item_value_${index}`}>{prettifyName('value')}</Label>
                    <Input type="text" name={`props_shift_item_value_${index}`} id={`props_shift_item_value_${index}`} value={item.value} onChange={(e) => handleChange(e, index, 'props_shift_items', 'value')} />
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor={`props_shift_item_color_${index}`}>{prettifyName('color')}</Label>
                    <ColorInputContainer>
                       <Input type="text" name={`props_shift_item_color_${index}`} id={`props_shift_item_color_${index}`} value={item.color} onChange={(e) => handleChange(e, index, 'props_shift_items', 'color')} style={{minWidth: '80px'}}/>
                       <Input type="color" value={item.color} onChange={(e) => {
                           const newItems = [...formData.props_shift_items];
                           newItems[index].color = e.target.value;
                           setFormData(prev => ({ ...prev, props_shift_items: newItems }));
                       }} />
                    </ColorInputContainer>
                  </FormGroup>
                  {formData.props_shift_items.length > 1 && (
                    <button type="button" onClick={() => removeShiftItem(index)}>Remove</button>
                  )}
                </ArrayItemContainer>
              ))}
              <button type="button" onClick={addShiftItem}>Add Shift Item</button>
            </ArrayInputContainer>
          </Panel> {/* End Shift Panel */}
        </Panel> {/* End Props Panel */}

        <Panel>
            <legend>{prettifyName('battalionChief')}</legend>
            <FormGroup>
                <Label>{prettifyName('battalionTitles')} (Array of Strings)</Label>
                 <ArrayInputContainer>
                    {formData.battalionChief_battalionTitles.map((title, index) => (
                    <ArrayItemContainer key={index}>
                        <Input
                        type="text"
                        value={title}
                        onChange={(e) => handleChange(e, index, 'battalionChief_battalionTitles')}
                        placeholder={`Title ${index + 1}`}
                        style={{flexGrow: 1}}
                        />
                        {formData.battalionChief_battalionTitles.length > 1 && (
                        <button type="button" onClick={() => removeBattalionTitle(index)}>Remove</button>
                        )}
                    </ArrayItemContainer>
                    ))}
                    <button type="button" onClick={addBattalionTitle}>Add Battalion Title</button>
                </ArrayInputContainer>
            </FormGroup>
            {/* DS and Transformer for battalionChief are ignored as per spec */}
        </Panel>

        {/* DS and Transformer for main Panel object are ignored as per spec */}

      </FormContainer>
    </div>
  );
};

export default PanelPage;
