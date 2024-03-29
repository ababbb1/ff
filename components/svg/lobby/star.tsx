interface Props {
  className?: string;
}

export default function StarIcon({ className }: Props) {
  return (
    <svg
      className={className}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.13571 1.48359C8.52145 0.821321 9.4782 0.821321 9.86393 1.48359L12.2326 5.55041L16.8324 6.54646C17.5814 6.70867 17.8771 7.6186 17.3664 8.1901L14.2306 11.6996L14.7047 16.382C14.7819 17.1445 14.0079 17.7069 13.3066 17.3978L8.99982 15.5L4.69308 17.3978C3.99175 17.7069 3.21772 17.1445 3.29492 16.382L3.76901 11.6996L0.633209 8.1901C0.122554 7.6186 0.418207 6.70867 1.16726 6.54646L5.767 5.55041L8.13571 1.48359Z"
        fill="currentColor"
      />
    </svg>
  );
}
