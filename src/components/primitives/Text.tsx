import { Text as RNText, StyleSheet } from 'react-native';
import { colors, fonts } from '../../theme';

interface TextProps {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  weight?: 'normal' | 'medium' | 'bold';
  heading?: boolean;
  color?: string;
  align?: 'left' | 'center' | 'right';
  numberOfLines?: number;
}

export function Text({
  children,
  size = 'md',
  weight = 'normal',
  heading = false,
  color,
  align = 'left',
  numberOfLines,
}: TextProps) {
  return (
    <RNText
      style={[
        styles.base,
        styles[size],
        { fontFamily: fontFor(heading, weight), textAlign: align },
        color !== undefined && { color },
      ]}
      numberOfLines={numberOfLines}
    >
      {children}
    </RNText>
  );
}

function fontFor(heading: boolean, weight: 'normal' | 'medium' | 'bold'): string {
  if (heading) return fonts.heading;
  if (weight === 'bold') return fonts.bodyBold;
  if (weight === 'medium') return fonts.bodyMedium;
  return fonts.body;
}

const styles = StyleSheet.create({
  base: { color: colors.ink },
  sm: { fontSize: 12, lineHeight: 16 },
  md: { fontSize: 14, lineHeight: 20 },
  lg: { fontSize: 17, lineHeight: 24 },
  xl: { fontSize: 28, lineHeight: 32 },
});