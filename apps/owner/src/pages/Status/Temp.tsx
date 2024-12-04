// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Avatar, BorderContainer, DetailButton } from '@daeng-ggu/design-system';
//
// import EmptyState from '@/pages/Status/EmptyState.tsx';
// import RequestContainer from '@/pages/Status/RequestContainer.tsx';
//
// interface Estimate {
//   estimateId: number;
//   designerId: number;
//   designerName: string;
//   designerImageUrl: string;
//   estimatePrice: number;
//   petId: number;
//   petName: string;
//   createdAt: string;
// }
//
// interface PendingPet {
//   petId: number;
//   petName: string;
//   petImgUrl: string;
//   desiredService?: string;
//   isVisitRequired: boolean;
//   lastGroomingDate?: string;
//   desiredDate1?: string;
//   desiredDate2?: string;
//   desiredDate3?: string;
//   desiredRegion?: string;
//   isMonitoringIncluded: boolean;
//   additionalRequest: string;
//   createdAt: string;
//   majorBreedCode: string;
//   estimateList: Estimate[];
//   customerName: string;
//   phone: string;
//   address: string;
//   subBreed: string;
//   birthDate: string;
//   gender: string;
//   isNeutered: boolean;
//   weight: number;
//   majorBreed: string;
//   specialNotes: string;
// }
//
// interface DesignerRequest {
//   requestId: number;
//   petId: number;
//   petName: string;
//   petImageUrl: string;
//   desiredServiceCode: string;
//   isVisitRequired: boolean;
//   createdAt: string;
// }
//
// interface ReservationRequest {
//   _placeholder?: never;
// }
//
// type Mode = 'user' | 'designer' | 'reservation';
//
// interface PendingRequestProps {
//   data: PendingPet[] | DesignerRequest[] | ReservationRequest[];
//   mode: Mode;
// }
//
// const PendingRequest = ({ data, mode }: PendingRequestProps) => {
//   const navigate = useNavigate();
//   const [activePetIndex, setActivePetIndex] = useState(0);
//
//   const formatDate = (dateString: string): string => {
//     const match = dateString.match(/-(\d{2})-(\d{2})/);
//     if (match) {
//       return `${match[1]}.${match[2]}.`;
//     }
//     return dateString;
//   };
//
//   const handleDetailPage = (data: any) => {
//     navigate('/bid/detail', { state: { data } });
//   };
//
//   const handlePetClick = (index: number) => {
//     setActivePetIndex(index);
//   };
//
//   const handleRequestDelete = (): void => {
//     console.log('closed');
//   };
//
//   const getDeliveryStatus = (majorBreedCode: string) => {
//     switch (majorBreedCode) {
//       case 'S':
//         return '라이트 딜리버리';
//       case 'M':
//         return '미디엄 딜리버리';
//       case 'L':
//         return '라지 딜리버리';
//       case 'X':
//         return '스페셜 딜리버리';
//       default:
//         return '알 수 없음';
//     }
//   };
//
//   // Determine if data is empty
//   const showEmptyState = data.length === 0;
//
//   // Empty state titles and actions based on mode
//   const emptyStateConfig = {
//     user: {
//       title: '아직 견적 요청 보낸것이 없어요!',
//       buttonText: '견적요청하러 가기',
//       onClick: () => navigate('/bid/request', { state: { from: '/bid' } }),
//     },
//     designer: {
//       title: '견적 요청이 없습니다.',
//       buttonText: '새로고침',
//       onClick: () => window.location.reload(),
//     },
//     reservation: {
//       title: '예약된 내용이 없습니다.',
//       buttonText: '새로고침',
//       onClick: () => window.location.reload(),
//     },
//   };
//
//   if (showEmptyState) {
//     const { title, buttonText, onClick } = emptyStateConfig[mode];
//     return <EmptyState title={title} buttonText={buttonText} onClick={onClick} />;
//   }
//
//   switch (mode) {
//     case 'designer':
//       // Designer Mode Rendering
//       return (
//         <div className='mx-auto flex flex-col items-center px-[20px]'>
//           {(data as DesignerRequest[]).map((request) => (
//             <div key={request.requestId} className='mb-6 w-full max-w-[300px]'>
//               <BorderContainer>
//                 <div className='p-4'>
//                   <div className='flex items-center pl-2'>
//                     <Avatar
//                       mode='designerCard'
//                       imageUrl={request.petImageUrl}
//                       name={request.petName}
//                       containerClassName='mr-4 h-[70px] w-[70px]'
//                     />
//                     <div className='flex flex-col'>
//                       <p className='text-gray-800'>{formatDate(request.createdAt)} 견적요청</p>
//                       <h3 className='text-sub_h3 font-semibold'>{request.petName || '이름 없음'}</h3>
//                       <p className='pb-2 text-iconCaption'>
//                         {request.desiredServiceCode}/{request.isVisitRequired ? '방문 필요' : '방문 불필요'}
//                       </p>
//                       <DetailButton text='상세보기' onClick={() => handleDetailPage(request)} />
//                     </div>
//                   </div>
//                 </div>
//               </BorderContainer>
//             </div>
//           ))}
//         </div>
//       );
//
//     case 'user':
//       const activePet = (data as PendingPet[])[activePetIndex];
//       const estimateEmptyStateTitle = '견적서 제안이 아직 없네요!';
//       const estimateEmptyStateButtonText = '새로고침하기';
//       const estimateEmptyStateOnClick = () => window.location.reload();
//
//       return (
//         <div className='mx-auto flex flex-col items-center px-[20px]'>
//           <div className='mx-[10px] mb-6 w-full'>
//             <div>
//               <div className='flex space-x-4 overflow-x-auto'>
//                 {(data as PendingPet[]).map((pet, index) => (
//                   <Avatar
//                     key={pet.petId}
//                     imageUrl={pet.petImgUrl}
//                     name={pet.petName || '이름 없음'}
//                     mode='avatar'
//                     isActive={activePetIndex === index}
//                     onClick={() => handlePetClick(index)}
//                   />
//                 ))}
//                 <Avatar
//                   key='request-avatar'
//                   mode='request'
//                   onClick={() => navigate('/bid/request', { state: { from: '/bid' } })}
//                 />
//               </div>
//             </div>
//           </div>
//
//           <div className='w-full max-w-[300px]'>
//             <div className='mb-6'>
//               <RequestContainer
//                 handleRequestDelete={handleRequestDelete}
//                 titleText='견적 요청중'
//                 mode='request'
//                 imageUrl={activePet.petImgUrl}
//               >
//                 <p className='text-gray-800'>{formatDate(activePet.createdAt)} 견적요청</p>
//                 <h3 className='text-sub_h3 font-semibold'>{activePet.petName || '이름 없음'}</h3>
//                 <p className='pb-2 text-iconCaption'>
//                   <span className='mr-1 rounded-[4px] border border-primary px-2 py-[0.8px] text-primary'>서비스</span>
//                   {activePet.desiredService ||
//                     '알 수 없음'}/{getDeliveryStatus(activePet.majorBreedCode)}
//                 </p>
//                 <DetailButton text='상세보기' onClick={() => handleDetailPage(activePet)} />
//               </RequestContainer>
//             </div>
//
//             {activePet.estimateList && activePet.estimateList.length > 0 ? (
//               <div className='h-full w-full'>
//                 <BorderContainer>
//                   <ul className='w-full bg-secondary'>
//                     {activePet.estimateList.map((estimate, index) => (
//                       <li key={estimate.estimateId} className='relative'>
//                         <div
//                           className={`mx-auto flex min-h-[90px] rounded-[8px] bg-white ${
//                             index !== activePet.estimateList.length - 1 ? 'mb-4' : ''
//                           }`}
//                         >
//                           <div className='mx-auto flex min-w-[240px] items-center bg-white p-4'>
//                             <Avatar
//                               mode='designerCard'
//                               imageUrl={estimate.designerImageUrl}
//                               name={estimate.designerName}
//                               containerClassName='mr-4 h-[70px] w-[70px]'
//                             />
//                             <div>
//                               <p className='text-gray-800'>{formatDate(estimate.createdAt)} 견적요청</p>
//                               <p className='text-sub_h3 font-semibold'>
//                                 {estimate.designerName || '이름 없는 디자이너'}
//                               </p>
//                               <p className='text-sub_h2 font-bold'>{estimate.estimatePrice.toLocaleString()}원</p>
//                               <p className='pb-1 text-sub_h3 font-bold'>미용고객: {activePet.petName}</p>
//                               <DetailButton text='상세보기' onClick={() => handleDetailPage(estimate)} />
//                             </div>
//                           </div>
//                         </div>
//                       </li>
//                     ))}
//                   </ul>
//                 </BorderContainer>
//               </div>
//             ) : (
//               <EmptyState
//                 title={estimateEmptyStateTitle}
//                 buttonText={estimateEmptyStateButtonText}
//                 onClick={estimateEmptyStateOnClick}
//               />
//             )}
//           </div>
//         </div>
//       );
//
//     case 'reservation':
//       // 예약관련 컴포넌트?
//       return (
//         <div className='mx-auto flex flex-col items-center px-[20px]'>
//           <h2 className='text-sub_h2 font-bold'>예약 기능은 아직 구현되지 않았습니다.</h2>
//           <EmptyState title='예약된 내용이 없습니다.' buttonText='새로고침' onClick={() => window.location.reload()} />
//         </div>
//       );
//
//     default:
//       return null;
//   }
// };
//
// export default PendingRequest;

