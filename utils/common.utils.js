export const resSend = (
    status,
    message,
    data,
    req,
    res
  ) => {
    console.log(`${req.method} -- ${req.originalUrl} -- ${status}`);
    res.status(status);
    return res.send({
        message: message,
        data: data
    });
  };

const calculateAlliedPower = async(city)=> {
  let alliedPower = city.population;

  city.allied_cities.forEach(async (ally)=> {
	const foundRecord = await city.findOne({
	  where: {
		uuid: ally.uuid,
	  },
	});
  // For simplicity, let's assume each city has 'latitude' and 'longitude' properties
  const distance = geolib.getDistance(
    { latitude: city.latitude, longitude: city.longitude },
    { latitude: ally.latitude, longitude: ally.longitude },
      1);
    
    if (distance <= 1000) {
      alliedPower += Math.round(0.5 * ally.population);
    } else if (distance <= 10000) {
      alliedPower += Math.round(0.25 * ally.population);
    }
    // If the distance is more than 10000km, the ally provides no power
  });

  return alliedPower;
}