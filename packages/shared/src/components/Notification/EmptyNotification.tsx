import { LogoImage } from '@daeng-ggu/design-system';

const EmptyNotification = ({ text }: { text: string }) => {
  return (
    <div className='flex flex-col gap-[4rem] justify-center items-center w-full mt-[10rem]'>
      <img src={LogoImage} alt='logo' className='w-[20rem]' />
      <h2 className='font-semibold text-sub_h1 text-gray-700'>{text}</h2>
    </div>
  );
};

export default EmptyNotification;
