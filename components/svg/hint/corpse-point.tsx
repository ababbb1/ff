interface Props {
  className?: string;
}

export default function CorpsePoint({ className }: Props) {
  return (
    <svg className={className} viewBox="0 0 29 28" fill="none">
      <path
        d="M10.2652 0.270996H18.3585L17.6993 5.80078C17.5528 7.14355 17.2477 8.66943 16.7838 10.3784C17.7115 9.91455 18.3219 9.59717 18.6148 9.42627C19.6402 8.86475 20.4215 8.46191 20.9586 8.21777L26.0489 5.80078L28.5758 13.5278L22.9361 14.6997C21.9107 14.895 20.3849 15.0293 18.3585 15.1025C19.7257 16.1768 20.8121 17.1533 21.6178 18.0322L25.4264 22.1704L18.8346 27.1143L16.1246 22.1704C15.734 21.4624 15.0992 20.083 14.2203 18.0322C13.2682 20.2783 12.6334 21.6577 12.316 22.1704L9.56943 27.1143L2.79453 22.1704L6.89609 18.0322C8.04355 16.8848 9.1666 15.9082 10.2652 15.1025C9.14218 15.0049 7.66513 14.7852 5.83408 14.4434L0.157808 13.5278L2.79453 5.80078L7.88486 8.10791C8.42197 8.35205 9.75253 9.10889 11.8766 10.3784C11.4127 8.32764 11.1197 6.80176 10.9977 5.80078L10.2652 0.270996Z"
        fill="#ED2929"
      />
    </svg>
  );
}
