import { NavLink } from 'react-router-dom';

type TabItem = {
  label: string;
  icon: React.ElementType;
  path: string;
};

interface TabBarProps {
  items: TabItem[];
  activePath: string;
  onTabChange: (path: string) => void;
  renderTabItem: (item: TabItem, isActive: boolean) => React.ReactNode; //렌더링 prop
}

const BottomTabBar = ({ items, activePath, onTabChange, renderTabItem }: TabBarProps) => {
  return (
    <div className='absolute bottom-0 flex w-full max-w-[480px] justify-around border-t border-gray-100 bg-white py-4'>
      {items.map((item) => {
        const isActive = activePath === item.path;
        return (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={() => onTabChange(item.path)}
            className='flex flex-col items-center gap-y-2 font-semibold'
          >
            {renderTabItem(item, isActive)}
          </NavLink>
        );
      })}
    </div>
  );
};

export default BottomTabBar;
