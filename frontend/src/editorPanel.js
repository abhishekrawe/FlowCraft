import { useStore } from './store';

export const EditorPanel = () => {
  const nodes = useStore((state) => state.nodes);
  const settings = useStore((state) => state.settings);
  const updateSettings = useStore((state) => state.updateSettings);
  const updateNodeField = useStore((state) => state.updateNodeField);
  const selectedNode = nodes.find((node) => node.selected);

  const updateSelectedNode = (field, value) => {
    if (selectedNode) {
      updateNodeField(selectedNode.id, field, value);
    }
  };

  return (
    <aside className="editor-panel" aria-label="Editor controls">
      <div className="panel-heading">
        <span className="panel-kicker">Editor</span>
        <h1>Canvas controls</h1>
      </div>

      <section className="panel-section">
        <h2>Canvas</h2>
        <label className="panel-field">Background
          <select value={settings.canvasBackground} onChange={(event) => updateSettings({ canvasBackground: event.target.value })}>
            <option value="ink">Ink</option>
            <option value="slate">Slate</option>
            <option value="paper">Paper</option>
          </select>
        </label>
        <label className="panel-check"><input type="checkbox" checked={settings.showGrid} onChange={(event) => updateSettings({ showGrid: event.target.checked })} /> Show grid</label>
        <label className="panel-field">Grid size
          <select value={settings.gridSize} onChange={(event) => updateSettings({ gridSize: Number(event.target.value) })}>
            <option value="14">Small</option><option value="20">Medium</option><option value="28">Large</option>
          </select>
        </label>
      </section>

      <section className="panel-section">
        <h2>Node scale</h2>
        <label className="range-field"><span>Compact</span><input type="range" min="0.85" max="1.15" step="0.05" value={settings.nodeScale} onChange={(event) => updateSettings({ nodeScale: Number(event.target.value) })} /><span>Large</span></label>
      </section>

      <section className="panel-section selected-settings">
        <h2>Selected node</h2>
        {selectedNode ? (
          <>
            <strong className="selected-node-name">{selectedNode.data?.nodeType || selectedNode.type}</strong>
            <label className="panel-field">Shape
              <select value={selectedNode.data?.shape || 'rounded'} onChange={(event) => updateSelectedNode('shape', event.target.value)}>
                <option value="rounded">Rounded rectangle</option><option value="rectangle">Rectangle</option><option value="pill">Pill</option>
              </select>
            </label>
            <label className="panel-field">Border radius
              <select value={selectedNode.data?.borderRadius || '10px'} onChange={(event) => updateSelectedNode('borderRadius', event.target.value)}>
                <option value="4px">Compact</option><option value="10px">Standard</option><option value="18px">Rounded</option>
              </select>
            </label>
          </>
        ) : <p className="panel-empty">Select a node to customize</p>}
      </section>
    </aside>
  );
};