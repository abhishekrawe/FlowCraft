import { BaseNode } from './baseNode';
import { outputConfig } from './nodeConfigs';

export const OutputNode = ({ id, data }) => {
  return <BaseNode id={id} data={data} config={outputConfig} />;
};
