interface ProfileButtonProps {
  petName: string;
  petImageUrl: string;
  isRequested: boolean;
  onClick: () => void;
}

const ProfileButton = ({ petName, petImageUrl, isRequested, onClick }: ProfileButtonProps) => {
  return (
    <button
      onClick={onClick}
      className='relative mb-4 flex w-full items-center rounded-lg p-6 shadow hover:bg-secondary'
    >
      <img src={petImageUrl} alt={petName} className={`h-16 w-16 rounded-full ${isRequested ? 'opacity-50' : ''}`} />
      <div className='ml-6'>
        <span className='block text-body1 text-gray-900'>{petName}</span>
        {isRequested && <span className='block text-xs text-gray-500'>요청 완료</span>}
      </div>
    </button>
  );
};

export default ProfileButton;
