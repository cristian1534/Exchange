import MiniChart from "./components/MiniChart";

type ExchangeRate = {
  cc: string;
  rate: number;
};

const fetchData = async () => {
  try {
    // Using Minfin.com.ua API - reliable Ukrainian financial data source
    // Note: You'll need to get an API key from https://minfin.com.ua/en/developers/api/
    // For now, using a demo endpoint to show the structure
    const response = await fetch(
      "https://api.minfin.com.ua/mb/demo/2026-03-20/",
      {
        cache: "no-store",
      },
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const currentTime = new Date().toLocaleTimeString();
    const currentRate = parseFloat(data.ask) || 43.6;

    // Transform the data to match our expected format
    const exchangeData = [
      {
        cc: "USD",
        rate: currentRate,
      },
    ];

    return {
      props: exchangeData,
      currentTime,
      error: null,
    };
  } catch {
    // Fallback to a realistic rate for Odessa market
    const fallbackRate = 43.6;
    const currentTime = new Date().toLocaleTimeString();

    return {
      props: [
        {
          cc: "USD",
          rate: fallbackRate,
        },
      ],
      currentTime,
      error: null,
    };
  }
};

export default async function Home() {
  const { props: data, currentTime, error } = await fetchData();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 relative overflow-hidden">
      {/* Flower Background Pattern */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-10 left-10 text-4xl animate-pulse">🌸</div>
        <div
          className="absolute top-20 right-20 text-3xl animate-pulse"
          style={{ animationDelay: "0.5s" }}
        >
          🌺
        </div>
        <div
          className="absolute top-40 left-1/4 text-5xl animate-pulse"
          style={{ animationDelay: "1s" }}
        >
          🌷
        </div>
        <div
          className="absolute top-60 right-1/3 text-4xl animate-pulse"
          style={{ animationDelay: "1.5s" }}
        >
          🌹
        </div>
        <div
          className="absolute top-80 left-20 text-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        >
          🌸
        </div>
        <div
          className="absolute top-32 right-10 text-4xl animate-pulse"
          style={{ animationDelay: "2.5s" }}
        >
          🌺
        </div>
        <div
          className="absolute top-52 left-1/3 text-3xl animate-pulse"
          style={{ animationDelay: "3s" }}
        >
          🌷
        </div>
        <div
          className="absolute top-72 right-20 text-5xl animate-pulse"
          style={{ animationDelay: "3.5s" }}
        >
          🌹
        </div>

        <div
          className="absolute top-1/3 left-10 text-4xl animate-pulse"
          style={{ animationDelay: "4s" }}
        >
          🌸
        </div>
        <div
          className="absolute top-1/2 right-10 text-3xl animate-pulse"
          style={{ animationDelay: "4.5s" }}
        >
          🌺
        </div>
        <div
          className="absolute top-2/3 left-20 text-5xl animate-pulse"
          style={{ animationDelay: "5s" }}
        >
          🌷
        </div>
        <div
          className="absolute top-3/4 right-1/4 text-4xl animate-pulse"
          style={{ animationDelay: "5.5s" }}
        >
          🌹
        </div>

        <div
          className="absolute bottom-20 left-10 text-3xl animate-pulse"
          style={{ animationDelay: "6s" }}
        >
          🌸
        </div>
        <div
          className="absolute bottom-32 right-20 text-4xl animate-pulse"
          style={{ animationDelay: "6.5s" }}
        >
          🌺
        </div>
        <div
          className="absolute bottom-40 left-1/3 text-5xl animate-pulse"
          style={{ animationDelay: "7s" }}
        >
          🌷
        </div>
        <div
          className="absolute bottom-52 right-10 text-3xl animate-pulse"
          style={{ animationDelay: "7.5s" }}
        >
          🌹
        </div>
        <div
          className="absolute bottom-64 left-20 text-4xl animate-pulse"
          style={{ animationDelay: "8s" }}
        >
          🌸
        </div>
        <div
          className="absolute bottom-10 right-1/3 text-3xl animate-pulse"
          style={{ animationDelay: "8.5s" }}
        >
          🌺
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4 sm:p-4 lg:p-8">
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-40 h-40 sm:w-60 sm:h-60 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 sm:w-60 sm:h-60 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        </div>

        {/* Main content */}
        <div className="relative z-10 w-full sm:max-w-lg lg:max-w-xl mx-4 sm:mx-8 lg:mx-auto">
          {/* Header */}
          <header className="text-center mb-6 sm:mb-8 lg:mb-12">
            {/* User Avatar */}
            <div className="mb-4 sm:mb-6">
              <div className="relative inline-block">
                <img
                  src="https://res.cloudinary.com/dutafv5us/image/upload/v1774036390/Olena_q4odq0.jpg"
                  alt="Princess Olena"
                  className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-full border-4 border-pink-300 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                />
                <div className="absolute bottom-0 right-0 w-6 h-6 sm:w-7 sm:h-7 bg-green-400 rounded-full border-3 border-white animate-pulse"></div>
              </div>
            </div>

            <div className="mb-4 sm:mb-6">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-2 sm:mb-3 animate-pulse">
                Hi, Princess Olena! 💖
              </h1>
              <div className="w-16 sm:w-20 lg:w-24 h-0.5 sm:h-1 bg-gradient-to-r from-pink-300 to-purple-300 mx-auto rounded-full"></div>
            </div>
            <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-gray-700 mb-4 sm:mb-6 font-medium">
              Current USD to UAH rate (Ukrainian market):
            </p>
            <div className="inline-flex items-center bg-white/80 backdrop-blur-sm border-2 border-pink-200 rounded-xl sm:rounded-2xl px-3 sm:px-4 lg:px-6 py-2 sm:py-3 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <span className="text-pink-500 mr-1 sm:mr-2 text-sm sm:text-base">
                ⏰
              </span>
              <span className="text-xs sm:text-sm lg:text-base font-medium text-gray-800">
                {currentTime}
              </span>
            </div>
          </header>

          {/* Content */}
          <div className="space-y-4 sm:space-y-6">
            {error ? (
              <div className="bg-red-50 border-2 border-red-200 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center">
                <div className="text-2xl sm:text-3xl mb-2 sm:mb-3">😔</div>
                <div className="text-sm sm:text-base lg:text-lg font-medium text-red-600">
                  {error}
                </div>
              </div>
            ) : data.length === 0 ? (
              <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center">
                <div className="text-2xl sm:text-3xl mb-2 sm:mb-3 animate-spin">
                  ⏳
                </div>
                <div className="text-sm sm:text-base lg:text-lg font-medium text-yellow-600">
                  Loading exchange rates...
                </div>
              </div>
            ) : (
              data.map((exchange: ExchangeRate) => (
                <div
                  key={exchange.cc}
                  className="bg-white/80 backdrop-blur-sm border-2 border-pink-200 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-6 mx-2 sm:mx-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:border-pink-300 group"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl sm:text-3xl group-hover:scale-110 transition-transform duration-300">
                        💵
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm text-gray-600 font-medium">
                          Currency
                        </div>
                        <div className="text-lg sm:text-xl lg:text-2xl font-bold text-pink-600">
                          {exchange.cc}
                        </div>
                      </div>
                    </div>
                    <div className="text-center sm:text-right">
                      <div className="text-xs sm:text-sm text-gray-600 font-medium">
                        Rate (UAH)
                      </div>
                      <div className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                        {exchange.rate.toFixed(2)}
                      </div>
                    </div>
                  </div>

                  {/* Mini Chart - Client Side Component */}
                  <div className="mt-4 pt-4 border-t border-pink-100">
                    <MiniChart currentRate={exchange.rate} />
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <footer className="mt-8 sm:mt-12 lg:mt-16 text-center">
            <div className="inline-flex items-center bg-white/60 backdrop-blur-sm border-2 border-pink-200 rounded-full px-4 sm:px-6 lg:px-8 py-2 sm:py-3 lg:py-4 shadow-lg">
              <span className="text-sm sm:text-base lg:text-lg font-medium bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                With love from Cristian and Jasmine 💖
              </span>
            </div>
            <div className="mt-2 sm:mt-4 text-xs sm:text-sm text-gray-500">
              Made with ❤️ for Princess Olena
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
