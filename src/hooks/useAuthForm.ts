import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

interface LoginFormState {
    email: string;
    password: string;
}

interface RegisterFormState extends LoginFormState {
    passwordConfirm: string;
    name: string;
}

interface UseLoginFormReturn {
    form: LoginFormState;
    error: string | null;
    isLoading: boolean;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: React.FormEvent) => Promise<void>;
}

interface UseRegisterFormReturn {
    form: RegisterFormState;
    error: string | null;
    isLoading: boolean;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: React.FormEvent) => Promise<void>;
}

export function useLoginForm(onSuccess?: () => void): UseLoginFormReturn {
    const { login } = useAuth();
    const [form, setForm] = useState<LoginFormState>({
        email: '',
        password: '',
    });
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            await login(form.email, form.password);
            if (onSuccess) onSuccess();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to login');
        } finally {
            setIsLoading(false);
        }
    };

    return { form, error, isLoading, handleChange, handleSubmit };
}

export function useRegisterForm(onSuccess?: () => void): UseRegisterFormReturn {
    const { register } = useAuth();
    const [form, setForm] = useState<RegisterFormState>({
        email: '',
        password: '',
        passwordConfirm: '',
        name: '',
    });
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            await register(form.email, form.password, form.passwordConfirm, form.name);
            if (onSuccess) onSuccess();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to register');
        } finally {
            setIsLoading(false);
        }
    };

    return { form, error, isLoading, handleChange, handleSubmit };
} 