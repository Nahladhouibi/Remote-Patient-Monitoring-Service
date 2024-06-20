const HealthDataService = require('../services/healthData.service');
const service = new HealthDataService();
const axios=require("axios")
const create = async ( req, res ) => {
    try { 

        console.log({...req.body,patientID:req.payload.id});
        const response = await service.create({...req.body,patientID:req.payload.id});
        res.status(201).json({ success: true, data: response});
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}

const get = async ( req, res ) => {
    try {
        const response = await service.find();
        res.json(response);
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}

const getById = async ( req, res ) => {
    try {
        const { id } = req.params;
        const response = await service.findOne(id);
        res.json(response);
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}

const update = async (req, res) => {
    try {
        const { id } = req.params;
        const body = req.body;
        const response = await service.update(id,body);
        res.json(response);
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}

const _delete = async (req, res) => {
    try {
        const { id } = req.params; 
        const response = await service.delete(id);
        res.json(response);
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}

const getMyRemoteMonitoring= async ( req, res ) => {
    try {
        
      
        const results = await service.findPatientRemoteMonitoring(req.payload.id);
        console.log(results);
       
        const response = await Promise.all(results.map(async (item) => {
            let obj;
            if(item.dataValues.doctor!=null){

            
            const pro = await axios.get(`http://localhost:8000/security/api/healthcareProfessional/${item.dataValues.doctor}`);
           obj=   {
                createdAt: item.dataValues.createdAt,
                device_type: item.dataValues.device_type,
                id: item.dataValues.id,
                value:item.dataValues.value,
                remark: item.dataValues.remark,
                healthcareProfessional:pro.data.firstName +" " + pro.data.lastName
                 
            };
        }else{
            obj=   {
                createdAt: item.dataValues.createdAt,
                device_type: item.dataValues.device_type,
                id: item.dataValues.id,
                value:item.dataValues.value,
            };
        }

        return obj;
    }));


        res.status(200).json(response);
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}

const getRemotePatientMonitoring = async ( req, res ) => {
    try {
        const { id } = req.params;
        const exams = await service.findPatientRemoteMonitoring(parseInt(id));
       
        const response = await Promise.all(exams.map(async (item) => {
            let obj;
            if(item.dataValues.doctor!=null){
            const pro = await axios.get(`http://localhost:3020/security/api/healthcareProfessional/${item.dataValues.doctor}`);
            
            obj=   {
                createdAt: item.dataValues.createdAt,
                device_type: item.dataValues.device_type,
                id: item.dataValues.id,
                value:item.dataValues.value,
                remark: item.dataValues.remark,
                healthcareProfessional:pro.data.firstName +" " + pro.data.lastName
                 
            };
        }else{
            obj=   {
                createdAt: item.dataValues.createdAt,
                device_type: item.dataValues.device_type,
                id: item.dataValues.id,
                value:item.dataValues.value,
            };
        }

        return obj;
    }));


        res.json(response);
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}


const updateRemark = async (req, res) => {
    try {
        const {dataID } = req.params;
        const id=req.payload.id
        const body = req.body;
        console.log(req.body);
        const response = await service.updateRemark(id,dataID,body);
        res.json(response);
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}

module.exports = {
    create, get, getById, update, _delete,getMyRemoteMonitoring,getRemotePatientMonitoring,
    updateRemark
};
