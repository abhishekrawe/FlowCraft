import { BaseNode } from './baseNode';
import { transformConfig } from './nodeConfigs';

export const TransformNode = ({ id, data }) => <BaseNode id={id} data={data} config={transformConfig} />;