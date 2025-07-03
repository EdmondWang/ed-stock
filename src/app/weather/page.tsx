"use client";
import { useEffect, useState } from 'react';

interface WeatherData {
  main: { temp: number };
  weather: [{ description: string; icon: string }];
  name: string;
}

export default function WeatherPage() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
        if (!apiKey) {
          throw new Error('API key not set. Please add NEXT_PUBLIC_OPENWEATHER_API_KEY to your .env.local file.');
        }
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=Shanghai&units=metric&appid=${apiKey}`
        );
        if (!response.ok) throw new Error('Failed to fetch weather data');
        const data = await response.json();
        setWeather(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  if (loading) return <div className="flex justify-center items-center min-h-screen">Loading weather data...</div>;
  if (error) return <div className="flex justify-center items-center min-h-screen text-red-500">{error}</div>;
  if (!weather) return null;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <h1 className="text-3xl font-bold mb-6">Today&apos;s Weather in {weather.name}</h1>
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <div className="flex items-center justify-center mb-4">
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
            className="w-24 h-24"
          />
        </div>
        <div className="text-center">
          <p className="text-6xl font-bold">{Math.round(weather.main.temp)}°C</p>
          <p className="text-xl capitalize mt-2">{weather.weather[0].description}</p>
        </div>
      </div>
      <p className="mt-4 text-sm text-gray-500">
        Data provided by OpenWeatherMap. Get your API key at <a href="https://openweathermap.org/" className="text-blue-500">openweathermap.org</a>
      </p>
    </div>
  );
}