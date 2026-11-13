import { SymbolView } from 'expo-symbols';

type Props = {
  expanded: boolean;
};

const expandedName = {
  ios: 'chevron.down',
  android: 'keyboard_arrow_down',
  web: 'keyboard_arrow_down',
} as const;

const collapsedName = {
  ios: 'chevron.right',
  android: 'keyboard_arrow_right',
  web: 'keyboard_arrow_right',
} as const;

export default function DisclosureChevron({ expanded }: Props) {
  return (
    <SymbolView
      name={expanded ? expandedName : collapsedName}
      tintColor="#8b95a5"
      size={20}
    />
  );
}
