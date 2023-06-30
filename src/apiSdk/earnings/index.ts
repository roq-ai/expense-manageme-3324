import axios from 'axios';
import queryString from 'query-string';
import { EarningInterface, EarningGetQueryInterface } from 'interfaces/earning';
import { GetQueryInterface } from '../../interfaces';

export const getEarnings = async (query?: EarningGetQueryInterface) => {
  const response = await axios.get(`/api/earnings${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createEarning = async (earning: EarningInterface) => {
  const response = await axios.post('/api/earnings', earning);
  return response.data;
};

export const updateEarningById = async (id: string, earning: EarningInterface) => {
  const response = await axios.put(`/api/earnings/${id}`, earning);
  return response.data;
};

export const getEarningById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/earnings/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteEarningById = async (id: string) => {
  const response = await axios.delete(`/api/earnings/${id}`);
  return response.data;
};
