import { BaseNode } from './baseNode';
import { llmConfig } from './nodeConfigs';

export const LLMNode = ({ id, data }) => {
  return <BaseNode id={id} data={data} config={llmConfig} />;
};
