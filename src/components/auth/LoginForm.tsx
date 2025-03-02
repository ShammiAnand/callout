import { useState, useEffect } from "react";
import { useLoginForm } from "@/hooks/useAuthForm";
import { checkServerStatus } from "@/lib/pocketbase";

interface LoginFormProps {
  onSuccess?: () => void;
}

export function LoginForm({ onSuccess }: LoginFormProps) {
  const { form, error, isLoading, handleChange, handleSubmit } = useLoginForm(onSuccess);
  const [serverStatus, setServerStatus] = useState<'checking' | 'online' | 'offline'>('checking');

  // Check if the server is online
  useEffect(() => {
    const checkServer = async () => {
      const isOnline = await checkServerStatus();
      setServerStatus(isOnline ? 'online' : 'offline');
    };
    
    checkServer();
    
    // Check server status every 5 seconds
    const interval = setInterval(checkServer, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="card max-w-md mx-auto shadow-lg">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Login</h2>
        <p className="text-sm text-gray-500 mt-2">Enter your credentials to access your account</p>
        {serverStatus === 'offline' && (
          <div className="mt-4 p-3 bg-amber-50 border border-amber-200 text-amber-700 rounded-md text-sm">
            ⚠️ PocketBase server appears to be offline. Please make sure it's running.
          </div>
        )}
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <label htmlFor="email" className="font-medium">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="name@example.com"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="password" className="font-medium">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full"
          />
        </div>
        
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}
        
        <button 
          type="submit" 
          className="w-full btn btn-primary py-3"
          disabled={isLoading || serverStatus === 'offline'}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
        
        <div className="text-sm text-center text-gray-500 pt-2">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-600 hover:text-blue-800 font-medium">
            Register
          </a>
        </div>
      </form>
    </div>
  );
} 