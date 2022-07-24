interface Props {
  isButton?: boolean;
  text: string;
  onClick?: () => void;
}

export default function CardButton({ isButton = false, text, onClick }: Props) {
  return (
    <div
      key={'setting'}
      onClick={onClick}
      className={`w-full h-full rounded bg-gray-200 flex justify-center items-center ${
        isButton ? 'hover:cursor-pointer' : ''
      }`}
    >
      {text}
    </div>
  );
}
