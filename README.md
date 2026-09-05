# FlowCraft

### Visual Workflow Builder

A node-based workflow editor built with React and React Flow, with a FastAPI backend for pipeline analysis and Directed Acyclic Graph (DAG) validation.

FlowCraft allows users to visually create workflows by adding nodes, connecting them through handles, configuring node fields, working with dynamic Text node variables, and submitting the pipeline for backend validation.

---

## ✨ Features

### 1. Reusable Node Architecture

Implemented a reusable node abstraction to reduce duplicated code across different node types and make the workflow editor easier to maintain and extend.

The application includes the following node types:

- Input
- LLM
- Output
- Text
- Filter
- Transform
- Condition
- Merge
- Webhook

The reusable node architecture centralizes common node structure, styling, handles, and shared behavior while allowing each node to define its own fields and configuration.

---

### 2. Workflow Editor

The application provides an interactive visual workflow editor powered by React Flow.

Users can:

- Add nodes from the node toolbar
- Drag and position nodes on the canvas
- Connect nodes using handles
- Configure node fields
- Zoom and pan around the canvas
- Use the minimap for navigation
- Toggle the grid
- Change grid size
- Adjust node scale
- Switch between light and dark themes
- Customize selected node appearance
- Submit the complete workflow for backend analysis

---

### 3. Smart Text Node

The Text node includes dynamic behavior to improve workflow authoring.

#### Dynamic Node Resizing

The Text node automatically adjusts its dimensions based on the amount of text entered.

This improves readability and makes longer text easier to work with inside the workflow.

#### Dynamic Variables

Users can define variables inside the Text node using double curly braces.

Example:

```text
Hello {{name}}
```

The application detects the variable and creates a corresponding input handle on the left side of the Text node.

Multiple variables are supported:

```text
Hello {{name}}, welcome {{user}}!
```

This creates separate handles for:

- `name`
- `user`

Only valid JavaScript-style variable names are treated as dynamic variables.

---

### 4. Backend Pipeline Analysis

The frontend communicates with the FastAPI backend through:

```text
POST /pipelines/parse
```

The complete pipeline containing nodes and edges is sent to the backend.

The backend calculates:

- Number of nodes
- Number of edges
- Whether the graph is a Directed Acyclic Graph (DAG)

Example response:

```json
{
  "num_nodes": 3,
  "num_edges": 2,
  "is_dag": true
}
```

The result is displayed to the user after clicking the **Submit** button.

---

## 🛠️ Tech Stack

### Frontend

- React 18
- JavaScript
- React Flow
- CSS
- Create React App
- React Testing Library

### Backend

- Python
- FastAPI
- Pydantic
- Uvicorn

### Architecture

```text
┌──────────────────────────────┐
│          FlowCraft            │
│       Workflow Editor         │
└──────────────┬───────────────┘
               │
               │ POST /pipelines/parse
               ▼
┌──────────────────────────────┐
│        FastAPI Backend        │
│                              │
│  • Node count                │
│  • Edge count                │
│  • DAG validation            │
└──────────────────────────────┘
```

---

## 📁 Project Structure

```text
vectorshift-assign/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── nodes/
│   │   ├── components/
│   │   ├── submit.js
│   │   └── ...
│   ├── package.json
│   └── package-lock.json
│
├── backend/
│   └── main.py
│
└── README.md
```

---

# 🚀 Getting Started

## Prerequisites

Make sure the following are installed:

- Node.js
- npm
- Python 3
- Git

---

## 1. Clone the Repository

```bash
git clone https://github.com/abhishekrawe/vectorshift-assign.git
```

Navigate into the project:

```bash
cd vectorshift-assign
```

---

# 🔵 Running the Backend

Open a terminal in the backend directory:

```bash
cd backend
```

Install the required Python packages:

```bash
pip install fastapi uvicorn
```

Start the FastAPI development server:

```bash
uvicorn main:app --reload
```

The backend will be available at:

```text
http://localhost:8000
```

### API Documentation

FastAPI automatically provides interactive API documentation at:

```text
http://localhost:8000/docs
```

You can use the Swagger UI to test the pipeline API directly.

