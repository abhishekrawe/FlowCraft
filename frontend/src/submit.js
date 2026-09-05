import { useStore } from './store';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';

export const SubmitButton = () => {
    const nodes = useStore((state) => state.nodes);
    const edges = useStore((state) => state.edges);

    const handleSubmit = async () => {
        try {
            const response = await fetch(`${BACKEND_URL}/pipelines/parse`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nodes, edges }),
            });

            if (!response.ok) {
                throw new Error('The backend returned an error response.');
            }

            const result = await response.json();
            window.alert([
                'Pipeline submitted successfully!',
                '',
                `Nodes: ${result.num_nodes}`,
                `Edges: ${result.num_edges}`,
                `DAG: ${result.is_dag ? 'Yes' : 'No'}`,
            ].join('\n'));
        } catch (error) {
            window.alert('Unable to connect to the backend. Please make sure the FastAPI server is running.');
        }
    };

    return (
        <div className="submit-bar">
            <button className="submit-button" type="button" onClick={handleSubmit}>Submit <span aria-hidden="true">&#8594;</span></button>
        </div>
    );
};
