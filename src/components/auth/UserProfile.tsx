import { useAuth } from "@/context/AuthContext";

export function UserProfile() {
  const { user, logout } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <div className="card max-w-md mx-auto shadow-lg">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Your Profile</h2>
        <p className="text-sm text-gray-500 mt-2">Your account information</p>
      </div>
      
      <div className="space-y-6">
        <div className="p-4 bg-gray-50 rounded-md space-y-1">
          <p className="text-sm font-medium text-gray-500">Name</p>
          <p className="text-lg font-medium text-gray-900">{user.name}</p>
        </div>
        
        <div className="p-4 bg-gray-50 rounded-md space-y-1">
          <p className="text-sm font-medium text-gray-500">Email</p>
          <p className="text-lg font-medium text-gray-900">{user.email}</p>
        </div>
        
        <div className="p-4 bg-gray-50 rounded-md space-y-1">
          <p className="text-sm font-medium text-gray-500">Account Created</p>
          <p className="text-lg font-medium text-gray-900">{new Date(user.created).toLocaleDateString()}</p>
        </div>
        
        <div className="pt-4">
          <button 
            className="w-full btn btn-secondary py-3"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
} 