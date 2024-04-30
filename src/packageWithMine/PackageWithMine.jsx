import { useState, useEffect } from "react";
import {
     Tree,
     getBackendOptions,
     MultiBackend,
} from "@minoru/react-dnd-treeview";
import { DndProvider } from "react-dnd";
import axios from "axios";


function PackageWithMine() {
     const [treeData, setTreeData] = useState([]);
     const [newEntry, setNewEntry] = useState({})

     const handleDrop = (newTreeData) => setTreeData(newTreeData);
     const URL = `http://localhost:3045/buildings/all`;
     const defaultIdInteger = 0;

     function checkNestedAreas(area = {}, data = []) {
          if (area?.Subareas?.length > 0) {
               area?.Subareas?.forEach(area => {
                    data.push({
                         id: area.id,
                         parent: area.areaId || defaultIdInteger,
                         droppable: true,
                         text: area.name,
                         test: "SOMETHING"
                    })
                    checkNestedAreas(area, data)
               })
          }
     }

     useEffect(() => {
          axios.get(URL)
               .then(res => {
                    const data = []
                    res.data.forEach(building => {
                         building.Floors.forEach(floor => {
                              floor.Areas.forEach(area => {
                                   data.push({
                                        id: area.id,
                                        parent: area.areaId || defaultIdInteger,
                                        droppable: true,
                                        text: area.name,
                                        test: "SOMETHING"
                                   })
                                   checkNestedAreas(area, data)
                              })
                         })
                    })
                    setTreeData(data)
               })
               .catch(err => console.log(err))
     }, [])

     return (
          <>
               <DndProvider backend={MultiBackend} options={getBackendOptions()}>
                    <Tree
                         tree={treeData}
                         rootId={0}
                         onDrop={handleDrop}
                         render={(node, { depth, isOpen, onToggle }) => (
                              <div style={{ marginLeft: depth * 10 }} onClick={() => console.log(`Clicked: ${node.text}, ${node.id}, ${node.test}`)}>
                                   {node.droppable && (
                                        <span onClick={onToggle}>{isOpen ? "[-] " : "> "}</span>
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
                    const newId = treeData.length + 1 + 9999;
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

export default PackageWithMine