---

# 🟢 Running the Frontend

Open a **second terminal**.

Navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the React development server:

```bash
npm start
```

The application will normally be available at:

```text
http://localhost:3000
```

If port `3000` is already in use, Create React App may automatically use another available port, such as:

```text
http://localhost:3001
```

---

# 🧩 How to Use

## Step 1 — Start the Backend

From the `backend` directory:

```bash
uvicorn main:app --reload
```

Keep this terminal running.

---

## Step 2 — Start the Frontend

From the `frontend` directory:

```bash
npm start
```

Open the application in your browser.

---

## Step 3 — Add Nodes

Use the node toolbar at the top of the editor.

Available nodes include:

```text
Input
LLM
Output
Text
Filter
Transform
Condition
Merge
Webhook
```

Drag the required nodes onto the workflow canvas.

---

## Step 4 — Connect Nodes

Connect nodes by dragging from an output handle to an input handle.

Example:

```text
Input → Text → Output
```

---

## Step 5 — Configure the Text Node

Text nodes support dynamic variables.

Example:

```text
Hello {{name}}
```

The application automatically creates a `name` input handle.

Multiple variables can also be used:

```text
Hello {{name}}, welcome {{user}}!
```

---

## Step 6 — Submit the Pipeline

Click the **Submit** button.

The frontend sends the current nodes and edges to:

```text
POST /pipelines/parse
```

The backend analyzes the workflow and returns:

```json
{
  "num_nodes": 3,
  "num_edges": 2,
  "is_dag": true
}
```

The result is then displayed in a user-friendly alert.

---

# 🔌 Backend API

## `POST /pipelines/parse`

Analyzes the submitted workflow.

### Request

```json
{
  "nodes": [
    {
      "id": "1"
    },
    {
      "id": "2"
    },
    {
      "id": "3"
    }
  ],
  "edges": [
    {
      "source": "1",
      "target": "2"
    },
    {
      "source": "2",
      "target": "3"
    }
  ]
}
```

### Response

```json
{
  "num_nodes": 3,
  "num_edges": 2,
  "is_dag": true
}
```

---

# 🔄 DAG Validation

The backend checks whether the submitted workflow is a Directed Acyclic Graph.

### Valid DAG

```text
A → B → C
```

Response:

```json
{
  "num_nodes": 3,
  "num_edges": 2,
  "is_dag": true
}
```

### Cyclic Graph

```text
A → B → C
↑         │
└─────────┘
```

Response:

```json
{
  "num_nodes": 3,
  "num_edges": 3,
  "is_dag": false
}
```

The cycle detection uses graph traversal with tracking of currently visiting and already visited nodes.

---

# 🧪 Testing

## Frontend Tests

Navigate to:

```text
frontend/
```

Run:

```bash
npm test -- --watchAll=false
```

---

## Production Build

To verify that the React application can be compiled successfully:

```bash
npm run build
```

---

## Backend API Testing

Start the backend:

```bash
uvicorn main:app --reload
```

Open:

```text
http://localhost:8000/docs
```

Find:

```text
POST /pipelines/parse
```

Use the following test payload:

```json
{
  "nodes": [
    {
      "id": "1"
    },
    {
      "id": "2"
    },
    {
      "id": "3"
    }
  ],
  "edges": [
    {
      "source": "1",
      "target": "2"
    },
    {
      "source": "2",
      "target": "3"
    }
  ]
}
```

Expected:

```json
{
  "num_nodes": 3,
  "num_edges": 2,
  "is_dag": true
}
```

---

## Cycle Detection Test

Use:

```json
{
  "nodes": [
    {
      "id": "1"
    },
    {
      "id": "2"
    },
    {
      "id": "3"
    }
  ],
  "edges": [
    {
      "source": "1",
      "target": "2"
    },
    {
      "source": "2",
      "target": "3"
    },
    {
      "source": "3",
      "target": "1"
    }
  ]
}
```

Expected:

```json
{
  "num_nodes": 3,
  "num_edges": 3,
  "is_dag": false
}
```

---

# ✅ Assignment Coverage

The implementation covers all four requested areas of the technical assessment.

