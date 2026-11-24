import { Ionicons } from '@expo/vector-icons';
import { ReactNode, useState } from 'react';
import { Switch, View } from 'react-native';
import { Badge, Card, Screen, Section, T, styles } from '@/components/ui';
import { weeklyPlan } from '@/data/plan';
import { colors, radius, spacing } from '@/theme';

function Row({ icon, label, value, right }: { icon: keyof typeof Ionicons.glyphMap; label: string; value?: string; right?: ReactNode }) {
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
      {value ? <T muted>{value}</T> : null}
      {right}
    </View>
  );
}

export default function Stillingar() {
  const [notifications, setNotifications] = useState(true);

  return (
    <Screen title="Stillingar" subtitle="Áminningar og öryggi">
      <Section title="Áminningar">
        <Card>
          <Row
            icon="notifications-outline"
            label="Æfingaáminningar"
            right={
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                trackColor={{ true: colors.accent, false: colors.surfaceHigh }}
                thumbColor={colors.text}
              />
            }
          />
          {weeklyPlan.map((d) => (
            <View key={d.id}>
              <View style={styles.divider} />
              <Row icon="time-outline" label={d.dayName} value="16:00" />
            </View>
          ))}
        </Card>
        <T variant="caption" muted>
          Tilkynningar og breyting á tíma bætast við í næsta skrefi.
        </T>
      </Section>

      <Section title="Endurhæfing">
        <Card style={{ borderColor: colors.warning, borderWidth: 1 }}>
          <View style={[styles.row, { alignItems: 'flex-start' }]}>
            <Ionicons name="shield-checkmark-outline" size={22} color={colors.warning} />
            <View style={{ flex: 1, gap: spacing.sm }}>
              <T variant="heading">Krefst samþykkis sjúkraþjálfara</T>
              <T muted>
                Engar endurhæfingaræfingar eru fyrirfram skráðar. Æfingar eru slegnar inn eftir fyrirmælum
                sjúkraþjálfara og verða ekki virkar fyrr en samþykki hefur verið skráð.
              </T>
              <Badge label="0 æfingar · óvirkt" tone="warning" />
            </View>
          </View>
        </Card>
      </Section>

      <Section title="Um appið">
        <Card>
          <Row icon="information-circle-outline" label="Útgáfa" value="0.1.0" />
          <View style={styles.divider} />
          <Row icon="phone-portrait-outline" label="Gögn" value="Vistuð á tæki" />
        </Card>
      </Section>
    </Screen>
  );
}
