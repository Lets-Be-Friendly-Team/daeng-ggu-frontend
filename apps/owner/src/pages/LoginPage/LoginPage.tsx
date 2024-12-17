import { useNavigate } from 'react-router';
import { CategoryTab, Header, PageContainer } from '@daeng-ggu/design-system';

import ROUTES from '@/constants/routes';

import LoginContent from './LoginContent';

const LoginPage = () => {
  const tabs = [
    {
      label: '보호자',
      content: <LoginContent userType='C' />,
    },
    {
      label: '디자이너',
      content: <LoginContent userType='D' />,
    },
  ];
  const navigate = useNavigate();
  return (
    <PageContainer>
      <Header
        mode='back'
        title='로그인'
        onClick={() => {
          navigate(ROUTES.main);
        }}
      />
      <CategoryTab tabs={tabs} />
    </PageContainer>
  );
};

export default LoginPage;
