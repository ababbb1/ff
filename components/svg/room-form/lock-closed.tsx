interface Props {
  className?: string;
}

export default function LockClosed({ className }: Props) {
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
        d="M21 20C21 18.3431 22.3431 17 24 17C25.6569 17 27 18.3431 27 20V22H21V20ZM19 22V20C19 17.2386 21.2386 15 24 15C26.7614 15 29 17.2386 29 20V22C30.1046 22 31 22.8954 31 24V31C31 32.1046 30.1046 33 29 33H19C17.8954 33 17 32.1046 17 31V24C17 22.8954 17.8954 22 19 22ZM19 31L19 24H29V31H19Z"
        fill="currentColor"
      />
    </svg>
  );
}
