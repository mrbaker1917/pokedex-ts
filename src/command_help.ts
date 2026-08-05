import { State } from "./state.js";


export function commandHelp(state: State): void {
    console.log("Welcome to the Pokedex!\nUsage:\n");
    for (const command of Object.values(state.commands)) {
        console.log(`${command.name}: ${command.description}`);
    }
}