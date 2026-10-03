import { createContext, useContext, useEffect, useState, type Dispatch, type ReactNode, type SetStateAction } from "react";

export interface userType {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    avatar: string;
    role: string;
    isActive: boolean;
}

type UserContextValue = {
    user: userType | null;
    setUser: Dispatch<SetStateAction<userType | null>>;
    logOut:()=>void
};

const UserContext = createContext<UserContextValue | undefined>(undefined);

const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<userType | null>(null);
    
    const logOut = () => {
        localStorage.removeItem("crmAccessToken")
        localStorage.removeItem("crmRefreshToken")
        localStorage.removeItem("bizdacrmuser")
        window.location.href="/login"
    }

    useEffect(() => {
        const stored = localStorage.getItem("bizdacrmuser");
        if (stored) {
            setUser(JSON.parse(stored));
        }
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser,logOut }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const ctx = useContext(UserContext);
    if (!ctx) {
        throw new Error("useUser must be used within UserProvider");
    }
    return ctx;
};

export default UserProvider;
