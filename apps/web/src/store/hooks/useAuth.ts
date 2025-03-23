import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { RootState } from '../store';

export const useAuth = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const router = useRouter();

  useEffect(() => {
    console.log(user)
    if (!user) {
      router.push('/login');
    } else {
      router.push('/dashboard')
    }
  }, [user, router]);

  return user;
};