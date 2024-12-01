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
  return (
    <div className='pt-4'>
      <div className='flex gap-[20px]'>
        {pets.map((pet) => (
          <Avatar key={pet.petId} mode='avatar' imageUrl={pet.petImgUrl} name={pet.petName} />
        ))}
        <Avatar mode='add' />
      </div>
    </div>
  );
};

export default AvartarList;
