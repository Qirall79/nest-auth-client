import { cookies } from 'next/headers';

export const getSession = async () => {
  const accessToken = cookies().get('access_token')?.value;
  const refreshToken = cookies().get('refresh_token')?.value;

//   if (!accessToken || !refreshToken) return null;
// console.log(accessToken);

  try {
    let res = await fetch('http://localhost:3001/api/session', {
      method: 'GET',
      credentials: 'include',
      headers: {
        Cookie: `access_token=${accessToken};refresh_token=${refreshToken}`,
        'Content-type': 'application/json',
      },
      cache: 'no-cache',
    });
    console.log(res.status);
    let data = await res.json();

    return data;
  } catch (error) {
    // console.log(error);
    return null;
  }
};
