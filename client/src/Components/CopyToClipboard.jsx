import { useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";

import PropTypes from "prop-types";
import toast from "react-hot-toast";

export default function CopyToClipboardButton({ textToCopy }) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <CopyToClipboard text={textToCopy} onCopy={handleCopy}>
      <button
        className="rounded bg-blue-500 px-2 py-1 text-white hover:cursor-pointer hover:bg-blue-600"
        onClick={() => toast.success("Copied to clipboard!")}
        disabled={isCopied}
      >
        &#x2398;
      </button>
    </CopyToClipboard>
  );
}

CopyToClipboardButton.propTypes = {
  textToCopy: PropTypes.string,
};
