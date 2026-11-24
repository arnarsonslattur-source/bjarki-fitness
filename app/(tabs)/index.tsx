import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { Pressable, View } from 'react-native';
import { Badge, Card, Screen, Section, Stat, T, styles } from '@/components/ui';
import { WEEKDAYS, nextWorkout, todayWeekday, weeklyPlan } from '@/data/plan';
import { colors, radius, spacing } from '@/theme';

function greeting() {
  const h = new Date().getHours();
  if (h < 11) return 'Góðan daginn';
  if (h < 18) return 'Góðan dag';
  return 'Gott kvöld';
}

export default function Heim() {
  const today = todayWeekday();
  const next = nextWorkout();
  const isToday = next.weekday === today;

  return (
    <Screen title="Bjarki Fitness" subtitle={greeting()}>
      {/* Vikustika */}
      <Section title="Þessi vika">
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          {WEEKDAYS.map((d, i) => {
            const wd = i + 1;
            const hasWorkout = weeklyPlan.some((p) => p.weekday === wd);
            const active = wd === today;
            return (
              <View
                key={d}
                style={{
                  width: 42,
                  paddingVertical: spacing.sm,
                  borderRadius: radius.md,
                  alignItems: 'center',
                  gap: 6,
                  backgroundColor: active ? colors.accent : colors.surface,
                }}
              >
                <T variant="caption" color={active ? colors.bg : colors.textMuted}>
                  {d}
                </T>
                <View
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: hasWorkout ? (active ? colors.bg : colors.accent) : 'transparent',
                  }}
                />
              </View>
            );
          })}
        </View>
      </Section>

      {/* Næsta æfing */}
      <Section title={isToday ? 'Æfing dagsins' : 'Næsta æfing'}>
        <Link href={`/aefing/${next.id}`} asChild>
          <Pressable>
            <Card highlight>
              <View style={[styles.row, { justifyContent: 'space-between' }]}>
                <Badge label={next.dayName} tone="accent" />
                {next.requiresPhysioApproval ? <Badge label="Læst" tone="warning" /> : null}
              </View>
              <T variant="title" style={{ marginTop: spacing.md }}>
                {next.title}
              </T>
              <T muted style={{ marginTop: 4 }}>
                {next.focus}
              </T>
              <View style={[styles.row, { marginTop: spacing.lg, justifyContent: 'space-between' }]}>
                <T variant="label" muted>
                  {next.exercises.length} æfingar · {next.durationMin} mín
                </T>
                <View style={[styles.row, { gap: 4 }]}>
                  <T variant="label" color={colors.accent}>
                    Opna
                  </T>
                  <Ionicons name="arrow-forward" size={16} color={colors.accent} />
                </View>
              </View>
            </Card>
          </Pressable>
        </Link>
      </Section>

      {/* Yfirlit */}
      <Section title="Yfirlit">
        <Card>
          <View style={styles.row}>
            <Stat value="0/4" label="Æfingar í viku" />
            <Stat value="–" label="Hnéverkur í dag" />
            <Stat value="16:00" label="Áminning" />
          </View>
        </Card>
      </Section>

      {/* Öryggisáminning */}
      <Card style={{ backgroundColor: colors.warningDim, borderColor: 'transparent' }}>
        <View style={[styles.row, { alignItems: 'flex-start' }]}>
          <Ionicons name="medkit-outline" size={20} color={colors.warning} />
          <T muted style={{ flex: 1 }}>
            Hættu æfingu og hafðu samband við sjúkraþjálfara ef verkur í hné eykst við álag.
          </T>
        </View>
      </Card>
    </Screen>
  );
}
