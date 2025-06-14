import { createContext, Provider, useContext, useEffect, useState } from "react"
import axios from "axios";
import { User, UserRegistration } from "../Types/UserTypes";
import { Business, BusinessRegistration } from "../Types/BusinessTypes";

type AuthenticatedUser = { role: 'User'; data: User } | { role: 'Business'; data: Business } | null;

interface AuthContextType {
    onLogin: (email: string, password: string) => Promise<void>;
    onRegisterUser: (user: UserRegistration) => Promise<void>;
    onRegisterBusiness: (business: BusinessRegistration) => Promise<void>;
    onLogout: () => Promise<void>;
    checkSession: () => Promise<void>;

    loading: boolean;
    error: string | null;
    isAuthenticated: boolean;
    userRole?: 'User' | 'Business' | null;
    userId?: string | null;
    business?: Business | null;
    user?: User | null;
    currentUser?: AuthenticatedUser;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRole, setUserRole] = useState<'User' | 'Business' | null>(null);
    const [userId, setUserId] = useState<string | null>(null);
    const [business, setBusiness] = useState<Business | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [currentUser, setCurrentUser] = useState<AuthenticatedUser>(null);

    useEffect(() => {
        checkSession();
    }, []);

    const checkSession = async () => {
        setLoading(true);
        try{
            const response = await axios.get('http://localhost:5004/api/auth/check-session', {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log("Session check response:", response);
            if(response.data.role === 'User'){
                setCurrentUser({ role: 'User', data: response.data as User });
            } else if(response.data.role === 'Business'){
                setCurrentUser({ role: 'Business', data: response.data as Business });
            }
            setIsAuthenticated(true);
            setUserRole(response.data.role);
            setUserId(response.data.userId);
        }catch(error: any){
            if (error.response?.status === 401) {
                setIsAuthenticated(false);
                setUserRole(null);
        } else {
            setError(error.response?.data?.message || "An error occurred while checking session");
            console.error("Error checking session:", error);
        }
        }finally {
            setLoading(false);
        }
    }

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
                },
                withCredentials: true
            });
            console.log("Response:", response);
            if(response.data.role === 'User'){
                setCurrentUser({ role: 'User', data: response.data as User });
            } else if(response.data.role === 'Business'){
                setCurrentUser({ role: 'Business', data: response.data as Business });
            }
            setUserId(response.data.id);
            setUserRole(response.data.role);
            if(response.data.role === 'User'){
                setUser(response.data as User);
            }else if(response.data.role === 'Business'){
                setBusiness(response.data as Business);
            }
            setUserId(response.data.id);
            setUserRole(response.data.role);
            setBusiness(response.data);
            setIsAuthenticated(true);
        }catch(error: any){
            const errorData = error.response?.data;
            if (Array.isArray(errorData)) {
                setError(errorData.join('\n'));
            } else if (errorData?.errors) {
                const modelErrors = Object.values(errorData.errors).flat();
                setError(modelErrors.join('\n'));
            } else {
                setError(errorData?.message || "An error occurred");
            }
            console.error("Error during user registration:", error);
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
            setUserRole(response.data.role);
            setUserId(response.data.id);
        } catch (error: any) {
            const errorData = error.response?.data;
            if (Array.isArray(errorData)) {
                setError(errorData.join('\n'));
            } else if (errorData?.errors) {
                const modelErrors = Object.values(errorData.errors).flat();
                setError(modelErrors.join('\n'));
            } else {
                setError(errorData?.message || "An error occurred");
            }
            console.error("Error during user registration:", error);
        } finally {
            setLoading(false);
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
            setUserRole(response.data.role);
            setUserId(response.data.id);
        }catch(error: any){
            const errorData = error.response?.data;
            if(Array.isArray(errorData)){
                setError(errorData.join('\n'));
            }else if(errorData?.errors){
                const modelErrors = Object.values(errorData.errors).flat();
                setError(modelErrors.join('\n'));
            }else{
                setError(errorData?.message || "An error occurred");
            }
            console.error("Error during business registration:", error);
        }finally {
            setLoading(false);
        }
    };

    const onLogout = async () => {
        setLoading(true);
        setError(null);
        try{
            const response = await axios.post('http://localhost:5004/api/auth/logout', {}, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            console.log("Response:", response);
            setIsAuthenticated(false);
            setUserRole(null);
            setCurrentUser(null);
        }catch(error: any){
            setError(error.response?.data?.message || "An error occurred");
            console.error("Error during logout:", error);
        }finally{
            setLoading(false);
        }
    }

    return (
        <AuthContext.Provider value={{
            onLogin,
            onRegisterUser,
            onRegisterBusiness,
            onLogout,
            checkSession,

            loading,
            error,
            isAuthenticated,
            userRole,
            userId,
            business,
            user,
            currentUser
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};