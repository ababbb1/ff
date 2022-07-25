interface Props {
  className?: string;
}

export default function LockOpen({ className }: Props) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M21 20C21 18.3431 22.3431 17 24 17C25.2574 17 26.3365 17.7739 26.7823 18.8752C26.9895 19.3871 27.5725 19.6342 28.0845 19.4269C28.5964 19.2197 28.8434 18.6367 28.6362 18.1248C27.8952 16.2942 26.0999 15 24 15C21.2386 15 19 17.2386 19 20V22C17.8954 22 17 22.8954 17 24V31C17 32.1046 17.8954 33 19 33H29C30.1046 33 31 32.1046 31 31V24C31 22.8954 30.1046 22 29 22H21V20ZM20 24H19L19 31H29V24H20Z"
        fill="currentColor"
      />
    </svg>
  );
}
