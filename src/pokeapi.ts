import { Cache } from "./pokecache.js";

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  #cache: Cache;
  constructor(cacheInterval: number) {
    this.#cache = new Cache(cacheInterval);
  }

  async fetchPokemon(pokemonName: string): Promise<any> {
    const url = `${PokeAPI.baseURL}/pokemon/${pokemonName}`;
    const cachedPokemon = this.#cache.get<any>(url);
    if (cachedPokemon) {
        return cachedPokemon;
    }
    try {
      const resp = await fetch(url);

      if (!resp.ok) {
        throw new Error(`${resp.status} ${resp.statusText}`);
      }

      const pokemonData = await resp.json();
      this.#cache.add(url, pokemonData);
      return pokemonData;
    } catch (e) {
      throw new Error(
        `Error fetching pokemon '${pokemonName}': ${(e as Error).message}`,
      );
    }
  }

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const url = pageURL || `${PokeAPI.baseURL}/location-area`;
    const cachedLocals = this.#cache.get<ShallowLocations>(url);
    if (cachedLocals) {
        return cachedLocals;
    }
    try {
      const resp = await fetch(url);

      if (!resp.ok) {
        throw new Error(`${resp.status} ${resp.statusText}`);
      }

      const locations: ShallowLocations = await resp.json();
      this.#cache.add(url, locations)
      return locations;
    } catch (e) {
      throw new Error(`Error fetching locations: ${(e as Error).message}`);
    }
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const url = `${PokeAPI.baseURL}/location-area/${locationName}`;
    const cachedLocal = this.#cache.get<Location>(url);
    if (cachedLocal) {
        return cachedLocal;
    }
    try {
      const resp = await fetch(url);

      if (!resp.ok) {
        throw new Error(`${resp.status} ${resp.statusText}`);
      }

      const location: Location = await resp.json();
      this.#cache.add(url, location);
      return location;
    } catch (e) {
      throw new Error(
        `Error fetching location '${locationName}': ${(e as Error).message}`,
      );
    }
  }
}

export type ShallowLocations = {
  count: number;
  next: string;
  previous: string;
  results: {
    name: string;
    url: string;
  }[];
};

export type Location = {
  encounter_method_rates: {
    encounter_method: {
      name: string;
      url: string;
    };
    version_details: {
      rate: number;
      version: {
        name: string;
        url: string;
      };
    }[];
  }[];
  game_index: number;
  id: number;
  location: {
    name: string;
    url: string;
  };
  name: string;
  names: {
    language: {
      name: string;
      url: string;
    };
    name: string;
  }[];
  pokemon_encounters: {
    pokemon: {
      name: string;
      url: string;
    };
    version_details: {
      encounter_details: {
        chance: number;
        condition_values: any[];
        max_level: number;
        method: {
          name: string;
          url: string;
        };
        min_level: number;
      }[];
      max_chance: number;
      version: {
        name: string;
        url: string;
      };
    }[];
  }[];
};
