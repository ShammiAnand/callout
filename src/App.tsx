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
      <div className="container mx-auto px-6 py-12">
        <div className="card max-w-2xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Welcome back, {user.name}!</h1>
          <p className="text-gray-500 mb-8">You are logged in to CallOut</p>
          <button
            onClick={() => navigate('/profile')}
            className="btn btn-primary"
          >
            View Profile
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Welcome to CallOut</h1>
          <p className="text-xl text-gray-600 mb-10">The international calling service for everyone</p>
          <div className="flex justify-center gap-6">
            <button
              onClick={() => navigate('/login')}
              className="btn btn-primary px-8 py-3 text-lg"
            >
              Login
            </button>
            <button
              onClick={() => navigate('/register')}
              className="btn btn-secondary px-8 py-3 text-lg"
            >
              Register
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          <div className="card text-center hover:shadow-lg transition-shadow">
            <div className="text-blue-500 text-5xl mb-6">💰</div>
            <h3 className="text-xl font-semibold mb-3">Affordable Rates</h3>
            <p className="text-gray-600">Make international calls at a fraction of carrier costs</p>
          </div>

          <div className="card text-center hover:shadow-lg transition-shadow">
            <div className="text-blue-500 text-5xl mb-6">🌐</div>
            <h3 className="text-xl font-semibold mb-3">Global Coverage</h3>
            <p className="text-gray-600">Call any country with reliable connections</p>
          </div>

          <div className="card text-center hover:shadow-lg transition-shadow">
            <div className="text-blue-500 text-5xl mb-6">📱</div>
            <h3 className="text-xl font-semibold mb-3">Use Any Device</h3>
            <p className="text-gray-600">Works on desktop, tablet, or mobile browser</p>
          </div>
        </div>
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
      <main className="min-h-[calc(100vh-64px)] bg-gray-50 py-8">
        {path === '/' && <Home />}
        {path === '/login' && (
          <div className="container mx-auto px-6 py-8">
            <LoginForm onSuccess={handleAuthSuccess} />
          </div>
        )}
        {path === '/register' && (
          <div className="container mx-auto px-6 py-8">
            <RegisterForm onSuccess={handleAuthSuccess} />
          </div>
        )}
        {path === '/profile' && (
          <ProtectedRoute>
            <div className="container mx-auto px-6 py-8">
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
      <div className="min-h-screen bg-white">
        <AppContent />
      </div>
    </AuthProvider>
  );
}

