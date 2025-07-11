import { Metadata } from 'next';
import css from './ProfilePage.module.css';
import Link from 'next/link';

export const metadata: Metadata = {
	title: 'Profile',
	description: 'User Profile Page',
	openGraph: {
		title: 'Profile',
		description: 'User Profile Page',
		url: 'https://profile',
		images: [
			{
				url: 'https://storage.googleapis.com/support-forums-api/attachment/thread-275804406-4521668504705607705.jpg',
				width: 1200,
				height: 630,
				alt: 'NoteHub 404',
			},
		],
	},
};

const Profile = () => {
	return (
		<main className={css.mainContent}>
			<div className={css.profileCard}>
				<div className={css.header}>
					<h1 className={css.formTitle}>Profile Page</h1>
					<Link href="/home" className={css.editProfileButton}>
						Edit Profile
					</Link>
				</div>
				<div className={css.avatarWrapper}>
					<img src="Avatar" alt="User Avatar" width={120} height={120} className={css.avatar} />
				</div>
				<div className={css.profileInfo}>
					<p>Username: your_username</p>
					<p>Email: your_email@example.com</p>
				</div>
			</div>
		</main>
	);
};

export default Profile;
