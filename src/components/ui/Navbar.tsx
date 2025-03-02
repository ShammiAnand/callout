import { useAuth } from '@/context/AuthContext';

interface NavbarProps {
  navigate: (path: string) => void;
}

export function Navbar({ navigate }: NavbarProps) {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <h1 
            className="text-2xl font-bold text-gray-900 cursor-pointer hover:text-blue-600 transition-colors" 
            onClick={() => navigate('/')}
          >
            {import.meta.env.VITE_APP_NAME || 'CallOut'}
          </h1>
          
          <nav>
            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <button 
                    onClick={() => navigate('/profile')}
                    className="btn btn-secondary"
                  >
                    Profile
                  </button>
                  <button 
                    onClick={handleLogout}
                    className="btn btn-outline"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button 
                    onClick={() => navigate('/login')}
                    className="btn btn-secondary"
                  >
                    Login
                  </button>
                  <button 
                    onClick={() => navigate('/register')}
                    className="btn btn-primary"
                  >
                    Register
                  </button>
                </>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
} 