"use client"
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '@/apis/firebaseConfig';
import { loginSuccess, logout } from '../authSlice';

export const useAuthListener = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(loginSuccess({uid: user.uid, email: user.email, displayName: user.displayName}));
      } else {
        dispatch(logout());
      }
    });

    console.log(unsubscribe)

    return () => unsubscribe();
  }, [dispatch]);
};