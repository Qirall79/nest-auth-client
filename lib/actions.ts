import { cookies } from 'next/headers';

export const getSession = async () => {
  const accessToken = cookies().get('access_token')?.value;
  const refreshToken = cookies().get('refresh_token')?.value;

//   if (!accessToken || !refreshToken) return null;
  try {
    let res = await fetch('http://localhost:3000/api/users/current', {
      method: 'GET',
      credentials: 'include',
    //   headers: {
    //     Cookie: `access_token=${accessToken};refresh_token=${refreshToken}`,
    //   },
      cache: 'no-cache',
    });
    let data = await res.json();
    console.log(data);

    if (!data?.user) {
      res = await fetch('http://localhost:3000/api/auth/refresh', {
        method: 'GET',
        credentials: 'include',
        // headers: {
        //   Cookie: `refresh_token=${refreshToken}`,
        // },
        cache: 'no-cache',
      });

      data = await res.json();
    }

    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
