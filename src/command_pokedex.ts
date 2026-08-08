import { State } from './state.js';

export async function commandPokedex(state: State) {
  const pokedex = state.pokedex;
  if (Object.keys(pokedex).length === 0) {
    console.log("You haven't caught any pokemon yet.");
    return;
  }

  console.log("Your Pokedex:");
  for (const [name, data] of Object.entries(pokedex)) {
    console.log(` - ${name}`);
  };
};