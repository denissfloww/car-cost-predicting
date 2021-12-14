import axios from 'axios';
import { BASE_URL } from '../brandUrl';

export const getBrands = async () => {
    const response = await axios.get(`${BASE_URL}/api/brands`);
    return response.data;
};

export const getModels = async () => {
    const response = await axios.get(`${BASE_URL}/api/models`);
    return response.data;
};

export const getTransmissions = async () => {
    const response = await axios.get(`${BASE_URL}/api/transmissions`);
    return response.data;
};

export const getFuelTypes = async () => {
    const response = await axios.get(`${BASE_URL}/api/fuelTypes`);
    return response.data;
};
