import axios from 'axios';
import { BASE_URL } from '../brandUrl';
import { InputValues } from '../pages/MainPage';

export const getPredict = async (values: InputValues) => {
    const response = await axios.get(`${BASE_URL}/api/predict`, { params: values });
    return response.data;
};

const getMpgFromLpk = async (lpk: number) => {
    const kmpm = 0.000621371;
    const lpg = 0.264172;
};
