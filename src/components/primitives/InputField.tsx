import { TextInput, View, StyleSheet } from 'react-native';
import { colors, fonts } from '../../theme';
import { Text } from './Text';

interface InputFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  error?: string;
  keyboardType?: 'default' | 'email-address';
  autoCapitalize?: 'none' | 'sentences' | 'words';
  testID?: string;
}

export function InputField({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  error,
  keyboardType = 'default',
  autoCapitalize = 'none',
  testID,
}: InputFieldProps) {
  return (
    <View style={styles.container}>
      <Text size="sm" weight="bold">{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.muted}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        accessibilityLabel={label}
        style={[styles.input, error !== undefined && styles.inputError]}
        testID={testID}
      />
      {error !== undefined && <Text size="sm" weight="medium" color={colors.alert}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 6 },
  input: {
    height: 48,
    paddingHorizontal: 14,
    borderRadius: 12,
    backgroundColor: colors.sand,
    borderWidth: 2,
    borderColor: colors.sand,
    fontFamily: fonts.body,
    fontSize: 15,
    color: colors.ink,
  },
  inputError: { borderColor: colors.alert },
});