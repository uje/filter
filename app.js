#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const express = require("express");
const forward = require('express-http-proxy');
const app = express();

app.use((request, response, next) => {
  const wd = decodeURIComponent(request.query.wd || request.query.word);

  if (request.path.endsWith('/s') === false) {
    forward(`https://www.baidu.com/${request.url}`)(request, response, next);
    return;
  }

  if (['间谍', '监听', '监视', '组织', '跟踪', '尾随'].includes(wd) === false) {
    forward(`https://www.baidu.com/${request.url}`)(request, response, next);
    return;
  }

  const ua = (request.headers['user-agent'] || '').toLowerCase();
  const isMobile = /ipad|iphone|android|mobile/.test(ua);
  const template = isMobile ? 'mobile.html' : 'pc.html'
  const content = fs.readFileSync(path.join(__dirname, `./template/${template}`));

  response.type('html');
  response.send(content.toString());
});

app.listen("10086", () => {
  console.log("服务运行在80端口");
});
