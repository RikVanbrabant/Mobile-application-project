import { useState } from 'react';
import { useAuthStore } from '../../state/useAuthStore';
import { colors } from '../../theme';
import { InputField } from '../primitives/InputField';
import { Stack } from '../primitives/Stack';
import { Text } from '../primitives/Text';
import { StyledButton } from '../StyledButton';

interface LoginFormProps {
  initialEmail?: string;
  notice?: string;
}

export function LoginForm({ initialEmail = '', notice }: LoginFormProps) {
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | undefined>(undefined);
  const { login, isLoading } = useAuthStore();

  const handleLogin = async () => {
    if (email.trim() === '' || password === '') {
      setError('Vul je e-mailadres en wachtwoord in.');
      return;
    }
    setError(undefined);
    try {
      await login(email.trim(), password);
    } catch (error: unknown) {
      console.error('Login-fout:', error);
      setError('Inloggen mislukt. Controleer je e-mailadres en wachtwoord.');
    }
  };

  return (
    <Stack gap="md">
      {notice !== undefined && <Text weight="medium" color={colors.sea}>{notice}</Text>}
      <InputField
        label="E-mailadres"
        value={email}
        onChangeText={setEmail}
        placeholder="jij@voorbeeld.be"
        keyboardType="email-address"
        testID="email-input"
      />
      <InputField
        label="Wachtwoord"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        error={error}
        testID="password-input"
      />
      <StyledButton
        label="Inloggen"
        size="lg"
        onPress={() => void handleLogin()}
        isLoading={isLoading}
        testID="login-button"
      />
    </Stack>
  );
}