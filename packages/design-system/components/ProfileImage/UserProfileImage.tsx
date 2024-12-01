import defaultImage from '../../assets/images/logoImage.webp';

interface IUserProfileImage {
  imageUrl?: string;
  size?: 'small' | 'large';
  onClick?: () => void;
}
const UserProfileImage = ({ imageUrl, size = 'large', onClick }: IUserProfileImage) => {
  const sizes = {
    small: 'w-[45px] h-[45px]',
    large: 'w-[70px] h-[70px]',
  };

  return (
    <div
      className={`${sizes[size]} flex items-center justify-center overflow-hidden rounded-full bg-secondary`}
      onClick={onClick}
    >
      <img
        src={imageUrl || defaultImage}
        className={`${sizes[size]} ${imageUrl ? 'h-full w-full rounded-full' : ''} object-contain`}
        onError={(e) => (e.currentTarget.src = defaultImage)}
        alt='User Profile'
      />
    </div>
  );
};
export default UserProfileImage;
