'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { useAuth } from '@/modules/context';

export default function ProfilePage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/');
    } else {
      router.push(`/user/${user.uid}`);
    }
  }, [user]);

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <span>Redirecting to user profile</span>
    </div>
  );
}
