'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { Doctor } from '@/lib/types';
import { doctors as initialDoctors } from '@/lib/doctors-data';

export type UserRole = 'patient' | 'doctor' | 'pharmacy';

export interface User {
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  age?: number;
  gender?: 'male' | 'female' | 'other' | 'prefer_not_to_say';
  address?: string;
  avatar?: string;
  specialty?: string; // For doctors
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (user: User) => void;
  logout: () => void;
  updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const DOCTORS_KEY = 'doctors_data';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Failed to parse user from localStorage', error);
      localStorage.removeItem('user');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = (userData: User) => {
    const defaultAvatar = `https://picsum.photos/seed/user-avatar-${Math.floor(Math.random() * 10)}/100/100`;
    const userWithAvatar = { ...userData, avatar: userData.avatar || defaultAvatar };
    
    if (userWithAvatar.role === 'doctor') {
      const storedData = localStorage.getItem(DOCTORS_KEY);
      const allDoctors = storedData ? JSON.parse(storedData) : initialDoctors;
      
      const doctorExists = allDoctors.some((d: Doctor) => d.name === userWithAvatar.name);
      
      if (!doctorExists) {
        const newDoctor: Doctor = {
          id: `DOC${String(allDoctors.length + 1).padStart(3, '0')}`,
          name: userWithAvatar.name,
          specialty: 'General Physician', // Default specialty
          avatar: userWithAvatar.avatar!,
        };
        const updatedDoctors = [...allDoctors, newDoctor];
        localStorage.setItem(DOCTORS_KEY, JSON.stringify(updatedDoctors));
      }
    }
    
    localStorage.setItem('user', JSON.stringify(userWithAvatar));
    setUser(userWithAvatar);
  };
  
  const updateUser = (userData: User) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  }

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
