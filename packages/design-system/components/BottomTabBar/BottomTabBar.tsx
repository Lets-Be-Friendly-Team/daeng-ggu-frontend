import { ElementType, ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

type TabItem = {
  label: string;
  icon: ElementType;
  path: string;
};

interface TabBarProps {
  items: TabItem[];
  activePath: string;
  onTabChange: (_path: string) => void;
  renderTabItem: (_item: TabItem, _isActive: boolean) => ReactNode; //렌더링 prop
}

const BottomTabBar = ({ items, activePath, onTabChange, renderTabItem }: TabBarProps) => {
  return (
    <div className='fixed bottom-0 flex w-full max-w-[480px] justify-around border-t border-gray-100 bg-white py-[1rem]'>
      {items.map((item) => {
        const isActive = activePath === item.path;
        return (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={() => onTabChange(item.path)}
            className='flex flex-col items-center gap-y-[0.4rem] text-[1rem]'
          >
            {renderTabItem(item, isActive)}
          </NavLink>
        );
      })}
    </div>
  );
};

export default BottomTabBar;
