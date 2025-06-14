export interface BusinessRegistration {
    email: string;
    name: string;
    phone?: string | null;
    address?: string;
    description: string;
    password: string;
    confirmPassword: string;
}

export interface Business {
    userId: string;
    businessEmail: string;
    businessName: string;
    businessPhone: string;
    businessAddress: string;
    businessDescription: string;
    role: string;
}