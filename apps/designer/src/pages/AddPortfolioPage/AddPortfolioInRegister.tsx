import { useNavigate } from 'react-router';

import useProfileStore from '@/stores/useProfileStore';

import { Portfolio } from '../RegisterProfile/RegisterProfileData';

import AddPortfolioPage from './AddPortfolioPage';

const AddPortfolioInRegister = () => {
  const { profileData, setProfileData } = useProfileStore();
  //   const [portfolio, setPortFolio] = useState<Portfolio>({
  //     portfolioId: 0,
  //     title: '',
  //     video: null,
  //     imgList: [],
  //     contents: '',
  //   });
  const navigate = useNavigate();
  const handleSubmit = (portfolio: Portfolio) => {
    const initialList = profileData.portfolioList;
    initialList.push(portfolio);
    setProfileData({ portfolioList: initialList });
    navigate(-1);
  };
  return <AddPortfolioPage handleSubmit={handleSubmit} />;
};
export default AddPortfolioInRegister;
