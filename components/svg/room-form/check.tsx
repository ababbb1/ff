interface Props {
  className?: string;
}

export default function CheckIcon({ className }: Props) {
  return (
    <svg
      className={className}
      viewBox="0 0 16 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 6.55556L6.38462 11L15 1"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
