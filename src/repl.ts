export function cleanInput(input: string): string[] {
    if (input.trim() === "") {
        return [""];
    }
    const arr = input.split(" ");
    let cleanedArr = arr.map((word) => word.trim().toLowerCase());
    cleanedArr = cleanedArr.filter((word) => word !== "");
    return cleanedArr;
}