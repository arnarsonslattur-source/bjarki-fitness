import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { Pressable, View } from 'react-native';
import { Badge, Card, Screen, Section, T, styles } from '@/components/ui';
import { todayWeekday, weeklyPlan } from '@/data/plan';
import { colors, radius, spacing } from '@/theme';

export default function Aefingar() {
  const today = todayWeekday();

  return (
    <Screen title="Æfingar" subtitle="Vikuáætlun · 4 æfingadagar">
      <Section title="Áætlun">
        {weeklyPlan.map((day, i) => {
          const locked = !!day.requiresPhysioApproval;
          return (
            <Link key={day.id} href={`/aefing/${day.id}`} asChild>
              <Pressable>
                <Card highlight={day.weekday === today}>
                  <View style={styles.row}>
                    <View
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: radius.md,
                        backgroundColor: locked ? colors.warningDim : colors.accentDim,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {locked ? (
                        <Ionicons name="lock-closed" size={18} color={colors.warning} />
                      ) : (
                        <T variant="heading" color={colors.accent}>
                          {i + 1}
                        </T>
                      )}
                    </View>
                    <View style={{ flex: 1, gap: 2 }}>
                      <T variant="caption" muted>
                        {day.dayName.toUpperCase()}
                      </T>
                      <T variant="heading">{day.title}</T>
                      <T variant="label" muted>
                        {locked ? 'Krefst samþykkis sjúkraþjálfara' : `${day.exercises.length} æfingar · ${day.durationMin} mín`}
                      </T>
                    </View>
                    <Ionicons name="chevron-forward" size={18} color={colors.textFaint} />
                  </View>
                </Card>
              </Pressable>
            </Link>
          );
        })}
      </Section>

      <Section title="Æfingasaga">
        <Card>
          <View style={[styles.row, { gap: spacing.md }]}>
            <Ionicons name="time-outline" size={20} color={colors.textMuted} />
            <T muted style={{ flex: 1 }}>
              Engar skráðar æfingar ennþá. Kláraðu fyrstu æfinguna til að byrja söguna.
            </T>
          </View>
        </Card>
      </Section>

      <Badge label="Æfingum má breyta síðar" />
    </Screen>
  );
}
