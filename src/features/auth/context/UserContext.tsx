import {
    createContext,
    useState,
    type ReactNode,
    useContext,
    type Dispatch,
    type SetStateAction,
  } from "react";
  
  import type { UserType } from "../types/userType";
  
  interface UserContextType {
    user: UserType | null;
    setUser: Dispatch<SetStateAction<UserType | null>>;
  }
  
  const UserContext = createContext<UserContextType | undefined>(undefined);
  
  const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<UserType | null>(null);
  
    return (
      <UserContext.Provider value={{ user, setUser }}>
        {children}
      </UserContext.Provider>
    );
  };
  
  export const useUser = () => {
    const context = useContext(UserContext);
  
    if (!context) {
      throw new Error("useUser must be used inside UserProvider");
    }
  
    return context;
  };
  
  export default UserProvider;