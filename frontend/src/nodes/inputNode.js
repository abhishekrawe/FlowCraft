import { BaseNode } from './baseNode';
import { inputConfig } from './nodeConfigs';

export const InputNode = ({ id, data }) => {
  return <BaseNode id={id} data={data} config={inputConfig} />;
};
