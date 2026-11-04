import { Tabs } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import type { ColorValue } from 'react-native';

import Colors from '@/constants/Colors';

const palette = Colors.dark;

const tabScreenOptions = {
  headerShown: true,
  headerStyle: { backgroundColor: palette.background },
  headerTintColor: palette.text,
  headerShadowVisible: false,
  tabBarStyle: {
    backgroundColor: palette.background,
    borderTopColor: palette.border,
  },
  tabBarActiveTintColor: palette.tint,
  tabBarInactiveTintColor: palette.tabIconDefault,
};

export default function TabLayout() {
  return (
    <Tabs screenOptions={tabScreenOptions}>
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
