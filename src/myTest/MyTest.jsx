import React, { useState, useCallback } from 'react';
import { v4 as uuid } from 'uuid';
import "../App.css";

const Area = ({ area, onRightClick, onDragStart, onDragOver, onDrop }) => (
     <div
          style={{  margin: '10px', padding: '10px' }}
          onContextMenu={(e) => { e.preventDefault(); onRightClick(area); }}
          draggable
          onDragStart={onDragStart}
          onDragOver={onDragOver}
          onDrop={(e) => onDrop(e, area)}
     >
          {area.id} - Right Click to add nested areas
          {area.nestedAreas.map(nestedArea => (
               <Area
                    key={nestedArea.id}
                    area={nestedArea}
                    onRightClick={onRightClick}
                    onDragStart={(e) => onDragStart(e, nestedArea)}
                    onDragOver={onDragOver}
                    onDrop={onDrop}
               />
          ))}
     </div>
);

const App = () => {
     const [areas, setAreas] = useState([
          {
               id: uuid().slice(0, 2),
               nestedAreas: [],
          },
          {
               id: uuid().slice(0, 2),
               nestedAreas: [],
          },
          {
               id: uuid().slice(0, 2),
               nestedAreas: [],
          },
     ]);

     console.log("areas: ", areas);

     const handleRightClick = useCallback((parentArea) => {
          const newArea = {
               id: uuid(),
               nestedAreas: [],
          };
          parentArea.nestedAreas.push(newArea);
          setAreas([...areas]);
     }, [areas]);

     const handleDragStart = useCallback((e, area) => {
          e.dataTransfer.setData('area', JSON.stringify(area));
          e.dataTransfer.effectAllowed = 'move';
     }, []);

     const handleDragOver = useCallback((e) => {
          e.preventDefault();
          e.dataTransfer.dropEffect = 'move';
     }, []);

     const handleDrop = useCallback((e, parentArea) => {
          e.preventDefault();
          const areaData = JSON.parse(e.dataTransfer.getData('area'));
          parentArea.nestedAreas.push(areaData);
          setAreas([...areas]);
     }, [areas]);

     return (
          <div className="app">
               {areas.map(area => (
                    <Area
                         key={area.id}
                         area={area}
                         onRightClick={() => handleRightClick(area)}
                         onDragStart={(e) => handleDragStart(e, area)}
                         onDragOver={handleDragOver}
                         onDrop={handleDrop}
                    />
               ))}
          </div>
     );
};

export default App;
