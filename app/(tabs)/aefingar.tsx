import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { Pressable, View } from 'react-native';
import { Card, Empty, IconButton, Screen, Section, T, styles } from '@/components/ui';
import { todayWeekday, totalSets } from '@/data/plan';
import { formatDate } from '@/dates';
import { useStore } from '@/store';
import { colors, radius } from '@/theme';

export default function Aefingar() {
  const { state, removeHistory } = useStore();
  const today = todayWeekday();
  const plan = [...state.plan].sort((a, b) => a.weekday - b.weekday);

  return (
    <Screen title="Æfingar" subtitle={`Vikuáætlun · ${plan.length} æfingadagar`}>
      <Section title="Áætlun">
        {plan.map((day, i) => {
          const empty = day.exercises.length === 0;
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
                        backgroundColor: empty ? colors.surfaceHigh : colors.accentDim,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {empty ? (
                        <Ionicons name="add" size={20} color={colors.textMuted} />
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
                        {empty ? 'Engar æfingar – ýttu til að bæta við' : `${day.exercises.length} æfingar · ${totalSets(day)} sett`}
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
        {state.history.length === 0 ? (
          <Empty icon="time-outline" text="Engar skráðar æfingar ennþá. Kláraðu fyrstu æfinguna til að byrja söguna." />
        ) : (
          <Card>
            {state.history.slice(0, 15).map((h, i) => (
              <View key={h.id}>
                {i > 0 ? <View style={styles.divider} /> : null}
                <View style={styles.row}>
                  <Ionicons
                    name={h.setsDone >= h.setsTotal ? 'checkmark-circle' : 'ellipse-outline'}
                    size={20}
                    color={h.setsDone >= h.setsTotal ? colors.success : colors.warning}
                  />
                  <View style={{ flex: 1 }}>
                    <T variant="heading">{h.title}</T>
                    <T variant="label" muted>
                      {formatDate(new Date(h.date))} · {h.setsDone}/{h.setsTotal} sett
                    </T>
                  </View>
                  <IconButton icon="trash-outline" onPress={() => removeHistory(h.id)} />
                </View>
              </View>
            ))}
          </Card>
        )}
      </Section>
    </Screen>
  );
}
