// toolbar.js

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {

    return (
        <header className="pipeline-toolbar">
            <div className="brand-lockup">
                <span className="brand-mark" aria-hidden="true">V</span>
                <div>
                    <strong>VectorShift</strong>
                    <span>Workflow studio</span>
                </div>
            </div>
            <div className="toolbar-divider" aria-hidden="true" />
            <div className="node-palette" aria-label="Node palette">
                <DraggableNode type='customInput' label='Input' />
                <DraggableNode type='llm' label='LLM' />
                <DraggableNode type='customOutput' label='Output' />
                <DraggableNode type='text' label='Text' />
                <DraggableNode type='filter' label='Filter' />
                <DraggableNode type='transform' label='Transform' />
                <DraggableNode type='condition' label='Condition' />
                <DraggableNode type='merge' label='Merge' />
                <DraggableNode type='webhook' label='Webhook' />
            </div>
        </header>
    );
};
