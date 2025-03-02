import { createContext, useContext, useEffect, useState } from 'react';
import { pb, type Admin, type Record } from '@/lib/pocketbase';

type AuthUser = Record | Admin | null;

interface AuthContextType {
  user: AuthUser;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, passwordConfirm: string, name: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser>(pb.authStore.model);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Check if user is authenticated on mount
  useEffect(() => {
    // Set the initial auth state
    setUser(pb.authStore.model);
    setIsLoading(false);

    // Subscribe to auth state changes
    const unsubscribe = pb.authStore.onChange((token: string, model: any) => {
      setUser(model);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    try {
      await pb.collection('users').authWithPassword(email, password);
    } catch (error) {
      console.error('Login error:', error);
      
      // Provide more specific error messages
      if (error instanceof Error) {
        if (error.message.includes('Failed to fetch')) {
          throw new Error('Could not connect to the server. Please check if Pocketbase is running.');
        }
        throw error;
      }
      throw new Error('An unknown error occurred during login');
    }
  };

  // Register function
  const register = async (email: string, password: string, passwordConfirm: string, name: string) => {
    try {
      console.log('Registering user with data:', { email, name, password: '***', passwordConfirm: '***' });
      
      const data = {
        email,
        password,
        passwordConfirm,
        name,
      };
      
      const createdUser = await pb.collection('users').create(data);
      console.log('User created successfully:', createdUser);
      
      // Login after successful registration
      await login(email, password);
    } catch (error) {
      console.error('Registration error:', error);
      
      // Provide more specific error messages
      if (error instanceof Error) {
        if (error.message.includes('Failed to fetch')) {
          throw new Error('Could not connect to the server. Please check if Pocketbase is running.');
        } else if (error.message.includes('email')) {
          throw new Error('Email validation failed or already in use');
        } else if (error.message.includes('password')) {
          throw new Error('Password validation failed. Ensure it meets the requirements.');
        }
        throw error;
      }
      throw new Error('An unknown error occurred during registration');
    }
  };

  // Logout function
  const logout = () => {
    pb.authStore.clear();
  };

  const value = {
    user,
    isLoading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 