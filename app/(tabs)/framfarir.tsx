import { View } from 'react-native';
import { Badge, Card, Screen, Section, Stat, T, styles } from '@/components/ui';
import { sampleHistory, sampleKneeLog } from '@/data/plan';
import { colors, radius, spacing } from '@/theme';

function painColor(p: number) {
  if (p <= 2) return colors.success;
  if (p <= 5) return colors.warning;
  return colors.danger;
}

export default function Framfarir() {
  const maxSessions = 4;

  return (
    <Screen title="Framfarir" subtitle="Yfirlit og hnéeftirlit">
      <Section title="Samantekt" right={<Badge label="Sýnigögn" />}>
        <Card>
          <View style={styles.row}>
            <Stat value="13" label="Æfingar alls" />
            <Stat value="3,3" label="Á viku (meðalt.)" />
            <Stat value="2" label="Hnéverkur (meðalt.)" />
          </View>
        </Card>
      </Section>

      <Section title="Æfingar á viku">
        <Card>
          <View style={{ flexDirection: 'row', alignItems: 'flex-end', height: 120, gap: spacing.md }}>
            {sampleHistory.map((w) => (
              <View key={w.week} style={{ flex: 1, alignItems: 'center', gap: spacing.sm }}>
                <View
                  style={{
                    width: '100%',
                    height: (w.sessions / maxSessions) * 90,
                    backgroundColor: w.sessions >= 4 ? colors.accent : colors.surfaceHigh,
                    borderRadius: radius.sm,
                  }}
                />
                <T variant="caption" muted>
                  {w.week}
                </T>
              </View>
            ))}
          </View>
        </Card>
      </Section>

      <Section title="Hnéverkur (0–10)">
        <Card>
          {sampleKneeLog.map((k, i) => (
            <View key={k.day}>
              {i > 0 ? <View style={styles.divider} /> : null}
              <View style={[styles.row, { justifyContent: 'space-between' }]}>
                <T variant="label" muted style={{ width: 40 }}>
                  {k.day}
                </T>
                <View style={{ flex: 1, height: 8, backgroundColor: colors.surfaceHigh, borderRadius: 4 }}>
                  <View
                    style={{
                      width: `${(k.pain / 10) * 100}%`,
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
            </View>
          ))}
        </Card>
        <T variant="caption" muted>
          Skráning á verk og bata kemur í næsta skrefi.
        </T>
      </Section>
    </Screen>
  );
}
