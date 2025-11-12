import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UserContextType {
  customerName: string;
  setCustomerName: (name: string) => void;
  userType: 'customer' | 'admin' | null;
  setUserType: (type: 'customer' | 'admin' | null) => void;
  isAdmin: () => boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [customerName, setCustomerName] = useState<string>('Shots');
  const [userType, setUserType] = useState<'customer' | 'admin' | null>(null);

  const isAdmin = () => userType === 'admin';

  return (
    <UserContext.Provider value={{ customerName, setCustomerName, userType, setUserType, isAdmin }}>
      {children}
    </UserContext.Provider>
  );
};
