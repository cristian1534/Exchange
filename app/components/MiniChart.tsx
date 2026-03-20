"use client";

import { useState, useEffect } from "react";

type HistoryPoint = { rate: number; timestamp: string };

const MiniChart = ({ currentRate }: { currentRate: number }) => {
  const [history, setHistory] = useState<HistoryPoint[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    // Get or create mock data for demonstration
    let storedHistory: HistoryPoint[] = [];
    const historyStr = localStorage.getItem("usd_uah_rate_history");

    if (historyStr) {
      storedHistory = JSON.parse(historyStr);
    } else {
      // Create mock historical data for the last 3 days
      const now = new Date();
      const mockData = [
        {
          rate: 43.25,
          timestamp: new Date(
            now.getTime() - 3 * 24 * 60 * 60 * 1000,
          ).toISOString(),
        }, // 3 days ago
        {
          rate: 43.4,
          timestamp: new Date(
            now.getTime() - 2 * 24 * 60 * 60 * 1000,
          ).toISOString(),
        }, // 2 days ago
        {
          rate: 43.55,
          timestamp: new Date(
            now.getTime() - 1 * 24 * 60 * 60 * 1000,
          ).toISOString(),
        }, // 1 day ago
        {
          rate: 43.48,
          timestamp: new Date(
            now.getTime() - 12 * 60 * 60 * 1000,
          ).toISOString(),
        }, // 12 hours ago
        {
          rate: 43.52,
          timestamp: new Date(now.getTime() - 6 * 60 * 60 * 1000).toISOString(),
        }, // 6 hours ago
        {
          rate: 43.58,
          timestamp: new Date(now.getTime() - 3 * 60 * 60 * 1000).toISOString(),
        }, // 3 hours ago
        {
          rate: 43.62,
          timestamp: new Date(now.getTime() - 1 * 60 * 60 * 1000).toISOString(),
        }, // 1 hour ago
      ];
      storedHistory = mockData;
    }

    // Add current rate to history
    const updatedHistory = [
      ...storedHistory,
      {
        rate: currentRate,
        timestamp: new Date().toISOString(),
      },
    ];

    // Keep only last 20 data points
    if (updatedHistory.length > 20) {
      updatedHistory.splice(0, updatedHistory.length - 20);
    }

    // Save updated history
    localStorage.setItem(
      "usd_uah_rate_history",
      JSON.stringify(updatedHistory),
    );
    localStorage.setItem("usd_uah_previous_rate", currentRate.toString());
    localStorage.setItem("usd_uah_last_update", new Date().toISOString());

    setHistory(updatedHistory);
  }, [currentRate]);

  if (!isClient || history.length < 2) {
    return (
      <div className="w-full h-20 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400 text-xs">
        Loading chart data...
      </div>
    );
  }

  const width = 200;
  const height = 80;
  const padding = 10;

  // Calculate min and max rates for scaling
  const rates = history.map((h) => h.rate);
  const minRate = Math.min(...rates) - 0.1;
  const maxRate = Math.max(...rates) + 0.1;
  const range = maxRate - minRate;

  // Generate points for the line
  const points = history.map((point, index) => {
    const x = padding + (index / (history.length - 1)) * (width - 2 * padding);
    const y =
      padding + ((maxRate - point.rate) / range) * (height - 2 * padding);
    return `${x},${y}`;
  });

  // Create gradient area under the line
  const areaPoints = `${padding},${height - padding} ${points.join(" ")} ${width - padding},${height - padding}`;

  // Calculate variation from the first historical point (3 days ago) for more meaningful comparison
  const firstHistoricalRate =
    history.length > 1 ? history[0].rate : currentRate;
  const firstHistoricalTimestamp =
    history.length > 1 ? history[0].timestamp : new Date().toISOString();
  const variation = currentRate - firstHistoricalRate;
  const variationPercent =
    firstHistoricalRate !== 0 ? (variation / firstHistoricalRate) * 100 : 0;

  // Format dates
  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffHours < 1) {
      return "Just now";
    } else if (diffHours < 24) {
      return `${diffHours}h ago`;
    } else if (diffDays === 1) {
      return "Yesterday";
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    }
  };

  const previousDateFormatted = formatDate(firstHistoricalTimestamp);
  const currentDateFormatted = formatDate(new Date().toISOString());

  return (
    <div className="w-full">
      {/* Variation Display */}
      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs text-gray-600">Previous:</span>
            <span className="text-xs font-medium text-gray-700">
              {firstHistoricalRate.toFixed(2)}
            </span>
            <span className="text-xs text-gray-500">
              {previousDateFormatted}
            </span>
          </div>
          <div
            className={`flex flex-col items-end space-y-1 px-2 py-1 rounded-full ${
              variation > 0
                ? "bg-green-100 text-green-700"
                : variation < 0
                  ? "bg-red-100 text-red-700"
                  : "bg-gray-100 text-gray-700"
            }`}
          >
            <span className="text-sm font-bold">
              {variation > 0 ? "📈" : variation < 0 ? "📉" : "➡️"}
            </span>
            <span className="text-xs font-medium">
              {variation > 0 ? "+" : ""}
              {variation.toFixed(2)} ({variationPercent > 0 ? "+" : ""}
              {variationPercent.toFixed(2)}%)
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs text-gray-600">Current:</span>
            <span className="text-xs font-medium text-gray-700">
              {currentRate.toFixed(2)}
            </span>
            <span className="text-xs text-gray-500">
              {currentDateFormatted}
            </span>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="mt-3">
        <div className="text-xs text-gray-600 mb-2 font-medium">
          📊 Rate History (Last {history.length} updates)
        </div>
        <svg
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto"
        >
          {/* Gradient definition */}
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ec4899" />
              <stop offset="100%" stopColor="#9333ea" />
            </linearGradient>
            <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ec4899" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#ec4899" stopOpacity="0.05" />
            </linearGradient>
          </defs>

          {/* Area under the line */}
          <path d={`M ${areaPoints}`} fill="url(#areaGradient)" />

          {/* Line */}
          <path
            d={`M ${points.join(" L ")}`}
            stroke="url(#lineGradient)"
            strokeWidth="2"
            fill="none"
          />

          {/* Data points */}
          {history.map((point, index) => {
            const x =
              padding + (index / (history.length - 1)) * (width - 2 * padding);
            const y =
              padding +
              ((maxRate - point.rate) / range) * (height - 2 * padding);
            return (
              <circle
                key={index}
                cx={x}
                cy={y}
                r={index === history.length - 1 ? 3 : 1.5}
                fill={index === history.length - 1 ? "#ec4899" : "#9333ea"}
                className={index === history.length - 1 ? "animate-pulse" : ""}
              />
            );
          })}
        </svg>

        {/* Mini legend */}
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>{history[0]?.rate.toFixed(2)}</span>
          <span>
            {formatDate(history[0]?.timestamp || "")} - {currentDateFormatted}
          </span>
          <span>{history[history.length - 1]?.rate.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default MiniChart;
