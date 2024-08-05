import axios from "axios";
import { useEffect, useState } from "react";

export const useSession = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      let res = await axios.get("http://localhost:3000/api/users/current", {
        withCredentials: true,
      });

      setData(res.data);
    } catch (error) {
      try {
        let res = await axios.get("http://localhost:3000/api/auth/refresh", {
          withCredentials: true,
        });

        await axios.get("http://localhost:3000/api/users/current", {
          withCredentials: true,
        });
        return setData(res.data);
      } catch (error) {
        console.log(error);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return [data, loading];
};
