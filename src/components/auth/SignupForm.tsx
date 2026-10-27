import { useState } from 'react';
import { useAuthStore } from '../../state/useAuthStore';
import { InputField } from '../primitives/InputField';
import { Stack } from '../primitives/Stack';
import { StyledButton } from '../StyledButton';

interface SignupFormProps {
  onSignedUp: (email: string) => void;
}

export function SignupForm({ onSignedUp }: SignupFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | undefined>(undefined);
  const { signup, isLoading } = useAuthStore();

  const handleSignup = async () => {
    if (name.trim() === '' || email.trim() === '' || password === '') {
      setError('Vul alle velden in.');
      return;
    }
    if (password.length < 6) {
      setError('Kies een wachtwoord van minstens 6 tekens.');
      return;
    }
    setError(undefined);
    try {
      await signup(name.trim(), email.trim(), password);
      onSignedUp(email.trim());
    } catch (error: unknown) {
      console.error('Signup-fout:', error);
      setError('Account maken mislukt. Misschien bestaat dit e-mailadres al.');
    }
  };

  return (
    <Stack gap="md">
      <InputField
        label="Naam"
        value={name}
        onChangeText={setName}
        placeholder="bv. Lotte Peeters"
        autoCapitalize="words"
        testID="name-input"
      />
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
        placeholder="Minstens 6 tekens"
        secureTextEntry
        error={error}
        testID="password-input"
      />
      <StyledButton
        label="Account maken"
        size="lg"
        onPress={() => void handleSignup()}
        isLoading={isLoading}
        testID="signup-button"
      />
    </Stack>
  );
}