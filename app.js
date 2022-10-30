#!/usr/bin/env node

const express = require("express");
const app = express();

app.use((request, response, next) => {
  if (request.path !== "/s") {
    return next();
  }

  response.send(request.path);
});

app.listen("10086", () => {
  console.log("服务运行在80端口");
});
