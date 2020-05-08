import { serve } from "https://deno.land/std@v0.36.0/http/server.ts";
const s = serve({ port: 8000 });
console.log("http://localhost:8000/");
for await (const req of s) {
  req.respond({ body: "Hello World\n" });
}

// await Deno.copyFile("./Dep.js", "./Dep.txt");

// const $ = Deno
// await $.copyFile("./Dep.js", "./Dep1.txt");


const url = Deno.args[0]
const res = await fetch(url)
await Deno.copy(Deno.stdout, res.body)