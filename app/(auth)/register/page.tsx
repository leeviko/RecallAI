'use client';
import Button from '@/components/buttons/Button';
import InputField from '@/components/forms/InputField';
import Glow from '@/components/ui/Glow';
import LoaderInline from '@/components/loader/LoaderInline';
import { signIn, signUp } from '@/lib/auth-client';
import styles from '../Auth.module.css';
import Link from 'next/link';
import { redirect, useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { toast } from 'sonner';

const Page = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!email.includes('@')) {
      toast.error('Invalid email');
      setLoading(false);
      return;
    }
    if (password.length < 8) {
      toast.error('Password must be at least 8 characters');
      setLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      setLoading(false);
      return;
    }

    await signUp.email(
      { email, password, name: email.split('@')[0] },
      {
        onResponse: () => setLoading(false),
        onError: (ctx) => {
          toast.error(ctx.error.message || 'Failed to register');
        },
        onSuccess: () => {
          toast.success('Account created successfully');
          redirect('/dashboard');
        },
      }
    );
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    const data = await signIn.social({
      provider: 'google',
    });

    if (data.error) {
      setLoading(false);
      console.log('Google login error', data.error);
      toast.error(data.error.message || 'Failed to login with Google');
      return;
    }
  };

  return (
    <div className={styles.container}>
      <Glow />
      <div className={styles.box}>
        <h2 className={styles.title}>Register</h2>
        <p className={styles.subtitle}>Please create an account to continue</p>
        <form className={styles.form} onSubmit={handleRegister}>
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
          <InputField
            value={confirmPassword}
            handleChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm password"
            error={undefined}
          />
          <Button
            variant="fill"
            color="white"
            size="md"
            width="w-full"
            disabled={loading}
          >
            {loading ? <LoaderInline /> : 'Register'}
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
          Already have an account? <Link href="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Page;
