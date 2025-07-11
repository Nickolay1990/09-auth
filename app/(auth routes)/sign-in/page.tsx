'use client';

import { useRouter } from 'next/navigation';
import css from './SignInPage.module.css';
import { useState } from 'react';
import { SignRequest } from '@/types/services';
import { signIn } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';

const SignIn = () => {
	const router = useRouter();
	const [error, setError] = useState('');
	const setUser = useAuthStore(state => {
		return state.setUser;
	});

	const handleSubmit = async (formData: FormData) => {
		try {
			const raw = Object.fromEntries(formData);
			const data: SignRequest = {
				email: raw.email.toString(),
				password: raw.password.toString(),
			};
			const res = await signIn(data);
			if (res) {
				setUser(res.data);
				router.push('/profile');
			} else {
				setError('Invalid data');
			}
		} catch {
			setError('Invalid data');
		}
	};
	return (
		<main className={css.mainContent}>
			<form className={css.form} action={handleSubmit}>
				<h1 className={css.formTitle}>Sign in</h1>

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
						Log in
					</button>
				</div>

				<p className={css.error}>{error}</p>
			</form>
		</main>
	);
};

export default SignIn;
