interface Props {
  className?: string;
}

export default function LockClosed({ className }: Props) {
  return (
    <svg className={className} viewBox="0 0 14 18" fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4 5C4 3.34315 5.34315 2 7 2C8.65685 2 10 3.34315 10 5V7H4V5ZM2 7V5C2 2.23858 4.23858 0 7 0C9.76142 0 12 2.23858 12 5V7C13.1046 7 14 7.89543 14 9V16C14 17.1046 13.1046 18 12 18H2C0.89543 18 0 17.1046 0 16V9C0 7.89543 0.895431 7 2 7ZM2 16L2 9H12V16H2Z"
        fill="currentColor"
      />
    </svg>
  );
}
