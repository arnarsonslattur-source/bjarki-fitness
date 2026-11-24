import { Ionicons } from '@expo/vector-icons';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Badge, Card, T, styles } from '@/components/ui';
import { getDay, weeklyPlan } from '@/data/plan';
import { colors, radius, spacing } from '@/theme';

// Býr til eina síðu fyrir hvern æfingadag í vefútgáfunni.
export function generateStaticParams() {
  return weeklyPlan.map((d) => ({ dagur: d.id }));
}

export default function AefingDagsins() {
  const { dagur } = useLocalSearchParams<{ dagur: string }>();
  const day = getDay(String(dagur));
  // Tímabundin staða – verður vistuð í næsta skrefi.
  const [done, setDone] = useState<Record<string, number>>({});

  if (!day) {
    return (
      <View style={[styles.safe, { padding: spacing.lg }]}>
        <T>Æfing fannst ekki.</T>
      </View>
    );
  }

  const toggleSet = (exId: string, total: number) =>
    setDone((prev) => ({ ...prev, [exId]: ((prev[exId] ?? 0) + 1) % (total + 1) }));

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <Stack.Screen options={{ title: day.dayName }} />
      <ScrollView contentContainerStyle={styles.scroll}>
        <T variant="display">{day.title}</T>
        <T muted style={{ marginTop: 4, marginBottom: spacing.xl }}>
          {day.focus}
        </T>

        {day.requiresPhysioApproval ? (
          <Card style={{ borderColor: colors.warning, borderWidth: 1 }}>
            <View style={[styles.row, { alignItems: 'flex-start' }]}>
              <Ionicons name="lock-closed" size={20} color={colors.warning} />
              <View style={{ flex: 1, gap: spacing.sm }}>
                <T variant="heading">Læst æfing</T>
                <T muted>
                  Þessi dagur inniheldur hnéálag og er óvirkur þar til sjúkraþjálfari hefur farið yfir og samþykkt
                  æfingarnar.
                </T>
              </View>
            </View>
          </Card>
        ) : (
          <View style={{ gap: spacing.md }}>
            {day.exercises.map((ex) => {
              const count = done[ex.id] ?? 0;
              const complete = count === ex.sets;
              return (
                <Card key={ex.id} highlight={complete}>
                  <View style={[styles.row, { justifyContent: 'space-between' }]}>
                    <T variant="heading" style={{ flex: 1 }}>
                      {ex.name}
                    </T>
                    {complete ? <Badge label="Lokið" tone="accent" /> : null}
                  </View>
                  <T variant="label" muted style={{ marginTop: 4 }}>
                    {ex.sets} sett × {ex.reps} endurt.{ex.rest ? ` · hvíld ${ex.rest}` : ''}
                  </T>
                  <View style={[styles.row, { marginTop: spacing.md, gap: spacing.sm }]}>
                    {Array.from({ length: ex.sets }).map((_, i) => {
                      const filled = i < count;
                      return (
                        <Pressable
                          key={i}
                          onPress={() => toggleSet(ex.id, ex.sets)}
                          style={{
                            flex: 1,
                            height: 40,
                            borderRadius: radius.md,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: filled ? colors.accent : colors.surfaceHigh,
                          }}
                        >
                          <T variant="label" color={filled ? colors.bg : colors.textMuted}>
                            Sett {i + 1}
                          </T>
                        </Pressable>
                      );
                    })}
                  </View>
                </Card>
              );
            })}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
