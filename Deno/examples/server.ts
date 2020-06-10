import { serve } from "https://deno.land/std@v0.36.0/http/server.ts";
const s = serve({ port: 8000 });
console.log("http://localhost:8000/");
for await (const req of s) {
  req.respond({ body: "Hello World\n" });
}

// const url = args[0]
// const res = await fetch(url)
// console.log(res.url)
// // Deno.copy(Deno.stdout, res.url)
