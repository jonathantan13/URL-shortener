import PropTypes from "prop-types";

export default function Main({
  longUrl,
  setLongUrl,
  handleShorten,
  isLoading,
}) {
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
        disabled={isLoading}
        className="h-14 rounded-sm border-2 border-gray-400 bg-blue-500 px-3 text-white hover:cursor-pointer"
      >
        Shorten
      </button>
    </div>
  );
}

Main.propTypes = {
  longUrl: PropTypes.string.isRequired,
  setLongUrl: PropTypes.func.isRequired,
  handleShorten: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};

Main.defaultProps = {
  isLoading: false,
};
