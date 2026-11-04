import { Tabs } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import type { ColorValue } from 'react-native';
import { useCSSVariable } from 'uniwind';

export default function TabLayout() {
  const screenOptions = useTabScreenOptions();

  return (
    <Tabs screenOptions={screenOptions}>
      <Tabs.Screen name="index" options={scheduleTab} />
      <Tabs.Screen name="games" options={gamesTab} />
    </Tabs>
  );
}

const scheduleTab = {
  title: 'Schedule',
  tabBarIcon: ScheduleIcon,
};

const gamesTab = {
  title: 'Games',
  tabBarIcon: GamesIcon,
};

function useTabScreenOptions() {
  const palette = useTabPalette();

  return {
    headerShown: true,
    headerStyle: { backgroundColor: palette.background },
    headerTintColor: palette.text,
    headerShadowVisible: false,
    tabBarStyle: {
      backgroundColor: palette.background,
      borderTopColor: palette.border,
    },
    tabBarActiveTintColor: palette.tint,
    tabBarInactiveTintColor: palette.tabIcon,
  };
}

function useTabPalette() {
  const [background, text, border, tint, tabIcon] = useCSSVariable([
    '--color-background',
    '--color-foreground',
    '--color-border',
    '--color-tint',
    '--color-tab-icon',
  ]);

  return {
    background: asColor(background, '#0E1116'),
    text: asColor(text, '#F4F6F8'),
    border: asColor(border, '#2A3140'),
    tint: asColor(tint, '#C8F542'),
    tabIcon: asColor(tabIcon, '#6B7380'),
  };
}

function ScheduleIcon({ color }: { color: ColorValue }) {
  return (
    <SymbolView
      name={{
        ios: 'calendar',
        android: 'calendar_month',
        web: 'calendar_month',
      }}
      tintColor={color}
      size={26}
    />
  );
}

function GamesIcon({ color }: { color: ColorValue }) {
  return (
    <SymbolView
      name={{
        ios: 'gamecontroller',
        android: 'sports_esports',
        web: 'sports_esports',
      }}
      tintColor={color}
      size={26}
    />
  );
}

function asColor(
  value: string | number | undefined,
  fallback: string
): ColorValue {
  return typeof value === 'string' ? value : fallback;
}
