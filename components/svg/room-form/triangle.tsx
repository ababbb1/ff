interface Props {
  className?: string;
}

export default function TriangleIcon({ className }: Props) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.88889 0L19.3189 16.3333H0.458835L9.88889 0Z"
        fill="currentColor"
      />
    </svg>
  );
}
