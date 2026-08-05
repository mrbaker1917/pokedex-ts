import { createInterface } from "node:readline";
import { getCommands } from "./commands.js";
import { State } from "./state.js";

export function cleanInput(input: string): string[] {
    if (input.trim() === "") {
        return [""];
    }
    const arr = input.split(" ");
    let cleanedArr = arr.map((word) => word.trim().toLowerCase());
    cleanedArr = cleanedArr.filter((word) => word !== "");
    return cleanedArr;
}

export function startREPL(state: State): void {
    const rl = state.readline
    rl.prompt();
    rl.on("line", async (input) => {
        const cleanedInput = cleanInput(input);
        if (cleanedInput.length === 0) {
            rl.prompt();
            return;
        } else if (cleanedInput[0] in state.commands) {
            const command = state.commands[cleanedInput[0]];
            command.callback(state);
            rl.prompt();
        } else {
            console.log( `Unknown command: "${cleanedInput[0]}". Type "help" for a list of commands.`);
            rl.prompt();
        }
    })
}