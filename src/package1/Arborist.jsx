import React from 'react'
import { Tree, } from 'react-arborist';

function Arborist() {
     const data = [
          { id: "1", name: "Unread" },
          { id: "2", name: "Threads" },
          {
               id: "3",
               name: "Chat Rooms",
               children: [
                    { id: "c1", name: "General" },
                    { id: "c2", name: "Random" },
                    { id: "c3", name: "Open Source Projects" },
               ],
          },
          {
               id: "4",
               name: "Direct Messages",
               children: [
                    { id: "d1", name: "Alice" },
                    { id: "d2", name: "Bob" },
                    { id: "d3", name: "Charlie" },
               ],
          },
     ];

     const onCreate = ({ parentId, index, type }) => { };
     const onRename = ({ id, name }) => { };
     const onMove = ({ dragIds, parentId, index }) => { console.log("dragIds: ", dragIds)};
     const onDelete = ({ ids }) => { };

     return (
          <>
               {/* <Tree
                    data={data}
                    onCreate={onCreate}
                    onRename={onRename}
                    onMove={onMove}
                    onDelete={onDelete}
               /> */}
               <Tree
                    initialData={data}
                    openByDefault={false}
                    width={600}
                    height={1000}
                    indent={24}
                    rowHeight={36}
                    overscanCount={1}
                    paddingTop={30}
                    paddingBottom={10}
               >
                    {Node}
               </Tree>
          </>
     )
}

function Node({ node, style, dragHandle }) {
     /* This node instance can do many things. See the API reference. */
     return (
          <div style={style} ref={dragHandle} onClick={() => node.toggle()}>
               {node.isLeaf ? "🍁" : "🗀"} {node.data.name}
          </div>
     );
}

export default Arborist