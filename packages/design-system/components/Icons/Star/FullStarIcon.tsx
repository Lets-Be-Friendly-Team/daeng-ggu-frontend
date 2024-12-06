interface IconProps {
  size?: string;
  color?: string;
}
const FullStarIcon = ({ size, color }: IconProps) => {
  return (
    <svg className={size} width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <g clip-path='url(#clip0_1333_3704)'>
        <path
          className={color}
          d='M23.2243 8.45108L16.0296 7.35612L12.8133 0.528203C12.7255 0.341259 12.581 0.189923 12.4024 0.0979342C11.9547 -0.133521 11.4106 0.0593584 11.1868 0.528203L7.97055 7.35612L0.77582 8.45108C0.577461 8.48076 0.396105 8.57868 0.257255 8.72705C0.0893918 8.90772 -0.0031083 9.15079 7.97568e-05 9.40284C0.00326781 9.6549 0.101883 9.89531 0.274257 10.0713L5.47974 15.3858L4.24992 22.8903C4.22108 23.0649 4.23953 23.2444 4.30317 23.4086C4.36681 23.5727 4.47311 23.7149 4.60999 23.819C4.74688 23.9231 4.90889 23.985 5.07764 23.9976C5.24639 24.0102 5.41514 23.973 5.56475 23.8903L12.0001 20.3473L18.4354 23.8903C18.6111 23.9882 18.8151 24.0209 19.0106 23.9853C19.5037 23.8962 19.8352 23.4066 19.7502 22.8903L18.5204 15.3858L23.7259 10.0713C23.8675 9.92587 23.9611 9.73595 23.9894 9.52824C24.0659 9.00895 23.7202 8.52823 23.2243 8.45108V8.45108Z'
          fill='black'
        />
      </g>
      <defs>
        <clipPath id='clip0_1333_3704'>
          <rect width='24' height='24' fill='white' />
        </clipPath>
      </defs>
    </svg>
  );
};
export default FullStarIcon;
