import { StyleSheet, View } from 'react-native';
import { colors } from '../theme';
import { Badge } from './primitives/Badge';
import { Card } from './primitives/Card';
import { Row } from './primitives/Row';
import { Text } from './primitives/Text';

interface ReportListItemProps {
  title: string;
  subtitle: string;
  onPress: () => void;
}

export function ReportListItem({ title, subtitle, onPress }: ReportListItemProps) {
  return (
    <Card onPress={onPress}>
      <Row gap="sm">
        <View style={styles.photo}>
          <Text size="sm" color={colors.muted}>[Foto]</Text>
        </View>
        <View style={styles.text}>
          <Text weight="bold">{title}</Text>
          <Text size="sm" color={colors.muted}>{subtitle}</Text>
        </View>
        <View>
          <Badge label="Vermist" variant="error" />
        </View>
      </Row>
    </Card>
  );
}

const styles = StyleSheet.create({
  photo: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: colors.photo,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: { flex: 1, gap: 2 },
});