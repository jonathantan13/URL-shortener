import { useState } from "react";

import toast, { Toaster } from "react-hot-toast";

import Header from "./Components/Header";
import Main from "./Components/Main";
import Modal from "./Components/Modal";

function App() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const regex = /^(https?|ftp):\/\/([^\s\/?#]+)([^\s?#]*)(\?[^#]*)?(#.*)?$/; // Shoutout deepseek

  async function handleShorten() {
    if (!longUrl || !regex.test(longUrl)) {
      toast.error("Invalid URL, please try again!", {
        duration: 5000,
      });
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("http://localhost:8000/shorten", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ longUrl }),
      });

      if (!res.ok) {
        throw new Error(res.statusText);
      }

      const data = await res.json();
      console.log("Shortened URL: ", data);
      setShortUrl(data.url);
    } catch (err) {
      toast.error(err, {
        duration: 4000,
      });
    } finally {
      setIsLoading(false);
      setShowModal(true);
      toast.success("URL successfully shortened!", {
        duration: 3000,
      });
    }
  }

  return (
    <>
      <Toaster
        toastOptions={{
          style: {
            padding: "16px",
          },
        }}
      />
      <div className="max-w-8xl mx-auto my-16 w-xl py-8 text-center">
        <Header />
        <Main
          longUrl={longUrl}
          setLongUrl={setLongUrl}
          handleShorten={handleShorten}
          isLoading={isLoading}
        />
      </div>
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        shortUrl={shortUrl}
      />
    </>
  );
}

export default App;
