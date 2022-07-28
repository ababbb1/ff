interface Props {
  className?: string;
}

export default function ClockIcon({ className }: Props) {
  return (
    <svg className={className} viewBox="0 0 18 18" fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 9C16 12.866 12.866 16 9 16C5.13401 16 2 12.866 2 9C2 5.13401 5.13401 2 9 2C12.866 2 16 5.13401 16 9ZM18 9C18 13.9706 13.9706 18 9 18C4.02944 18 0 13.9706 0 9C0 4.02944 4.02944 0 9 0C13.9706 0 18 4.02944 18 9ZM10 4C10 3.44772 9.55229 3 9 3C8.44771 3 8 3.44772 8 4V10C8 10.5523 8.44771 11 9 11H12C12.5523 11 13 10.5523 13 10C13 9.44772 12.5523 9 12 9H10V4Z"
        fill="currentColor"
      />
    </svg>
  );
}
