import { BaseNode } from './baseNode';
import { conditionConfig } from './nodeConfigs';

export const ConditionNode = ({ id, data }) => <BaseNode id={id} data={data} config={conditionConfig} />;