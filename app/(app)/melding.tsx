import { StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { Card } from '../../src/components/primitives/Card';
import { Row } from '../../src/components/primitives/Row';
import { Screen } from '../../src/components/primitives/Screen';
import { Stack } from '../../src/components/primitives/Stack';
import { Text } from '../../src/components/primitives/Text';
import { InfoTile } from '../../src/components/InfoTile';
import { PhotoPlaceholder } from '../../src/components/PhotoPlaceholder';
import { StyledButton } from '../../src/components/StyledButton';
import { colors } from '../../src/theme';

/** Screen 5 – what other users in the same municipality see. */
export default function MeldingScreen() {
  return (
    <Screen padding="lg">
      {/* top part and bottom part, pushed apart like margin-top: auto in the mockup */}
      <Stack flex={1} justify="space-between" gap="lg">
        <Stack gap="lg">
          <Row gap="sm">
            <View style={styles.dot} />
            <Text size="sm" weight="bold" color={colors.alertDark}>KIND VERMIST IN KOKSIJDE</Text>
          </Row>

          <Text size="xl" heading>Heb je dit meisje gezien?</Text>

          <Card>
            <Stack gap="md">
              <PhotoPlaceholder />
              <Stack>
                <Text size="lg" weight="bold">Lotte, 6 jaar</Text>
                <Text color={colors.muted}>
                  Geel badpak met witte stippen, blauwe pet, blond haar in een staartje. Heeft een roze emmertje bij.
                </Text>
              </Stack>
              <Row gap="sm" align="stretch">
                <InfoTile label="Waar" value="Sint-Idesbald, redderspost 4" />
                <InfoTile label="Laatst gezien" value="14:32" />
              </Row>
            </Stack>
          </Card>
        </Stack>

        <Stack gap="sm">
          <StyledButton label="Ik heb dit kind gezien" variant="alert" size="lg" onPress={() => {}} />
          <StyledButton label="Sluiten" variant="ghost" onPress={() => router.navigate('/')} />
          <Text size="sm" color={colors.muted} align="center">
            De melding en foto verdwijnen zodra het kind gevonden is.
          </Text>
        </Stack>
      </Stack>
    </Screen>
  );
}

const styles = StyleSheet.create({
  dot: { width: 12, height: 12, borderRadius: 6, backgroundColor: colors.alert },
});