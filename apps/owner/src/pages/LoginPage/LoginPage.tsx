import { CategoryTab, Header, PageContainer } from '@daeng-ggu/design-system';

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
  return (
    <PageContainer>
      <Header mode='back' title='로그인' />
      <CategoryTab tabs={tabs} />
    </PageContainer>
  );
};

export default LoginPage;
