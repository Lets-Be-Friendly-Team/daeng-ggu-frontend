interface IDeleteIconProps {
  className?: string;
  color?: string;
}
const DeleteIcon = ({ className, color }: IDeleteIconProps) => {
  return (
    <svg className={className} viewBox='0 0 25 25' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M20.75 6.5H17.75V4.625C17.75 3.79766 17.0773 3.125 16.25 3.125H8.75C7.92266 3.125 7.25 3.79766 7.25 4.625V6.5H4.25C3.83516 6.5 3.5 6.83516 3.5 7.25V8C3.5 8.10313 3.58437 8.1875 3.6875 8.1875H5.10312L5.68203 20.4453C5.71953 21.2445 6.38047 21.875 7.17969 21.875H17.8203C18.6219 21.875 19.2805 21.2469 19.318 20.4453L19.8969 8.1875H21.3125C21.4156 8.1875 21.5 8.10313 21.5 8V7.25C21.5 6.83516 21.1648 6.5 20.75 6.5ZM16.0625 6.5H8.9375V4.8125H16.0625V6.5Z'
        fill={color}
      />
    </svg>
  );
};

export default DeleteIcon;
