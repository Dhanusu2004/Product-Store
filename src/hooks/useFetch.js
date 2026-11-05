import { useState, useEffect } from "react";

function useFetch(url) {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(url, { signal: controller.signal });

        if (!response.ok) {
          throw new Error("Failed to fetch data. Please try again.");
        }

        const result = await response.json();
        setData(result);

      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
          setData(null);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => controller.abort();

  }, [url]);

  return { data, loading, error };
}

export default useFetch;