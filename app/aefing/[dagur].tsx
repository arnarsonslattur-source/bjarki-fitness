import { Ionicons } from '@expo/vector-icons';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Linking, Pressable, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Badge, Button, Card, IconButton, Input, T, styles } from '@/components/ui';
import { Exercise } from '@/data/plan';
import { ChecklistItem, cooldownFor, getGuide, videoUrl, warmup } from '@/data/guides';
import { useStore } from '@/store';
import { colors, radius, spacing } from '@/theme';

function GuidePanel({ ex }: { ex: Exercise }) {
  const guide = getGuide(ex.name);
  return (
    <View style={{ marginTop: spacing.md, gap: spacing.md }}>
      <View style={styles.divider} />
      {guide ? (
        <>
          <Badge label={guide.muscles} tone="accent" />
          <View style={{ gap: spacing.sm }}>
            {guide.steps.map((step, i) => (
              <View key={i} style={[styles.row, { alignItems: 'flex-start', gap: spacing.sm }]}>
                <View
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: 11,
                    backgroundColor: colors.surfaceHigh,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <T variant="caption">{i + 1}</T>
                </View>
                <T style={{ flex: 1 }}>{step}</T>
              </View>
            ))}
          </View>
          {guide.tips.map((tip, i) => (
            <View key={i} style={[styles.row, { alignItems: 'flex-start', gap: spacing.sm }]}>
              <Ionicons name="bulb-outline" size={16} color={colors.warning} style={{ marginTop: 2 }} />
              <T muted style={{ flex: 1 }}>
                {tip}
              </T>
            </View>
          ))}
        </>
      ) : (
        <T muted>Engar skrifaðar leiðbeiningar fyrir þessa æfingu – sjáðu myndband hér að neðan.</T>
      )}
      <Button label="Horfa á myndband" icon="play-circle-outline" variant="secondary" onPress={() => Linking.openURL(videoUrl(ex.name))} />
    </View>
  );
}

function Checklist({
  title,
  icon,
  items,
  checked,
  onToggle,
  open,
  onToggleOpen,
  highlight,
}: {
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  items: ChecklistItem[];
  checked: Record<string, boolean>;
  onToggle: (id: string) => void;
  open: boolean;
  onToggleOpen: () => void;
  highlight?: boolean;
}) {
  const count = items.filter((w) => checked[w.id]).length;
  const all = count === items.length;
  return (
    <Card highlight={highlight && open && !all}>
      <Pressable onPress={onToggleOpen} style={[styles.row, { justifyContent: 'space-between' }]}>
        <View style={[styles.row, { gap: spacing.sm }]}>
          <Ionicons name={all ? 'checkmark-circle' : icon} size={20} color={all ? colors.success : colors.warning} />
          <T variant="heading">{title}</T>
        </View>
        <View style={[styles.row, { gap: spacing.xs }]}>
          <T variant="label" muted>
            {count}/{items.length}
          </T>
          <Ionicons name={open ? 'chevron-up' : 'chevron-down'} size={16} color={colors.textMuted} />
        </View>
      </Pressable>
      {open ? (
        <View style={{ marginTop: spacing.md, gap: spacing.xs }}>
          {items.map((w) => {
            const on = !!checked[w.id];
            return (
              <Pressable key={w.id} onPress={() => onToggle(w.id)} style={[styles.row, { paddingVertical: 6, alignItems: 'flex-start' }]}>
                <Ionicons name={on ? 'checkbox' : 'square-outline'} size={22} color={on ? colors.accent : colors.textFaint} />
                <View style={{ flex: 1, opacity: on ? 0.5 : 1, gap: 2 }}>
                  <T>{w.name}</T>
                  {w.how ? (
                    <T variant="label" muted style={{ fontWeight: '400' }}>
                      {w.how}
                    </T>
                  ) : null}
                </View>
                <T variant="label" muted>
                  {w.detail}
                </T>
              </Pressable>
            );
          })}
        </View>
      ) : null}
    </Card>
  );
}

