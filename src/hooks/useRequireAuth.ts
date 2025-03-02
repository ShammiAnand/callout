import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';

/**
 * A hook that redirects to the login page if the user is not authenticated.
 * @param redirectTo The path to redirect to if the user is not authenticated
 * @param callback Optional callback to run when authentication check is complete
 */
export function useRequireAuth(
    redirectTo: string = '/login',
    callback?: (isAuthenticated: boolean) => void
) {
    const { user, isLoading } = useAuth();

    useEffect(() => {
        if (!isLoading) {
            const isAuthenticated = !!user;

            if (!isAuthenticated) {
                // In a real app with a router, you would use router.push(redirectTo)
                // For now, we'll just use window.location
                window.location.href = redirectTo;
            }

            if (callback) {
                callback(isAuthenticated);
            }
        }
    }, [user, isLoading, redirectTo, callback]);

    return { user, isLoading };
} 