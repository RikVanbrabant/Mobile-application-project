import { Redirect, Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { BottomNav } from '../../src/components/BottomNav';
import { LoadingScreen } from '../../src/components/LoadingScreen';
import { useAuthStore } from '../../src/state/useAuthStore';

export default function AppLayout() {
  const { isAuthenticated, isInitializing } = useAuthStore();

  if (isInitializing) return <LoadingScreen />;
  if (!isAuthenticated) return <Redirect href="/login" />;

  return (
    <View style={styles.container}>
      <Stack screenOptions={{ headerShown: false }} />
      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});