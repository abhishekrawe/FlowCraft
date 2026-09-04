import { BaseNode } from './baseNode';
import { webhookConfig } from './nodeConfigs';

export const WebhookNode = ({ id, data }) => <BaseNode id={id} data={data} config={webhookConfig} />;