import { useState } from 'react';
import { Pressable, View } from 'react-native';
import { Badge, Button, Card, Empty, Input, Screen, Section, Stat, T, styles } from '@/components/ui';
import { addDays, dateKey, formatDate, formatNumber, fromKey, isoWeek, startOfWeek } from '@/dates';
import { useStore } from '@/store';
import { colors, radius, spacing } from '@/theme';

function painColor(p: number) {
  if (p <= 2) return colors.success;
  if (p <= 5) return colors.warning;
  return colors.danger;
}

export default function Framfarir() {
  const { state, logKnee } = useStore();
  const [pain, setPain] = useState<number | null>(null);
  const [note, setNote] = useState('');

  const now = new Date();
  const todayEntry = state.knee.find((k) => k.date === dateKey(now));

  // Æfingar síðustu 6 vikur
  const thisWeek = startOfWeek(now);
  const weeks = Array.from({ length: 6 }, (_, i) => {
    const start = addDays(thisWeek, -7 * (5 - i));
    const end = addDays(start, 7);
    const count = state.history.filter((h) => {
      const d = new Date(h.date);
      return d >= start && d < end;
    }).length;
    return { label: `V. ${isoWeek(start)}`, count, current: i === 5 };
  });
  const maxCount = Math.max(state.plan.length, ...weeks.map((w) => w.count));
  const last4 = weeks.slice(2).reduce((n, w) => n + w.count, 0) / 4;

  const kneeSorted = [...state.knee].sort((a, b) => (a.date < b.date ? 1 : -1));
  const recentKnee = kneeSorted.slice(0, 7);
  const kneeAvg = recentKnee.length ? recentKnee.reduce((n, k) => n + k.pain, 0) / recentKnee.length : null;

  const save = () => {
    if (pain === null) return;
    logKnee(pain, note);
    setPain(null);
    setNote('');
  };

  return (
    <Screen title="Framfarir" subtitle="Yfirlit og hnéeftirlit">
      <Section title="Samantekt">
        <Card>
          <View style={styles.row}>
            <Stat value={String(state.history.length)} label="Æfingar alls" />
            <Stat value={formatNumber(last4)} label="Á viku (4 vikur)" />
            <Stat value={kneeAvg === null ? '–' : formatNumber(kneeAvg)} label="Hné (7 skráningar)" />
          </View>
        </Card>
      </Section>

      <Section title="Æfingar á viku">
        <Card>
          <View style={{ flexDirection: 'row', alignItems: 'flex-end', height: 130, gap: spacing.sm }}>
            {weeks.map((w) => (
              <View key={w.label} style={{ flex: 1, alignItems: 'center', gap: spacing.xs }}>
                <T variant="caption" muted>
                  {w.count || ''}
                </T>
                <View
                  style={{
                    width: '100%',
                    height: Math.max(4, (w.count / maxCount) * 90),
                    backgroundColor: w.count >= state.plan.length ? colors.accent : w.count > 0 ? colors.textFaint : colors.surfaceHigh,
                    borderRadius: radius.sm,
                  }}
                />
                <T variant="caption" color={w.current ? colors.text : colors.textMuted}>
                  {w.label}
                </T>
              </View>
            ))}
          </View>
        </Card>
      </Section>

      <Section title="Hnéverkur í dag" right={todayEntry ? <Badge label={`Skráð: ${todayEntry.pain}`} tone="accent" /> : undefined}>
        <Card style={{ gap: spacing.md }}>
          <T muted>0 = enginn verkur · 10 = mjög mikill verkur</T>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm }}>
            {Array.from({ length: 11 }, (_, n) => {
              const selected = pain === n;
              return (
                <Pressable
                  key={n}
                  onPress={() => setPain(n)}
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: radius.md,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: selected ? painColor(n) : colors.surfaceHigh,
                  }}
                >
                  <T variant="heading" color={selected ? colors.bg : colors.text}>
                    {n}
                  </T>
                </Pressable>
              );
            })}
          </View>
          <Input value={note} onChangeText={setNote} placeholder="Athugasemd (valfrjálst)" />
          <Button label={todayEntry ? 'Uppfæra skráningu' : 'Skrá'} onPress={save} disabled={pain === null} />
        </Card>
      </Section>

      <Section title="Síðustu skráningar">
        {recentKnee.length === 0 ? (
          <Empty icon="pulse-outline" text="Engar skráningar ennþá." />
        ) : (
          <Card>
            {recentKnee.map((k, i) => (
              <View key={k.date}>
                {i > 0 ? <View style={styles.divider} /> : null}
                <View style={styles.row}>
                  <T variant="label" muted style={{ width: 96 }}>
                    {formatDate(fromKey(k.date))}
                  </T>
                  <View style={{ flex: 1, height: 8, backgroundColor: colors.surfaceHigh, borderRadius: 4 }}>
                    <View
                      style={{
                        width: `${Math.max(k.pain, 0.3) * 10}%`,
                        height: 8,
                        borderRadius: 4,
                        backgroundColor: painColor(k.pain),
                      }}
                    />
                  </View>
                  <T variant="label" style={{ width: 24, textAlign: 'right' }}>
                    {k.pain}
                  </T>
                </View>
                {k.note ? (
                  <T variant="label" muted style={{ marginTop: 4, marginLeft: 108 }}>
                    {k.note}
                  </T>
                ) : null}
              </View>
            ))}
          </Card>
        )}
      </Section>
    </Screen>
  );
}
