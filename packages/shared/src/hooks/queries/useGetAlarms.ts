import { useQuery } from '@tanstack/react-query';

import getAlarms from '../../apis/alarm/getAlarms';
import { ALARM_QUERY_KEYS } from '../../constants/queryKeys';
import { AlarmType } from '../../types/alarm';
import { DefaultResponse } from '../../types/api';

const useGetAlarms = () => {
  return useQuery<DefaultResponse<AlarmType>>({
    queryKey: ALARM_QUERY_KEYS.GET_ALARMS,
    queryFn: async () => await getAlarms(),
  });
};

export default useGetAlarms;