//
// import { useNavigate } from 'react-router-dom';
// import { BorderContainer } from '@daeng-ggu/design-system';
//
// import EmptyState from '@/pages/Status/EmptyState.tsx';
//
// interface Request {
//   requestId: number;
//   petId: number;
//   petName: string;
//   petImgUrl: string;
//   desiredService: string;
//   isVisitRequired: boolean;
//   createdAt: string;
//   codeName: string;
//   majorBreedCode: string; // Added this line
// }
//
// interface CompletedData {
//   requestList: Request[];
// }
//
// interface CompletedRequestProps {
//   data: CompletedData;
// }
//
// const CompletedRequest = ({ data }: CompletedRequestProps) => {
//   const navigate = useNavigate();
//
//   const getDeliveryStatus = (majorBreedCode: string) => {
//     switch (majorBreedCode) {
//       case 'S':
//         return '라이트 딜리버리';
//       case 'M':
//         return '미디엄 딜리버리';
//       case 'L':
//         return '라지 딜리버리';
//       case 'X':
//         return '스페셜 딜리버리';
//       default:
//         return '알 수 없음';
//     }
//   };
//   const formatDate = (dateString: string): string => {
//     const match = dateString.match(/-(\d{2})-(\d{2})/);
//     if (match) {
//       return `${match[1]}.${match[2]}.`;
//     }
//     return dateString;
//   };
//
//   return (
//     <div className='mx-auto mb-[100px] flex max-w-[300px] flex-col items-center pt-10'>
//       {data.requestList.length > 0 ? (
//         <div className='w-full'>
//           <BorderContainer>
//             <ul className='w-full bg-secondary'>
//               {data.requestList.map((request, index) => (
//                 <li key={request.requestId} className='relative'>
//                   <div
//                     className={`mx-auto flex rounded-[8px] bg-white ${
//                       index !== data.requestList.length - 1 ? 'mb-4' : ''
//                     }`}
//                   >
//                     <div>
//                       <div className='ml-6 pt-4'>
//                         <p className='text-sub_h2 font-bold text-gray-300'>
//                           {request.codeName === 'FAILED' ? '요청실패' : '견적완료'}
//                         </p>
//                       </div>
//                       {/*<button onClick={() => handleRemoveRequest()} className='absolute right-4 top-4'>*/}
//                       {/*  <CloseIcon className='h-6 w-6 cursor-pointer text-gray-500 hover:text-gray-700' />*/}
//                       {/*</button>*/}
//
//                       <div className='flex min-w-[240px] items-center justify-center rounded-[8px] bg-white pb-10 pl-10 pt-4'>
//                         <img
//                           src={request.petImgUrl}
//                           alt={request.petName || '펫 이미지'}
//                           className='mr-10 h-[50px] w-[50px] rounded-full'
//                         />
//                         <div>
//                           <p>{formatDate(request.createdAt)} 견적요청</p>
//                           <h3 className='text-xl font-semibold'>{request.petName || '이름 없는 펫'}</h3>
//                           <p className='text-iconCaption'>
//                             <span className='mr-1 rounded-[4px] border border-primary px-2 py-[0.8px] text-primary'>
//                               서비스
//                             </span>
//                             {request.desiredService || '알 수 없음'}/{getDeliveryStatus(request.majorBreedCode)}
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           </BorderContainer>
//         </div>
//       ) : (
//         <EmptyState
//           title='첫 견적서 요청을 해보세요!'
//           buttonText='견적서 요청하기'
//           onClick={() => navigate('/test/request', { state: { from: '/test' } })}
//         />
//       )}
//     </div>
//   );
// };
//
// export default CompletedRequest;
//
