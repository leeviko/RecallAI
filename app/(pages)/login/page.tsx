'use client';
import Button from '@/components/buttons/Button';
import InputField from '@/components/forms/InputField';
import Glow from '@/components/Glow';
import LoaderInline from '@/components/loader/LoaderInline';
import { signIn } from '@/lib/auth-client';
import styles from '@/styles/Auth.module.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { toast } from 'sonner';

const Page = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!email || !password) {
      setLoading(false);
      toast.error('Please enter your email and password');
      return;
    }

    await signIn.email(
      { email, password },
      {
        onResponse: () => setLoading(false),
        onError: (ctx) => {
          toast.error(ctx.error.message || 'Failed to login');
        },
        onSuccess: () => {
          router.refresh();
          toast.success('Logged in successfully');
        },
      }
    );
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    const data = await signIn.social({
      provider: 'google',
    });

    setLoading(false);

    if (data.error) {
      console.log('Google login error', data.error);
      toast.error(data.error.message || 'Failed to login with Google');
      return;
    }

    router.refresh();
    toast.success('Logged in successfully');
  };

  return (
    <div className={styles.container}>
      <Glow />
      <div className={styles.box}>
        <h2 className={styles.title}>Login</h2>
        <p className={styles.subtitle}>Please login to continue</p>
        <form className={styles.form} onSubmit={handleLogin}>
          <InputField
            value={email}
            handleChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            error={undefined}
          />
          <InputField
            value={password}
            handleChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            error={undefined}
          />
          <Button
            variant="fill"
            color="white"
            size="md"
            width="w-full"
            disabled={loading}
          >
            {loading ? <LoaderInline /> : 'Login'}
          </Button>
        </form>
        <div className={styles.divider}></div>
        <button
          className={styles.googleButton}
          disabled={loading}
          onClick={handleGoogleLogin}
        >
          <img src="/icons/google.svg" alt="Google logo" />
          <span>Continue with Google</span>
        </button>
        <p className={styles.footer}>
          Don't have an account? <Link href="/register">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Page;
