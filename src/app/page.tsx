"use client";

import { useState, useEffect } from "react";
import MiniChart from "./components/MiniChart";

type ExchangeRate = {
  cc: string;
  rate: number;
};

export default function Home() {
  const [data, setData] = useState<ExchangeRate[]>([]);
  const [currentTime, setCurrentTime] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Try the API first
        let exchangeData: ExchangeRate[] = [];

        try {
          const response = await fetch(
            "https://api.minfin.com.ua/mb/demo/2026-03-20/",
            {
              cache: "no-store",
              mode: "cors",
            },
          );

          if (response.ok) {
            const apiData = await response.json();
            exchangeData = [
              {
                cc: "USD",
                rate: apiData?.date?.sale || 43.6,
              },
            ];
          } else {
            throw new Error("API not responding");
          }
        } catch (apiError) {
          console.warn("API failed, using fallback:", apiError);
          // Use fallback data immediately
          exchangeData = [
            {
              cc: "USD",
              rate: 43.6,
            },
          ];
        }

        setData(exchangeData);
        setCurrentTime(new Date().toLocaleTimeString());
        setError(null);
      } catch (err) {
        console.error("General error:", err);
        setError("Using fallback rate");
        // Set fallback data
        setData([
          {
            cc: "USD",
            rate: 43.6,
          },
        ]);
        setCurrentTime(new Date().toLocaleTimeString());
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 flex flex-col items-center justify-center p-4 sm:p-4 lg:p-8 relative overflow-hidden">
        {/* Flower Background Pattern */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-10 left-10 text-4xl animate-pulse">
            🌸
          </div>
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
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center">
          <div className="text-6xl animate-pulse mb-4">⏳</div>
          <div className="text-sm sm:text-base lg:text-lg font-medium text-yellow-600">
            Loading exchange rates...
          </div>
        </div>
      </div>
    );
  }

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
              <span className="text-xs sm:text-sm lg:text-base text-gray-600 mr-2">
                ⏰
              </span>
              <span className="text-xs sm:text-sm lg:text-base text-gray-800 font-medium">
                {currentTime}
              </span>
            </div>
          </header>

          {/* Content */}
          <div className="grid gap-6 w-full max-w-lg">
            {error ? (
              <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg">
                <div className="flex items-center mb-2">
                  <span className="text-2xl sm:text-3xl mr-3">⚠️</span>
                  <span className="text-sm sm:text-base lg:text-lg font-medium text-yellow-600">
                    {error}
                  </span>
                </div>
                <div className="text-xs sm:text-sm text-gray-600">
                  Using fallback rate...
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
                    <div className="text-right">
                      <div className="text-xs sm:text-sm text-gray-600 font-medium mb-1">
                        Rate (UAH)
                      </div>
                      <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-pink-600 group-hover:scale-105 transition-transform duration-300">
                        {exchange.rate}
                      </div>
                    </div>
                  </div>

                  {/* Mini Chart */}
                  <div className="mt-4 sm:mt-6">
                    <MiniChart currentRate={exchange.rate} />
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <footer className="mt-8 sm:mt-12 text-center">
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
