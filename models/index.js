const { HealtData, HealthDataSchema } = require('./healthData.model');
function setupModels(sequelize) {
  HealtData.init(HealthDataSchema, HealtData.config(sequelize));
     
}

module.exports = setupModels;