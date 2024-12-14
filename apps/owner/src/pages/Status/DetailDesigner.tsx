import { useLocation } from 'react-router-dom';
import { Header, PageContainer } from '@daeng-ggu/design-system';

import useGetDesignerSuggest from '@/hooks/queries/Suggest/useGetDesignerSuggest'; // Adjust the import path as needed
import SuggestReview from '@/pages/Status/SuggestReview.tsx';

const DetailDesigner = () => {
  const location = useLocation();
  const data = location.state?.data;

  // Derive the estimateId from the passed data
  const estimateId = data?.estimateId ? Number(data.estimateId) : undefined;

  // Use the provided hook to fetch data. This will suspend while loading.
  const { data: postData } = useGetDesignerSuggest({ estimateId });
  console.log('what is this shit', postData);

  return (
    <div className='h-full w-full'>
      <div className='w-full'>
        <PageContainer>
          <Header mode='back' title='견적 제안서 보기' />
        </PageContainer>
        {postData && <SuggestReview data={postData} />}
      </div>
    </div>
  );
};

export default DetailDesigner;
