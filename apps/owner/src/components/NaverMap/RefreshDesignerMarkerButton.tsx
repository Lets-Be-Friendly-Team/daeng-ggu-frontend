import { ButtonHTMLAttributes, useState } from 'react';
import { RefreshIcon } from '@daeng-ggu/design-system';

interface RefreshDesignerMarkerButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  map: naver.maps.Map | undefined;
  handleDesignerMap: (_location: { minX: number; maxX: number; minY: number; maxY: number }) => void;
}

const RefreshDesignerMarkerButton = ({ map, handleDesignerMap, ...props }: RefreshDesignerMarkerButtonProps) => {
  const [isSpinning, setIsSpinning] = useState(false);

  if (!map) return;
  const handleClick = () => {
    setIsSpinning(true);
    const mapBounds = map.getBounds();

    handleDesignerMap({
      minX: mapBounds.minX(),
      maxX: mapBounds.maxX(),
      minY: mapBounds.minY(),
      maxY: mapBounds.maxY(),
    });
    setTimeout(() => setIsSpinning(false), 300);
  };
  return (
    <button
      {...props}
      onClick={handleClick}
      className='absolute bottom-10 right-5 z-10 rounded-full bg-primary p-3 text-white shadow-md'
    >
      <RefreshIcon className={isSpinning ? 'animate-rotate' : ''} />
    </button>
  );
};

export default RefreshDesignerMarkerButton;
