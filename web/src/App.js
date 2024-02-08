import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const MyComponent = () => {
  const [formData, setFormData] = useState({
    name: '',
    population: '',
    latitude: '',
    longitude: '',
    allied_cities: '',
    power: ''
  });

  const [fetchedData, setFetchedData] = useState([]);

  // Function to handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

    // Function to handle form submission
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        // Example of POST request
        const formDataWithoutEmptyValues = Object.fromEntries(
          Object.entries(formData).filter(([_, value]) => value !== '')
        );
        const response = await axios.post('http://localhost:3000/city', formDataWithoutEmptyValues);
        console.log('POST response:', response.data);
        // Assuming successful POST, clear form data
        setFormData({
          uuid: undefined,
          name: '',
          population: '',
          latitude: '',
          longitude: '',
          allied_cities: '',
          power: ''
        });
        // Refetch data after successful submission
        fetchData();
      } catch (error) {
        console.error('Error occurred during POST:', error);
      }
    };

  // Function to handle data update
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const formDataWithoutEmptyValues = Object.fromEntries(
        Object.entries(formData).filter(([_, value]) => value !== '')
      );
      console.log(formDataWithoutEmptyValues)
      const response = await axios.patch(`http://localhost:3000/city/${formData.uuid}`, formDataWithoutEmptyValues);
      console.log('PATCH response:', response.data);
      // Assuming successful PATCH, clear form data
      setFormData({
        uuid: undefined,
        name: '',
        population: '',
        latitude: '',
        longitude: '',
        allied_cities: '',
        power: ''
      });
 
     fetchData();
    } catch (error) {
      console.error('Error occurred during PATCH:', error);
    }
  };


  // Function to fetch data
  const fetchData = async () => {
    try {
      // Example of GET request
      const response = await axios.get('http://localhost:3000/city');
      console.log('GET response:', response.data);
      setFetchedData(response.data.data);
    } catch (error) {
      console.error('Error occurred during GET:', error);
    }
  };

  // Function to populate form data for editing
  const handleEdit = (data) => {
    setFormData({
      uuid: data.uuid,
      name: data.name,
      population: data.population,
      latitude: data.latitude,
      longitude: data.longitude,
      allied_cities: data.allied_cities,
      power: data.power
    });
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="top-div">
    <form onSubmit={formData.uuid ? handleUpdate : handleSubmit} className="form">
        <div className="form-group">
            <label htmlFor="name" className="label">Name:</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} className="input" placeholder="Enter city name" />
        </div>
        <div className="form-group">
            <label htmlFor="population" className="label">Population:</label>
            <input type="text" id="population" name="population" value={formData.population} onChange={handleInputChange} className="input" placeholder="Enter population" />
        </div>
        <div className="form-group">
            <label htmlFor="latitude" className="label">Latitude:</label>
            <input type="text" id="latitude" name="latitude" value={formData.latitude} onChange={handleInputChange} className="input" placeholder="Enter latitude" />
        </div>
        <div className="form-group">
            <label htmlFor="longitude" className="label">Longitude:</label>
            <input type="text" id="longitude" name="longitude" value={formData.longitude} onChange={handleInputChange} className="input" placeholder="Enter longitude" />
        </div>
        <div className="form-group">
            <label htmlFor="allied_cities" className="label">Allied Cities:</label>
            <input type="text" id="allied_cities" name="allied_cities" value={formData.allied_cities} onChange={handleInputChange} className="input" placeholder="Enter allied cities" />
        </div>
        <button type="submit" className="submit-button">Submit</button>
    </form>


    <h2>Fetched Data</h2>
    <table className="table-container">
        <thead>
            <tr>
                <th>UUID</th>
                <th>NAME</th>
                <th>POPULAR</th>
                <th>LATITUDE</th>
                <th>LONGITUDE</th>
                <th>ALLIED CITIES</th>
                <th>POWER</th>
                {/* Add more columns as needed */}
                <th>EDIT</th>
            </tr>
        </thead>
        <tbody>
            {fetchedData.map((item, index) => (
            <tr key={index}>
                <td>{item.uuid}</td>
                <td>{item.name}</td>
                <td>{item.population}</td>
                <td>{item.latitude}</td>
                <td>{item.longitude}</td>
                <td>{item.allied_cities}</td>
                <td>{item.power}</td>
                {/* Add more columns as needed */}
                <td>
                    <button onClick={()=> handleEdit(item)}>Edit</button>
                </td>
            </tr>
            ))}
        </tbody>
    </table>
</div>
  );
};

export default MyComponent;
