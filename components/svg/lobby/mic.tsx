interface Props {
  className?: string;
}

export default function MicrophoneIcon({ className }: Props) {
  return (
    <svg className={className} viewBox="0 0 21 20" fill="none">
      <rect
        x="6.29395"
        y="1"
        width="8.41177"
        height="13"
        rx="4.20588"
        fill="currentColor"
      />
      <rect
        x="7.05859"
        y="17.8235"
        width="6.88235"
        height="1.52941"
        rx="0.764706"
        fill="currentColor"
      />
      <rect
        x="11.647"
        y="14.7646"
        width="3.82353"
        height="2.29412"
        rx="1.14706"
        transform="rotate(90 11.647 14.7646)"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5 8.64718C4.44772 8.64718 4 9.09489 4 9.64718L4 9.79419C4 13.384 6.91015 16.2942 10.5 16.2942C14.0899 16.2942 17 13.384 17 9.79419L17 9.64718C17 9.09489 16.5523 8.64718 16 8.64718V8.64718C15.4477 8.64718 15 9.09489 15 9.64718L15 9.79419C15 12.2795 12.9853 14.2942 10.5 14.2942C8.01472 14.2942 6 12.2795 6 9.79419L6 9.64718C6 9.09489 5.55229 8.64718 5 8.64718V8.64718Z"
        fill="currentColor"
      />
    </svg>
  );
}
