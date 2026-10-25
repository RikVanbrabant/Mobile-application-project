import { Screen } from '../../src/components/primitives/Screen';
import { Stack } from '../../src/components/primitives/Stack';
import { Text } from '../../src/components/primitives/Text';
import { Card } from '../../src/components/primitives/Card';
import { colors } from '../../src/theme';

export default function MeldingScreen() {
  return (
    <Screen padding="lg">
      <Stack gap="md">
        <Text size="sm" weight="bold" color={colors.alertDark}>KIND VERMIST IN KOKSIJDE</Text>
        <Text size="xl" heading>Heb je dit meisje gezien?</Text>

        <Card>
          <Stack gap="md">
            {/* foto-placeholder komt hier */}
            <Text size="lg" weight="bold">Lotte, 6 jaar</Text>
            <Text color={colors.muted}>
              Geel badpak met witte stippen, blauwe pet, blond haar in een staartje. Heeft een roze emmertje bij.
            </Text>
            {/* de twee vakjes "Waar" en "Laatst gezien" komen hier */}
          </Stack>
        </Card>

        {/* de knoppen "Ik heb dit kind gezien" en "Sluiten" komen hier */}
      </Stack>
    </Screen>
  );
}