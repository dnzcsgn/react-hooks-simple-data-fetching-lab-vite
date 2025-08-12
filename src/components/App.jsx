// create your App component here
import React, { useEffect, useState } from "react";

export default function App() {
  const [imgUrl, setImgUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function fetchDog() {
    try {
      setIsLoading(true);
      setError("");
      const res = await fetch("https://dog.ceo/api/breeds/image/random");
      const data = await res.json();
      setImgUrl(data.message);
    } catch (e) {
      setError("There is a mistake during fetch.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchDog();
  }, []);

  return (
    <div>
      <h1>Random Dog</h1>

      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {!isLoading && !error && imgUrl && <img src={imgUrl} alt="Random dog" />}

      <button onClick={fetchDog} disabled={isLoading}>
        Get a New Dog
      </button>
    </div>
  );
}
