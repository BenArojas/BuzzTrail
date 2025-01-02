// Import JSON data directly
import countries from '~/data/countries.json'
import states from '~/data/states.json'
import { LocationService, LocationQuery, Coordinates } from "~/api/locationService";

// Types for weather data
interface WeatherData {
  main: {
    temp: number;
    humidity: number;
    feels_like: number;
  };
  weather: Array<{
    main: string;
    description: string;
  }>;
  name: string;
  sys: {
    country: string;
  };
}

class WeatherResult {
  constructor(private results: WeatherData[]) { }

  getBestMatch(): WeatherData | null {
    return this.results[0] || null;
  }

  getAllMatches(): WeatherData[] {
    return this.results;
  }

  getMatchCount(): number {
    return this.results.length;
  }

  hasMatches(): boolean {
    return this.results.length > 0;
  }

  getMatchAt(index: number): WeatherData | null {
    return this.results[index] || null;
  }
}

class WeatherService {
  private readonly apiKey: string;
  private readonly baseUrl = 'https://api.openweathermap.org/data/2.5';
  private readonly locationService: LocationService;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.locationService = new LocationService(apiKey);
    }


  async getWeatherByLocation({ state, country }: LocationQuery): Promise<WeatherResult> {
    try {
      // Use LocationService to get coordinates
      const coordinates = await this.locationService.getCoordinates({ state, country });
      // Get weather data for the coordinates
      const weatherData = await this.getWeatherByCoordinates(coordinates.lat, coordinates.lng);
      
      return new WeatherResult([weatherData]);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to fetch weather data: ${error.message}`);
      } else {
        throw new Error('Failed to fetch weather data: An unknown error occurred.');
      }
    }
  }

  private async getWeatherByCoordinates(lat: number, lon: number): Promise<WeatherData> {
    try {
      const response = await fetch(
        `${this.baseUrl}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${this.apiKey}`
      );

      if (!response.ok) {
        throw new Error(`Weather API Error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to fetch weather data: ${error.message}`);
      } else {
        throw new Error('Failed to fetch weather data: An unknown error occurred.');
      }
    }

  }
}

export { WeatherService };
