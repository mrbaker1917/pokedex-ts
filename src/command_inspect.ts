import { State } from './state.js';

export async function commandInspect(state: State, ...args: string[]) {
  const pokemonName = args[0];
  if (!pokemonName) {
    state.readline.question("Enter a pokemon name: ", (name) => {
      inspectPokemon(state, name);
    });
  } else {
    inspectPokemon(state, pokemonName);
  }
}

function inspectPokemon(state: State, pokemonName: string) {
  const pokemonData = state.pokedex[pokemonName];
  if (!pokemonData) {
    console.log(`you have not caught that pokemon`);
  } else {
    console.log(`Name: ${pokemonData.name}`);
    console.log(`Height: ${pokemonData.height}`);
    console.log(`Weight: ${pokemonData.weight}`);
    console.log("Stats:");
    for (const stat of pokemonData.stats) {
      console.log(`  -${stat.stat.name}: ${stat.base_stat}`);
    }
    console.log("Types:");
    for (const type of pokemonData.types) {
      console.log(`  - ${type.type.name}`);
    }
  }
  state.readline.prompt();
}