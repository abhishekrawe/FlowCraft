import { useEffect, useState } from 'react';
import { Handle, useUpdateNodeInternals } from 'reactflow';

const getInitialValue = (field, id, data) => {
  if (data && data[field.name] !== undefined) {
    return data[field.name];
  }

  return typeof field.defaultValue === 'function'
    ? field.defaultValue(id, data)
    : field.defaultValue ?? '';
};

export const BaseNode = ({ id, data = {}, config }) => {
  const updateNodeInternals = useUpdateNodeInternals();
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

  const handles = typeof config.handles === 'function'
    ? config.handles(values, id, data)
    : config.handles || [];
  const nodeStyle = config.getStyle ? config.getStyle(values) : undefined;
  const handleKey = handles.map((handle) => `${handle.type}:${handle.id}:${handle.style?.top || ''}`).join('|');
  const sizeKey = nodeStyle ? `${nodeStyle['--node-width'] || ''}:${nodeStyle['--text-area-height'] || ''}` : '';

  useEffect(() => {
    updateNodeInternals(id);
  }, [id, handleKey, sizeKey, updateNodeInternals]);

  return (
    <div className={`base-node node-${data.nodeType || 'default'}`} style={nodeStyle}>
      {handles.map((handle) => (
        <Handle
          key={handle.id}
          type={handle.type}
          position={handle.position}
          id={`${id}-${handle.id}`}
          style={handle.style}
        />
      ))}
      <div className="base-node__header">
        <span className="base-node__indicator" aria-hidden="true" />
        <span className="base-node__title">{config.title}</span>
      </div>
      <div className="base-node__body">
        {config.description && <span className="base-node__description">{config.description}</span>}
        {(config.fields || []).map((field) => (
          <label className="base-node__field" key={field.name}>
            <span>{field.label}</span>
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
            ) : field.type === 'textarea' ? (
              <textarea
                className="base-node__textarea"
                value={values[field.name]}
                onChange={(event) => handleFieldChange(field.name, event.target.value)}
              />
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