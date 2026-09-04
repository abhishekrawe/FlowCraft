import { BaseNode } from './baseNode';
import { textConfig } from './nodeConfigs';

export const TextNode = ({ id, data }) => {
  return <BaseNode id={id} data={data} config={textConfig} />;
};
