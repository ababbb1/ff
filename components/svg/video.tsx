interface Props {
  className?: string;
}

export default function Video({ className }: Props) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="13.2231" height="13.2231" rx="2" fill="currentColor" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.1433 3.63421C14.1439 3.31206 14.2976 2.99018 14.6044 2.79394L18.4611 0.326504C19.1268 -0.0993331 20.0001 0.378688 20.0001 1.16887L20.0001 6.10374C20.0001 6.2938 19.9495 6.4658 19.8635 6.61151C19.9495 6.75722 20.0001 6.92922 20.0001 7.11928L20.0001 12.0542C20.0001 12.8443 19.1268 13.3224 18.4611 12.8965L14.6044 10.4291C14.2976 10.2328 14.1439 9.91096 14.1433 9.58881C13.9823 9.41132 13.8843 9.17576 13.8843 8.9173V4.30572C13.8843 4.04726 13.9823 3.8117 14.1433 3.63421Z"
        fill="currentColor"
      />
    </svg>
  );
}
