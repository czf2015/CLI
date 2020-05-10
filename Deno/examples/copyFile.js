const { copyFile, args } = Deno

await copyFile("./server.ts", "./server.js");

await copyFile("./server.js", "../test.txt");