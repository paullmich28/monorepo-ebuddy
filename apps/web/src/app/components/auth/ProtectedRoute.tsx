"use client"
import React, { useEffect } from 'react';
import { useAuth } from '@/store/hooks/useAuth';
import { useRouter } from 'next/navigation';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const user = useAuth();
  const router = useRouter()

  useEffect(() => {
    if (!user){
      router.push("/login")
    }
  })

  if (!user) {
    return <></>;
  }

  return <>{children}</>;
};

export default ProtectedRoute;