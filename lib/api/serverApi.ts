import { cookies } from 'next/headers';
import { nextServer } from './api';
import { User } from '@/types/user';
import { CheckSessionResponse } from '@/types/services';

export const checkServerSession = async () => {
	const cookieStore = await cookies();
	const res = await nextServer.get<CheckSessionResponse>('/auth/session', {
		headers: {
			Cookie: cookieStore.toString(),
		},
	});
	return res;
};

export const getServerMe = async () => {
	const cookieStore = await cookies();
	const { data } = await nextServer.get<User>('/users/me', {
		headers: {
			Cookie: cookieStore.toString(),
		},
	});

	return data;
};
