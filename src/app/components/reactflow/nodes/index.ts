import IdeaNode from "../nodes/IdeaNode";
import KnowledgeNode from "./KnowledgeNode";
import DocumentNode from "./DocumentNode";
import CustomNode from "../nodes/customNode";
import ConditionerNode from "./ConditionerNode";
import ReminderNode from "./ReminderNode";

const nodeTypes = {
    CUSTOM_NODE: CustomNode,
    IDEA_NODE: IdeaNode,
    KNOWLEDGE: KnowledgeNode,
    DOCUMENT: DocumentNode,
    CONDITION:ConditionerNode,
    REMINDER:ReminderNode
  };


export { KnowledgeNode,DocumentNode,CustomNode, IdeaNode,nodeTypes}