interface IconProps {
  size?: string;
  color?: string;
}
const EmptyBookMarkIcon = ({ size, color }: IconProps) => {
  return (
    <svg className={size} width='24' height='25' viewBox='0 0 24 25' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <g clipPath='url(#clip0_1223_3637)'>
        <path
          className={color}
          d='M3 3.5C3 2.70435 3.31607 1.94129 3.87868 1.37868C4.44129 0.816071 5.20435 0.5 6 0.5L18 0.5C18.7956 0.5 19.5587 0.816071 20.1213 1.37868C20.6839 1.94129 21 2.70435 21 3.5V23.75C20.9999 23.8857 20.9631 24.0188 20.8933 24.1351C20.8236 24.2515 20.7236 24.3468 20.604 24.4108C20.4844 24.4748 20.3497 24.5052 20.2142 24.4988C20.0787 24.4923 19.9474 24.4492 19.8345 24.374L12 20.1515L4.1655 24.374C4.05256 24.4492 3.92135 24.4923 3.78584 24.4988C3.65033 24.5052 3.5156 24.4748 3.396 24.4108C3.2764 24.3468 3.17641 24.2515 3.10667 24.1351C3.03694 24.0188 3.00007 23.8857 3 23.75V3.5ZM6 2C5.60218 2 5.22064 2.15804 4.93934 2.43934C4.65804 2.72064 4.5 3.10218 4.5 3.5V22.349L11.5845 18.626C11.7076 18.5441 11.8521 18.5004 12 18.5004C12.1479 18.5004 12.2924 18.5441 12.4155 18.626L19.5 22.349V3.5C19.5 3.10218 19.342 2.72064 19.0607 2.43934C18.7794 2.15804 18.3978 2 18 2H6Z'
          fill='black'
        />
      </g>
      <defs>
        <clipPath id='clip0_1223_3637'>
          <rect width='24' height='24' fill='white' transform='translate(0 0.5)' />
        </clipPath>
      </defs>
    </svg>
  );
};
export default EmptyBookMarkIcon;
