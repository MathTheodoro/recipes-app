import { useEffect, useState } from 'react';

function useFetch(url:string) {
  const [data, setData] = useState();
  const [error, SetError] = useState<Error>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const request = await fetch(url);
        const response = await request.json();
        setData(response);
      } catch (err) {
        if (err instanceof Error) SetError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { data, error, loading, setData };
}

export default useFetch;
