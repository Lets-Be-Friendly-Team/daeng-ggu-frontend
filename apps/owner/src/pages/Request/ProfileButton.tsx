interface ProfileButtonProps {
  petName: string;
  petImgUrl: string;
  isRequested: boolean;
  onClick: () => void;
}

const ProfileButton = ({ petName, petImgUrl, isRequested, onClick }: ProfileButtonProps) => {
  return (
    <button
      onClick={onClick}
      className='relative flex h-32 w-32 flex-col items-center justify-center rounded-lg border bg-gray-100 p-2 shadow-md hover:bg-secondary'
    >
      {isRequested && (
        <div className='absolute left-0 top-0 flex h-full w-full items-center justify-center bg-opacity-50 font-bold text-white'>
          요청 완료
        </div>
      )}
      <img src={petImgUrl} alt={petName} className={`h-20 w-20 rounded-full ${isRequested ? 'opacity-50' : ''}`} />
      <span className='mt-2 text-sm font-semibold'>{petName}</span>
    </button>
  );
};

export default ProfileButton;
