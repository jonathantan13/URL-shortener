import PropTypes from "prop-types";
import CopyToClipboardButton from "./CopyToClipboard";

export default function Modal({ showModal, setShowModal, shortUrl }) {
  if (!shortUrl) return;

  return (
    <>
      <div
        className={`${!showModal && "hidden"} fixed inset-0 z-50 flex items-center justify-center`}
        style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
      >
        <div className="relative flex max-h-[90vh] max-w-[90vw] items-center gap-x-5 overflow-auto rounded-lg bg-white px-64 py-32 shadow-lg">
          <button
            className="absolute top-3 right-3 cursor-pointer border-none text-5xl"
            onClick={() => setShowModal(false)}
          >
            &times;
          </button>
          <p className="text-black">{shortUrl}</p>
          <CopyToClipboardButton textToCopy={shortUrl} />
        </div>
      </div>
    </>
  );
}

Modal.propTypes = {
  showModal: PropTypes.bool,
  setShowModal: PropTypes.func,
  shortUrl: PropTypes.string,
};

Modal.defaultProps = {
  showModal: false,
};
