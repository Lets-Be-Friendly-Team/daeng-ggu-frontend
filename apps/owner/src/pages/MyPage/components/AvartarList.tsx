import { Avatar } from '@daeng-ggu/design-system';

const AvartarList = () => {
  return (
    <div className='pt-4'>
      <div className='flex gap-[20px]'>
        <Avatar
          mode='avatar'
          imageUrl='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdrgVj6z0tfzZSheYRKDWVUhB5zIkiZ9vUo6rFSULPgctqkQSmlkwfCDZ1RMHxgFF2XKIlAJb_28QzyZaR5s6zfQ'
          name='장군이'
        />
        <Avatar
          mode='avatar'
          imageUrl='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdrgVj6z0tfzZSheYRKDWVUhB5zIkiZ9vUo6rFSULPgctqkQSmlkwfCDZ1RMHxgFF2XKIlAJb_28QzyZaR5s6zfQ'
          name='장군이'
        />
        <Avatar mode='add' />
      </div>
    </div>
  );
};

export default AvartarList;
