import React, { useState, useCallback } from 'react';
import { v4 as uuid } from 'uuid';
import Area from './Area';
import NestedArea from './NestedArea';

const App = () => {
     const [areas, setAreas] = useState([]);

     const handleRightClick = useCallback((area) => {
          const newArea = {
               id: uuid(),
               x: 0,
               y: 0,
               width: 100,
               height: 100,
               nestedAreas: [],
          };
          if (area) {
               area.nestedAreas.push(newArea);
               setAreas((prevAreas) => [...prevAreas]);
          } else {
               setAreas((prevAreas) => [...prevAreas, newArea]);
          }
     }, [setAreas]);

     const handleDragStart = useCallback((e, area) => {
          e.dataTransfer.effectAllowed = 'move';
          e.dataTransfer.setData('area', area);
     }, []);

     const handleDragOver = useCallback((e, area) => {
          e.preventDefault();
          e.dataTransfer.effectAllowed = 'move';
     }, []);

     const handleDrop = useCallback((e, area) => {
          const droppedArea = e.dataTransfer.getData('area');
          if (area) {
               area.nestedAreas.push(droppedArea);
               setAreas((prevAreas) => [...prevAreas]);
          } else {
               setAreas((prevAreas) => [...prevAreas, droppedArea]);
          }
     }, [setAreas]);

     return (
          <div className="app">
               {areas.map((area, index) => (
                    <Area
                         key={index}
                         area={area}
                         onRightClick={() => handleRightClick(area)}
                         onDragStart={(e) => handleDragStart(e, area)}
                         onDragOver={(e) => handleDragOver(e, area)}
                         onDrop={(e) => handleDrop(e, area)}
                    >
                         {area.nestedAreas.map((nestedArea, index) => (
                              <NestedArea
                                   key={index}
                                   nestedArea={nestedArea}
                                   onRightClick={() => handleRightClick(nestedArea)}
                                   onDragStart={(e) => handleDragStart(e, nestedArea)}
                                   onDragOver={(e) => handleDragOver(e, nestedArea)}
                                   onDrop={(e) => handleDrop(e, nestedArea)}
                              />
                         ))}
                    </Area>
               ))}
          </div>
     );
};

export default App;