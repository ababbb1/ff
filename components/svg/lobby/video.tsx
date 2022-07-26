interface Props {
  className?: string;
}

export default function Video({ className }: Props) {
  return (
    <svg className={className} viewBox="0 0 21 21" fill="none">
      <rect
        x="1"
        y="4"
        width="13.2231"
        height="13.2231"
        rx="2"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.4821 7.63446C14.4828 7.3123 14.6365 6.99042 14.9432 6.79419L18.8 4.32675C19.4656 3.90091 20.3389 4.37893 20.3389 5.16911L20.3389 10.104C20.3389 10.294 20.2884 10.466 20.2024 10.6118C20.2884 10.7575 20.3389 10.9295 20.3389 11.1195L20.3389 16.0544C20.3389 16.8446 19.4656 17.3226 18.8 16.8968L14.9432 14.4293C14.6365 14.2331 14.4828 13.9112 14.4821 13.5891C14.3212 13.4116 14.2231 13.176 14.2231 12.9175V8.30597C14.2231 8.04751 14.3212 7.81194 14.4821 7.63446Z"
        fill="currentColor"
      />
    </svg>
  );
}
