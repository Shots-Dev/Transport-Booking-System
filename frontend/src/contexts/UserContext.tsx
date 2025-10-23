import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UserContextType {
  customerName: string;
  setCustomerName: (name: string) => void;
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

  return (
    <UserContext.Provider value={{ customerName, setCustomerName }}>
      {children}
    </UserContext.Provider>
  );
};
