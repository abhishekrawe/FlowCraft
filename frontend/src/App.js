import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';

function App() {
  return (
    <main className="app-shell">
      <PipelineToolbar />
      <section className="workspace" aria-label="Workflow canvas">
        <div className="workspace-heading">
          <div>
            <span className="eyebrow">Workspace / Untitled flow</span>
            <h1>Build your pipeline</h1>
          </div>
          <span className="status-pill"><span /> Ready</span>
        </div>
        <PipelineUI />
      </section>
      <SubmitButton />
    </main>
  );
}

export default App;
