import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { Pressable, View } from 'react-native';
import { Badge, Card, Screen, Section, Stat, T, styles } from '@/components/ui';
import { WEEKDAYS, nextWorkout, todayWeekday, totalSets } from '@/data/plan';
import { dateKey, startOfWeek, weekdayOf } from '@/dates';
import { useStore } from '@/store';
import { colors, radius, spacing } from '@/theme';

function greeting() {
  const h = new Date().getHours();
  if (h < 11) return 'Góðan daginn';
  if (h < 18) return 'Góðan dag';
  return 'Gott kvöld';
}

export default function Heim() {
  const { state } = useStore();
  const now = new Date();
  const today = todayWeekday();
  const next = nextWorkout(state.plan);
  const isToday = next.weekday === today;

  const weekStart = startOfWeek(now);
  const thisWeek = state.history.filter((h) => new Date(h.date) >= weekStart);
  const doneDays = new Set(thisWeek.map((h) => weekdayOf(new Date(h.date))));
  const doneToday = isToday && thisWeek.some((h) => h.dayId === next.id && weekdayOf(new Date(h.date)) === today);
  const kneeToday = state.knee.find((k) => k.date === dateKey(now));
  const reminder = state.settings.remindersOn ? state.settings.times[next.id] ?? '16:00' : 'Slökkt';

  return (
    <Screen title="Bjarki Fitness" subtitle={greeting()}>
      <Section title="Þessi vika">
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          {WEEKDAYS.map((d, i) => {
            const wd = i + 1;
            const hasWorkout = state.plan.some((p) => p.weekday === wd);
            const done = doneDays.has(wd);
            const active = wd === today;
            return (
              <View
                key={d}
                style={{
                  width: 42,
                  height: 58,
                  borderRadius: radius.md,
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 6,
                  backgroundColor: active ? colors.accent : colors.surface,
                }}
              >
                <T variant="caption" color={active ? colors.bg : colors.textMuted}>
                  {d}
                </T>
                {done ? (
                  <Ionicons name="checkmark-circle" size={14} color={active ? colors.bg : colors.success} />
                ) : (
                  <View
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: 3,
                      backgroundColor: hasWorkout ? (active ? colors.bg : colors.accent) : 'transparent',
                    }}
                  />
                )}
              </View>
            );
          })}
        </View>
      </Section>

      <Section title={isToday ? 'Æfing dagsins' : 'Næsta æfing'}>
        <Link href={`/aefing/${next.id}`} asChild>
          <Pressable>
            <Card highlight={!doneToday}>
              <View style={[styles.row, { justifyContent: 'space-between' }]}>
                <Badge label={next.dayName} tone="accent" />
                {doneToday ? <Badge label="Lokið í dag" tone="accent" /> : null}
              </View>
              <T variant="title" style={{ marginTop: spacing.md }}>
                {next.title}
              </T>
              <T muted style={{ marginTop: 4 }}>
                {next.focus}
              </T>
              <View style={[styles.row, { marginTop: spacing.lg, justifyContent: 'space-between' }]}>
                <T variant="label" muted>
                  {next.exercises.length > 0
                    ? `${next.exercises.length} æfingar · ${totalSets(next)} sett`
                    : 'Engar æfingar skráðar'}
                </T>
                <View style={[styles.row, { gap: 4 }]}>
                  <T variant="label" color={colors.accent}>
                    {next.exercises.length > 0 ? 'Byrja' : 'Bæta við'}
                  </T>
                  <Ionicons name="arrow-forward" size={16} color={colors.accent} />
                </View>
              </View>
            </Card>
          </Pressable>
        </Link>
      </Section>

      <Section title="Yfirlit">
        <Card>
          <View style={styles.row}>
            <Stat value={`${thisWeek.length}/${state.plan.length}`} label="Æfingar í viku" />
            <Stat value={kneeToday ? String(kneeToday.pain) : '–'} label="Hné í dag" />
            <Stat value={reminder} label="Áminning" />
          </View>
        </Card>
      </Section>

      {!kneeToday ? (
        <Link href="/framfarir" asChild>
          <Pressable>
            <Card>
              <View style={styles.row}>
                <Ionicons name="pulse-outline" size={20} color={colors.accent} />
                <T style={{ flex: 1 }}>Hvernig er hnéð í dag?</T>
                <T variant="label" color={colors.accent}>
                  Skrá
                </T>
                <Ionicons name="chevron-forward" size={16} color={colors.accent} />
              </View>
            </Card>
          </Pressable>
        </Link>
      ) : null}
    </Screen>
  );
}
