import { Redirect, router } from 'expo-router';
import { AuthLayout } from '../src/components/auth/AuthLayout';
import { SignupForm } from '../src/components/auth/SignupForm';
import { useAuthStore } from '../src/state/useAuthStore';

export default function SignupScreen() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (isAuthenticated) return <Redirect href="/" />;

  return (
    <AuthLayout
      title="Account maken"
      subtitle="Je start als bezoeker. Redders krijgen hun rol van een beheerder."
      switchText="Heb je al een account?"
      switchLabel="Inloggen"
      onSwitch={() => router.replace('/login')}
    >
      <SignupForm
        onSignedUp={(email) =>
          router.replace({ pathname: '/login', params: { email, created: 'true' } })
        }
      />
    </AuthLayout>
  );
}