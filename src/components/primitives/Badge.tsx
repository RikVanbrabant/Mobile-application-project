import { View, StyleSheet } from 'react-native';
import { colors } from '../../theme';
import { Text } from './Text';

type Variant = 'default' | 'success' | 'warning' | 'error';

interface BadgeProps {
  label: string;
  variant?: Variant;
}

const textColor: Record<Variant, string> = {
  default: colors.ink,
  success: '#166534',
  warning: '#92400E',
  error: colors.alertDark,
};

export function Badge({ label, variant = 'default' }: BadgeProps) {
  return (
    <View style={[styles.base, styles[variant]]}>
      <Text size="sm" weight="bold" color={textColor[variant]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  default: { backgroundColor: colors.seaSoft },
  success: { backgroundColor: '#D1FAE5' },
  warning: { backgroundColor: '#FEF3C7' },
  error: { backgroundColor: colors.alertSoft },
});