| Part | Requirement | Status |
|------|-------------|--------|
| Part 1 | Reusable node abstraction | ✅ Complete |
| Part 1 | Five additional node types | ✅ Complete |
| Part 2 | Unified and appealing styling | ✅ Complete |
| Part 3 | Dynamic Text node resizing | ✅ Complete |
| Part 3 | `{{variable}}` dynamic handles | ✅ Complete |
| Part 4 | Frontend → FastAPI integration | ✅ Complete |
| Part 4 | Node counting | ✅ Complete |
| Part 4 | Edge counting | ✅ Complete |
| Part 4 | DAG validation | ✅ Complete |
| Part 4 | Submission result alert | ✅ Complete |

---

# 🔍 Validation Performed

The application was manually tested for the following scenarios:

### Node functionality

- Creating different node types
- Moving nodes around the canvas
- Connecting nodes
- Using multiple node types in the same workflow
- Verifying reusable node behavior

### Text Node

- Short text input
- Longer text input
- Dynamic node resizing
- Single variable detection
- Multiple variable detection
- Dynamic input handles
- Invalid variable formats

### Backend Integration

- Frontend-to-backend communication
- Node counting
- Edge counting
- Acyclic workflow validation
- Cyclic workflow validation
- Submission response handling

### Example verified results

```text
Acyclic workflow
Nodes: 3
Edges: 3
DAG: Yes
```

```text
Cyclic workflow
Nodes: 3
Edges: 3
DAG: No
```

### Build validation

```text
npm test
```

Passed.

```text
npm run build
```

Passed successfully.

---

# 🎨 Design & UX

The editor was designed around a clean visual workflow experience with:

- Consistent node styling
- Clear node type identification
- Visual connection handles
- Canvas grid
- Minimap navigation
- Zoom controls
- Light and dark themes
- Global canvas controls
- Node scaling
- Configurable node appearance
- Responsive workflow workspace

The design focuses on keeping workflow creation central while providing customization through global editor controls.

---

# 🏗️ Architecture

The application is divided into two primary layers.

### Frontend

Responsible for:

- Rendering the workflow editor
- Managing nodes and edges
- Node configuration
- Text variable detection
- Dynamic node sizing
- User interaction
- Pipeline submission

### Backend

Responsible for:

- Receiving pipeline data
- Validating request structure
- Counting nodes
- Counting edges
- Detecting graph cycles
- Returning pipeline analysis

This separation keeps the UI logic independent from backend graph analysis.

---

# 🔧 Configuration

The frontend backend URL supports environment-based configuration.

For local development, the application falls back to:

```text
http://localhost:8000
```

A custom backend URL can be provided using:

```text
REACT_APP_BACKEND_URL
```

Example:

```bash
REACT_APP_BACKEND_URL=http://localhost:8000
```

This allows the frontend to be configured for different environments without changing the submission logic.

---

# 📌 Development Notes

The frontend and backend are intentionally kept as separate applications.

Run them in two terminals:

### Terminal 1

```bash
cd backend
uvicorn main:app --reload
```

### Terminal 2

```bash
cd frontend
npm start
```

Then open the frontend in the browser.

---

# 📄 Technical Assessment Requirements

This project was developed to satisfy the following core requirements:

### Part 1 — Node Abstraction

Create a reusable abstraction for workflow nodes and demonstrate the abstraction by creating five additional node types.

### Part 2 — Styling

Create an appealing and unified workflow editor interface.

### Part 3 — Text Node Logic

Enhance the Text node with:

- Dynamic width and height
- Variable detection using `{{variable}}`
- Dynamic input handles for detected variables

### Part 4 — Backend Integration

Integrate the frontend with the FastAPI backend and:

- Send nodes and edges to `/pipelines/parse`
- Calculate node count
- Calculate edge count
- Determine whether the graph is a DAG
- Display the response to the user

All four areas have been implemented and validated.

---

# 👨‍💻 Project

**FlowCraft — Visual Workflow Builder**

Built with:

```text
React
React Flow
JavaScript
CSS
FastAPI
Python
Pydantic
Uvicorn
```

---

## License

This project was created as a technical assessment project.
