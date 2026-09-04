import { BaseNode } from './baseNode';
import { filterConfig } from './nodeConfigs';

export const FilterNode = ({ id, data }) => <BaseNode id={id} data={data} config={filterConfig} />;