interface BulbIconProps {
  className?: string;
  color?: string;
}
const BulbIcon = ({ className, color }: BulbIconProps) => {
  return (
    <svg viewBox='0 0 25 25' fill='none' xmlns='http://www.w3.org/2000/svg' className={className}>
      <path
        d='M8.65625 16.3461C6.35938 15.0172 4.8125 12.5328 4.8125 9.6875C4.8125 5.44297 8.25547 2 12.5 2C16.7445 2 20.1875 5.44297 20.1875 9.6875C20.1875 12.5328 18.6406 15.0172 16.3438 16.3461V19.0625C16.3438 19.4773 16.0086 19.8125 15.5938 19.8125H9.40625C8.99141 19.8125 8.65625 19.4773 8.65625 19.0625V16.3461ZM9.6875 21.3125H15.3125C15.4156 21.3125 15.5 21.3969 15.5 21.5V22.25C15.5 22.6648 15.1648 23 14.75 23H10.25C9.83516 23 9.5 22.6648 9.5 22.25V21.5C9.5 21.3969 9.58437 21.3125 9.6875 21.3125Z'
        fill='#FF6842'
        className={color}
      />
    </svg>
  );
};

export default BulbIcon;
