import { Ionicons } from '@expo/vector-icons';
import { ReactNode, useState } from 'react';
import { Switch, View } from 'react-native';
import { Button, Card, IconButton, Screen, Section, T, styles } from '@/components/ui';
import { shiftTime } from '@/dates';
import { useStore } from '@/store';
import { colors, radius, spacing } from '@/theme';

function Row({ icon, label, right }: { icon: keyof typeof Ionicons.glyphMap; label: string; right?: ReactNode }) {
  return (
    <View style={[styles.row, { paddingVertical: spacing.xs }]}>
      <View
        style={{
          width: 32,
          height: 32,
          borderRadius: radius.sm,
          backgroundColor: colors.surfaceHigh,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Ionicons name={icon} size={16} color={colors.textMuted} />
      </View>
      <T style={{ flex: 1 }}>{label}</T>
      {right}
    </View>
  );
}

export default function Stillingar() {
  const { state, toggleReminders, setReminderTime, resetAll } = useStore();
  const [confirmReset, setConfirmReset] = useState(false);
  const { remindersOn, times } = state.settings;
  const plan = [...state.plan].sort((a, b) => a.weekday - b.weekday);

  return (
    <Screen title="Stillingar" subtitle="Áminningar og gögn">
      <Section title="Áminningar">
        <Card>
          <Row
            icon="notifications-outline"
            label="Æfingaáminningar"
            right={
              <Switch
                value={remindersOn}
                onValueChange={toggleReminders}
                trackColor={{ true: colors.accent, false: colors.surfaceHigh }}
                thumbColor={colors.text}
              />
            }
          />
          {plan.map((d) => {
            const time = times[d.id] ?? '16:00';
            return (
              <View key={d.id} style={{ opacity: remindersOn ? 1 : 0.4 }}>
                <View style={styles.divider} />
                <Row
                  icon="time-outline"
                  label={d.dayName}
                  right={
                    <View style={[styles.row, { gap: spacing.sm }]}>
                      <IconButton icon="remove" onPress={() => setReminderTime(d.id, shiftTime(time, -30))} />
                      <T variant="heading" style={{ width: 52, textAlign: 'center' }}>
                        {time}
                      </T>
                      <IconButton icon="add" onPress={() => setReminderTime(d.id, shiftTime(time, 30))} />
                    </View>
                  }
                />
              </View>
            );
          })}
        </Card>
        <T variant="caption" muted>
          Tímarnir vistast. Tilkynningarnar sjálfar verða virkjaðar í næsta skrefi.
        </T>
      </Section>

      <Section title="Gögn">
        <Card style={{ gap: spacing.md }}>
          <Row icon="phone-portrait-outline" label="Vistað á þessu tæki" />
          <Button
            label={confirmReset ? 'Ýttu aftur til að staðfesta' : 'Eyða öllum gögnum'}
            variant="danger"
            icon="trash-outline"
            onPress={() => {
              if (confirmReset) {
                resetAll();
                setConfirmReset(false);
              } else {
                setConfirmReset(true);
              }
            }}
          />
        </Card>
      </Section>

      <Section title="Um appið">
        <Card>
          <Row icon="information-circle-outline" label="Útgáfa" right={<T muted>0.2.0</T>} />
        </Card>
      </Section>
    </Screen>
  );
}
