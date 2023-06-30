import axios from 'axios';
import queryString from 'query-string';
import { ExpenditureInterface, ExpenditureGetQueryInterface } from 'interfaces/expenditure';
import { GetQueryInterface } from '../../interfaces';

export const getExpenditures = async (query?: ExpenditureGetQueryInterface) => {
  const response = await axios.get(`/api/expenditures${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createExpenditure = async (expenditure: ExpenditureInterface) => {
  const response = await axios.post('/api/expenditures', expenditure);
  return response.data;
};

export const updateExpenditureById = async (id: string, expenditure: ExpenditureInterface) => {
  const response = await axios.put(`/api/expenditures/${id}`, expenditure);
  return response.data;
};

export const getExpenditureById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/expenditures/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteExpenditureById = async (id: string) => {
  const response = await axios.delete(`/api/expenditures/${id}`);
  return response.data;
};
