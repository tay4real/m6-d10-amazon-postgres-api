const express = require("express");
const cors = require("cors");
const listEndpoints = require("express-list-endpoints");
const services = require("./services");

const server = express();

server.use(express.json());

// get all routes and put under api , so you access all routes as host:port/api/routename

server.use("/api", services);

server.use(cors());

const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.info(" ✅  Server is running on port " + port);
});

server.on("error", (error) => {
  console.error(" ❌ Error : server is not running :  " + error);
});
