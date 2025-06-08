// GLOBAL: Will hold the current JSON data, loaded from initial-data.json or imported.
let currentJsonData = {};
let formContainer;

// --- Form Generation Functions ---
function createLabel(text, forId) {
    const label = document.createElement('label');
    label.textContent = text;
    if (forId) {
        label.htmlFor = forId;
    }
    return label;
}

function createTextInput(id, value, dataKey) {
    const input = document.createElement('input');
    input.type = 'text';
    input.id = id;
    input.name = id;
    input.value = String(value === null || value === undefined ? "" : value);
    input.dataset.key = dataKey;
    return input;
}

function createNumberInput(id, value, dataKey) {
    const input = document.createElement('input');
    input.type = 'number';
    input.id = id;
    input.name = id;
    input.value = value === null || value === undefined ? "" : Number(value);
    input.dataset.key = dataKey;
    if (Number(value) === value && value % 1 !== 0) {
        input.step = "any";
    }
    return input;
}

function createCheckbox(id, checked, dataKey) {
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.id = id;
    input.name = id;
    input.checked = Boolean(checked);
    input.dataset.key = dataKey;
    return input;
}

function createTextArea(id, value, dataKey) {
    const textarea = document.createElement('textarea');
    textarea.id = id;
    textarea.name = id;
    textarea.value = String(value === null || value === undefined ? "" : value);
    textarea.rows = 3;
    textarea.dataset.key = dataKey;
    return textarea;
}

function sanitizeForId(key) {
    return String(key).replace(/[^a-zA-Z0-9_-]/g, '_');
}

function createField(key, value, baseId, parentElement, parentKeyPath) {
    const currentId = `${baseId}-${sanitizeForId(key)}`;
    const label = createLabel(key, currentId);
    parentElement.appendChild(label);

    const fieldWrapper = document.createElement('div');
    fieldWrapper.classList.add('field-wrapper');

    if (Array.isArray(value)) {
        createArrayFields(value, fieldWrapper, currentId, key, parentKeyPath ? `${parentKeyPath}.${key}` : key);
    } else if (typeof value === 'object' && value !== null) {
        const fieldset = document.createElement('fieldset');
        fieldset.dataset.objectKey = key;
        const legend = document.createElement('legend');
        legend.textContent = key;
        fieldset.appendChild(legend);
        createObjectFields(value, fieldset, currentId, parentKeyPath ? `${parentKeyPath}.${key}` : key);
        fieldWrapper.appendChild(fieldset);
    } else if (typeof value === 'boolean') {
        fieldWrapper.appendChild(createCheckbox(currentId, value, key));
    } else if (typeof value === 'number') {
        fieldWrapper.appendChild(createNumberInput(currentId, value, key));
    } else if (typeof value === 'string' && value.length > 50 && !key.toLowerCase().includes('path') && !key.toLowerCase().includes('icon') && !key.toLowerCase().includes('url') && !key.toLowerCase().includes('hash') && !key.toLowerCase().includes('id') && !key.toLowerCase().includes("name")) {
        fieldWrapper.appendChild(createTextArea(currentId, value, key));
    } else {
        fieldWrapper.appendChild(createTextInput(currentId, value, key));
    }
    parentElement.appendChild(fieldWrapper);
}

function createObjectFields(obj, parentElement, baseId = 'root', parentKeyPath = '') {
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            createField(key, obj[key], baseId, parentElement, parentKeyPath);
        }
    }
}

function renderArrayItem(itemData, index, itemsContainer, baseIdForArrayItems, arrayKey, itemSchemaTemplate, pathToArrayInSchema) {
    const itemContainer = document.createElement('div');
    itemContainer.className = 'array-item';
    itemContainer.dataset.index = index;

    const itemBaseId = `${baseIdForArrayItems}-item-${sanitizeForId(String(index))}`;

    if (typeof itemData === 'object' && itemData !== null) {
        createObjectFields(itemData, itemContainer, itemBaseId, `${pathToArrayInSchema}[${index}]`);
    } else {
        // For primitive items, the 'key' for createField is a generic name like "Value"
        // The actual value is itemData. The dataKey for the input will be "Value".
        // This needs to be handled during reconstruction: if an array item is not an object, its value is taken directly.
        createField(`Value`, itemData, itemBaseId, itemContainer, `${pathToArrayInSchema}[${index}]`);
    }

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.type = 'button';
    removeButton.className = 'remove-item array-controls-button';
    removeButton.onclick = () => {
        itemContainer.remove();
        // Re-index remaining items for visual consistency and data-index attribute
        const siblings = itemsContainer.children;
        for(let i = 0; i < siblings.length; i++) {
            siblings[i].dataset.index = i;
        }
    };
    itemContainer.appendChild(removeButton);
    itemsContainer.appendChild(itemContainer);
}

