import css from './AuthNavigation.module.css';
import Link from 'next/link';
import { useAuthStore } from '@/lib/store/authStore';

const AuthNavigation = () => {
	const isAuth = useAuthStore(state => {
		return state.isAuthenticated;
	});
	const user = useAuthStore(state => {
		return state.user;
	});

	return (
		<>
			{isAuth && (
				<>
					<li className={css.navigationItem}>
						<Link href="/profile" prefetch={false} className={css.navigationLink}>
							Profile
						</Link>
					</li>

					<li className={css.navigationItem}>
						<p className={css.userEmail}>{user?.email}</p>
						<button className={css.logoutButton}>Logout</button>
					</li>
				</>
			)}
			{!isAuth && (
				<>
					<li className={css.navigationItem}>
						<Link href="/sign-in" prefetch={false} className={css.navigationLink}>
							Login
						</Link>
					</li>

					<li className={css.navigationItem}>
						<Link href="/sign-up" prefetch={false} className={css.navigationLink}>
							Sign up
						</Link>
					</li>
				</>
			)}
		</>
	);
};

export default AuthNavigation;
