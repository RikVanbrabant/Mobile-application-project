import { View, StyleSheet } from 'react-native';
import { router, usePathname, type Href } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Nav } from './primitives/Nav';
import { NavItem } from './primitives/NavItem';
import type { IoniconsName } from './primitives/Icon';
import { colors } from '../theme';

interface Tab {
  label: string;
  icon: IoniconsName;
  href: Href;
}

const TABS: Tab[] = [
  { label: 'Start', icon: 'home-outline', href: '/' },
  { label: 'Meldingen', icon: 'notifications-outline', href: '/melding' },
  { label: 'Mijn melding', icon: 'person-outline', href: '/actief' },
];

export function BottomNav() {
  const pathname = usePathname();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.wrapper, { paddingBottom: insets.bottom }]}>
      <Nav>
        {TABS.map((tab) => (
          <NavItem
            key={tab.label}
            label={tab.label}
            icon={tab.icon}
            active={pathname === tab.href}
            onPress={() => router.navigate(tab.href)}
          />
        ))}
      </Nav>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { backgroundColor: colors.white },
});