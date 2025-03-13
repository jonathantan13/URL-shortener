function App() {
  return (
    // TODO: Separate into own components

    <div className="mx-auto my-16 w-xl max-w-7xl py-8 text-center">
      <h2 className="text-4xl font-bold">Shorten URL</h2>
      <div className="my-4 flex flex-row items-center justify-center">
        <input
          type="text"
          className="my-4 block h-14 w-sm rounded-sm border-1 border-gray-400 px-3"
          placeholder="Enter link here"
        />
        <button className="h-14 border-2 border-gray-400 bg-blue-500 px-2 text-white hover:cursor-pointer">
          Shorten URL
        </button>
      </div>
    </div>
  );
}

export default App;
