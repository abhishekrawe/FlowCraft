import { useEffect, useState } from 'react';
import { Handle, useUpdateNodeInternals } from 'reactflow';
import { useStore } from '../store';

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
  const updateNodeField = useStore((state) => state.updateNodeField);
  const removeNodeEdgesForHandles = useStore((state) => state.removeNodeEdgesForHandles);
  const [values, setValues] = useState(() => {
    const initialValues = {};
    (config.fields || []).forEach((field) => {
      initialValues[field.name] = getInitialValue(field, id, data);
    });
    return initialValues;
  });

  const handleFieldChange = (fieldName, value) => {
    setValues((currentValues) => ({ ...currentValues, [fieldName]: value }));
    updateNodeField(id, fieldName, value);

    if (config.pruneEdgesForField) {
      const nextValues = { ...values, [fieldName]: value };
      const nextHandles = config.handles(nextValues, id, data);
      removeNodeEdgesForHandles(id, nextHandles.map((handle) => `${id}-${handle.id}`));
    }
  };

  const accent = data.accent || '';
  const shape = data.shape || 'rounded';
  const isCollapsed = data.collapsed === true;
  const nodeStyle = {
    ...(config.getStyle ? config.getStyle(values) : {}),
    ...(accent ? { '--accent': accent } : {}),
  };

  useEffect(() => {
    (config.fields || []).forEach((field) => {
      if (data[field.name] === undefined) {
        updateNodeField(id, field.name, values[field.name]);
      }
    });
  }, [config.fields, data, id, updateNodeField, values]);

  const handleNodeOptionChange = (fieldName, value) => {
    updateNodeField(id, fieldName, value);
  };

  const handles = typeof config.handles === 'function'
    ? config.handles(values, id, data)
    : config.handles || [];
  const handleKey = handles.map((handle) => `${handle.type}:${handle.id}:${handle.style?.top || ''}`).join('|');
  const sizeKey = nodeStyle ? `${nodeStyle['--node-width'] || ''}:${nodeStyle['--text-area-height'] || ''}` : '';

  useEffect(() => {
    updateNodeInternals(id);
  }, [id, handleKey, sizeKey, updateNodeInternals]);

  return (
    <div
      className={`base-node node-${data.nodeType || 'default'} node-shape-${shape}${isCollapsed ? ' is-collapsed' : ''}`}
      style={nodeStyle}
    >
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
        <div className="base-node__actions" onMouseDown={(event) => event.stopPropagation()}>
          <select
            className="base-node__option base-node__color-option"
            value={accent}
            aria-label={`${config.title} accent color`}
            onChange={(event) => handleNodeOptionChange('accent', event.target.value)}
          >
            <option value="">Auto</option>
            <option value="#59c3d4">Cyan</option>
            <option value="#d58bdf">Violet</option>
            <option value="#e6b85c">Amber</option>
            <option value="#69c78f">Green</option>
          </select>
          <select
            className="base-node__option"
            value={shape}
            aria-label={`${config.title} shape`}
            onChange={(event) => handleNodeOptionChange('shape', event.target.value)}
          >
            <option value="rounded">Round</option>
            <option value="rectangle">Square</option>
            <option value="pill">Pill</option>
          </select>
          <button
            className="base-node__collapse"
            type="button"
            aria-label={isCollapsed ? `Expand ${config.title} node` : `Collapse ${config.title} node`}
            aria-pressed={isCollapsed}
            onClick={() => handleNodeOptionChange('collapsed', !isCollapsed)}
          >
            {isCollapsed ? '+' : '-'}
          </button>
        </div>
      </div>
      {!isCollapsed && <div className="base-node__body">
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
      </div>}
    </div>
  );
};