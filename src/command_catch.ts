import { State } from './state.js';

export async function commandCatch(state: State, ...args: string[]) {
  const pokemonName = args[0];
  if (!pokemonName) {
    state.readline.question("Enter a pokemon name: ", async (name) => {
      await fetchPokemonData(state, name);
    });
  } else {
    await fetchPokemonData(state, pokemonName);
  }
}

async function fetchPokemonData(state: State, pokemonName: string) {
    console.log(`Throwing a Pokeball at ${pokemonName}...`);
    try {
        const pokemonData = await state.pokeAPI.fetchPokemon(pokemonName);
        const base_exp = pokemonData["base_experience"];
        const randomNumber = Math.floor(Math.random() * 100) + 1;
        if (randomNumber < base_exp) {
            console.log(`${pokemonData.name} escaped!`);
        } else {
            console.log(`${pokemonData.name} was caught!`);
            console.log(`You may now inspect it with the inspect command.`)
            state.pokedex[pokemonData.name] = pokemonData;
        }
    } catch (error) {
      console.error(`Error fetching data for pokemon "${pokemonName}":`, error);
    } finally {
      state.readline.prompt();
    }
  };