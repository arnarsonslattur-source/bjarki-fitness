import { ReactNode } from 'react';
import { ScrollView, StyleSheet, Text, TextProps, View, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, radius, spacing, type } from '@/theme';

type Variant = keyof typeof type;

export function T({
  variant = 'body',
  muted,
  color,
  style,
  ...rest
}: TextProps & { variant?: Variant; muted?: boolean; color?: string }) {
  return (
    <Text
      {...rest}
      style={[type[variant], { color: color ?? (muted ? colors.textMuted : colors.text) }, style]}
    />
  );
}

export function Screen({ title, subtitle, children }: { title: string; subtitle?: string; children: ReactNode }) {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          {subtitle ? (
            <T variant="caption" muted style={styles.upper}>
              {subtitle}
            </T>
          ) : null}
          <T variant="display">{title}</T>
        </View>
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}

export function Card({ children, style, highlight }: { children: ReactNode; style?: ViewStyle; highlight?: boolean }) {
  return <View style={[styles.card, highlight && styles.cardHighlight, style]}>{children}</View>;
}

export function Section({ title, children, right }: { title: string; children: ReactNode; right?: ReactNode }) {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHead}>
        <T variant="caption" muted style={styles.upper}>
          {title}
        </T>
        {right}
      </View>
      {children}
    </View>
  );
}

type Tone = 'accent' | 'warning' | 'danger' | 'neutral';
const toneMap: Record<Tone, { bg: string; fg: string }> = {
  accent: { bg: colors.accentDim, fg: colors.accent },
  warning: { bg: colors.warningDim, fg: colors.warning },
  danger: { bg: colors.dangerDim, fg: colors.danger },
  neutral: { bg: colors.surfaceHigh, fg: colors.textMuted },
};

export function Badge({ label, tone = 'neutral' }: { label: string; tone?: Tone }) {
  const t = toneMap[tone];
  return (
    <View style={[styles.badge, { backgroundColor: t.bg }]}>
      <T variant="caption" color={t.fg}>
        {label}
      </T>
    </View>
  );
}

export function Stat({ value, label }: { value: string; label: string }) {
  return (
    <View style={styles.stat}>
      <T variant="title">{value}</T>
      <T variant="caption" muted>
        {label}
      </T>
    </View>
  );
}

export const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  scroll: { padding: spacing.lg, paddingBottom: spacing.xxl * 2 },
  header: { marginBottom: spacing.xl, marginTop: spacing.sm, gap: spacing.xs },
  upper: { textTransform: 'uppercase' },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    padding: spacing.lg,
  },
  cardHighlight: { borderColor: colors.accent, borderWidth: 1 },
  section: { marginBottom: spacing.xl, gap: spacing.md },
  sectionHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: radius.pill,
  },
  stat: { flex: 1, gap: 2 },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  divider: { height: StyleSheet.hairlineWidth, backgroundColor: colors.border, marginVertical: spacing.md },
});
