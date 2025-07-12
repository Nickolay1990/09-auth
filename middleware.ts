import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { checkServerSession } from './lib/api/serverApi';
import { parse } from 'cookie';

const privateRoutes = ['/profile', '/notes'];
const publicRoutes = ['/sign-in', '/sign-up'];

export async function middleware(request: NextRequest) {
	const cookieStore = await cookies();
	const accessToken = cookieStore.get('accessToken')?.value;
	const refreshToken = cookieStore.get('refreshToken')?.value;
	const { pathname } = request.nextUrl;
	const isPrivate = privateRoutes.some(route => pathname.startsWith(route));
	const isPublic = publicRoutes.some(route => pathname.startsWith(route));

	if (isPrivate) {
		if (!accessToken) {
			if (refreshToken) {
				const apiRes = await checkServerSession();
				const setCookie = apiRes.headers['set-cookie'];

				if (setCookie) {
					const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];

					for (const cookieStr of cookieArray) {
						const parsed = parse(cookieStr);
						const options = {
							expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
							path: parsed.Path,
							maxAge: Number(parsed['Max-Age']),
						};
						if (parsed.accessToken) cookieStore.set('accessToken', parsed.accessToken, options);
						if (parsed.refreshToken) cookieStore.set('refreshToken', parsed.refreshToken, options);
					}
					return NextResponse.next({
						headers: {
							Cookie: cookieStore.toString(),
						},
					});
				}
			}
			return NextResponse.redirect(new URL('/sign-in', request.url));
		}
	}

	if (isPublic) {
		if (!accessToken) {
			if (refreshToken) {
				const apiRes = await checkServerSession();
				const setCookie = apiRes.headers['set-cookie'];

				if (setCookie) {
					const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];
					for (const cookieStr of cookieArray) {
						const parsed = parse(cookieStr);
						const options = {
							expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
							path: parsed.Path,
							maxAge: Number(parsed['Max-Age']),
						};
						if (parsed.accessToken) cookieStore.set('accessToken', parsed.accessToken, options);
						if (parsed.refreshToken) cookieStore.set('refreshToken', parsed.refreshToken, options);
					}
					return NextResponse.redirect(new URL('/profile', request.url), {
						headers: {
							Cookie: cookieStore.toString(),
						},
					});
				}
			}
			return NextResponse.next();
		}
		return NextResponse.redirect(new URL('/profile', request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ['/profile/:path*', '/notes/:path*', '/sign-in', '/sign-up'],
};
