import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Header, CategoryTab } from '@daeng-ggu/design-system';
import CompletedRequest from '@/pages/Status/CompletedRequest';
import PendingRequest from '@/pages/Status/PendingRequest';

interface LocationState {
  from?: string;
}

const Status: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState | undefined;

  useEffect(() => {
    const previousPath = state?.from || '';

    if (previousPath !== '/test') {
      alert(`ㄴㄴ ${previousPath || 'unknown'}`);
      setTimeout(() => navigate('/', { replace: true }), 0);
    }
  }, [state, navigate]);

  const dummyData =
    {
      "petId": 0,
      "desiredService": "",
      "isVisitRequired": false,
      "createdAt": "2024-11-28T00:00:00",
      "petList": [
        {
          "petId": 0,
          "petName": "",
          "petImgUrl": ""
        }
      ],
      "estimateList": [
        {
          "estimateId": 0,
          "designerId": 0,
          "designerName": "",
          "designerImageUrl": "",
          "estimatePrice": 0,
          "petId": 0,
          "petName": "",
          "createdAt": "2024-11-28T00:00:00"
        }
      ]
    }

  const tabs = [
    {
      label: '견적서받는 중',
      content: <PendingRequest />,
    },
    {
      label: '이전견적 조회',
      content: <CompletedRequest />,
    },
  ];

  return (
    <div className='h-full max-w-[480px]'>
      <div className='max-w-[480px]'>
        <Header mode='main' title='견적 조회하기' />
        <CategoryTab tabs={tabs} />
      </div>
    </div>
  );
};

export default Status;
