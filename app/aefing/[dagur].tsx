import { Ionicons } from '@expo/vector-icons';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Badge, Button, Card, IconButton, Input, T, styles } from '@/components/ui';
import { useStore } from '@/store';
import { colors, radius, spacing } from '@/theme';

export default function AefingDagsins() {
  const { dagur } = useLocalSearchParams<{ dagur: string }>();
  const router = useRouter();
  const { state, addExercise, removeExercise, moveExercise, renameDay, finishWorkout } = useStore();
  const day = state.plan.find((d) => d.id === String(dagur));

  const [done, setDone] = useState<Record<string, number>>({});
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState('');
  const [sets, setSets] = useState('3');
  const [reps, setReps] = useState('10');
  const [title, setTitle] = useState('');
  const [focus, setFocus] = useState('');

  if (!day) {
    return (
      <View style={[styles.safe, { padding: spacing.lg }]}>
        <T>Æfing fannst ekki.</T>
      </View>
    );
  }

  const empty = day.exercises.length === 0;
  const isEditing = editing || empty;
  const setsTotal = day.exercises.reduce((n, e) => n + e.sets, 0);
  const setsDone = day.exercises.reduce((n, e) => n + Math.min(done[e.id] ?? 0, e.sets), 0);
  const progress = setsTotal ? setsDone / setsTotal : 0;

  const toggleSet = (exId: string, index: number) =>
    setDone((prev) => {
      const current = prev[exId] ?? 0;
      return { ...prev, [exId]: index < current ? index : index + 1 };
    });

  const add = () => {
    if (!name.trim()) return;
    const n = Math.max(1, Math.min(10, parseInt(sets, 10) || 3));
    addExercise(day.id, { name: name.trim(), sets: n, reps: reps.trim() || '10' });
    setName('');
  };

  const toggleEditing = () => {
    if (editing) {
      if (title.trim()) renameDay(day.id, title.trim(), focus.trim());
    } else {
      setTitle(day.title);
      setFocus(day.focus);
    }
    setEditing((e) => !e);
  };

  const finish = () => {
    finishWorkout(day, setsDone, setsTotal);
    if (router.canGoBack()) router.back();
    else router.replace('/');
  };

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <Stack.Screen
        options={{
          title: day.dayName,
          headerRight: () =>
            empty ? null : (
              <Pressable onPress={toggleEditing} hitSlop={10}>
                <T variant="heading" color={colors.accent}>
                  {editing ? 'Vista' : 'Breyta'}
                </T>
              </Pressable>
            ),
        }}
      />
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        {editing ? (
          <View style={{ gap: spacing.sm, marginBottom: spacing.xl }}>
            <Input value={title} onChangeText={setTitle} placeholder="Heiti æfingar" />
            <Input value={focus} onChangeText={setFocus} placeholder="Áhersla (t.d. Bak · tvíhöfði)" />
          </View>
        ) : (
          <View style={{ marginBottom: spacing.xl }}>
            <T variant="display">{day.title}</T>
            <T muted style={{ marginTop: 4 }}>
              {day.focus}
            </T>
          </View>
        )}

        {!isEditing ? (
          <View style={{ marginBottom: spacing.xl, gap: spacing.sm }}>
            <View style={[styles.row, { justifyContent: 'space-between' }]}>
              <T variant="label" muted>
                Framvinda
              </T>
              <T variant="label">
                {setsDone}/{setsTotal} sett
              </T>
            </View>
            <View style={{ height: 8, backgroundColor: colors.surfaceHigh, borderRadius: 4 }}>
              <View
                style={{ width: `${progress * 100}%`, height: 8, borderRadius: 4, backgroundColor: colors.accent }}
              />
            </View>
          </View>
        ) : null}

        <View style={{ gap: spacing.md }}>
          {day.exercises.map((ex) => {
            const count = done[ex.id] ?? 0;
            const complete = count >= ex.sets;
            return (
              <Card key={ex.id} highlight={!isEditing && complete}>
                <View style={[styles.row, { justifyContent: 'space-between' }]}>
                  <View style={{ flex: 1 }}>
                    <T variant="heading">{ex.name}</T>
                    <T variant="label" muted style={{ marginTop: 4 }}>
                      {ex.sets} sett × {ex.reps} endurt.{ex.rest ? ` · hvíld ${ex.rest}` : ''}
                    </T>
                  </View>
                  {isEditing ? (
                    <View style={[styles.row, { gap: spacing.xs }]}>
                      <IconButton icon="arrow-up" onPress={() => moveExercise(day.id, ex.id, -1)} />
                      <IconButton icon="arrow-down" onPress={() => moveExercise(day.id, ex.id, 1)} />
                      <IconButton icon="trash-outline" color={colors.danger} onPress={() => removeExercise(day.id, ex.id)} />
                    </View>
                  ) : complete ? (
                    <Badge label="Lokið" tone="accent" />
                  ) : null}
                </View>
                {!isEditing ? (
                  <View style={[styles.row, { marginTop: spacing.md, gap: spacing.sm, flexWrap: 'wrap' }]}>
                    {Array.from({ length: ex.sets }).map((_, i) => {
                      const filled = i < count;
                      return (
                        <Pressable
                          key={i}
                          onPress={() => toggleSet(ex.id, i)}
                          style={{
                            flexGrow: 1,
                            minWidth: 64,
                            height: 42,
                            borderRadius: radius.md,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: filled ? colors.accent : colors.surfaceHigh,
                          }}
                        >
                          {filled ? (
                            <Ionicons name="checkmark" size={18} color={colors.bg} />
                          ) : (
                            <T variant="label" color={colors.textMuted}>
                              Sett {i + 1}
                            </T>
                          )}
                        </Pressable>
                      );
                    })}
                  </View>
                ) : null}
              </Card>
            );
          })}
        </View>

        {isEditing ? (
          <Card style={{ marginTop: spacing.lg, gap: spacing.sm }}>
            <T variant="caption" muted style={styles.upper}>
              Bæta við æfingu
            </T>
            <Input value={name} onChangeText={setName} placeholder="Heiti (t.d. Róður)" returnKeyType="done" onSubmitEditing={add} />
            <View style={[styles.row, { gap: spacing.sm }]}>
              <View style={{ flex: 1, gap: 4 }}>
                <T variant="caption" muted>
                  Sett
                </T>
                <Input value={sets} onChangeText={setSets} keyboardType="number-pad" maxLength={2} />
              </View>
              <View style={{ flex: 1, gap: 4 }}>
                <T variant="caption" muted>
                  Endurtekningar
                </T>
                <Input value={reps} onChangeText={setReps} placeholder="8–10" maxLength={8} />
              </View>
            </View>
            <Button label="Bæta við" icon="add" onPress={add} disabled={!name.trim()} style={{ marginTop: spacing.sm }} />
          </Card>
        ) : (
          <Button
            label={setsDone === setsTotal ? 'Ljúka æfingu' : `Ljúka æfingu (${setsDone}/${setsTotal})`}
            icon="checkmark-done"
            onPress={finish}
            disabled={setsDone === 0}
            style={{ marginTop: spacing.xl }}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
