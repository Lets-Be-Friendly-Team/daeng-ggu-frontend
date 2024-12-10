interface IBookmarkFillIconProps {
  className?: string;
}
const BookmarkFillIcon = ({ className }: IBookmarkFillIconProps) => {
  return (
    <svg viewBox='0 0 24 25' fill='none' xmlns='http://www.w3.org/2000/svg' className={className}>
      <g clipPath='url(#clip0_1223_3635)'>
        <path
          d='M3 3.5V23.75C2.9999 23.8802 3.03373 24.0083 3.09814 24.1215C3.16255 24.2347 3.25532 24.3291 3.36734 24.3956C3.47935 24.462 3.60674 24.4982 3.73696 24.5004C3.86718 24.5027 3.99574 24.471 4.11 24.4085L12 20.1035L19.89 24.4085C20.0043 24.471 20.1328 24.5027 20.263 24.5004C20.3933 24.4982 20.5207 24.462 20.6327 24.3956C20.7447 24.3291 20.8375 24.2347 20.9019 24.1215C20.9663 24.0083 21.0001 23.8802 21 23.75V3.5C21 2.70435 20.6839 1.94129 20.1213 1.37868C19.5587 0.816071 18.7956 0.5 18 0.5L6 0.5C5.20435 0.5 4.44129 0.816071 3.87868 1.37868C3.31607 1.94129 3 2.70435 3 3.5V3.5Z'
          fill='black'
        />
      </g>
      <defs>
        <clipPath id='clip0_1223_3635'>
          <rect width='24' height='24' fill='white' transform='translate(0 0.5)' />
        </clipPath>
      </defs>
    </svg>
  );
};

export default BookmarkFillIcon;
