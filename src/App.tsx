import { useState, useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import { LoginForm } from './components/auth/LoginForm';
import { RegisterForm } from './components/auth/RegisterForm';
import { UserProfile } from './components/auth/UserProfile';
import { useAuth } from './context/AuthContext';
import { Navbar } from './components/ui/Navbar';
import { ProtectedRoute } from './components/auth/ProtectedRoute';

// Simple router component
function useRouter() {
  const [path, setPath] = useState(window.location.pathname);
  
  useEffect(() => {
    const handleLocationChange = () => {
      setPath(window.location.pathname);
    };

    window.addEventListener('popstate', handleLocationChange);
    
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  // Navigation function
  const navigate = (to: string) => {
    window.history.pushState({}, '', to);
    setPath(to);
  };

  return { path, navigate };
}

// Home component
function Home() {
  const { user, isLoading } = useAuth();
  const { navigate } = useRouter();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-64px)]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (user) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user.name}!</h1>
          <p className="text-gray-500 mt-2">You are logged in to CallOut</p>
        </div>
        <div className="flex justify-center">
          <button 
            onClick={() => navigate('/profile')}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium transition-colors"
          >
            View Profile
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to CallOut</h1>
        <p className="text-xl text-gray-500">The international calling service for everyone</p>
      </div>
      <div className="flex justify-center gap-4">
        <button 
          onClick={() => navigate('/login')}
          className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium transition-colors"
        >
          Login
        </button>
        <button 
          onClick={() => navigate('/register')}
          className="px-6 py-3 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 font-medium transition-colors"
        >
          Register
        </button>
      </div>
    </div>
  );
}

// Main App component
function AppContent() {
  const { path, navigate } = useRouter();

  const handleAuthSuccess = () => {
    navigate('/');
  };

  return (
    <>
      <Navbar navigate={navigate} />
      <main className="min-h-[calc(100vh-64px)] py-8 bg-gray-50">
        {path === '/' && <Home />}
        {path === '/login' && (
          <div className="container mx-auto px-4 py-8">
            <LoginForm onSuccess={handleAuthSuccess} />
          </div>
        )}
        {path === '/register' && (
          <div className="container mx-auto px-4 py-8">
            <RegisterForm onSuccess={handleAuthSuccess} />
          </div>
        )}
        {path === '/profile' && (
          <ProtectedRoute>
            <div className="container mx-auto px-4 py-8">
              <UserProfile />
            </div>
          </ProtectedRoute>
        )}
      </main>
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50 text-gray-900">
        <AppContent />
      </div>
    </AuthProvider>
  );
}

