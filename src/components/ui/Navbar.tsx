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
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <h1 
            className="text-2xl font-bold text-gray-900 cursor-pointer" 
            onClick={() => navigate('/')}
          >
            {import.meta.env.VITE_APP_NAME || 'CallOut'}
          </h1>
        </div>
        <nav>
          <ul className="flex items-center space-x-6">
            {user ? (
              <>
                <li>
                  <button 
                    className="text-gray-600 hover:text-gray-900 font-medium" 
                    onClick={() => navigate('/profile')}
                  >
                    Profile
                  </button>
                </li>
                <li>
                  <button 
                    className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-gray-700 font-medium transition-colors" 
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <button 
                    className="text-gray-600 hover:text-gray-900 font-medium" 
                    onClick={() => navigate('/login')}
                  >
                    Login
                  </button>
                </li>
                <li>
                  <button 
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium transition-colors" 
                    onClick={() => navigate('/register')}
                  >
                    Register
                  </button>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
} 