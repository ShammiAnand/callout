import { useRegisterForm } from "@/hooks/useAuthForm";
import { useState, useEffect } from "react";
import { checkServerStatus } from "@/lib/pocketbase";

interface RegisterFormProps {
  onSuccess?: () => void;
}

export function RegisterForm({ onSuccess }: RegisterFormProps) {
  const { form, error, isLoading, handleChange, handleSubmit } = useRegisterForm(onSuccess);
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
        <h2 className="text-2xl font-bold text-gray-900">Create an account</h2>
        <p className="text-sm text-gray-500 mt-2">Enter your details to create a new account</p>
        {serverStatus === 'offline' && (
          <div className="mt-4 p-3 bg-amber-50 border border-amber-200 text-amber-700 rounded-md text-sm">
            ⚠️ PocketBase server appears to be offline. Please make sure it's running.
          </div>
        )}
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <label htmlFor="name" className="font-medium">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="John Doe"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full"
          />
        </div>
        
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
        
        <div className="space-y-2">
          <label htmlFor="passwordConfirm" className="font-medium">
            Confirm Password
          </label>
          <input
            id="passwordConfirm"
            name="passwordConfirm"
            type="password"
            placeholder="••••••••"
            value={form.passwordConfirm}
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
          {isLoading ? "Creating account..." : "Register"}
        </button>
        
        <div className="text-sm text-center text-gray-500 pt-2">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:text-blue-800 font-medium">
            Login
          </a>
        </div>
      </form>
    </div>
  );
} 