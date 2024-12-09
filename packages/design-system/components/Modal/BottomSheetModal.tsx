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
      {isOpen && <div className='fixed inset-0 bg-opacity-40' onClick={onClose} style={{ zIndex: 999 }}></div>}
      {/* Modal */}
      <div
        className={`z-100 fixed bottom-0 left-0 right-0 rounded-t-lg bg-white transition-transform duration-300 ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{ zIndex: 1000 }}
      >
        <div className='flex items-center justify-center border-b border-gray-300 px-4 py-2'>
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
        <button className='w-full py-4 text-center text-body2 text-gray-600 hover:bg-gray-200' onClick={onClose}>
          취소
        </button>
      </div>
    </>
  );
};

export default BottomSheetModal;
