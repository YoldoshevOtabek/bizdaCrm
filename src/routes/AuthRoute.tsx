import type { ReactNode } from "react";
import { useUser } from "../features/auth/context/UserContext";
import { Navigate } from "react-router-dom";


export default function AuthRoute({ children }: { children: ReactNode }) {
    const { user } = useUser()
    if (user) return <Navigate to="/dashboard" />
    return (
        <>
            {children}
        </>
    )
}
