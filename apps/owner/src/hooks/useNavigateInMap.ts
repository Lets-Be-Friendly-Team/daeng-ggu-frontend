import { useNavigate } from 'react-router';

const useNavigateInMap = (path: string) => {
  const navigate = useNavigate();

  return navigate(path);
};

export default useNavigateInMap;
