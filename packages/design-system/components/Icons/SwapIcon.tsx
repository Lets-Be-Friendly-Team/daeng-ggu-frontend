interface IconProps {
  size: string;
  color: string;
}
const SwapIcon = ({ size, color }: IconProps) => {
  return (
    <svg width='25' height='25' viewBox='0 0 25 25' fill='none' xmlns='http://www.w3.org/2000/svg' className={size}>
      <path
        className={color}
        d='M20.3729 14.375H4.06276C3.95963 14.375 3.87526 14.4594 3.87526 14.5625V15.9688C3.87526 16.0719 3.95963 16.1562 4.06276 16.1562H18.2471L14.8651 20.4453C14.769 20.5672 14.8557 20.75 15.0128 20.75H16.712C16.8268 20.75 16.9346 20.6984 17.0073 20.607L20.9635 15.5891C21.3503 15.0969 21.001 14.375 20.3729 14.375V14.375ZM20.9378 8.84375H6.75338L10.1354 4.55469C10.2315 4.43281 10.1448 4.25 9.98776 4.25H8.28854C8.17369 4.25 8.06588 4.30156 7.99322 4.39297L4.03697 9.41094C3.65026 9.90313 3.99947 10.625 4.62526 10.625H20.9378C21.0409 10.625 21.1253 10.5406 21.1253 10.4375V9.03125C21.1253 8.92812 21.0409 8.84375 20.9378 8.84375Z'
        fill='black'
      />
    </svg>
  );
};
export default SwapIcon;