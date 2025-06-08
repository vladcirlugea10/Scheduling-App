export interface BusinessRegistration {
    email: string;
    name: string;
    phone?: string | null;
    address?: string;
    description: string;
    password: string;
    confirmPassword: string;
}