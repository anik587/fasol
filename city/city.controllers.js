import * as model from './city.model.js';
import { resSend } from '../utils/index.js';

export const fetchAllCities = async(req, res) => {
    try {
        const response = await model.fetchAllCities();

        if(response) 
            return resSend(response.status, response.message, response.data, req, res);

        return resSend(500, 'Something Went Wrong', [], req, res);
    } catch (error) {
        console.log(error)
        return resSend(500, 'Internal Server Error', [], req, res);
    }
}

export const saveCity = async(req, res) => {
    try {
        const data = req.body;
        const response = await model.saveCity(data);

        if(response) 
            return resSend(response.status, response.message, response.data, req, res);

        return resSend(500, 'Something Went Wrong', [], req, res);
    } catch (error) {
        return resSend(500, 'Internal Server Error', [], req, res);
    }
}

export const updateCity = async(req, res) => {
    try {
        const data = req?.body;
        const uuid = req?.params?.uuid;
        const response = await model.updateCity(data, uuid);
        if(response) 
            return resSend(response.status, response.message, response.data, req, res);

        return resSend(500, 'Something Went Wrong', [], req, res);
    } catch (error) {
        return resSend(500, 'Internal Server Error', [], req, res);
    }
}