/**
 *
 * AuthRedirectPage
 *
 */
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import LoadingIndicator from 'components/LoadingIndicator';

export default function AuthRedirectPage() {
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const accessTkn = searchParams.get('access_token');
    const refreshTkn = searchParams.get('refresh_token');
    const expiryIn = searchParams.get('expiry_in');
    if (accessTkn) {
      localStorage.setItem('access_token', accessTkn);
    }
    if (refreshTkn) {
      localStorage.setItem('refresh_token', refreshTkn);
    }
    if (expiryIn) {
      localStorage.setItem('expiry_in', expiryIn);
    }
    setTimeout(() => {
      window.location.href = '/login';
    }, 1000);
  }, [location]);

  return <LoadingIndicator />;
}
