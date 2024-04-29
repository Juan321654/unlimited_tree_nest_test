const express = require('express')
const app = express()
const port = 3045
const { Building, Floor, Area, Load } = require('./models');

app.use(express.json());

app.get('/', (req, res) => res.send('Hello World!'))

app.post("/buildings", async (req, res) => {
     try {
          const { name } = req.body;
          const building = await Building.create({ name });
          res.status(201).send(building);
     } catch (error) {
          res.status(400).send({ error: error.message });
     }
});

app.post("/floors", async (req, res) => {
     try {
          const { name, buildingId } = req.body;
          const floor = await Floor.create({ name, buildingId });
          res.status(201).send(floor);
     } catch (error) {
          res.status(400).send({ error: error.message });
     }
});

app.post("/areas", async (req, res) => {
     try {
          const { name, floorId, areaId } = req.body;
          const area = await Area.create({ name, floorId, areaId });
          res.status(201).send(area);
     } catch (error) {
          res.status(400).send({ error: error.message });
     }
});

function buildHierarchy(buildings, maxDepth = 15) {
     // Helper function to recursively build the tree
     function buildAreasTree(areas, parentId, depth) {
          if (depth >= maxDepth) {
               return [];
          }

          let areaMap = {};

          // Create a map of all areas by their ID
          areas.forEach(area => areaMap[area.id] = { ...area, Subareas: [] });

          // Root areas
          let rootAreas = areas.filter(area => area.areaId === parentId);

          // Nest subareas recursively
          rootAreas.forEach(rootArea => {
               rootArea.Subareas = buildAreasTree(areas, rootArea.id, depth + 1);
          });

          return rootAreas;
     }

     // Build the entire structure recursively
     buildings.forEach(building => {
          building.Floors.forEach(floor => {
               floor.Areas = buildAreasTree(floor.Areas, null, 0);
          });
     });

     return buildings;
}

app.get("/buildings/:id", async (req, res) => {
     const { id } = req.params;
     const whereOptions = {};
     if (id.toLowerCase() !== "all") whereOptions.id = id; // If the ID is not "all", filter by it

     try {
          const buildings = await Building.findAll({
               include: [{
                    model: Floor,
                    as: 'Floors',
                    include: [{
                         model: Area,
                         as: 'Areas',
                         include: [{
                              model: Load,
                              as: 'Loads_Simple'
                         }],
                    }],
                    where: whereOptions
               }]
          });

          const buildingsData = buildings.map(building => building.toJSON());
          const hierarchicalData = buildHierarchy(buildingsData);

          res.send(hierarchicalData);
     } catch (error) {
          res.status(500).send({ error: error.message });
     }
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`))