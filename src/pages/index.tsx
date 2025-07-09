import * as React from 'react';
import { useRouter } from 'next/router';
import { AppProvider } from '@toolpad/core/AppProvider';
import {
  AuthResponse,
  SignInPage,
  type AuthProvider,
} from '@toolpad/core/SignInPage';
import { useTheme } from '@mui/material/styles';
import { useNotifications } from '../lib/notifications';

const providers = [
  { id: 'github', name: 'GitHub' },
  { id: 'google', name: 'Google' },
  { id: 'facebook', name: 'Facebook' },
  { id: 'twitter', name: 'Twitter' },
  { id: 'linkedin', name: 'LinkedIn' },
];

export default function OAuthSignInPage() {
  const theme = useTheme();
  const router = useRouter();
  const { showNotification } = useNotifications();

  const signIn: (provider: AuthProvider) => void | Promise<AuthResponse> = async (
    provider,
  ) => {
    const promise = new Promise<AuthResponse>((resolve) => {
      setTimeout(() => {
        console.log(`Sign in with ${provider.id}`);
        
        showNotification(`Successfully signed in with ${provider.name}!`, 'success');
        
        setTimeout(() => {
          router.push('/dashboard');
        }, 1000);
        
        resolve({ type: 'CredentialsSignin' });
      }, 500);
    });
    return promise;
  };

  return (
    <AppProvider theme={theme}>
      <SignInPage signIn={signIn} providers={providers} />
    </AppProvider>
  );
}