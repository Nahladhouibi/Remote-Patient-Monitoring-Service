const { Model, DataTypes, Sequelize } = require('sequelize');

const HealthData_TABLE = 'healths';

class HealtData extends Model {
    static config(sequelize) {
        return {
            sequelize,
            tableName: HealthData_TABLE,
            modelName: 'HealthData',
            timestamps: true
        }
    }
}

const HealthDataSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    patientID: {
        type: DataTypes.STRING,  
        allowNull: false,
        field: 'patientID'
    },
    device_type: {
        allowNull: false,
        type: DataTypes.STRING, 
        field: 'device_type'
    }, 
    value: {
        allowNull: false,
        type: DataTypes.STRING,
        field: 'value'
    },
     
    doctor: {
        allowNull: true,
        type: DataTypes.INTEGER,
        field: 'doctor'
    },
    remark: {
        allowNull: true,
        type: DataTypes.STRING,
        field: 'remark'
    },
     
}

module.exports = { HealtData, HealthDataSchema }; 