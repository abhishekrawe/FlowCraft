import { Position } from 'reactflow';
import { getTextDimensions, getTextVariables } from './textUtils';

const selectField = (name, label, options, defaultValue) => ({
  name,
  label,
  type: 'select',
  options: options.map((option) => ({ value: option, label: option })),
  defaultValue,
});

export const inputConfig = {
  title: 'Input',
  fields: [
    { name: 'inputName', label: 'Name', defaultValue: (id) => id.replace('customInput-', 'input_') },
    selectField('inputType', 'Type', ['Text', 'File'], 'Text'),
  ],
  handles: [{ type: 'source', position: Position.Right, id: 'value' }],
};

export const outputConfig = {
  title: 'Output',
  fields: [
    { name: 'outputName', label: 'Name', defaultValue: (id) => id.replace('customOutput-', 'output_') },
    selectField('outputType', 'Type', ['Text', 'Image'], 'Text'),
  ],
  handles: [{ type: 'target', position: Position.Left, id: 'value' }],
};

export const llmConfig = {
  title: 'LLM',
  description: 'This is a LLM.',
  handles: [
    { type: 'target', position: Position.Left, id: 'system', style: { top: `${100 / 3}%` } },
    { type: 'target', position: Position.Left, id: 'prompt', style: { top: `${200 / 3}%` } },
    { type: 'source', position: Position.Right, id: 'response' },
  ],
};

export const textConfig = {
  title: 'Text',
  pruneEdgesForField: true,
  fields: [{ name: 'text', label: 'Text', type: 'textarea', defaultValue: '{{input}}' }],
  handles: (values, id) => [
    ...getTextVariables(values.text).map((variable, index, variables) => ({
      type: 'target',
      position: Position.Left,
      id: variable === 'output' ? 'variable-output' : variable,
      style: { top: `${((index + 1) / (variables.length + 1)) * 100}%` },
    })),
    { type: 'source', position: Position.Right, id: 'output' },
  ],
  getStyle: (values) => {
    const { width, height } = getTextDimensions(values.text);
    return { '--node-width': `${width}px`, '--text-area-height': `${height}px` };
  },
};

export const filterConfig = {
  title: 'Filter',
  fields: [{ name: 'condition', label: 'Condition', defaultValue: 'is not empty' }],
  handles: [
    { type: 'target', position: Position.Left, id: 'input' },
    { type: 'source', position: Position.Right, id: 'output' },
  ],
};

export const transformConfig = {
  title: 'Transform',
  fields: [selectField('operation', 'Operation', ['JSON Parse', 'Map', 'Format'], 'JSON Parse')],
  handles: [
    { type: 'target', position: Position.Left, id: 'input' },
    { type: 'source', position: Position.Right, id: 'output' },
  ],
};

export const conditionConfig = {
  title: 'Condition',
  fields: [{ name: 'condition', label: 'Condition', defaultValue: 'value is true' }],
  handles: [
    { type: 'target', position: Position.Left, id: 'input' },
    { type: 'source', position: Position.Right, id: 'true', style: { top: '35%' } },
    { type: 'source', position: Position.Right, id: 'false', style: { top: '65%' } },
  ],
};

export const mergeConfig = {
  title: 'Merge',
  fields: [selectField('strategy', 'Strategy', ['Append', 'Combine'], 'Append')],
  handles: [
    { type: 'target', position: Position.Left, id: 'first', style: { top: '35%' } },
    { type: 'target', position: Position.Left, id: 'second', style: { top: '65%' } },
    { type: 'source', position: Position.Right, id: 'output' },
  ],
};

export const webhookConfig = {
  title: 'Webhook',
  fields: [
    { name: 'path', label: 'Path', defaultValue: '/webhook' },
    selectField('method', 'Method', ['GET', 'POST', 'PUT'], 'POST'),
    selectField('authentication', 'Auth', ['None', 'API Key', 'Bearer'], 'None'),
  ],
  handles: [{ type: 'source', position: Position.Right, id: 'output' }],
};