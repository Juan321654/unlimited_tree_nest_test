import React from 'react';

// Sample data
const data = [
    { "id": 1, "parent": 0, "droppable": true, "text": "Folder 1" },
    { "id": 2, "parent": 1, "text": "File 1-1", "data": { "fileType": "csv", "fileSize": "0.5MB" } },
    { "id": 3, "parent": 1, "text": "File 1-2", "data": { "fileType": "pdf", "fileSize": "4.8MB" } },
    { "id": 4, "parent": 0, "droppable": true, "text": "Folder 2" },
    { "id": 5, "parent": 4, "droppable": true, "text": "Folder 2-1" },
    { "id": 6, "parent": 5, "text": "File 2-1-1", "data": { "fileType": "image", "fileSize": "2.1MB" } }
];

function MyTest2() {
    // Convert flat array to tree
    const buildTree = (items) => {
        let tree = [];
        let childrenOf = {};
        items.forEach((item) => {
            let { id, parent } = item;
            childrenOf[id] = childrenOf[id] || [];
            item.children = childrenOf[id];
            parent === 0 ? tree.push(item) : (childrenOf[parent] = childrenOf[parent] || []).push(item);
        });
        return tree;
    };

    const treeData = buildTree(data);

    // Recursive function to render tree
    const renderTree = (nodes) => {
        return nodes.map((node) => (
            <div key={node.id}>
                {node.text}
                {node.children && node.children.length > 0 && (
                    <div style={{ marginLeft: '20px' }}>{renderTree(node.children)}</div>
                )}
            </div>
        ));
    };

    return <div>{renderTree(treeData)}</div>;
}

export default MyTest2;