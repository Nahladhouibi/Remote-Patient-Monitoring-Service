const express = require('express');
const router = express.Router(); 
const healthDataController = require('../controllers/healthData.controller');

router
    .get('/', healthDataController.get )
    .get('/:id', healthDataController.getById )
    .post('/', healthDataController.create )
    .put('/:id', healthDataController.update )
    .delete('/:id', healthDataController._delete );

module.exports = router;
