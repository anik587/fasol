import 'dotenv/config'
import {Sequelize} from 'sequelize';

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'mysql'
});

sequelize
  .authenticate()
  .then(() => {
    console.info('MysqlDB Connected Succesfully');
  }).catch((error) => {
    console.error(`MysqlDB Connection was faield: ${error.message}`);
    process.exit(-1);
  });

export default sequelize;