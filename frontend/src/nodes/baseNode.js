import { useState } from 'react';
import { Handle } from 'reactflow';

const getInitialValue = (field, id, data) => {
  if (data && data[field.name] !== undefined) {
    return data[field.name];
  }

  return typeof field.defaultValue === 'function'
    ? field.defaultValue(id, data)
    : field.defaultValue ?? '';
};

export const BaseNode = ({ id, data = {}, config }) => {
  const [values, setValues] = useState(() => {
    const initialValues = {};
    (config.fields || []).forEach((field) => {
      initialValues[field.name] = getInitialValue(field, id, data);
    });
    return initialValues;
  });

  const handleFieldChange = (fieldName, value) => {
    setValues((currentValues) => ({ ...currentValues, [fieldName]: value }));
  };

  return (
    <div style={{ width: 200, minHeight: 80, border: '1px solid black' }}>
      {(config.handles || []).map((handle) => (
        <Handle
          key={handle.id}
          type={handle.type}
          position={handle.position}
          id={`${id}-${handle.id}`}
          style={handle.style}
        />
      ))}
      <div>
        <span>{config.title}</span>
      </div>
      <div>
        {config.description && <span>{config.description}</span>}
        {(config.fields || []).map((field) => (
          <label key={field.name}>
            {field.label}:
            {field.type === 'select' ? (
              <select
                value={values[field.name]}
                onChange={(event) => handleFieldChange(field.name, event.target.value)}
              >
                {field.options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={field.type || 'text'}
                value={values[field.name]}
                onChange={(event) => handleFieldChange(field.name, event.target.value)}
              />
            )}
          </label>
        ))}
      </div>
    </div>
  );
};