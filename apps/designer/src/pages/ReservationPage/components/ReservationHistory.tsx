import { Fragment, useState } from 'react';
import { ArrowDown, ArrowUp, UserProfileImage } from '@daeng-ggu/design-system';
import MiniButton from '@daeng-ggu/design-system/components/Buttons/MiniButton';
import BulbIcon from '@daeng-ggu/design-system/components/Icons/BulbIcon';
import ScissorIcon from '@daeng-ggu/design-system/components/Icons/ScissorIcon';
import { extractKorean } from '@daeng-ggu/shared';

import { Reservation } from '@/apis/reservation/getReservation';
import ReservationStartButton from '@/pages/ReservationPage/components/ReservationStartButton';
import { isTodayOrPast } from '@/utils/isTodayOrPast';

interface ReservationHistoryProps {
  reservationList: Reservation[] | undefined;
}

const ReservationHistory = ({ reservationList }: ReservationHistoryProps) => {
  const [expandedReservations, setExpandedReservations] = useState<{ [key: number]: boolean }>({});
  const toggleDetails = (id: number) => {
    setExpandedReservations((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className='flex flex-col gap-6 px-5 py-5'>
      {reservationList?.map((reservation) => (
        <Fragment key={reservation.reservationId}>
          <div className='flex items-center justify-between'>
            <div className='flex gap-3'>
              <div>
                <UserProfileImage size='small' />
              </div>
              <div className='flex flex-col justify-center gap-2'>
                <div className='text-black text-caption'>{reservation.customerNickname}</div>
                <div className='text-gray-300 text-iconCaption'>
                  {reservation.reservationDate.slice(2)} {reservation.dayOfWeek[0]} | {reservation.amPm}{' '}
                  {reservation.startTime}시
                </div>
              </div>
            </div>
            <div className='flex gap-2'>
              {!isTodayOrPast(reservation.reservationDate) && !reservation.isCanceled && (
                <MiniButton text='예약 취소' />
              )}
              {isTodayOrPast(reservation.reservationDate) && (
                <ReservationStartButton reservationId={reservation.reservationId} isProcess={reservation.isProcess} />
              )}
              {reservation.isCanceled && <span className='text-red-600 font-semibold text-body3'>예약 취소됨</span>}
            </div>
          </div>
          <div key={reservation.reservationId} className='rounded-md bg-secondary p-5 shadow-sm'>
            <div className='rounded-md bg-white p-4 text-caption flex flex-col gap-2'>
              <div className='flex gap-2'>
                <div className='flex items-center justify-center'>
                  <BulbIcon className={'h-[10px] w-[10px]'} />
                </div>
                <div className='text-gray-600'>미용 고객:</div>
                <div className='text-gray-800'>
                  {reservation.petName} ({extractKorean(reservation.subBreed)})
                </div>
              </div>
              <div className='flex gap-2'>
                <div className='flex items-center justify-center'>
                  <ScissorIcon className={'h-[10px] w-[10px]'} />
                </div>
                <div className='text-gray-600'>서비스 스타일:</div>
                <div className='text-gray-800'>{reservation.requestDetail?.desiredService}</div>
              </div>
            </div>
            <div className='mt-4 rounded-md bg-white p-4 text-caption'>
              <div className='flex justify-end gap-1'>
                <div className='text-gray-700'>총 결제 금액:</div>
                <div className='text-primary'>{reservation.totalPayment?.toLocaleString()}원</div>
              </div>
            </div>

            {expandedReservations[reservation.reservationId] && (
              <>
                <div className='mt-4 rounded-md bg-white p-4'>
                  <div className='text-sub_h2 text-gray-800'>요청 상세</div>
                  <div className='mt-3 flex flex-col gap-5 text-caption text-gray-800'>
                    <div className='flex flex-col gap-2'>
                      <div className='text-gray-600'>원하는 서비스가 무엇인가요?</div>
                      <div className='text-body3'>{reservation.requestDetail?.desiredService || '미용'}</div>
                    </div>
                    <div className='flex flex-col gap-2'>
                      <div className='text-gray-600'>마지막 미용 시기가 언제인가요? </div>
                      <div>{reservation.requestDetail?.lastGroomingDate || '첫 미용'}</div>
                    </div>
                    <div className='flex flex-col gap-2'>
                      <div className='text-gray-600'>댕동 서비스를 원하시나요?</div>
                      <div>{reservation.requestDetail?.isDelivery ? '네' : '아니오'}</div>
                    </div>
                    <div className='flex flex-col gap-2'>
                      <div className='text-gray-600'>추가 요청사항이 있나요?</div>
                      <div>{reservation.requestDetail?.additionalRequest}</div>
                    </div>
                  </div>
                </div>
                <div className='mt-4 rounded-md bg-white p-4'>
                  <div className='text-caption text-gray-700 flex flex-col gap-2'>
                    <div className='flex justify-between'>
                      <span>미용비 (수수료 포함)</span>
                      <span>{(reservation.groomingFee ?? 0).toLocaleString()}원</span>
                    </div>
                    <div className='flex justify-between'>
                      <span>모니터링 비용</span>
                      <span>{(reservation.monitoringFee ?? 0).toLocaleString()}원</span>
                    </div>
                    <div className='flex justify-between border-b pb-2'>
                      <span>댕동비</span>
                      <span>{(reservation.deliveryFee ?? 0).toLocaleString()}원</span>
                    </div>
                    <div className='flex justify-between pt-1'>
                      <span>결제 금액</span>
                      <span className='text-primary'>{(reservation.totalPayment ?? 0).toLocaleString()}원</span>
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
        </Fragment>
      ))}
    </div>
  );
};

export default ReservationHistory;
