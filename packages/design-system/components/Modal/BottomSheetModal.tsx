import React from 'react';
interface IBottomSheetModalProps {
  isOpen: boolean;
  onClose: () => void;
  options: { label: string; onClick: () => void; icon?: React.ReactNode; color?: string }[];
}

const BottomSheetModal = ({ isOpen, onClose, options }: IBottomSheetModalProps) => {
  return (
    <>
      {/* Overlay */}
      {isOpen && <div className='fixed inset-0 z-[999] bg-opacity-40' onClick={onClose}></div>}
      {/* Modal */}
      <div
        className={`fixed bottom-0 z-[1000] w-full max-w-[480px] rounded-t-lg bg-white transition-transform duration-300 ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{ boxShadow: '0px -3px 10px 0px #aab1b9' }}
      >
        <div className='flex items-center justify-center py-4'>
          <div className='h-1 w-12 rounded-full bg-gray-400'></div>
        </div>
        <ul className='flex flex-col'>
          {options.map((option, index) => (
            <li
              key={index}
              className={`flex items-center justify-center gap-1 px-5 py-4 text-center text-body2 text-gray-800 ${
                option.color ? option.color : ''
              } cursor-pointer hover:bg-gray-100`}
              onClick={option.onClick}
            >
              {option.icon && <div>{option.icon}</div>}
              {option.label}
            </li>
          ))}
        </ul>
        <button className='w-full py-5 text-center text-body3 text-gray-600 hover:bg-gray-200' onClick={onClose}>
          취소
        </button>
      </div>
    </>
  );
};

export default BottomSheetModal;
