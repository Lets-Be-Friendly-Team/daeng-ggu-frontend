import defaultImage from '../../assets/images/logoImage.png';

interface IUserProfileImage {
  imageUrl?: string;
  size?: 'small' | 'large';
  onClick?: () => void;
}
const UserProfileImage = ({ imageUrl, size = 'large', onClick }: IUserProfileImage) => {
  const sizes = {
    small: {
      container: 'w-11 h-11',
      image: 'w-[20px] h-[20px]',
    },
    large: {
      container: 'w-[70px] h-[70px]',
      image: 'w-[50px] h-[50px]',
    },
  };

  return (
    <div
      className={`${sizes[size].container} flex items-center justify-center overflow-hidden rounded-full bg-secondary`}
      onClick={onClick}
    >
      <img
        src={imageUrl || defaultImage}
        className={`${sizes[size].image} object-contain`}
        onError={(e) => (e.currentTarget.src = defaultImage)}
        alt='User Profile'
      />
    </div>
  );
};
export default UserProfileImage;