function createArrayFields(arr, parentElement, baseId, arrayKey, pathToArrayInSchema) {
    const arrayFieldset = document.createElement('fieldset');
    arrayFieldset.dataset.arrayKey = arrayKey;
    arrayFieldset.dataset.baseId = baseId; // Base ID for the array fieldset itself
    arrayFieldset.dataset.pathToArrayInSchema = pathToArrayInSchema;

    const legend = document.createElement('legend');
    legend.textContent = `${arrayKey} (Array)`;
    arrayFieldset.appendChild(legend);

    const itemsContainer = document.createElement('div');
    itemsContainer.className = 'array-items-container';
    arrayFieldset.appendChild(itemsContainer);

    let itemSchemaTemplate;
    // Attempt to get the schema for items in this array from the *original* or *currently loaded* full JSON data
    const schemaArray = getObjectByPath(currentJsonData, pathToArrayInSchema);

    if (Array.isArray(schemaArray) && schemaArray.length > 0) {
        // Clone the first item of the schema array to use as a template
        itemSchemaTemplate = JSON.parse(JSON.stringify(schemaArray[0]));
        // Clear values from the cloned template
        if (typeof itemSchemaTemplate === 'object' && itemSchemaTemplate !== null) {
            Object.keys(itemSchemaTemplate).forEach(k => {
                if (typeof itemSchemaTemplate[k] === 'string') itemSchemaTemplate[k] = "";
                else if (typeof itemSchemaTemplate[k] === 'number') itemSchemaTemplate[k] = 0;
                else if (typeof itemSchemaTemplate[k] === 'boolean') itemSchemaTemplate[k] = false;
                else if (Array.isArray(itemSchemaTemplate[k])) itemSchemaTemplate[k] = [];
                // else if (typeof itemSchemaTemplate[k] === 'object') itemSchemaTemplate[k] = {}; // Could also clear sub-objects
            });
        } else { // Primitive type template
             if (typeof itemSchemaTemplate === 'string') itemSchemaTemplate = "";
             else if (typeof itemSchemaTemplate === 'number') itemSchemaTemplate = 0;
             else if (typeof itemSchemaTemplate === 'boolean') itemSchemaTemplate = false;
        }
    } else {
        // Default if no schema found or schema array is empty
        itemSchemaTemplate = ""; // Default to a string input for new items
        // console.warn(`Array '${arrayKey}' at path '${pathToArrayInSchema}' is empty or not found in currentJsonData. New items will default to an empty string input.`);
    }

    // Render existing items from the current data being processed (arr)
    arr.forEach((item, index) => {
        // Pass the derived itemSchemaTemplate for consistency, though item itself has the actual data
        renderArrayItem(item, index, itemsContainer, baseId, arrayKey, itemSchemaTemplate, pathToArrayInSchema);
    });

    const addButton = document.createElement('button');
    addButton.textContent = 'Add Item';
    addButton.type = 'button';
    addButton.className = 'add-item array-controls-button';
    addButton.onclick = () => {
        const newIndex = itemsContainer.children.length;
        // For the new item, use the (cleared) itemSchemaTemplate
        const newItemData = (typeof itemSchemaTemplate === 'object' && itemSchemaTemplate !== null)
                            ? JSON.parse(JSON.stringify(itemSchemaTemplate)) // Deep clone the template
                            : itemSchemaTemplate; // Use primitive template directly
        renderArrayItem(newItemData, newIndex, itemsContainer, baseId, arrayKey, itemSchemaTemplate, pathToArrayInSchema);
    };

    arrayFieldset.appendChild(addButton);
    parentElement.appendChild(arrayFieldset);
}

// --- JSON Reconstruction Functions ---
function reconstructObjectFromFieldset(fieldsetElement) {
    const obj = {};
    const children = fieldsetElement.children;
    for (let i = 0; i < children.length; i++) {
        const child = children[i];
        if (child.classList && child.classList.contains('field-wrapper')) {
            const inputElement = child.querySelector('input[data-key], textarea[data-key], select[data-key]');
            const nestedObjectFieldset = child.querySelector('fieldset[data-object-key]');
            const nestedArrayFieldset = child.querySelector('fieldset[data-array-key]');

            if (inputElement) {
                const key = inputElement.dataset.key;
                if (inputElement.type === 'checkbox') {
                    obj[key] = inputElement.checked;
                } else if (inputElement.type === 'number') {
                    obj[key] = inputElement.value === '' ? null : parseFloat(inputElement.value);
                } else {
                    obj[key] = inputElement.value;
                }
            } else if (nestedObjectFieldset) {
                obj[nestedObjectFieldset.dataset.objectKey] = reconstructObjectFromFieldset(nestedObjectFieldset);
            } else if (nestedArrayFieldset) {
                obj[nestedArrayFieldset.dataset.arrayKey] = reconstructArrayFromFieldset(nestedArrayFieldset);
            }
        }
    }
    return obj;
}

