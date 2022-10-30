#!/usr/bin/env node

const fs = require('fs');
const express = require("express");
const forward = require('express-http-proxy');
const app = express();

app.use((request, response, next) => {
  if (/\/s$/.test(request.path) === false) {
    forward(`https://www.baidu.com/${request.url}`)(request, response, next);
    return;
  }

  const ua = request.headers['user-agent'];
  const isMobile = /ipad|iphone|android|mobile/.test(ua);
  const template = isMobile ? 'mobile.html' : 'pc.html'
  const content = fs.readFileSync(path.join(__dirname, `./template/${template}`));

  response.send(content);
});

app.listen("10086", () => {
  console.log("服务运行在80端口");
});
