import { View, StyleSheet } from 'react-native';

interface StackProps {
  children: React.ReactNode;
  gap?: 'none' | 'sm' | 'md' | 'lg';
  align?: 'flex-start' | 'center' | 'flex-end' | 'stretch';
  justify?: 'flex-start' | 'center' | 'flex-end' | 'space-between';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  flex?: number;
}

export function Stack({
  children,
  gap = 'none',
  align = 'stretch',
  justify = 'flex-start',
  padding = 'none',
  flex,
}: StackProps) {
  return (
    <View
      style={[
        styles.base,
        styles[`gap_${gap}` as keyof typeof styles],
        styles[`padding_${padding}` as keyof typeof styles],
        { alignItems: align, justifyContent: justify },
        flex !== undefined && { flex },
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: { flexDirection: 'column' },
  gap_none: {},
  gap_sm: { gap: 10 },
  gap_md: { gap: 14 },
  gap_lg: { gap: 16 },
  padding_none: {},
  padding_sm: { padding: 10 },
  padding_md: { padding: 14 },
  padding_lg: { padding: 20 },
});