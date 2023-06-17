'use client'
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import './classicGlobals.css';

export default function LogoutPage() {
  const { push } = useRouter();

  useEffect(() => {
    push('');
  }, [])
  

  return (
    <main>
    </main>
  );
}
