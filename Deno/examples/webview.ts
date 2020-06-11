import { WebView } from "https://deno.land/x/webview/mod.ts";

const html = (n: number) =>
  `
  <html>
  <body>
    <h1>${n}</h1>
  </body>
  </html>
`;

const webview1 = new WebView({
  title: "Multiple deno_webview example",
  url: `data:text/html,${encodeURIComponent(html(100))}`,
  width: 400,
  height: 200,
  resizable: true,
  debug: true,
  frameless: false,
});

const webview2 = new WebView({
  title: "Multiple deno_webview example",
  url: `data:text/html,${encodeURIComponent(html(2))}`,
  width: 400,
  height: 200,
  resizable: true,
  debug: true,
  frameless: false,
});

await Promise.all([webview1.run(), webview2.run()]);
