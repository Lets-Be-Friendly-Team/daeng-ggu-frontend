// CompletedRequest.tsx

import CompletedRequestDesigner from '@/pages/Status/CompletedRequestDesigner';
import CompletedRequestUser from '@/pages/Status/CompletedRequestUser';
// import '@dae';
import { CompletedData, DesignerCompletedData, PageMode } from '@/types/requestAndStatusTypes';

interface CompletedRequestProps {
  data: CompletedData | DesignerCompletedData;
  mode: PageMode;
}

const CompletedRequest = ({ data, mode }: CompletedRequestProps) => {
  switch (mode) {
    case 'designer':
      return <CompletedRequestDesigner data={data as DesignerCompletedData} />;
    case 'user':
    case 'reservation':
      return <CompletedRequestUser data={data as CompletedData} />;
    default:
      return null;
  }
};

export default CompletedRequest;
