import { Pressable, StyleSheet } from 'react-native';
import { colors } from '../theme';
import { Spinner } from './primitives/Spinner';
import { Text } from './primitives/Text';

type Variant = 'primary' | 'secondary' | 'alert' | 'ghost';

interface StyledButtonProps {
  label: string;
  onPress: () => void;
  variant?: Variant;
  size?: 'md' | 'lg';
  isLoading?: boolean;
  testID?: string;
}

const textColor: Record<Variant, string> = {
  primary: colors.white,
  alert: colors.white,
  secondary: colors.ink,
  ghost: colors.muted,
};

export function StyledButton({
  label,
  onPress,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  testID,
}: StyledButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={isLoading}
      accessibilityRole="button"
      style={({ pressed }) => [
        styles.base,
        styles[size],
        styles[variant],
        pressed && styles.pressed,
        isLoading && styles.disabled,
      ]}
      testID={testID}
    >
      {isLoading ? (
        <Spinner size="small" color={textColor[variant]} />
      ) : (
        <Text
          size={size === 'lg' ? 'lg' : 'md'}
          weight={variant === 'ghost' ? 'medium' : 'bold'}
          color={textColor[variant]}
        >
          {label}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: { alignItems: 'center', justifyContent: 'center', paddingHorizontal: 16 },
  md: { height: 48, borderRadius: 14 },
  lg: { height: 60, borderRadius: 16 },
  primary: { backgroundColor: colors.sea },
  alert: { backgroundColor: colors.alert },
  secondary: { borderWidth: 2, borderColor: colors.ink },
  ghost: { height: 44 },
  pressed: { opacity: 0.85 },
  disabled: { opacity: 0.5 },
});