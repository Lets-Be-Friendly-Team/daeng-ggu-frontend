interface IFilledHeartIconProps {
  className?: string;
}
const FilledHeartIcon = ({ className }: IFilledHeartIconProps) => {
  return (
    <svg viewBox='0 0 24 25' fill='none' xmlns='http://www.w3.org/2000/svg' className={className}>
      <path
        d='M21.6328 7.14738C21.3187 6.41997 20.8657 5.76079 20.2992 5.20675C19.7323 4.65107 19.064 4.20947 18.3305 3.90597C17.5699 3.59002 16.7541 3.4283 15.9305 3.43019C14.775 3.43019 13.6477 3.7466 12.668 4.34425C12.4336 4.48722 12.2109 4.64425 12 4.81535C11.7891 4.64425 11.5664 4.48722 11.332 4.34425C10.3523 3.7466 9.225 3.43019 8.06953 3.43019C7.2375 3.43019 6.43125 3.58957 5.66953 3.90597C4.93359 4.21066 4.27031 4.64894 3.70078 5.20675C3.13359 5.76017 2.6805 6.4195 2.36719 7.14738C2.04141 7.90441 1.875 8.70832 1.875 9.53566C1.875 10.3161 2.03438 11.1294 2.35078 11.9568C2.61563 12.6482 2.99531 13.3653 3.48047 14.0896C4.24922 15.2357 5.30625 16.431 6.61875 17.6427C8.79375 19.6513 10.9477 21.0388 11.0391 21.095L11.5945 21.4513C11.8406 21.6083 12.157 21.6083 12.4031 21.4513L12.9586 21.095C13.05 21.0364 15.2016 19.6513 17.3789 17.6427C18.6914 16.431 19.7484 15.2357 20.5172 14.0896C21.0023 13.3653 21.3844 12.6482 21.6469 11.9568C21.9633 11.1294 22.1227 10.3161 22.1227 9.53566C22.125 8.70832 21.9586 7.90441 21.6328 7.14738Z'
        fill='black'
      />
    </svg>
  );
};

export default FilledHeartIcon;
