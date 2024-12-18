import { AlarmType } from '../../types/alarm';
import { DefaultResponse } from '../../types/api';
import { APIClient } from '../APIClient';

const getAlarms = async (): Promise<DefaultResponse<AlarmType>> => {
  return await APIClient.get('/daengggu/alarm');
};

export default getAlarms;
