
export default {
  apps: [
    {
      name: "node-crud-app",
      script: "server.js",
      instances: "max",
      exec_mode: "cluster",
      env: {
        NODE_ENV: "production"
      }
    }
  ]
};
