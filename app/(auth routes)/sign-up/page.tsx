'use client'
import { register, RegisterRequest } from '@/lib/api/clientApi';
 import css from './SingUpPage.module.css'
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SignUp () {
    
  const router = useRouter();
  const [error, setError] =useState('')
    const handleSubmit = async (formData:FormData) => {
     try {
      const formValues = Object.fromEntries(formData) as RegisterRequest;
      const res = await register(formValues);

      if (res) {
        router.push('/profile');
      }
    } catch {
      setError('Registration failed. Please try again');
    }
          }


    return (
        <main className={css.mainContent}>
  <h1 className={css.formTitle}>Sign up</h1>
	<form className={css.form} action={handleSubmit}>
    <div className={css.formGroup}>
      <label htmlFor="email">Email</label>
      <input id="email" type="email" name="email" className={css.input} required />
    </div>

    <div className={css.formGroup}>
      <label htmlFor="password">Password</label>
      <input id="password" type="password" name="password" className={css.input} required />
    </div>

    <div className={css.actions}>
      <button type="submit" className={css.submitButton}>
        Register
      </button>
    </div>

    {error && <p className={css.error}>Error</p>}
  </form>
</main>

    )
}