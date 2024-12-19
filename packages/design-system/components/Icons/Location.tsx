interface IconProps {
  size?: string;
  className?: string;
}
const LocationIcon = ({ size, className }: IconProps) => {
  return (
    <svg width='12' height='12' viewBox='0 0 12 12' fill='none' className={size} xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M6 7C7.103 7 8 6.103 8 5C8 3.897 7.103 3 6 3C4.897 3 4 3.897 4 5C4 6.103 4.897 7 6 7ZM6 4C6.5515 4 7 4.4485 7 5C7 5.5515 6.5515 6 6 6C5.4485 6 5 5.5515 5 5C5 4.4485 5.4485 4 6 4Z'
        fill='#575F67'
        className={className}
      />
      <path
        d='M5.71004 10.907C5.79467 10.9674 5.89606 10.9999 6.00004 10.9999C6.10403 10.9999 6.20542 10.9674 6.29004 10.907C6.44204 10.7995 10.0145 8.22 10 5C10 2.7945 8.20554 1 6.00004 1C3.79454 1 2.00004 2.7945 2.00004 4.9975C1.98554 8.22 5.55804 10.7995 5.71004 10.907ZM6.00004 2C7.65454 2 9.00004 3.3455 9.00004 5.0025C9.01054 7.2215 6.80604 9.214 6.00004 9.8675C5.19454 9.2135 2.98954 7.2205 3.00004 5C3.00004 3.3455 4.34554 2 6.00004 2Z'
        fill='#575F67'
        className={className}
      />
    </svg>
  );
};

export default LocationIcon;
