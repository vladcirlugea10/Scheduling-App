import { useState } from "react"
import axios from "axios";
import { UserRegistration } from "../Types/UserTypes";
import { BusinessRegistration } from "../Types/BusinessTypes";

export const useAuth = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const onLogin = async (email: string, password: string) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post('http://localhost:5004/api/auth/login', {
                email,
                password
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log("Response:", response);
            setIsAuthenticated(true);
        }catch(error: any){
            setError(error.response?.data?.message || "An error occurred");
            console.error("Error during login:", error);
        }finally {
            setLoading(false);
        }
    };

    const onRegisterUser = async (user: UserRegistration) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post('http://localhost:5004/api/auth/register/user', user, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log("Response:", response);
            setIsAuthenticated(true);
        } catch (error: any) {
            const rawErrors = error.response?.data?.errors;

            if (rawErrors && typeof rawErrors === 'object') {
                const values = Object.values(rawErrors) as unknown as string[][];
                const firstError = values[0]?.[0];
                setError(firstError || "An error occurred");
            } else {
                setError("An error occurred");
            }
        } finally {
            setLoading(false);
            setError(null);
        }
    }

    const onRegisterBusiness = async (business: BusinessRegistration) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post('http://localhost:5004/api/auth/register/business', business, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log("Response:", response);
            setIsAuthenticated(true);
        }catch(error: any){
            const rawErrors = error.response?.data?.errors;

            if (rawErrors && typeof rawErrors === 'object') {
                const values = Object.values(rawErrors) as unknown as string[][];
                const firstError = values[0]?.[0];
                setError(firstError || "An error occurred");
            } else {
                setError("An error occurred");
            }
        }finally {
            setLoading(false);
            setError(null);
        }
    }

    return { onLogin, onRegisterUser, onRegisterBusiness, loading, error };
}