export interface UserRegistration {
    email: string;
    firstName: string;
    lastName?: string;
    phoneNumber?: string | null;
    password: string;
    confirmPassword: string;
};