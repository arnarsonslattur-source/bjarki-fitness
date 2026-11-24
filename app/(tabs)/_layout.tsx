import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { colors } from '@/theme';

type IconName = keyof typeof Ionicons.glyphMap;

const tab = (title: string, icon: IconName, iconActive: IconName) => ({
  title,
  tabBarIcon: ({ color, focused, size }: { color: string; focused: boolean; size: number }) => (
    <Ionicons name={focused ? iconActive : icon} color={color} size={size} />
  ),
});

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.textFaint,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
        },
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
      }}
    >
      <Tabs.Screen name="index" options={tab('Heim', 'home-outline', 'home')} />
      <Tabs.Screen name="aefingar" options={tab('Æfingar', 'barbell-outline', 'barbell')} />
      <Tabs.Screen name="framfarir" options={tab('Framfarir', 'stats-chart-outline', 'stats-chart')} />
      <Tabs.Screen name="stillingar" options={tab('Stillingar', 'settings-outline', 'settings')} />
    </Tabs>
  );
}
