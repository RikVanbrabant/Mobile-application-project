import { Pressable, StyleSheet } from 'react-native';
import { colors } from '../../theme';
import { Icon, type IoniconsName } from './Icon';
import { Text } from './Text';

interface NavItemProps {
  label: string;
  onPress: () => void;
  active?: boolean;
  icon?: IoniconsName;
}

export function NavItem({ label, onPress, active = false, icon }: NavItemProps) {
  const color = active ? colors.sea : colors.muted;

  return (
    <Pressable
      onPress={onPress}
      style={styles.base}
      accessibilityRole="tab"
      accessibilityState={{ selected: active }}
    >
      {icon !== undefined && <Icon name={icon} size={24} color={color} />}
      <Text size="sm" weight={active ? 'bold' : 'medium'} color={color}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    flex: 1,
    minHeight: 56,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
});