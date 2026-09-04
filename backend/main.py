from collections import defaultdict
from typing import List

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://localhost:3000', 'http://localhost:3001'],
    allow_credentials=True,
    allow_methods=['POST'],
    allow_headers=['Content-Type'],
)


class PipelineNode(BaseModel):
    id: str


class PipelineEdge(BaseModel):
    source: str
    target: str


class PipelineRequest(BaseModel):
    nodes: List[PipelineNode]
    edges: List[PipelineEdge]


def is_directed_acyclic(nodes: List[PipelineNode], edges: List[PipelineEdge]) -> bool:
    adjacency = defaultdict(list)
    for node in nodes:
        adjacency[node.id]
    for edge in edges:
        adjacency[edge.source].append(edge.target)
        adjacency[edge.target]

    visiting = set()
    visited = set()

    def visit(node_id: str) -> bool:
        if node_id in visiting:
            return False
        if node_id in visited:
            return True

        visiting.add(node_id)
        for neighbor in adjacency[node_id]:
            if not visit(neighbor):
                return False
        visiting.remove(node_id)
        visited.add(node_id)
        return True

    return all(visit(node_id) for node_id in adjacency)

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse')
def parse_pipeline(pipeline: PipelineRequest):
    return {
        'num_nodes': len(pipeline.nodes),
        'num_edges': len(pipeline.edges),
        'is_dag': is_directed_acyclic(pipeline.nodes, pipeline.edges),
    }
