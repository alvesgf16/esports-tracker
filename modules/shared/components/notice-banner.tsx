import { Text } from 'react-native';

type Props = {
  text: string;
  className?: string;
};

export default function NoticeBanner({ text, className }: Props) {
  const spacing = className ? ` ${className}` : '';

  return (
    <Text className={`text-center text-[13px] text-muted${spacing}`}>
      {text}
    </Text>
  );
}
