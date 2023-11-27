const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
// const version = require('package.json');

const options = {
  definition: {
    openapi: "3.0.0.",
    info: {
      title: "REST API Docs",
    //  version
    }
  },
  apis: [
    "./server/router_moviebooking.js",
    "./server/router_theaterSelection.js",
    "./server/router_ticketbooking.js",
    "./server/model/*.js"
  ]
}

const swaggerSpec = swaggerJsDoc(options)

module.exports = function swaggerDocs(app, port) {
  //swagger page

  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))

  // docs in JSON format
  app.get("docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json")
    res.send(swaggerSpec)
  })

  console.log(`Docs available in http://localhost:${port}/docs`)
}


