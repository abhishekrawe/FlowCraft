// store.js

import { create } from "zustand";
import {
    addEdge,
    applyNodeChanges,
    applyEdgeChanges,
    MarkerType,
  } from 'reactflow';

export const useStore = create((set, get) => ({
    nodes: [],
    edges: [],
    settings: {
      theme: 'light', canvasBackground: 'paper', showGrid: true, gridColor: '#b9c9cf', gridSize: 20, nodeScale: 1,
    },
    updateSettings: (settings) => set({ settings: { ...get().settings, ...settings } }),
    getNodeID: (type) => {
        const newIDs = {...get().nodeIDs};
        if (newIDs[type] === undefined) {
            newIDs[type] = 0;
        }
        newIDs[type] += 1;
        set({nodeIDs: newIDs});
        return `${type}-${newIDs[type]}`;
    },
    addNode: (node) => {
        set({
            nodes: [...get().nodes, node]
        });
    },
    onNodesChange: (changes) => {
      const removedNodeIds = changes
        .filter((change) => change.type === 'remove')
        .map((change) => change.id);
      set({
        nodes: applyNodeChanges(changes, get().nodes),
        edges: removedNodeIds.length
          ? get().edges.filter((edge) => (
            !removedNodeIds.includes(edge.source) && !removedNodeIds.includes(edge.target)
          ))
          : get().edges,
      });
    },
    onEdgesChange: (changes) => {
      set({
        edges: applyEdgeChanges(changes, get().edges),
      });
    },
    removeNodeEdgesForHandles: (nodeId, validHandleIds) => {
      set({
        edges: get().edges.filter((edge) => (
          edge.target !== nodeId || validHandleIds.includes(edge.targetHandle)
        )),
      });
    },
    onConnect: (connection) => {
      set({
        edges: addEdge({...connection, type: 'smoothstep', animated: true, markerEnd: {type: MarkerType.Arrow, height: '20px', width: '20px'}}, get().edges),
      });
    },
    updateNodeField: (nodeId, fieldName, fieldValue) => {
      set({
        nodes: get().nodes.map((node) => {
          if (node.id === nodeId) {
            return { ...node, data: { ...node.data, [fieldName]: fieldValue } };
          }
  
          return node;
        }),
      });
    },
  }));
