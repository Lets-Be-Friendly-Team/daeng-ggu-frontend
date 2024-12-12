import { CircleScissorIcon } from '@daeng-ggu/design-system';

const DesignerMarker = ({ title }: { title: string }) => {
  return (
    <div className='relative flex flex-col items-center justify-center gap-1'>
      <CircleScissorIcon />
      <div className='absolute top-[2.4rem] flex w-fit overflow-hidden text-ellipsis whitespace-nowrap rounded-md border-[1px] border-primary bg-white stroke-red-800 stroke-2 p-2 text-iconCaption font-semibold text-gray-800'>
        {title}
      </div>
    </div>
  );
};

export default DesignerMarker;
