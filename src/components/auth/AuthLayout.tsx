import { Pressable, StyleSheet } from 'react-native';
import { colors } from '../../theme';
import { Card } from '../primitives/Card';
import { Screen } from '../primitives/Screen';
import { Stack } from '../primitives/Stack';
import { Text } from '../primitives/Text';

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  switchText: string;
  switchLabel: string;
  onSwitch: () => void;
}

export function AuthLayout({ title, subtitle, children, switchText, switchLabel, onSwitch }: AuthLayoutProps) {
  return (
    <Screen padding="lg">
      <Stack flex={1} justify="center" gap="lg">
        <Stack>
          <Text size="xl" heading>{title}</Text>
          <Text color={colors.muted}>{subtitle}</Text>
        </Stack>

        <Card>{children}</Card>

        <Pressable onPress={onSwitch} accessibilityRole="link" style={styles.link}>
          <Text align="center" color={colors.muted}>
            {switchText}{' '}
            <Text weight="bold" color={colors.sea}>{switchLabel}</Text>
          </Text>
        </Pressable>
      </Stack>
    </Screen>
  );
}

const styles = StyleSheet.create({
  link: { minHeight: 44, justifyContent: 'center' },
});