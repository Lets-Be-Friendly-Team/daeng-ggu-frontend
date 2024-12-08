import { useState } from 'react';
import { ArrowDown, ArrowUp } from '@daeng-ggu/design-system';
import MiniButton from '@daeng-ggu/design-system/components/Buttons/MiniButton';
import BulbIcon from '@daeng-ggu/design-system/components/Icons/BulbIcon';
import ScissorIcon from '@daeng-ggu/design-system/components/Icons/ScissorIcon';

interface IReservation {
  reservationId: number;
  petName: string;
  reservationType: string;
  isFinished: boolean;
  isCanceled: boolean;
  reservationDate: string;
  startTime: string;
  groomingFee: number;
  deliveryFee: number;
  monitoringFee: number;
  totalPayment: number;
  estimateDetail: string;
  requestDetail: {
    desiredService: string;
    lastGroomingDate: string;
    isDelivery: boolean;
    isMonitoring: boolean;
    additionalRequest: string;
  };
}

interface ICompletedHistoryProps {
  completedGroomingList: IReservation[];
}

const CompletedServices = ({ completedGroomingList }: ICompletedHistoryProps) => {
  const [expandedReservations, setExpandedReservations] = useState<{ [key: number]: boolean }>({});
  const toggleDetails = (id: number) => {
    setExpandedReservations((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  return (
    <div className='flex flex-col gap-6 px-5 py-5'>
      {completedGroomingList.map((reservation) => (
        <>
          <div className='flex items-center justify-between'>
            <div className='text-sub_h2 text-gray-800'>
              {reservation.reservationDate} | {reservation.startTime || '오후 1:00'}
            </div>
            <div className='flex gap-2'>
              <MiniButton text='미용 완료' />
            </div>
          </div>
          <div key={reservation.reservationId} className='rounded-md bg-secondary p-5 shadow-sm'>
            <div className='mt-4 rounded-md bg-white p-4 text-caption'>
              <div className='flex gap-2'>
                <div className='flex items-center justify-center'>
                  <BulbIcon className={'h-[10px] w-[10px]'} />
                </div>
                <div className='text-gray-600'>미용 고객:</div>
                <div className='text-gray-800'>
                  {reservation.petName}({reservation.reservationType || '강아지'})
                </div>
              </div>
              <div className='flex gap-2'>
                <div className='flex items-center justify-center'>
                  <ScissorIcon className={'h-[10px] w-[10px]'} />
                </div>
                <div className='text-gray-600'>서비스 스타일:</div>
                <div className='text-gray-800'>{reservation.requestDetail.desiredService || '전체 미용'}</div>
              </div>
            </div>
            <div className='mt-4 rounded-md bg-white p-4 text-caption'>
              <div className='flex justify-end gap-1'>
                <div className='text-gray-700'>총 결제 금액:</div>
                <div className='text-primary'>{reservation.totalPayment.toLocaleString()}원</div>
              </div>
            </div>

            {expandedReservations[reservation.reservationId] && (
              <>
                <div className='mt-4 rounded-md bg-white p-4'>
                  <div className='text-sub_h2 text-gray-800'>요청 상세</div>
                  <div className='mt-3 flex flex-col gap-4 text-caption text-gray-800'>
                    <div className='flex flex-col'>
                      <div className='text-gray-600'>원하는 서비스가 무엇인가요?</div>
                      <div className='text-body3'>{reservation.requestDetail.desiredService || '미용'}</div>
                    </div>
                    <div className='flex flex-col'>
                      <div className='text-gray-600'>마지막 미용 시기가 언제인가요? </div>
                      <div>{reservation.requestDetail.lastGroomingDate || '첫 미용'}</div>
                    </div>
                    <div className='flex flex-col'>
                      <div className='text-gray-600'>어떻게 진행하기를 원하시나요?</div>
                      <div>{reservation.requestDetail.isDelivery ? '집 (출장 서비스)' : '없음'}</div>
                    </div>
                    <div className='flex flex-col'>
                      <div className='text-gray-600'>추가 요청사항이 있나요?</div>
                      <div>{reservation.requestDetail.additionalRequest}</div>
                    </div>
                  </div>
                </div>
                <div className='mt-4 rounded-md bg-white p-4'>
                  <div className='text-caption text-gray-700'>
                    <div className='flex justify-between'>
                      <span>미용비</span>
                      <span>{reservation.groomingFee.toLocaleString()}원</span>
                    </div>
                    <div className='flex justify-between'>
                      <span>모니터링 비용</span>
                      <span>{reservation.monitoringFee.toLocaleString()}원</span>
                    </div>
                    <div className='flex justify-between border-b pb-1'>
                      <span>댕동비</span>
                      <span>{reservation.deliveryFee.toLocaleString()}원</span>
                    </div>
                    <div className='flex justify-between pt-1'>
                      <span>결제 금액</span>
                      <span className='text-primary'>{reservation.totalPayment.toLocaleString()}원</span>
                    </div>
                  </div>
                </div>
              </>
            )}

            <div
              className='flex justify-center gap-1 pt-3 hover:cursor-pointer'
              onClick={() => toggleDetails(reservation.reservationId)}
            >
              <div className='text-center text-caption text-gray-700'>상세 정보</div>
              <div className='flex items-center justify-center'>
                {expandedReservations[reservation.reservationId] ? (
                  <ArrowUp className={'h-[10px] w-[10px]'} />
                ) : (
                  <ArrowDown className={'h-[10px] w-[10px]'} />
                )}
              </div>
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

export default CompletedServices;
