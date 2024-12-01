import { useNavigate } from 'react-router';
import { Avatar } from '@daeng-ggu/design-system';

interface IPet {
  petId: number;
  petName: string;
  petImgUrl: string;
}

interface IAvartarListProps {
  pets: IPet[];
}
const AvartarList = ({ pets }: IAvartarListProps) => {
  const navigate = useNavigate();
  const handleAvartarClick = (petId: number) => {
    navigate(`/profile/edit/${petId}`);
  };
  return (
    <div className='pt-4'>
      <div className='flex gap-[20px]'>
        {pets.map((pet) => (
          <div key={pet.petId} onClick={() => handleAvartarClick(pet.petId)}>
            <Avatar mode='avatar' imageUrl={pet.petImgUrl} name={pet.petName} />
          </div>
        ))}
        <Avatar mode='add' />
      </div>
    </div>
  );
};

export default AvartarList;
