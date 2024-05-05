import { IFunction } from "./type";

const API_KEY = "<api_key>"; // Replace with your actual OpenWeather API key
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

export const getWeather = async (lon: number, lat: number): Promise<string> => {
  const url = `${BASE_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return JSON.stringify(data);
  } catch (error) {
    console.error("Failed to fetch weather data:", error);
    return JSON.stringify({ error: "Failed to fetch weather data" });
  }
};

export const weather: IFunction = {
  type: "function",
  function: {
    name: "get_weather",
    description: "Get the current weather",
    parameters: {
      type: "object",
      properties: {
        longitude: {
          type: "number",
          description: "The longitude to get the weather for",
        },
        latitude: {
          type: "number",
          description: "The latitude to get the weather for",
        },
      },
    },
  },
  async execute(args: any) {
    return await getWeather(args.longitude, args.latitude);
  },
};
