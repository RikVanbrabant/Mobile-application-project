import { StyleSheet, View } from 'react-native';
import { colors } from '../theme';
import { Spinner } from './primitives/Spinner';

export function LoadingScreen() {
  return (
    <View style={styles.base}>
      <Spinner size="large" color={colors.sea} />
    </View>
  );
}

const styles = StyleSheet.create({
  base: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.sand },
});