const express = require('express'); 

const healthDataRouter = require('./healthData.coute');
 

function routerApi(app) {
  const router = express.Router();
  app.use('/api', router); 
  router.use('/remoteMonoriting', healthDataRouter);
 
}

module.exports = routerApi;