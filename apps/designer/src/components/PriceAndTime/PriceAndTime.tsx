import { Input } from '@daeng-ggu/design-system';

import { reverseBreedList, serviceList } from '@/pages/RegisterProfile/RegisterProfileData';
import useProfileStore from '@/stores/useProfileStore';

const PriceAndTime = ({ title = '', serviceCode = '', breedCode = '', price = '', time = '' }) => {
  const { profileData, setProfileData } = useProfileStore();
  const handleChange = (field: 'price' | 'time', value: string) => {
    const numericValue = value.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ','); //숫자만 허용 & 천단위 콤마 처리
    setProfileData({
      providedServices: profileData.providedServices.map((service) =>
        service.serviceCode === serviceCode
          ? {
              ...service,
              breedList: service.breedList?.map((breed) =>
                breed.majorBreedCode === breedCode
                  ? {
                      ...breed,
                      [field]: numericValue,
                    }
                  : breed,
              ),
            }
          : service,
      ),
    });
  };
  return (
    <div className='flex items-start justify-between w-full'>
      {/* Title */}
      <div className='flex-1 text-body3 leading-[4rem]'>{title}</div>
      <div className='flex-[2] flex flex-col gap-y-[0.8rem]'>
        {/* Price */}
        <div className='flex items-center justify-end'>
          {/* <div className='flex-1 bg-gray-100 rounded-lg h-10'></div> */}
          <div className='flex-1'>
            <Input
              name='price'
              width='100%'
              value={price}
              onChange={(e) => handleChange('price', e.target.value)}
              cn='text-right'
            ></Input>
          </div>
          <div className='ml-2 text-body3'>원</div>
        </div>

        {/* Time */}
        <div className=' flex-2 flex items-center justify-end'>
          <div className='flex-1'>
            <Input
              name='time'
              width='100%'
              value={time}
              onChange={(e) => handleChange('time', e.target.value)}
              cn='text-right'
            ></Input>
          </div>
          <div className='ml-2 text-body3'>시간 소요</div>
        </div>
      </div>
    </div>
  );
};

const PriceAndTimeList = () => {
  const { profileData } = useProfileStore();
  const { providedServices } = profileData;
  const findTitle = (code: string): string | undefined => {
    //견종 코드 이용해서 견종명 찾는 함수
    return reverseBreedList.get(code);
  };
  //   const handleChangeService = (service: Service) => {};
  return providedServices?.map((service, index) => (
    <div
      key={index}
      className='px-[1rem] py-[1.2rem] flex items-start w-full justify-between [&:not(:last-child)]:border-b border-b-gray-300'
    >
      <h1 className='flex-1 min-w-1/6 text-body3 font-semibold text-gray-600 leading-[4rem]'>
        {serviceList[service.serviceCode]}
      </h1>
      <div className='flex-[3] flex flex-col gap-y-[0.8rem]'>
        {service.breedList?.map((breed) => {
          const title = findTitle(breed.majorBreedCode);

          return (
            <PriceAndTime
              key={`${service.serviceCode}-${breed.majorBreedCode}`}
              title={title}
              serviceCode={service.serviceCode}
              breedCode={breed.majorBreedCode}
              price={breed.price}
              time={breed.time}
            />
          );
        })}
      </div>
    </div>
  ));
};

export default PriceAndTimeList;
