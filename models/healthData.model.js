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
    device_type: {
        allowNull: false,
        type: DataTypes.STRING,
        field: 'device_type'
    },
    data: {
        allowNull: false,
        type: DataTypes.STRING,
        field: 'data'
    }
     
}

module.exports = { HealtData, HealthDataSchema }; 