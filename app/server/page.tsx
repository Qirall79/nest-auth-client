import { getCookie, getSession } from '@/lib/actions';
import { Logout } from '../Logout';
import { cookies } from 'next/headers';

export default async function page() {
    const session = await getCookie()

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      {JSON.stringify(session)}
      
      <hr />
      {session?.user ? (
        <Logout />
      ) : (
        <a href='http://localhost:3000/api/auth/google'>login with google</a>
      )}
    </main>
  );
}
