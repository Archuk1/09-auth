import { NextRequest, NextResponse } from 'next/server';
import { checkServerSession } from './lib/api/serverApi';

const privateRoutes = ['/profile', '/notes', '/notes/filter'];
const publicRoutes = ['/sign-in', '/sign-up'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;

  const isPublicRoute = publicRoutes.some((route) => pathname.startsWith(route));
  const isPrivateRoute = privateRoutes.some((route) => pathname.startsWith(route));

  if (!accessToken) {
    if (refreshToken) {
      try {
        const res = await checkServerSession();
        const newAccessToken = res.headers['set-cookie']?.find(c => c.startsWith('accessToken'));
        const newRefreshToken = res.headers['set-cookie']?.find(c => c.startsWith('refreshToken'));

        if (newAccessToken) {
          const response = isPublicRoute
            ? NextResponse.redirect(new URL('/', request.url))
            : NextResponse.next();

          // встановлюємо куки в response щоб браузер їх отримав
          const accessValue = newAccessToken.split(';')[0].split('=')[1];
          const refreshValue = newRefreshToken?.split(';')[0].split('=')[1];

          response.cookies.set('accessToken', accessValue, { httpOnly: true, path: '/' });
          if (refreshValue) {
            response.cookies.set('refreshToken', refreshValue, { httpOnly: true, path: '/' });
          }

          return response;
        }
      } catch {
        // refresh failed
      }
    }

    if (isPublicRoute) return NextResponse.next();
    if (isPrivateRoute) return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  if (isPublicRoute) return NextResponse.redirect(new URL('/', request.url));
  return NextResponse.next();
}

export const config = {
  matcher: ['/profile/:path*', '/notes/:path*', '/notes/filter/:path*', '/sign-in', '/sign-up'],
};