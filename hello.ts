import { serve } from "bun";

const headers = { "Content-Type": "text/plain" };
const port = Number(process.env.PORT || 9000);

serve({
  port,
  fetch() {
    return new Response("Hello, World!", {
      headers,
    });
  },
});

console.log(`Server running on http://localhost:${port}`);
