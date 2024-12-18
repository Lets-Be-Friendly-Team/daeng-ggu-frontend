import { useQuery } from '@tanstack/react-query';
import getAlarms from 'src/apis/alarm/getAlarms';
import { ALARM_QUERY_KEYS } from 'src/constants/queryKeys';
import { AlarmType } from 'src/types/alarm';
import { DefaultResponse } from 'src/types/api';

const useGetAlarms = () => {
  return useQuery<DefaultResponse<AlarmType>>({
    queryKey: ALARM_QUERY_KEYS.GET_ALARMS,
    queryFn: async () => await getAlarms(),
  });
};

export default useGetAlarms;
