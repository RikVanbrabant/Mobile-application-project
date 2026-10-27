import { Linking, Pressable, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { Card } from '../../src/components/primitives/Card';
import { Row } from '../../src/components/primitives/Row';
import { Screen } from '../../src/components/primitives/Screen';
import { Stack } from '../../src/components/primitives/Stack';
import { Text } from '../../src/components/primitives/Text';
import { ReportListItem } from '../../src/components/ReportListItem';
import { StyledButton } from '../../src/components/StyledButton';
import { colors } from '../../src/theme';

export default function HomeScreen() {
  return (
    <Screen padding="lg">
      <Stack flex={1} justify="space-between" gap="lg">
        <Stack gap="lg">
          <Stack>
            <Text size="xl" heading>Strandmaatje</Text>
            <Text color={colors.muted}>Samen vermiste kinderen terugvinden aan de kust</Text>
          </Stack>

          <Card>
            <Row justify="space-between">
              <Stack>
                <Text size="sm" color={colors.muted}>Jouw kustgemeente</Text>
                <Text size="lg" weight="bold">Koksijde</Text>
              </Stack>
              {/* changing the municipality comes later */}
              <StyledButton label="Wijzigen" variant="soft" onPress={() => {}} />
            </Row>
          </Card>

          <Stack gap="sm">
            <Text size="lg" weight="bold">Actieve meldingen in Koksijde</Text>
            <ReportListItem
              title="Meisje, 6 jaar"
              subtitle="Sint-Idesbald · laatst gezien 14:32"
              onPress={() => router.navigate('/melding')}
            />
            <Text size="sm" color={colors.muted}>
              Je krijgt een melding zodra er in jouw gemeente een nieuwe bijkomt.
            </Text>
          </Stack>
        </Stack>

        <Stack gap="sm">
          <StyledButton
            label="Kind vermist melden"
            subtitle="Duurt minder dan een minuut"
            variant="alert"
            size="xl"
            onPress={() => {}}
          />
          <Pressable
            onPress={() => void Linking.openURL('tel:112')}
            accessibilityRole="link"
            style={styles.emergency}
          >
            <Text size="sm" color={colors.muted} align="center">
              Bij direct gevaar, bv. in het water: bel eerst <Text size="sm" weight="bold">112</Text>
            </Text>
          </Pressable>
        </Stack>
      </Stack>
    </Screen>
  );
}

const styles = StyleSheet.create({
  emergency: { minHeight: 44, justifyContent: 'center' },
});