function reconstructArrayFromFieldset(arrayFieldsetElement) {
    const arr = [];
    const itemsContainer = arrayFieldsetElement.querySelector('.array-items-container');
    if (!itemsContainer) return arr;

    for (const itemContainer of itemsContainer.children) {
        if (itemContainer.classList.contains('array-item')) {
            // Check if the item contains a fieldset (meaning it's an object)
            const nestedObjectFieldset = itemContainer.querySelector('fieldset[data-object-key]');

            if (nestedObjectFieldset) {
                arr.push(reconstructObjectFromFieldset(nestedObjectFieldset));
            } else {
                // It's a primitive type. Find the input field inside the .field-wrapper.
                // The key for this primitive was "Value" during generation.
                const primitiveFieldWrapper = itemContainer.querySelector('.field-wrapper');
                let primitiveInput = null;
                if(primitiveFieldWrapper){
                    primitiveInput = primitiveFieldWrapper.querySelector('input[data-key="Value"], textarea[data-key="Value"]');
                }

                if (primitiveInput) {
                    if (primitiveInput.type === 'checkbox') {
                        arr.push(primitiveInput.checked);
                    } else if (primitiveInput.type === 'number') {
                        arr.push(primitiveInput.value === '' ? null : parseFloat(primitiveInput.value));
                    } else {
                        arr.push(primitiveInput.value);
                    }
                } else {
                    // console.warn("Could not find input for primitive array item:", itemContainer);
                }
            }
        }
    }
    return arr;
}

function reconstructJsonFromForm(formContainerElement) {
    const rootObject = {};
    // Iterate over direct children of formContainer, which should be field-wrappers for top-level keys
    const children = formContainerElement.children;
    for (let i = 0; i < children.length; i++) {
        const child = children[i];
         if (child.classList && child.classList.contains('field-wrapper')) {
            const inputElement = child.querySelector('input[data-key], textarea[data-key], select[data-key]');
            const nestedObjectFieldset = child.querySelector('fieldset[data-object-key]');
            const nestedArrayFieldset = child.querySelector('fieldset[data-array-key]');

            if (inputElement) {
                const key = inputElement.dataset.key;
                 if (inputElement.type === 'checkbox') {
                    rootObject[key] = inputElement.checked;
                } else if (inputElement.type === 'number') {
                    rootObject[key] = inputElement.value === '' ? null : parseFloat(inputElement.value);
                } else {
                    rootObject[key] = inputElement.value;
                }
            } else if (nestedObjectFieldset) {
                rootObject[nestedObjectFieldset.dataset.objectKey] = reconstructObjectFromFieldset(nestedObjectFieldset);
            } else if (nestedArrayFieldset) {
                rootObject[nestedArrayFieldset.dataset.arrayKey] = reconstructArrayFromFieldset(nestedArrayFieldset);
            }
        }
    }
    return rootObject;
}


function getObjectByPath(obj, path) {
    if (!path || path === 'root' || path === '') return obj; // Path for root object
    // Updated regex to better handle array indices and dot notation mixed
    const keys = path.replace(/\[(\d+)\]/g, '.$1').split('.').filter(Boolean);

    let current = obj;
    for (const key of keys) {
        if (current === null || typeof current !== 'object') {
            // console.warn(`Path terminated prematurely at non-object for key "${key}" in path "${path}"`);
            return undefined;
        }
        if (!current.hasOwnProperty(key)) {
            // console.warn(`Key "${key}" not found in object for path "${path}". Current object:`, current);
            return undefined;
        }
        current = current[key];
    }
    return current;
}

// --- Main Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    formContainer = document.getElementById('form-container');
    const exportButton = document.getElementById('export-json');
    const importButton = document.getElementById('import-json');
    const importFile = document.getElementById('import-json-file');

    function generateForm(jsonData) {
        if (!formContainer) {
            console.error("Form container #form-container not found!");
            return;
        }
        formContainer.innerHTML = '';
        createObjectFields(jsonData, formContainer, 'root', ''); // Start with empty parentKeyPath for root
    }

    fetch('initial-data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Initial data file "initial-data.json" not found (HTTP ${response.status}). Please use the import button or create the file.`);
            }
            return response.json();
        })
        .then(data => {
            currentJsonData = data;
            generateForm(currentJsonData);
        })
        .catch(error => {
            console.warn(error.message);
            // Initialize with a minimal default if fetch fails
            currentJsonData = { "_name": "Default Config", "version": "1.0", "info": "Load a JSON file (e.g., initial-data.json) to start." };
            generateForm(currentJsonData);
        });

    if (exportButton) {
        exportButton.addEventListener('click', () => {
            if (!formContainer) {
                alert("Form container not found."); return;
            }
            const reconstructed = reconstructJsonFromForm(formContainer);
            const jsonString = JSON.stringify(reconstructed, null, 2);
            const blob = new Blob([jsonString], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'exported_config.json';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            alert('JSON exported successfully!');
        });
    }

    if (importButton && importFile) {
        importButton.addEventListener('click', () => {
            importFile.value = null;
            importFile.click();
        });
        importFile.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    try {
                        const importedJson = JSON.parse(e.target.result);
                        currentJsonData = importedJson;
                        generateForm(currentJsonData);
                        alert('JSON imported successfully!');
                    } catch (error) {
                        alert('Error parsing JSON file: ' + error.message);
                        console.error("Import error:", error);
                    }
                };
                reader.readAsText(file);
            }
        });
    }
});
