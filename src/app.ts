import express from "express";
import router from "./routes";
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "My API",
      version: "1.0.0",
      description: "API documentation",
    },
  },
  apis: ["./src/routes/**/*.ts"],
};

const swaggerSpec = swaggerJsDoc(options);

const app = express();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.json());
app.use("/", router);

export default app;
