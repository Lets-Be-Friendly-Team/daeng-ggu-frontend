interface IconProps {
  size?: string;
  color?: string;
}
const EmptyStarIcon = ({ size, color }: IconProps) => {
  return (
    <svg className={size} width='25' height='25' viewBox='0 0 25 25' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <g clipPath='url(#clip0_1319_3707)'>
        <path
          className={color}
          d='M23.7243 8.95108L16.5296 7.85612L13.3133 1.0282C13.2255 0.841259 13.081 0.689923 12.9024 0.597934C12.4547 0.366479 11.9106 0.559358 11.6868 1.0282L8.47055 7.85612L1.27582 8.95108C1.07746 8.98076 0.896105 9.07868 0.757255 9.22705C0.589392 9.40772 0.496892 9.65079 0.50008 9.90284C0.503268 10.1549 0.601883 10.3953 0.774257 10.5713L5.97974 15.8858L4.74992 23.3903C4.72108 23.5649 4.73953 23.7444 4.80317 23.9086C4.86681 24.0727 4.97311 24.2149 5.10999 24.319C5.24688 24.4231 5.40889 24.485 5.57764 24.4976C5.74639 24.5102 5.91514 24.473 6.06475 24.3903L12.5001 20.8473L18.9354 24.3903C19.1111 24.4882 19.3151 24.5209 19.5106 24.4853C20.0037 24.3962 20.3352 23.9066 20.2502 23.3903L19.0204 15.8858L24.2259 10.5713C24.3675 10.4259 24.4611 10.236 24.4894 10.0282C24.5659 9.50895 24.2202 9.02823 23.7243 8.95108V8.95108ZM16.8299 15.1381L17.8529 21.3784L12.5001 18.4348L7.14722 21.3814L8.17018 15.141L3.84031 10.7196L9.82506 9.80865L12.5001 4.13207L15.1751 9.80865L21.1598 10.7196L16.8299 15.1381Z'
          fill='black'
        />
      </g>
      <defs>
        <clipPath id='clip0_1319_3707'>
          <rect width='24' height='24' fill='white' transform='translate(0.5 0.5)' />
        </clipPath>
      </defs>
    </svg>
  );
};
export default EmptyStarIcon;
