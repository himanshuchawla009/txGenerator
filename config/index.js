const path = require("path");
let rootPath = path.normalize(`${__dirname}/..`),
  env = require("./env");


const config = {
  development: {
    root: rootPath,
    app: {
      name: "txGenerator",
      domain: "http://localhost:8030",
      webApi: "v1"
    },
    port: process.env.PORT || 3000,
    db: "mongodb://localhost:27017/txGenerator"
  },
  staging: {
    root: rootPath,
    app: {
      name: "txGenerator",
      domain: "http://localhost:8030",
      webApi: "v1"
    },
    port: process.env.PORT || 3000,
    db: "mongodb://localhost:27017/txGenerator"
  },
  production: {
    root: rootPath,
    app: {
      name: "txGenerator",
      domain: "http://localhost:8030",
      webApi: "v1"
    },
    port: process.env.PORT || 3000,
    db: "mongodb://localhost:27017/txGenerator"
  }
};


module.exports = config[env];
