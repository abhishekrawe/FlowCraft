// toolbar.js

import { DraggableNode } from './draggableNode';
import { useStore } from './store';

export const PipelineToolbar = () => {
    const theme = useStore((state) => state.settings.theme);
    const updateSettings = useStore((state) => state.updateSettings);

    return (
        <header className="pipeline-toolbar">
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
            <div className="header-theme" aria-label="Theme">
                <span>Theme</span>
                <button className={theme === 'light' ? 'is-active' : ''} type="button" onClick={() => updateSettings({ theme: 'light' })}>Light</button>
                <button className={theme === 'dark' ? 'is-active' : ''} type="button" onClick={() => updateSettings({ theme: 'dark' })}>Dark</button>
            </div>
        </header>
    );
};
