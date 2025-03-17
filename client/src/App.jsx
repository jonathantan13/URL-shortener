import { useState } from "react";

function App() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  async function handleShorten() {
    if (!longUrl) return;
    // TODO: Add regex and route
    console.log(longUrl);

    try {
      const res = await fetch("ROUTE GOES HERE", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ longUrl }),
      });

      if (!res.ok) throw new Error(res.statusText);

      const data = await res.json();
      console.log("Shortened URL: ", data);
    } catch (err) {
      console.log("Error:", err);
    }
  }

  return (
    <div className="max-w-8xl mx-auto my-16 w-xl py-8 text-center">
      <Header />
      <Main
        longUrl={longUrl}
        setLongUrl={setLongUrl}
        handleShorten={handleShorten}
      />
      {longUrl && (
        <p className="overflow-scroll">
          Your URL is: <strong>{longUrl}</strong>
        </p>
      )}
    </div>
  );
}

function Header() {
  return <h2 className="text-4xl font-bold">Shorten URL</h2>;
}

function Main({ longUrl, setLongUrl, handleShorten }) {
  return (
    <div className="my-4 flex flex-row items-center justify-center">
      <input
        type="text"
        value={longUrl}
        onChange={(e) => setLongUrl(e.target.value)}
        className="my-4 block h-14 w-sm rounded-sm border-1 border-gray-400 px-3"
        placeholder="Enter link here"
      />
      <button
        onClick={handleShorten}
        className="h-14 border-2 border-gray-400 bg-blue-500 px-2 text-white hover:cursor-pointer"
      >
        Shorten URL
      </button>
    </div>
  );
}

export default App;
