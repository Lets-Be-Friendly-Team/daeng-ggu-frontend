const EditDeleteModal = () => {
  // 추후 리뷰 수정/삭제 페이지 연결
  return (
    <div className='absolute right-16 top-64 w-28 rounded-md bg-white shadow-md' style={{ zIndex: 100 }}>
      <div className='flex flex-col text-center text-body2 text-gray-800'>
        <button className='border-b border-gray-300 py-2 hover:bg-gray-100' onClick={() => alert('수정하기 클릭됨')}>
          수정하기
        </button>
        <button className='py-2 hover:bg-gray-100' onClick={() => alert('삭제하기 클릭됨')}>
          삭제하기
        </button>
      </div>
    </div>
  );
};

export default EditDeleteModal;
