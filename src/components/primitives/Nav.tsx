import { View, StyleSheet } from 'react-native';
import { colors } from '../../theme';

interface NavProps {
  children: React.ReactNode;
}

export function Nav({ children }: NavProps) {
  return <View style={styles.base}>{children}</View>;
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.line,
  },
});