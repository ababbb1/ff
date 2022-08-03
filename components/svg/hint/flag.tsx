interface Props {
  className?: string;
}

export default function FlagIcon({ className }: Props) {
  return (
    <svg className={className} viewBox="0 0 31 35" fill="none">
      <path
        d="M1.9375 2H29.0625V33L17.825 24.5719C16.4472 23.5385 14.5528 23.5385 13.175 24.5719L1.9375 33L1.9375 2Z"
        stroke="currentColor"
        strokeWidth="3.875"
      />
    </svg>
  );
}
