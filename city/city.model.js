import { v4 as uuidv4 } from 'uuid';
import moment from 'moment-timezone';
import { Sequelize } from 'sequelize';
import { getDistance } from 'geolib';

import sequelize from '../connector/mysql.connection.js';
import City from './city.schema.js';

const timeZone = 'Asia/Dhaka';
const currentDate = moment().tz(timeZone).toDate();

export const fetchAllCities = async () => {
        try {
            let response = await City.findAll();
            response = response.map(city => city.toJSON());
            for (const city of response) {
                let alliedPower = 0;
                const allies = city.allied_cities.split(',');
                for (const ally of allies) {
                    const foundRecord = await City.findOne({
                        where: {
                            uuid: ally,
                        },
                    });
                    if (foundRecord) {
                        const distance = getDistance(
                            { latitude: city.latitude, longitude: city.longitude },
                            { latitude: foundRecord.latitude, longitude: foundRecord.longitude },
                            1
                        );
                        if (distance <= 1000) {
                            alliedPower += Math.round(0.5 * foundRecord.population);
                        } else if (distance <= 10000) {
                            alliedPower += Math.round(0.25 * foundRecord.population);
                        }
                    }
                }
                city['power'] = city.population + alliedPower;
                console.log(city.power);
            }

            return {
                'status': 200,
                'message': 'Success',
                'data': response
            }
        } catch (error) {
            console.log(error)
            throw new Error;
        } 
}

export const saveCity = async (data) => {
        try {
            const uuid = uuidv4()
            let schemaData = {
                'uuid' : uuid,
                'name' : data.name,
                'population' : data.population,
                'latitude' : data.latitude,
                'longitude' : data.longitude,
                'allied_cities': ''
            }    
            if (data?.allied_cities) {
                const alliedCity = await City.findByPk(data.allied_cities);
                if (!alliedCity) {
                    return {
                        'status': 403,
                        'message': 'Failed',
                        'data': 'Allied City Not Found'                    
                    }
                }
                const [addNew] = await City.update(
                    { allied_cities: Sequelize.literal(`CONCAT(COALESCE(allied_cities,''), '${uuid},')`) },
                    { where: { uuid: data.allied_cities } }
                );
                schemaData = {...schemaData, 'allied_cities' : `${data.allied_cities},`};
            }
            
            const response = await City.create(schemaData, { timestamp: currentDate });
            return {
                'status': 200,
                'message': 'Success',
                'data': response
            }
        } catch (error) {
            console.log(error)
            throw new Error;
        } 
}

export const updateCity = async (data, uuid) => {
        try {
            const t = await sequelize.transaction();
            let response = await City.findOne({ where: { 'uuid': uuid } });
            if (!response) {
                return {
                    'status': 403,
                    'message': 'Failed',
                    'data': 'City Not Found'                    
                }
            }
            let schemaData = {
                'name' : data?.name,
                'population' : data?.population,
                'latitude' : data?.latitude,
                'longitude' : data?.longitude
            }  

            if (data?.allied_cities) {
                const alliedCity = await City.findByPk(data.allied_cities);
                if (!alliedCity) {
                        return {
                            'status': 403,
                            'message': 'Failed',
                            'data': 'Allied City Not Found'  
                        }
                    }
                    const [removeExisting] = await City.update(
                        { allied_cities: Sequelize.fn('REPLACE', Sequelize.col('allied_cities'), `${data.allied_cities},`, '') },
                        { where: { allied_cities: { [Sequelize.Op.like]: `%${data.allied_cities},%` } } }
                    );
                    const [addNew] = await City.update(
                        { allied_cities: Sequelize.literal(`CONCAT(COALESCE(allied_cities,''), '${uuid},')`) },
                        { where: { uuid: data.allied_cities } }
                    );
                    schemaData = {...schemaData, 'allied_cities' : data.allied_cities};
            }
           
            const affectedRows = await City.update(
                schemaData,
                {
                  where: { 'uuid': `${uuid}` },
                }
            );

            await t.commit();
            return {
                'status': 200,
                'message': 'Success',
                'data': affectedRows
            }
        } catch (error) {
            console.log(error)
            throw new Error;
        } 
}
