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
      className='relative mb-4 flex w-full items-center rounded-lg p-4 shadow hover:bg-secondary'
    >
      <img src={petImageUrl} alt={petName} className={`h-12 w-12 rounded-full ${isRequested ? 'opacity-50' : ''}`} />
      <div className='ml-4'>
        <span className='block text-body3 text-gray-900'>{petName}</span>
        {isRequested && <span className='block text-xs text-gray-500'>요청 완료</span>}
      </div>
    </button>
  );
};

export default ProfileButton;
