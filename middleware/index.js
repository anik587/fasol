
import {resSend, cityCreateValidator, cityUpdateValidator} from '../utils/index.js';
export const cityCreate = async (req, res, next) => {
	const payload = {
		name: req.body.name,
		population: req.body.population,
		latitude: req.body.latitude,
		longitude: req.body.longitude,
		allied_cities: req.body.allied_cities
	};

	const { error } = cityCreateValidator.validate(payload);
	if (error) {
		resSend(403, error.message, [], req, res);
	} else {
		next();
	}
};

export const cityUpdate = async (req, res, next) => {
	const payload = {
		name: req.body?.name,
		population: req.body?.population,
		latitude: req.body?.latitude,
		longitude: req.body?.longitude,
		allied_cities: req.body?.allied_cities
	};

	const { error } = cityUpdateValidator.validate(payload);
	if (error) {
		resSend(403, error.message, [], req, res);
	} else {
		next();
	}
};