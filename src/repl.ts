import { createInterface } from "node:readline";

export function cleanInput(input: string): string[] {
    if (input.trim() === "") {
        return [""];
    }
    const arr = input.split(" ");
    let cleanedArr = arr.map((word) => word.trim().toLowerCase());
    cleanedArr = cleanedArr.filter((word) => word !== "");
    return cleanedArr;
}

export function startREPL() {
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Pokedex > ",
    });
    rl.prompt();
    rl.on("line", (input) => {
        const cleanedInput = cleanInput(input);
        if (cleanedInput.length === 0) {
            rl.prompt();
        } else {
            console.log(`Your command was: ${cleanedInput[0]}`);
            rl.prompt();
        }
    })
}