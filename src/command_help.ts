import { getCommands } from "./command.js";


export function commandHelp(): void {
    console.log("Welcome to the Pokedex!\nUsage:\n");
    for (const command of Object.values(getCommands())) {
        console.log(`${command.name}: ${command.description}`);
    }
}