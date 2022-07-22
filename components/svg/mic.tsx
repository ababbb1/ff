interface Props {
  className?: string;
}

export default function Mic({ className }: Props) {
  return (
    <svg
      className={className}
      viewBox="0 0 13 19"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="2.29395"
        width="8.41177"
        height="13"
        rx="4.20588"
        fill="currentColor"
      />
      <rect
        x="3.05859"
        y="16.8235"
        width="6.88235"
        height="1.52941"
        rx="0.764706"
        fill="currentColor"
      />
      <rect
        x="7.64697"
        y="13.7646"
        width="3.82353"
        height="2.29412"
        rx="1.14706"
        transform="rotate(90 7.64697 13.7646)"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1 7.64712C0.447716 7.64712 6.29387e-07 8.09484 5.81105e-07 8.64712L5.68248e-07 8.79419C2.54413e-07 12.384 2.91015 15.2942 6.5 15.2942C10.0899 15.2942 13 12.384 13 8.79419L13 8.64712C13 8.09484 12.5523 7.64712 12 7.64712V7.64712C11.4477 7.64712 11 8.09484 11 8.64712L11 8.79419C11 11.2795 8.98528 13.2942 6.5 13.2942C4.01472 13.2942 2 11.2795 2 8.79419L2 8.64712C2 8.09484 1.55229 7.64712 1 7.64712V7.64712Z"
        fill="currentColor"
      />
    </svg>
  );
}
