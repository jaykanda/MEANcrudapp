const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;
const dbConnect = require('./db.js');
const emproutes = require('./router.js');
const cityroutes = require('./router_moviebooking.js');
const theaterSelection = require('./router_theaterSelection.js');
const bookingroutes = require('./router_ticketbooking.js');
const theaterOnboarding = require('./router_theateronboarding.js');
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
// app.use('/api/employee', emproutes);
app.use('/', cityroutes);
app.use('/', theaterSelection);
app.use('/', bookingroutes); 
app.use('/', theaterOnboarding); 

dbConnect().then(() => {
    console.log('DB connected successfully!!');
})
.catch((err) => {
    console.log(`DB connection error due to ${err}`);
});

const options = {
    definition: {
      openapi: "3.1.0",
      info: {
        title: "Sample Movie ticket booking",
        version: "0.1.0",
        description:
          "This is a simple CRUD API application made with Express and documented with Swagger",
        
      },
      servers: [
        {
          url: "http://localhost:3000",
        },
      ],
    },
    apis: ["./router_moviebooking.js",
    "./router_theaterSelection.js",
    "./router_ticketbooking.js",
    "./router_theateronboarding.js",
    "./model/*.js"],
  };
  
  const specs = swaggerJsdoc(options);
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs)
  );


app.listen(PORT, () => {
    console.log(`Server is running in the port ${PORT}`);
});
