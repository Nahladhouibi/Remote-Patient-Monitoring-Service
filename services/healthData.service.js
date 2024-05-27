const { models } = require('../config/sequelize');

class HealthDataService { 
  
    constructor() {}

    async find() {
      const res = await models.HealthData.findAll();
      return res;
    }

    async findOne(id) {
      const res = await models.HealthData.findByPk(id);
      return res;
    }

    async create(data) {
      const res = await models.HealthData.create(data);
      return res;
    }

    async update(id, data) {
      const model = await this.findOne(id);
      const res = await model.update(data);
      return res;
    }

    async delete(id) {
      const model = await this.findOne(id);
      await model.destroy();
      return { deleted: true };
    }
    async findPatientRemoteMonitoring(patientID) {
      console.log("patientID",patientID);
      const res = await models.HealthData.findAll({where:{patientID}});
       return res;
    }


    async updateRemark(id,dataID,data){
  
  console.log(id);
  console.log(dataID);
  console.log(data);
    
        const healthData = await models.HealthData.findByPk(dataID);
        console.log(healthData.dataValues);
        if (healthData) {
           
          healthData.dataValues.remark=data.remark
         
           
          console.log(data);
     const res=   await   models.HealthData.update({ remark: data.remark ,doctor:id}, {
            where: {
              id:  healthData.dataValues.id
            }
          })
           
          
    }
    console.log("res",res);
    return res;     
        }
  }
  
  module.exports = HealthDataService;