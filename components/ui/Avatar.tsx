'use client';
import { signOut } from '@/lib/auth-client';
import Dropdown from './Dropdown';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const Avatar = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success('Logged out successfully');
          router.push('/login');
        },
        onError: (ctx) => {
          toast.error(ctx.error.message || 'An error occurred');
        },
      },
    });
  };

  return (
    <Dropdown
      btnIconUrl="/icons/account.svg"
      items={[
        { label: 'Settings', link: '/settings' },
        { label: 'Logout', onClick: handleLogout },
      ]}
      variant="avatar"
    />
  );
};

export default Avatar;
