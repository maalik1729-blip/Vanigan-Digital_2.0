import { defineNitroConfig } from "nitro/config";

export default defineNitroConfig({
  vercel: {
    config: {
      runtime: "nodejs20.x"
    }
  }
});
