import { useState } from 'react';

function App() {
  const [serial, setSerial] = useState('');
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    setError('');
    setData(null);

    if (!serial) {
      setError('Please enter a serial number');
      return;
    }

    try {
      const res = await fetch(
        `https://script.google.com/macros/s/AKfycbx8cZkOEenk-iIGXFMebBRgnrSV_DCmW0xPtKbeykyIGr4JedOIaPU1ijHBiCiSRnlW/exec?serial=${serial}`
      );
      const result = await res.json();

      if (result.error) {
        setError(result.error);
      } else {
        setData(result);
      }
    } catch (err) {
      setError('Failed to fetch data. Please try again.');
    }
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-gray-900 text-white flex items-center justify-center px-6 py-12">
      <div className="max-w-3xl w-full bg-white/10 backdrop-blur-sm rounded-3xl shadow-2xl p-10 border border-white/20">
        <h1 className="text-2xl sm:text-3xl font-medium text-white mb-8 text-center tracking-tight">
          ক্রমিক নং. অনুসারে তথ্য অনুসন্ধান
        </h1>

        <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
          <input
            value={serial}
            onChange={(e) => setSerial(e.target.value)}
            placeholder="যেমন: 786"
            className="w-full px-6 py-3 rounded-xl bg-white/20 text-white placeholder-white/80 shadow-inner focus:outline-none focus:ring-4 focus:ring-purple-400 transition border border-white/30"
          />
          <button
            onClick={handleSearch}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white/20 text-white font-medium shadow-inner border border-white/30 hover:bg-white/30 transition"
          >
            অনুসন্ধান করুন
          </button>
        </div>

        {error && <p className="text-red-400 text-center font-medium mb-4">{error}</p>}

        {data && (
          <div className="bg-white/10 rounded-xl p-6 overflow-x-auto border border-white/20">
            <table className="w-full text-sm table-auto border border-white/20">
              <tbody>
                {Object.entries(data).map(([key, value]) => (
                  <tr key={key} className="border border-white/20 text-center align-top">
                    <td className="py-3 px-4 font-medium text-purple-300 border border-white/20 text-center align-top">{key}</td>
                    <td className="py-3 px-4 text-white/90 border border-white/20 text-center align-top">{value || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

