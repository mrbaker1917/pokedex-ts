import { State } from './state.js';

export async function commandExplore(state: State, ...args: string[]) {
  const locationName = args[0];
  if (!locationName) {
    state.readline.question("Enter a location name: ", async (name) => {
      await fetchLocationData(state, name);
    });
  } else {
    await fetchLocationData(state, locationName);
  }
}

async function fetchLocationData(state: State, locationName: string) {
    console.log(`Exploring ${locationName}...`);
    try {
    const locationData = await state.pokeAPI.fetchLocation(locationName);
    console.log("Found Pokemon:");
    for (const pokemon of locationData.pokemon_encounters) {
        console.log(` - ${pokemon.pokemon.name}`);
      }
    } catch (error) {
      console.error(`Error fetching data for location "${locationName}":`, error);
    } finally {
      state.readline.prompt();
    }
  };