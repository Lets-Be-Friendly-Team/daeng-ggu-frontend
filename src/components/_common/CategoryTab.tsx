interface ITab {
  label: string;
  onClick: () => void;
}
interface ITabProps {
  tabs: ITab[];
  activeIndex: number;
}

const CategoryTab = ({ tabs, activeIndex }: ITabProps) => {
  return (
    <div className='flex h-[60px] flex-col justify-center border text-slate-950'>
      <div className='flex justify-between px-[40px] align-middle'>
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={`flex h-[33px] w-[80px] justify-center py-[8px] text-sub_h2 text-gray-300 ${activeIndex === index ? 'border-b border-primary text-primary' : ''}`}
            onClick={tab.onClick}
          >
            {tab.label}
          </div>
        ))}
      </div>
    </div>
  );
};
export default CategoryTab;
