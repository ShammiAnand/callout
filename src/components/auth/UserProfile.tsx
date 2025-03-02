import { useAuth } from "@/context/AuthContext";

export function UserProfile() {
  const { user, logout } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Your Profile</h2>
        <p className="text-sm text-gray-500 mt-1">Your account information</p>
      </div>
      
      <div className="space-y-6">
        <div className="space-y-1">
          <p className="text-sm font-medium text-gray-500">Name</p>
          <p className="text-lg font-medium text-gray-900">{user.name}</p>
        </div>
        
        <div className="space-y-1">
          <p className="text-sm font-medium text-gray-500">Email</p>
          <p className="text-lg font-medium text-gray-900">{user.email}</p>
        </div>
        
        <div className="space-y-1">
          <p className="text-sm font-medium text-gray-500">Account Created</p>
          <p className="text-lg font-medium text-gray-900">{new Date(user.created).toLocaleDateString()}</p>
        </div>
        
        <div className="pt-4">
          <button 
            className="w-full py-2 px-4 bg-gray-200 text-gray-800 font-medium rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
} 