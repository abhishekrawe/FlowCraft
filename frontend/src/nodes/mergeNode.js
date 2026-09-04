import { BaseNode } from './baseNode';
import { mergeConfig } from './nodeConfigs';

export const MergeNode = ({ id, data }) => <BaseNode id={id} data={data} config={mergeConfig} />;