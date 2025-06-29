function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold mb-8">Indicium</h1>
      <div className="flex gap-8 mb-8">
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
          Login
        </button>
        <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition">
          Register
        </button>
      </div>
    </div>
  );
}

export default App;
