import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
    getSupabaseSession,
    getAuthUser,
    getUser,
} from '@/app/supabase-client';

interface UserContextType {
  user: any; 
  refreshUser: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

type UserProviderProps = {
  children: ReactNode;
};

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<any>(null); // Use a more specific type if possible

  // Function to refresh or fetch user data
  const refreshUser = async () => {
    const session = await getSupabaseSession();
    if (session) {
      const authUser = await getAuthUser();
      setUser(authUser);
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, refreshUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};