export default function AefingDagsins() {
  const { dagur } = useLocalSearchParams<{ dagur: string }>();
  const router = useRouter();
  const { state, addExercise, updateExercise, removeExercise, moveExercise, renameDay, finishWorkout } = useStore();
  const day = state.plan.find((d) => d.id === String(dagur));

  const [done, setDone] = useState<Record<string, number>>({});
  const [warmDone, setWarmDone] = useState<Record<string, boolean>>({});
  const [warmOpen, setWarmOpen] = useState(true);
  const [coolDone, setCoolDone] = useState<Record<string, boolean>>({});
  const [coolOpenManual, setCoolOpenManual] = useState<boolean | null>(null);
  const [openGuide, setOpenGuide] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState('');
  const [sets, setSets] = useState('3');
  const [reps, setReps] = useState('10');
  const [rest, setRest] = useState('45 sek');
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
  const cooldown = cooldownFor(day.title);
  const coolOpen = coolOpenManual ?? (setsTotal > 0 && setsDone === setsTotal);

  const toggleSet = (exId: string, index: number) =>
    setDone((prev) => {
      const current = prev[exId] ?? 0;
      return { ...prev, [exId]: index < current ? index : index + 1 };
    });

  const toggleCool = (id: string) => setCoolDone((prev) => ({ ...prev, [id]: !prev[id] }));

  const toggleWarm = (id: string) => {
    const next = { ...warmDone, [id]: !warmDone[id] };
    setWarmDone(next);
    if (warmup.every((w) => next[w.id])) setWarmOpen(false);
  };

  const add = () => {
    if (!name.trim()) return;
    const n = Math.max(1, Math.min(10, parseInt(sets, 10) || 3));
    addExercise(day.id, { name: name.trim(), sets: n, reps: reps.trim() || '10', rest: rest.trim() || undefined });
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
          <>
            {/* Upphitun */}
            <View style={{ marginBottom: spacing.lg }}>
              <Checklist
                title="Upphitun · 5 mín"
                icon="flame-outline"
                items={warmup}
                checked={warmDone}
                onToggle={toggleWarm}
                open={warmOpen}
                onToggleOpen={() => setWarmOpen((o) => !o)}
                highlight
              />
            </View>

            {/* Framvinda */}
            <View style={{ marginBottom: spacing.lg, gap: spacing.sm }}>
              <View style={[styles.row, { justifyContent: 'space-between' }]}>
                <T variant="label" muted>
                  Framvinda
                </T>
                <T variant="label">
                  {setsDone}/{setsTotal} sett
                </T>
              </View>
              <View style={{ height: 8, backgroundColor: colors.surfaceHigh, borderRadius: 4 }}>
                <View style={{ width: `${progress * 100}%`, height: 8, borderRadius: 4, backgroundColor: colors.accent }} />
              </View>
            </View>
          </>
        ) : null}

        <View style={{ gap: spacing.md }}>
          {day.exercises.map((ex) => {
            const count = done[ex.id] ?? 0;
            const complete = count >= ex.sets;
            const guideOpen = openGuide === ex.id;
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
                  ) : (
                    <View style={[styles.row, { gap: spacing.sm }]}>
                      {complete ? <Badge label="Lokið" tone="accent" /> : null}
                      <IconButton
                        icon={guideOpen ? 'close' : 'information-circle-outline'}
                        color={guideOpen ? colors.text : colors.accent}
                        onPress={() => setOpenGuide(guideOpen ? null : ex.id)}
                      />
                    </View>
                  )}
                </View>

                {isEditing ? (
                  <View style={[styles.row, { marginTop: spacing.md, gap: spacing.sm }]}>
                    <View style={[styles.row, { gap: spacing.xs }]}>
                      <IconButton icon="remove" onPress={() => updateExercise(day.id, ex.id, { sets: Math.max(1, ex.sets - 1) })} />
                      <T variant="label" style={{ width: 44, textAlign: 'center' }}>
                        {ex.sets} sett
                      </T>
                      <IconButton icon="add" onPress={() => updateExercise(day.id, ex.id, { sets: Math.min(10, ex.sets + 1) })} />
                    </View>
                    <Input
                      value={ex.reps}
                      onChangeText={(v) => updateExercise(day.id, ex.id, { reps: v })}
                      placeholder="Endurt."
                      style={{ flex: 1, height: 36 }}
                    />
                    <Input
                      value={ex.rest ?? ''}
                      onChangeText={(v) => updateExercise(day.id, ex.id, { rest: v || undefined })}
                      placeholder="Hvíld"
                      style={{ flex: 1, height: 36 }}
                    />
                  </View>
                ) : (
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
                )}

                {!isEditing && guideOpen ? <GuidePanel ex={ex} /> : null}
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
                  Endurt.
                </T>
                <Input value={reps} onChangeText={setReps} placeholder="8–10" maxLength={8} />
              </View>
              <View style={{ flex: 1, gap: 4 }}>
                <T variant="caption" muted>
                  Hvíld
                </T>
                <Input value={rest} onChangeText={setRest} placeholder="45 sek" maxLength={10} />
              </View>
            </View>
            <Button label="Bæta við" icon="add" onPress={add} disabled={!name.trim()} style={{ marginTop: spacing.sm }} />
          </Card>
        ) : (
          <>
            <View style={{ marginTop: spacing.lg }}>
              <Checklist
                title="Teygjur · 8–10 mín"
                icon="body-outline"
                items={cooldown}
                checked={coolDone}
                onToggle={toggleCool}
                open={coolOpen}
                onToggleOpen={() => setCoolOpenManual(!coolOpen)}
                highlight
              />
            </View>
            <Button
            label={setsDone === setsTotal ? 'Ljúka æfingu' : `Ljúka æfingu (${setsDone}/${setsTotal})`}
            icon="checkmark-done"
            onPress={finish}
            disabled={setsDone === 0}
            style={{ marginTop: spacing.xl }}
          />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
