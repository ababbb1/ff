interface Props {
  children?: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return <main className="w-full">{children}</main>;
}
