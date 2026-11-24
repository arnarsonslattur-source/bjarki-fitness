// Bjarki Fitness – hönnunarkerfi (dökkt þema)

export const colors = {
  bg: '#0B0D10',
  surface: '#14171C',
  surfaceHigh: '#1C2027',
  border: '#262B33',
  text: '#F4F5F7',
  textMuted: '#9AA3AF',
  textFaint: '#5F6875',
  accent: '#C6F432', // lime – aðallitur
  accentDim: 'rgba(198, 244, 50, 0.14)',
  success: '#3DDC97',
  warning: '#FFB547',
  warningDim: 'rgba(255, 181, 71, 0.14)',
  danger: '#FF5C5C',
  dangerDim: 'rgba(255, 92, 92, 0.14)',
};

export const spacing = { xs: 4, sm: 8, md: 12, lg: 16, xl: 24, xxl: 32 };

export const radius = { sm: 8, md: 14, lg: 20, pill: 999 };

export const type = {
  display: { fontSize: 32, fontWeight: '800' as const, letterSpacing: -0.5 },
  title: { fontSize: 22, fontWeight: '700' as const, letterSpacing: -0.3 },
  heading: { fontSize: 17, fontWeight: '600' as const },
  body: { fontSize: 15, fontWeight: '400' as const },
  label: { fontSize: 13, fontWeight: '600' as const },
  caption: { fontSize: 12, fontWeight: '500' as const, letterSpacing: 0.4 },
};
