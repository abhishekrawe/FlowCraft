import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';
import { EditorPanel } from './editorPanel';
import { useStore } from './store';

function App() {
  const theme = useStore((state) => state.settings.theme);

  return (
    <main className={`app-shell theme-${theme}`}>
      <PipelineToolbar />
      <section className="workspace" aria-label="Workflow canvas">
        <EditorPanel />
        <PipelineUI />
      </section>
      <SubmitButton />
    </main>
  );
}

export default App;
