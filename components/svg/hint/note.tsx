interface Props {
  className?: string;
}

export default function NoteIcon({ className }: Props) {
  return (
    <svg
      className={className}
      viewBox="0 0 34 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.6667 11.3537H23.5833M11.6667 28.687H23.5833M11.6667 20.0203H21.4167M29 2.68701H5.16666C3.97005 2.68701 3 3.65707 3 4.85368V35.187C3 36.3836 3.97005 37.3537 5.16667 37.3537H29C30.1966 37.3537 31.1667 36.3836 31.1667 35.187V4.85368C31.1667 3.65707 30.1966 2.68701 29 2.68701Z"
        stroke="currentColor"
        strokeWidth="4.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
