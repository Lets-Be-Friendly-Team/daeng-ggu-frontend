import { useMutation } from '@tanstack/react-query';

import postStartDeliveryToShop from '@/apis/monitoring/postStartDeliveryToShop';
import useCreateBroadcastChannel from '@/hooks/queries/useCreateBroadcastChannel';

const usePostStartDeliveryToShop = (reservationId: string) => {
  const { mutate: createBroadcastChannelMutate } = useCreateBroadcastChannel(reservationId);

  return useMutation({
    mutationFn: async () => {
      return await postStartDeliveryToShop(reservationId);
    },
    onSuccess: () => {
      createBroadcastChannelMutate();
    },
  });
};

export default usePostStartDeliveryToShop;
