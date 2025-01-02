import countries from '~/data/countries.json'


export interface LocationQuery {
    state?: string | null;
    country: string;
  }
  
  export interface Coordinates {
    lat: number;
    lng: number;
  }
  
  interface Country {
    id: number;
    name: string;
    iso2: string;
    iso3: string;
    // ... other fields as needed
  }

  export class LocationService {
    private geoUrl = 'http://api.openweathermap.org/geo/1.0';
    private readonly countries: Country[];
    
    constructor(private apiKey: string) {
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
  
    async getCoordinates({ state, country }: LocationQuery): Promise<Coordinates> {
      try {
        const countryCode = this.getCountryCode(country);
        let locations: any[] = [];
  
        // First attempt: Try with state if it exists
        if (state) {
          const stateEndpoint = `${this.geoUrl}/direct?q=${encodeURIComponent(state)},${countryCode}&limit=5&appid=${this.apiKey}`;
          const stateResponse = await fetch(stateEndpoint);
          
          if (!stateResponse.ok) {
            throw new Error(`Geocoding API Error: ${stateResponse.statusText}`);
          }
  
          locations = await stateResponse.json();
          locations = locations.filter(location => location.country === countryCode);
        }
  
        // Second attempt: If state search failed and state has multiple words, try with first word
        if (!locations.length && state && state.includes(' ')) {
          const trimmedState = state.split(' ')[0];
          const trimmedStateEndpoint = `${this.geoUrl}/direct?q=${encodeURIComponent(trimmedState)},${countryCode}&limit=5&appid=${this.apiKey}`;
          
          const trimmedStateResponse = await fetch(trimmedStateEndpoint);
          if (!trimmedStateResponse.ok) {
            throw new Error(`Geocoding API Error: ${trimmedStateResponse.statusText}`);
          }
  
          locations = await trimmedStateResponse.json();
          locations = locations.filter(location => location.country === countryCode);
        }
  
        // Final attempt: If all else failed or no state provided, search by country
        if (!locations.length) {
          const countryEndpoint = `${this.geoUrl}/direct?q=${countryCode}&limit=5&appid=${this.apiKey}`;
          
          const countryResponse = await fetch(countryEndpoint);
          if (!countryResponse.ok) {
            throw new Error(`Geocoding API Error: ${countryResponse.statusText}`);
          }
  
          locations = await countryResponse.json();
          locations = locations.filter(location => location.country === countryCode);
        }
  
        if (!locations.length) {
          throw new Error('No location found for the given criteria.');
        }
  
        return {
          lat: locations[0].lat,
          lng: locations[0].lon
        };
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(`Failed to fetch coordinates: ${error.message}`);
        }
        throw new Error('Failed to fetch coordinates: An unknown error occurred.');
      }
    }
  }