import { StyleSheet, View } from 'react-native';
import { colors } from '../theme';
import { Text } from './primitives/Text';

interface InfoTileProps {
  label: string;
  value: string;
}

export function InfoTile({ label, value }: InfoTileProps) {
  return (
    <View style={styles.base}>
      <Text size="sm" color={colors.muted}>{label}</Text>
      <Text weight="bold">{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    flex: 1,
    backgroundColor: colors.sand,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    gap: 2,
  },
});