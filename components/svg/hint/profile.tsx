interface Props {
  className?: string;
}

export default function ProfileIcon({ className }: Props) {
  return (
    <svg
      className={className}
      viewBox="0 0 35 37"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M24.0625 10.9375C24.0625 14.5619 21.1244 17.5 17.5 17.5C13.8756 17.5 10.9375 14.5619 10.9375 10.9375C10.9375 7.31313 13.8756 4.375 17.5 4.375C21.1244 4.375 24.0625 7.31313 24.0625 10.9375ZM28.4375 10.9375C28.4375 16.9781 23.5406 21.875 17.5 21.875C11.4594 21.875 6.56248 16.9781 6.56248 10.9375C6.56248 4.89689 11.4594 0 17.5 0C23.5406 0 28.4375 4.89689 28.4375 10.9375ZM6.61603 22.5105C6.91853 22.2769 7.2851 22.1329 7.66707 22.12C8.78507 22.0822 9.35277 22.3427 9.78943 22.8364C10.632 23.789 10.0783 25.3357 9.08731 26.1327C7.26538 27.5979 5.85667 29.5257 5.04445 31.7188H29.9535C29.1414 29.5262 27.7332 27.5987 25.9118 26.1337C24.9208 25.3364 24.3674 23.7895 25.2101 22.8367C25.6469 22.3429 26.2144 22.0825 27.3323 22.1207C27.7141 22.1337 28.0804 22.2777 28.3828 22.5112C31.9293 25.2501 34.3769 29.2972 34.9698 33.911C35.1238 35.1093 34.1297 36.0938 32.9216 36.0938H2.07634C0.868216 36.0938 -0.125936 35.1093 0.0280515 33.911C0.621015 29.2968 3.069 25.2494 6.61603 22.5105Z"
        fill="currentColor"
      />
    </svg>
  );
}
