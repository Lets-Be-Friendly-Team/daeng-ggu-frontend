interface IBellAlertIconProps {
  className?: string;
}
const BellAlertIcon = ({ className }: IBellAlertIconProps) => {
  return (
    <svg viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg' className={className}>
      <path
        d='M15.9375 14.9H15.5688V8.35938C15.5688 5.58285 13.5382 3.28347 10.8812 2.86123V2.1875C10.8812 1.70063 10.4869 1.30625 10 1.30625C9.51313 1.30625 9.11875 1.70063 9.11875 2.1875V2.86123C6.46181 3.28347 4.43125 5.58285 4.43125 8.35938V14.9H4.0625C3.66157 14.9 3.3375 15.2241 3.3375 15.625V16.25C3.3375 16.3912 3.45258 16.5063 3.59375 16.5063H7.71465C7.7671 17.7222 8.77125 18.6938 10 18.6938C11.2288 18.6938 12.2329 17.7222 12.2853 16.5063H16.4062C16.5474 16.5063 16.6625 16.3912 16.6625 16.25V15.625C16.6625 15.2241 16.3384 14.9 15.9375 14.9ZM10 17.2437C9.57149 17.2437 9.21788 16.9215 9.16842 16.5063H10.8316C10.7821 16.9215 10.4285 17.2437 10 17.2437ZM6.0375 14.9V8.35938C6.0375 7.29993 6.44886 6.30584 7.19766 5.55704C7.94647 4.80824 8.94055 4.39687 10 4.39687C11.0594 4.39687 12.0535 4.80824 12.8023 5.55704C13.5511 6.30584 13.9625 7.29993 13.9625 8.35938V14.9H6.0375Z'
        fill='#454C53'
        stroke='#454C53'
        stroke-width='0.2'
      />
      <circle cx='15' cy='5' r='3' fill='#FF0101' />
    </svg>
  );
};

export default BellAlertIcon;
