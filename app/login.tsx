import { Redirect, router, useLocalSearchParams } from 'expo-router';
import { AuthLayout } from '../src/components/auth/AuthLayout';
import { LoginForm } from '../src/components/auth/LoginForm';
import { useAuthStore } from '../src/state/useAuthStore';

export default function LoginScreen() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const { email, created } = useLocalSearchParams<{ email?: string; created?: string }>();

  if (isAuthenticated) return <Redirect href="/" />;

  return (
    <AuthLayout
      title="Strandmaatje"
      subtitle="Log in om de meldingen in jouw kustgemeente te zien."
      switchText="Nog geen account?"
      switchLabel="Account maken"
      onSwitch={() => router.push('/signup')}
    >
      <LoginForm
        initialEmail={typeof email === 'string' ? email : ''}
        notice={created === 'true' ? 'Account aangemaakt. Je kan nu inloggen.' : undefined}
      />
    </AuthLayout>
  );
}