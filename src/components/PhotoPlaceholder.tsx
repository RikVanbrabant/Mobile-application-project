import { StyleSheet, View } from 'react-native';
import { colors } from '../theme';
import { Text } from './primitives/Text';

interface PhotoPlaceholderProps {
  height?: number;
  label?: string;
}

export function PhotoPlaceholder({ height = 200, label = '[Foto, indien toegevoegd]' }: PhotoPlaceholderProps) {
  return (
    <View style={[styles.base, { height }]}>
      <Text color={colors.muted}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 14,
    backgroundColor: colors.photoSoft,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: colors.photoBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
});