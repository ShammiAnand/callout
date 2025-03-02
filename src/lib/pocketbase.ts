import PocketBase from 'pocketbase';

// Create a single PocketBase instance for the entire app
export const pb = new PocketBase(import.meta.env.VITE_POCKETBASE_URL || 'http://127.0.0.1:8090');

// Add event listeners for connection issues
pb.autoCancellation(false); // Disable auto cancellation for better offline handling

// Helper function to check if the server is online
export const checkServerStatus = async (): Promise<boolean> => {
    try {
        const url = import.meta.env.VITE_POCKETBASE_URL || 'http://127.0.0.1:8090';
        const response = await fetch(`${url}/api/health?t=${Date.now()}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
            cache: 'no-store',
        });
        return response.status >= 200 && response.status < 300;
    } catch (e) {
        console.error('Server status check error:', e);
        return false;
    }
};

// Define types for our auth system
export type Admin = any;
export type Record = any; 