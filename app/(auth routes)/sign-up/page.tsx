'use client';

import css from './SignUpPage.module.css';
import { signUp } from '@/lib/api/clientApi';
import { SignRequest } from '@/types/services';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const SignUpPage = () => {
	const router = useRouter();
	const [error, setError] = useState('');

	const handleSubmit = async (formData: FormData) => {
		try {
			const raw = Object.fromEntries(formData);
			const data: SignRequest = {
				email: raw.email.toString(),
				password: raw.password.toString(),
			};
			const res = await signUp(data);
			if (res) {
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
				{error && <p className={css.error}>{error}</p>}
			</form>
		</main>
	);
};

export default SignUpPage;
