// Import JSON data directly
import countries from '~/data/countries.json'
import states from '~/data/states.json'
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

interface LocationQuery {
  city?: string;
  state?: string;
  country: string;
}

interface Country {
  id: number;
  name: string;
  iso2: string;
  iso3: string;
  // ... other fields as needed
}

class WeatherResult {
  constructor(private results: WeatherData[]) {}

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
  private readonly geoUrl = 'https://api.openweathermap.org/geo/1.0';
  private readonly countries: Country[];

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.countries = countries
  }

  private getCountryCode(country: string): string {
    // If it's already a 2-letter code, validate it exists
    if (country.length === 2) {
      const foundCountry = this.countries.find(
        c => c.iso2.toLowerCase() === country.toLowerCase()
      );
      if (foundCountry) {
        return foundCountry.iso2;
      }
    }
    
    // Search by country name
    const foundCountry = this.countries.find(
      c => c.name.toLowerCase() === country.toLowerCase()
    );
    
    if (!foundCountry) {
      throw new Error(`Invalid country: ${country}. Please provide a valid country name or ISO code.`);
    }
    
    return foundCountry.iso2;
  }

  async getWeatherByLocation({ city, state, country }: LocationQuery): Promise<WeatherResult> {
    try {
      const countryCode = this.getCountryCode(country);
      
      let geoEndpoint = `${this.geoUrl}/direct?`;
      
      if (city) {
        geoEndpoint += `q=${encodeURIComponent(city)}`;
        if (state) {
          geoEndpoint += `,${encodeURIComponent(state)}`;
        }
        geoEndpoint += `,${countryCode}`;
      } else {
        // If no city provided, search by country/state
        geoEndpoint += `q=${state ? encodeURIComponent(state) : ''},${countryCode}`;
      }
      
      geoEndpoint += `&limit=5&appid=${this.apiKey}`;

      const geoResponse = await fetch(geoEndpoint);
      if (!geoResponse.ok) {
        throw new Error(`Geocoding API Error: ${geoResponse.statusText}`);
      }

      const locations = await geoResponse.json();
      
      // Filter locations to match the requested country code
      const filteredLocations = locations.filter(
        location => location.country === countryCode
      );

      if (!filteredLocations.length) {
        throw new Error('No locations found for the given criteria');
      }

      // Fetch weather only for locations in the specified country
      const weatherPromises = filteredLocations.map(location => 
        this.getWeatherByCoordinates(location.lat, location.lon)
      );

      const weatherData = await Promise.all(weatherPromises);
      return new WeatherResult(weatherData);
      
    } catch (error) {
      throw new Error(`Failed to fetch weather data: ${error.message}`);
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
      throw new Error(`Failed to fetch weather data: ${error.message}`);
    }
  }
}


  export const weatherService = new WeatherService('f6498a352ecc470eeead0b6da74c84db');