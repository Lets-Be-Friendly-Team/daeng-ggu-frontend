interface IUncheckedIconProps {
  className?: string;
}
const UncheckedIcon = ({ className }: IUncheckedIconProps) => {
  return (
    <svg viewBox='0 0 24 25' fill='none' xmlns='http://www.w3.org/2000/svg' className={className}>
      <path
        d='M20.625 3.125H3.375C2.96016 3.125 2.625 3.46016 2.625 3.875V21.125C2.625 21.5398 2.96016 21.875 3.375 21.875H20.625C21.0398 21.875 21.375 21.5398 21.375 21.125V3.875C21.375 3.46016 21.0398 3.125 20.625 3.125ZM19.6875 20.1875H4.3125V4.8125H19.6875V20.1875Z'
        fill='black'
      />
    </svg>
  );
};

export default UncheckedIcon;
