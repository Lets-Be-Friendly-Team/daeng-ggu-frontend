interface RightIconProps {
  size?: string;
  color?: string;
}
function RightIcon({ size, color }: RightIconProps) {
  return (
    <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' className={size}>
      <path
        d='M17.9459 11.4094L7.38035 3.15703C7.35274 3.1353 7.31956 3.12179 7.28462 3.11806C7.24968 3.11433 7.2144 3.12053 7.18283 3.13595C7.15125 3.15137 7.12467 3.17538 7.10613 3.20523C7.08759 3.23508 7.07784 3.26955 7.07801 3.30469V5.11641C7.07801 5.23125 7.13191 5.34141 7.22097 5.41172L15.6585 12L7.22097 18.5883C7.12957 18.6586 7.07801 18.7688 7.07801 18.8836V20.6953C7.07801 20.8523 7.25847 20.9391 7.38035 20.843L17.9459 12.5906C18.0357 12.5206 18.1084 12.431 18.1584 12.3286C18.2083 12.2263 18.2343 12.1139 18.2343 12C18.2343 11.8861 18.2083 11.7737 18.1584 11.6714C18.1084 11.569 18.0357 11.4794 17.9459 11.4094Z'
        className={color}
        fill='black'
      />
    </svg>
  );
}

export default RightIcon;
