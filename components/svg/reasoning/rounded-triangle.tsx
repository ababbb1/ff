interface Props {
  className?: string;
}

export default function RoundedTriangleIcon({ className }: Props) {
  return (
    <svg className={className} viewBox="0 0 25 22" fill="none">
      <path
        d="M14.0585 20.0352C13.2869 21.3591 11.3742 21.3591 10.6026 20.0352L0.806408 3.22677C0.0293317 1.89345 0.991119 0.219696 2.53436 0.219696L22.1267 0.219697C23.67 0.219698 24.6317 1.89345 23.8547 3.22677L14.0585 20.0352Z"
        fill="currentColor"
      />
    </svg>
  );
}
