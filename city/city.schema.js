import {Sequelize, DataTypes} from 'sequelize';
import sequelize from '../connector/mysql.connection.js';

const City = sequelize.define('cities_table', {
    uuid: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    population: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    latitude: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    longitude: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    allied_cities: {
      type: Sequelize.STRING
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    }
}, { timestamps: true });
//citySchema.belongsTo(citySchema, { foreignKey: 'uuid', as: 'city_alias', targetKey: 'uuid' });
export default City;


