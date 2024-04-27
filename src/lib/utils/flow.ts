import { RFSelector, useRFStore } from "base/contexts/store";
import { Edge, Node, NodeProps, getIncomers, getOutgoers } from "reactflow";
import { useShallow } from "zustand/react/shallow";

export const broadcastChange = (current_node: Node, action: Function) => {
  const { changeNodeData, nodes, edges } = useRFStore.getState();
  const outgoers: Node<any, string | undefined>[] = getOutgoers(
    current_node,
    nodes,
    edges
  );

   console.warn(current_node.data.output)
    if(outgoers){
      console.log("broadcasting from node "+current_node.id)
      outgoers.forEach((outgoer) => {
        const data = action(outgoer,current_node.data.output);
        if (outgoer) {
          changeNodeData({
            id: outgoer.id,
            data: {
              ...outgoer.data,
              ...data,
            },
            selected: outgoer.selected,
          } as NodeProps);
        }
      });
    }
};

//this is for the conditioner node

export const calculateLogicOutput = (node: Node,outputValue=false) => {
  const { nodes, edges, changeNodeData } = useRFStore.getState();
  // alert("working")

 
  const incomingNodes: Node[] = getIncomers(node, nodes, edges);
  if(!incomingNodes){

  }
  incomingNodes.forEach((incomingNode) => {
    console.log("this is the value", incomingNode.data.value);
    const value = parseInt(incomingNode.data.value) > 0 ? true : false;
    outputValue = outputValue || value;
  });

  node.data.output = outputValue;
  changeNodeData({
    id: node.id,
    data: {
      ...node.data,
    },
    selected: node.selected,
  } as NodeProps);

  console.table(node.data);

  return { ...node.data, output: outputValue };
};
