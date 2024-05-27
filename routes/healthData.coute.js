const express = require('express');
const router = express.Router(); 
const Controller = require('../controllers/healthData.controller');
const authValidation = require('../middleware/auth');

router.get('/getRemotePatientMonitoring/:id', Controller.getRemotePatientMonitoring)
router.get('/getMyRemoteMonitoring', authValidation, Controller.getMyRemoteMonitoring)
router.post('/', authValidation, Controller.create)
router.put('/updadeRemark/:dataID', authValidation, Controller.updateRemark)

module.exports = router;
