import { useState } from "react";
import {
     Tree,
     getBackendOptions,
     MultiBackend,
} from "@minoru/react-dnd-treeview";
import { DndProvider } from "react-dnd";
import initialData from "./sample-default.json";

function ReactDndTreeview() {
     const [treeData, setTreeData] = useState(initialData);
     const [newEntry, setNewEntry] = useState({})
     console.log("treeData: ", treeData);

     const handleDrop = (newTreeData) => setTreeData(newTreeData);

     return (
          <>
               <DndProvider backend={MultiBackend} options={getBackendOptions()}>
                    <Tree
                         tree={treeData}
                         rootId={0}
                         onDrop={handleDrop}
                         render={(node, { depth, isOpen, onToggle }) => (
                              <div style={{ marginLeft: depth * 10 }}>
                                   {node.droppable && (
                                        <span onClick={onToggle}>{isOpen ? "[-]" : "[+]"}</span>
                                   )}
                                   {node.text}

                              </div>
                         )}
                         enableAnimateExpand={true}
                    />
               </DndProvider>
               <input
                    type="text"
                    placeholder="Enter new entry"
                    onChange={(e) => setNewEntry(e.target.value)}
               />
               <button onClick={() => {
                    const newId = treeData.length + 1;
                    const _newEntry = {
                         id: newId,
                         parent: 0, // or the id of the parent node you want to add the new entry to
                         droppable: true,
                         text: newEntry
                    };
                    setTreeData([...treeData, _newEntry]);
               }}>
                    Add Entry
               </button>
          </>
     );
}

export default ReactDndTreeview;